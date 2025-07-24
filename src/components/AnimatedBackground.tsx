import { motion } from "framer-motion";
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
    const particleCount = 350; 
    
    const mouse = { x: 0, y: 0, radius: 120 };

    class Particle {
      x: number;
      y: number;
      radius: number;
      depth: number;
      vx: number; 
      vy: number;
      
      baseVx: number;
      baseVy: number;
      
      baseColor: number[];
      blastColor: number[];
      blastEnergy: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.depth = Math.random() * 0.8 + 0.2;
        this.radius = 0.5 + (this.depth * 1.5);
        
        // Chaque particule a sa propre vitesse de dérive constante, créant le mouvement permanent.
        this.baseVx = (Math.random() - 0.5) * this.depth * 0.5; // Vitesse lente
        this.baseVy = (Math.random() - 0.5) * this.depth * 0.5;
        
        // La vélocité initiale est sa vélocité de base
        this.vx = this.baseVx;
        this.vy = this.baseVy;

        this.baseColor = [110, 231, 255]; // Cyan
        this.blastColor = [236, 72, 153]; // Rose/Magenta
        this.blastEnergy = 0;
      }

      update() {
        // --- LOGIQUE DE L'EXPLOSION ---
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          this.blastEnergy = 1;
          const force = (mouse.radius - distance) / mouse.radius;
          const repulsionStrength = 10;
          this.vx += (dx / distance) * force * repulsionStrength;
          this.vy += (dy / distance) * force * repulsionStrength;
        }

        // --- PHYSIQUE DE LA PARTICULE ---
        this.blastEnergy *= 0.95; 
        
        
        this.vx += (this.baseVx - this.vx) * 0.01;
        this.vy += (this.baseVy - this.vy) * 0.01;
        
        this.x += this.vx;
        this.y += this.vy;

        // --- GESTION DE L'ESPACE INFINI ---
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        const currentColor = lerpColor(this.baseColor, this.blastColor, this.blastEnergy);
        const currentRadius = this.radius * (1 + this.blastEnergy * 1.5);

        context.shadowColor = currentColor;
        context.shadowBlur = currentRadius * 2;
        context.beginPath();
        context.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        context.fillStyle = currentColor;
        context.fill();
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    
    handleResize();

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0;
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
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
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden bg-black">
      <motion.div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.2),_rgba(56,189,248,0.15),_transparent_70%)]"
        />
      </motion.div>
      <canvas ref={canvasRef} className="absolute inset-0 z-[5]" />
      <div className="absolute inset-0 z-[10] bg-[linear-gradient(transparent_1px,_#0A0A0A_1px),_linear-gradient(90deg,transparent_1px,_#0A0A0A_1px)] bg-[size:20px_20px] opacity-20" />
    </div>
  );
}