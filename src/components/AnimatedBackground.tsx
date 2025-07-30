// src/components/AnimatedBackground.tsx

import { useEffect, useRef } from "react";

const lerpColor = (color1: number[], color2: number[], factor: number): string => {
    const result = color1.slice();
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
    }
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
};

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        const particleCount = 300;
        const mouse = { x: 0, y: 0, radius: 120 };

        class Particle {
            x: number; y: number; radius: number; depth: number;
            vx: number; vy: number; baseVx: number; baseVy: number;
            baseColor: number[]; blastColor: number[]; blastEnergy: number;
            shape: 'circle' | 'square';

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.depth = Math.random() * 0.8 + 0.2;
                this.radius = 0.5 + (this.depth * 1.5);
                this.baseVx = (Math.random() - 0.5) * this.depth * 0.3;
                this.baseVy = (Math.random() - 0.5) * this.depth * 0.3;
                this.vx = this.baseVx; this.vy = this.baseVy;
                this.baseColor = [34, 211, 238]; // Cyan
                this.blastColor = [217, 70, 239]; // Magenta
                this.blastEnergy = 0;
                this.shape = Math.random() > 0.9 ? 'square' : 'circle';
            }

            update() {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    this.blastEnergy = 1;
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.vx += (dx / distance) * force * 8;
                    this.vy += (dy / distance) * force * 8;
                }

                this.blastEnergy *= 0.96;
                this.vx += (this.baseVx - this.vx) * 0.05;
                this.vy += (this.baseVy - this.vy) * 0.05;
                this.x += this.vx; this.y += this.vy;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw(context: CanvasRenderingContext2D) {
                const currentColor = lerpColor(this.baseColor, this.blastColor, this.blastEnergy);
                const currentRadius = this.radius * (1 + this.blastEnergy * 2);
                context.beginPath();
                context.fillStyle = currentColor;
                
                if (this.shape === 'square') {
                    context.fillRect(this.x - currentRadius / 2, this.y - currentRadius / 2, currentRadius, currentRadius);
                } else {
                    context.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
                    context.fill();
                }
            }
        }

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            mouse.x = canvas.width / 2;
            mouse.y = canvas.height / 2;
            particles = Array.from({ length: particleCount }, () => new Particle());
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        handleResize();
        let animationFrameId: number;
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(ctx); });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
            
            <div className="absolute inset-0 z-10">
                <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(139,92,246,0.15),rgba(255,255,255,0))] animate-aurora"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(217,70,239,0.15),rgba(255,255,255,0))] animate-aurora [animation-delay:-10s]"></div>
            </div>

            <div
                className="absolute bottom-0 left-0 w-full h-full z-20 animate-glitch
                  bg-[linear-gradient(to_right,rgba(34,211,238,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.15)_1px,transparent_1px)] 
                  bg-[size:80px_40px] 
                  [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_30%,transparent_100%)]
                  "
                style={{
                    transform: 'perspective(1000px) rotateX(65deg) translateY(35%)',
                    transformOrigin: 'bottom center',
                }}
            >
                <div className="w-full h-full animate-pan-grid"></div>
            </div>

            <canvas ref={canvasRef} className="absolute inset-0 z-30" />

            <div className="absolute inset-0 z-40 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.5)_0,rgba(0,0,0,0.5)_1px,transparent_1px,transparent_3px)] pointer-events-none"></div>

        </div>
    );
}