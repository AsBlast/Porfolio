// src/data/products.ts

// --- Interface Product ---
export interface Product {
  id: number;
  slug: string; // <-- AJOUT IMPORTANT !
  title: string;
  tagline: string;
  description: string;
  image: string;
  purchaseLink: string;
  demoLink?: string;
  price: number | { current: number; original?: number };
  tags: string[];
  category: "Template" | "UI Kit" | "Script" | "Outil";
  featured?: boolean;
  benefits: string[];
  testimonial?: { text: string; author: string };
  challenge?: string;
  solution?: string;
}

// --- Données des Produits ---
export const productsData: Product[] = [
  {
    id: 101,
    slug: "creative-portfolio-pro", 
    title: "CreativePortfolio Pro",
    tagline: "Le template ultime pour les créatifs et freelances du web.",
    description:
      "Lancez votre portfolio professionnel en quelques minutes. Parfait pour les développeurs, designers, photographes et tous les créateurs de contenu.",
    image: "/images/creativePortfolio.webp",
    purchaseLink: "https://payhip.com/b/ZufXm",
    demoLink: "https://creative-portfolio-pro.netlify.app/",
    price: { current: 2.0, original: 6.0 },
    tags: ["Design Moderne", "Portfolio", "Responsive"],
    category: "Template",
    featured: false,
    benefits: [
      "SEO Optimisé",
      "Personnalisation Facile",
      "Rapide et Performant",
      "Mise en Ligne Simple",
    ],
    testimonial: {
      text: "Ce template m'a fait gagner des jours de travail. Le design est incroyable et le code est propre !",
      author: "Alex D., Freelance",
    },
    challenge:
      "Les freelances et créatifs ont besoin d'une présence en ligne professionnelle pour attirer des clients, mais n'ont souvent pas le temps ou le budget pour un site sur mesure.",
    solution:
      "J'ai conçu ce template 'mobile-first' en me concentrant sur l'impact visuel et la facilité d'utilisation. La structure est intuitive, permettant à n'importe qui d'ajouter ses projets et de personnaliser les couleurs en quelques minutes.",
  },
  {
    id: 103,
    slug: "analyseur-texte-offline", 
    title: "Analyseur de Texte - Offline",
    tagline: "Votre analyseur de texte 100% privé et qui fonctionne partout.",
    description:
      "Un outil puissant pour écrivains, étudiants et professionnels. Obtenez une analyse détaillée de vos textes en temps réel, directement dans votre navigateur. Vos données ne quittent JAMAIS votre machine.",
    image: "/images/TextAnalis.webp",
    purchaseLink: "https://payhip.com/b/SB18R",
    price: { current: 5.0, original: 7.0 },
    tags: ["React", "Vite", "Tailwind CSS", "Sécurité"],
    demoLink: "https://textanalyser-offline.netlify.app/",
    category: "Outil",
    featured: true,
    benefits: [
      "100% Confidentiel",
      "Fonctionne Sans Internet",
      "Analyse Instantanée",
      "Aucune Limite de Mots",
    ],
    testimonial: {
      text: "En tant que juriste, je manipule des documents confidentiels. Cet outil est une révolution. Je peux analyser des contrats sans jamais craindre une fuite de données.",
      author: "Claire L., Avocate",
    },
    challenge:
      "Les outils d'analyse de texte en ligne forcent les utilisateurs à envoyer leurs écrits, parfois confidentiels, sur des serveurs externes, créant un risque pour la vie privée. De plus, leur dépendance à une connexion internet les rend inutilisables en déplacement.",
    solution:
      "Cet outil a été conçu comme une application web qui s'exécute entièrement côté client. En utilisant React et Vite, l'application est non seulement ultra-rapide, mais elle garantit aussi que 100% des calculs sont effectués sur votre appareil. Aucune donnée n'est jamais transmise, pour une tranquillité d'esprit totale.",
  },
];