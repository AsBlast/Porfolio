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
      colors: {
        primary: { DEFAULT: "#00A09D", foreground: "#FFFFFF" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'glow-purple': '0 0 15px rgba(217, 70, 239, 0.6)',
        'glow-cyan': '0 0 15px rgba(34, 211, 238, 0.5)',
      },

      // --- SECTION DES ANIMATIONS ENTIÈREMENT FUSIONNÉE ---
      keyframes: {
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
          '0%, 100%': { 
            transform: 'scale(1) rotate(0deg)',
            opacity: '0.2', // Opacité de base légèrement réduite
          },
          '50%': { 
            transform: 'scale(1.2) rotate(3deg)',
            opacity: '0.35', // Opacité maximale réduite de 0.5 à 0.35
          },
        },
         glitch: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2px, 2px)' },
          '20%': { transform: 'translate(2px, -2px)' },
          '30%': { transform: 'translate(-2px, -2px)' },
          '40%': { transform: 'translate(2px, 2px)' },
          '50%': { transform: 'translate(0, 0)' },
          // ... pause ...
          '70%': { transform: 'translate(2px, -1px)' },
          '80%': { transform: 'translate(-1px, 2px)' },
          '90%': { transform: 'translate(1px, 1px)' },
        },
        flash: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.6' },
        },

        'pan-grid': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(80px)' },
        },
        
      },
      
      animation: {
        // --- Animations de CSS personnalisé ---
        'float': 'float 12s infinite ease-in-out',
        'float-delayed': 'float 12s 3s infinite ease-in-out',
        'hologram': 'hologram 1.5s infinite linear',
        'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
        'launch': 'launch 2s infinite ease-in-out',

        // --- Animations pour le fond Cyberpunk ---
        'aurora': 'aurora 20s ease-in-out infinite',
        'pan-grid': 'pan-grid 60s linear infinite',
        'glitch': 'glitch 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
        'flash': 'flash 15s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
      },
      // --- FIN DE LA SECTION DES ANIMATIONS ---
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
};

export default config;