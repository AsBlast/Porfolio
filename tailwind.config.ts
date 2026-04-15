// tailwind.config.ts

import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/articles/**/*.mdx", 
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
      sans: ['Orbitron', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },

      colors: {
        // --- NOUVELLE PALETTE SPATIALE ---
        space: {
          950: "#02040a", // Fond noir sidéral profond
          900: "#050b14", // Bleu-noir de cockpit
          800: "#0a1120", // Teinte pour les cartes
        },
        quantum: "#22d3ee", // Cyan électrique (votre glow-cyan)
        nebula: "#d946ef",  // Magenta nébuleuse (votre glow-purple)
        
        // --- COMPATIBILITÉ SHADCN ---
        primary: { DEFAULT: "#22d3ee", foreground: "#02040a" },
        border: "rgba(34, 211, 238, 0.1)", // Bordures HUD très fines
        input: "rgba(255, 255, 255, 0.05)",
        ring: "#22d3ee",
        background: "#02040a",
        foreground: "#f8fafc",
        secondary: { DEFAULT: "rgba(217, 70, 239, 0.1)", foreground: "#f8fafc" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "#0a1120", foreground: "#94a3b8" },
        accent: { DEFAULT: "rgba(34, 211, 238, 0.1)", foreground: "#22d3ee" },
        popover: { DEFAULT: "#050b14", foreground: "#f8fafc" },
        card: { DEFAULT: "#050b14", foreground: "#f8fafc" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(34, 211, 238, 0.3)',
        'neon-purple': '0 0 15px rgba(217, 70, 239, 0.3)',
        'hud-inner': 'inset 0 0 15px rgba(34, 211, 238, 0.05)',
      },

      keyframes: {
        // --- VOS ANIMATIONS CONSERVÉES ---
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        hologram: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        launch: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        aurora: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.2' },
          '50%': { transform: 'scale(1.2) rotate(3deg)', opacity: '0.35' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2px, 2px)' },
          '20%': { transform: 'translate(2px, -2px)' },
          '50%': { transform: 'translate(0, 0)' },
        },
        'pan-grid': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(80px)' },
        },

        // --- NOUVELLES ANIMATIONS HUD/SPACE ---
        'scan-line': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(34, 211, 238, 0.1)' },
          '50%': { borderColor: 'rgba(34, 211, 238, 0.5)' },
        },
        'spin-slow': {
          '0%': { rotate: '0deg' },
          '100%': { rotate: '360deg' },
        }
      },
      
      animation: {
        'float': 'float 12s infinite ease-in-out',
        'hologram': 'hologram 1.5s infinite linear',
        'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
        'launch': 'launch 2s infinite ease-in-out',
        'aurora': 'aurora 20s ease-in-out infinite',
        'pan-grid': 'pan-grid 60s linear infinite',
        'glitch': 'glitch 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        
        // Nouvelles
        'scan': 'scan-line 4s linear infinite',
        'hud-pulse': 'border-pulse 4s ease-in-out infinite',
        'spin-radar': 'spin-slow 10s linear infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
};

export default config;