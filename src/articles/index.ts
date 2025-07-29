// src/articles/index.ts
export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  tags: string[];
  imagePosition?: 'top' | 'bottom' | 'center' | 'left' | 'right'; // <-- Ajoutez cette ligne

}

export const articles: ArticleMeta[] = [
  {
    slug: "guide-optimisation-lighthouse",
    title: "Comment j'ai optimisé mon portfolio pour un score Lighthouse de 86+",
    date: "2025-07-22",
    summary: "De 38 à 86 en performance : un guide détaillé des optimisations techniques que j'ai appliquées à mon portfolio React.",
    image: "/images/blog/lighthouse.png", 
    tags: ["React", "Performance", "SEO", "Vite"],
  },
   {
    slug: "creation-majordome-ai",
    title: "Comment j'ai créé un Majordome IA pour mon Portfolio React",
    date: "2025-07-27",
    summary: "Le récit complet de la création d'un agent conversationnel proactif. De l'idée à l'intégration, découvrez comment React, Netlify Functions et le Vercel AI SDK se sont assemblés pour donner vie à mon assistant numérique.",
    image: "/images/blog/majordome.webp", 
    imagePosition: 'top',
    tags: ["React", "AI", "Netlify", "Vercel AI SDK", "TypeScript"],
  },
   {
    slug: "connecter-site-facebook",
    title: "J'ai optimisé mon portfolio pour un partage parfait sur Facebook, comment ?",
    date: "2025-07-28",
    summary: "De la frustration d'un aperçu cassé à une carte de partage professionnelle. Suivez mon guide complet pour lier votre site React (SPA) à Facebook avec les balises Open Graph et le Debugger.",
    image: "/images/blog/portfolio-facebook.jpg", 
    imagePosition: 'top',
    tags: ["React", "SEO", "Facebook", "Développement Web", "Tutoriel"],
  },
];