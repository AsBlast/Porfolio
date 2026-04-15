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
    price: number | string | { current: number; original?: number }; 
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
    demoLink: "https://text-analyzer-pro-two.vercel.app/",
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
  {
    id: 104,
    slug: "kit-majordome-ai", 
    title: "Kit Majordome AI Pro",
    tagline: "Intégrez AsBlast AI sur votre propre site en 10 minutes.",
    description: "Le code source complet du majordome que vous voyez sur ce site. Inclus : le composant React, la fonction Netlify Edge, et le système de capture de leads.",
    image: "/images/blog/majordome.webp",
    purchaseLink: "https://payhip.com/b/SB18R", 
    price: { current: 19.0, original: 49.0 }, // Effet promo
    tags: ["React", "AI", "Edge Functions"],
    category: "Script",
    featured: true, // Pour le mettre en avant
    benefits: ["Installation Flash", "Capture d'emails incluse", "Design HUD futuriste", "Compatible Groq/OpenAI"],
    challenge: "Développer un chatbot performant et beau prend des semaines de réglages.",
    solution: "Je vous livre une architecture clé en main, optimisée pour la conversion et la vitesse."
  },
  {
    id: 105,
    slug: "neural-link-consultation", 
    title: "Neural Link : Consultation IA",
    tagline: "1h de stratégie pour propulser votre business avec l'IA.",
    description: "Session privée de diagnostic et d'architecture. Nous analysons comment intégrer l'IA dans votre workflow pour gagner 10h par semaine.",
    image: "/images/blog/majordome.webp",
    purchaseLink: "https://calendly.com/briceyakimasblast/", 
    price: 150.0,
    tags: ["Conseil", "Stratégie IA", "Architecture"],
    category: "Outil", // Ou créer une catégorie "Service"
    benefits: ["Plan d'action concret", "Audit de votre stack actuelle", "Conseils Prompt Engineering"],
    challenge: "L'IA est partout, mais savoir par où commencer est complexe.",
    solution: "Une heure de clarté totale pour arrêter de perdre du temps et commencer à scaler."
  },
   {
    id: 105,
    slug: "neurocockpit-integrator-os",
    title: "NeuroCockpit IntegratorOS",
    tagline: "Système de monitoring neural pour la productivité 7G.",
    description: "Le cockpit ultime pour piloter votre état psychologique et vos performances quotidiennes. Ce module est en accès libre pour tous les pionniers du web.",
    image: "/images/neurocockpit.webp",
    purchaseLink: "https://www.paypal.com/ncp/payment/MURDBF85ZG664", // Ton lien de don (Stripe, Ko-fi, etc.)
    demoLink: "https://neuronal-cockpit.asblast.space/",
    price: "Donation_Libre", // On change le type de prix
    tags: ["Open Source", "Productivité", "Dashboard"],
    category: "Outil",
    benefits: ["Suivi des 7 archétypes", "Visualisation de données", "Zéro tracking publicitaire", "100% Client-side"],
    challenge: "Maintenir un haut niveau de performance sans sacrifier la vie privée des utilisateurs.",
    solution: "Une architecture décentralisée financée exclusivement par la communauté pour rester indépendante."
  },
];