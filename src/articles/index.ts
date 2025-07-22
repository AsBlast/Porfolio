// src/articles/index.ts

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  tags: string[];
}

export const articles: ArticleMeta[] = [
  {
    slug: "guide-optimisation-lighthouse",
    title: "Comment j'ai optimisé mon portfolio pour un score Lighthouse de 86+",
    date: "2024-07-24",
    summary: "De 38 à 86 en performance : un guide détaillé des optimisations techniques que j'ai appliquées à mon portfolio React.",
    image: "/images/blog/lighthouse.png", 
    tags: ["React", "Performance", "SEO", "Vite"],
  },
];