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
        primary: {
          DEFAULT: "#00A09D",
          foreground: "#FFFFFF",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      // --- AJOUTS NÉCESSAIRES POUR LE FOOTER ---
      boxShadow: {
        'glow-purple': '0 0 15px rgba(217, 70, 239, 0.6)',
        'glow-cyan': '0 0 15px rgba(34, 211, 238, 0.5)',
      },
      keyframes: {
        // Le plugin tailwindcss-animate s'occupe de ses propres keyframes (ex: accordion).
        // Nous ajoutons seulement les nôtres.
        launch: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-10px)', opacity: '0.8' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
         'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(219, 39, 119, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(219, 39, 119, 0.7)',
            transform: 'scale(1.05)'
          },
        },
      },
      
      animation: {
        // Le plugin tailwindcss-animate s'occupe de ses propres animations.
        // Nous ajoutons les nôtres ici pour pouvoir utiliser des classes comme "animate-aurora".
        'launch': 'launch 1.5s ease-in-out infinite',
        'aurora': 'aurora 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      // --- FIN DES AJOUTS ---
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
};

export default config;