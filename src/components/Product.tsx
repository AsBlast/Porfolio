import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Sparkles, 
  Star,
  Search,
  Filter,
  X
} from "lucide-react";
import { useState, useMemo } from "react";
import Head from 'next/head'; // Important pour le SEO de votre page boutique

// --- Données et Interfaces (Mettez-les dans un fichier partagé si besoin) ---

interface Product {
  id: number;
  title: string;
  tagline: string;
  description: string;
  image: string;
  purchaseLink: string;
  demoLink?: string;
  price: number;
  tags: string[];
  category: "Template" | "UI Kit" | "Script";
  featured?: boolean;
  benefits: string[];
  testimonial?: {
    text: string;
    author: string;
  };
}

const productsData: Product[] = [
  {
    id: 101,
    title: "PortfolioDev Pro",
    tagline: "Le template Next.js ultime pour les développeurs modernes.",
    description: "Lancez votre portfolio professionnel en quelques minutes. Entièrement responsive, optimisé SEO et facile à personnaliser avec Tailwind CSS.",
    image: "/images/product-portfolio.png",
    purchaseLink: "https://votre-lien.gumroad.com/l/portfolio-pro",
    demoLink: "https://demo-portfolio-pro.netlify.app/",
    price: 29.00,
    tags: ["Next.js", "React", "Tailwind CSS"],
    category: "Template",
    featured: true,
    benefits: ["SEO Optimisé", "Personnalisation Facile", "Code de Qualité", "Déploiement Rapide"],
    testimonial: {
      text: "Ce template m'a fait gagner des jours de travail. Le code est incroyablement propre !",
      author: "Alex D., Développeur Freelance"
    }
  },
  {
    id: 102,
    title: "Dashboard UI Kit",
    tagline: "Construisez des dashboards magnifiques et fonctionnels.",
    description: "Un ensemble de plus de 50 composants React/TypeScript conçus pour l'analyse de données. Gagnez des semaines de développement.",
    image: "/images/product-dashboard.png",
    purchaseLink: "https://votre-lien.payhip.com/b/dashboard-kit",
    demoLink: "https://demo-dashboard-kit.netlify.app/",
    price: 49.00,
    tags: ["React", "TypeScript", "Chart.js"],
    category: "UI Kit",
    featured: false,
    benefits: ["Accessible (WCAG)", "+50 Composants", "Responsive", "Documentation Incluse"]
  },
  
  
  {
    id: 103,
    title: "Analyseur de Texte - Offline",
    tagline: "Analyser vos textes avec précision sans connexion internet.",
    description: "Conçue pour fournir une analyse détaillée de n’importe quel texte saisi, sans limite de mots",
    image: "/images/TextAnalis.png",
    purchaseLink: "https://payhip.com/b/SB18R",
    price: 5.00,
    tags: ["React, Vite, Tailwind CSS"],
    demoLink: "https://textanalyser.netlify.app/",
    category: "Template",
    featured: false,
    benefits: ["Sécurisé", "Prêt à l'Emploi", "Hors ligne", "Structure Claire"]
  },

  {
    id: 104,
    title: "Automation scrapping",
    tagline: "Automatiser vos tâches avec mes scripts Python",
    description: "Un ensemble de plus de 50 composants React/TypeScript conçus pour l'analyse de données. Gagnez des semaines de développement.",
    image: "/images/product-dashboard.png",
    purchaseLink: "https://votre-lien.payhip.com/b/dashboard-kit",
    demoLink: "https://demo-dashboard-kit.netlify.app/",
    price: 9.00,
    tags: ["Python"],
    category: "Script",
    featured: false,
    benefits: ["Automatisation", "Responsive", "Documentation Incluse"]
  }
];

// --- Animations (réutilisées de votre code projet) ---

const containerVariants = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } } 
};
const itemVariants = { 
  hidden: { y: 20, opacity: 0 }, 
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } } 
};

// --- Composants de la page ---

const ProductCard = ({ product }: { product: Product }) => (
  <motion.div 
    variants={itemVariants}
    className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 group relative flex flex-col h-full hover:border-[#D946EF]/50 transition-colors duration-300"
  >
    <div className="aspect-[16/10] overflow-hidden relative">
      <img 
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <span className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/80">
        {product.category}
      </span>
    </div>
    
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D946EF] transition-colors">{product.title}</h3>
      <p className="text-white/60 text-sm mb-4 flex-grow">{product.tagline}</p>
      
      <div className="mb-6 space-y-2">
        {product.benefits.slice(0, 5).map((benefit, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-green-400">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-2xl font-bold text-white">{product.price.toFixed(2)}€</span>
        <a
          href={product.purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#D946EF] rounded-lg text-white font-semibold hover:bg-[#C026D3] transition-colors transform hover:scale-105"
        >
          <ShoppingCart className="w-4 h-4" />
          Acheter
        </a>
      </div>

      {product.demoLink && (
        <a href={product.demoLink} target="_blank" rel="noopener noreferrer" className="w-full text-center mt-3 text-sm text-white/60 hover:text-white transition-colors">
          Voir la démo
        </a>
      )}
    </div>
  </motion.div>
);

const FeaturedProduct = ({ product }: { product: Product }) => (
  <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="aspect-video rounded-lg overflow-hidden"
    >
      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4 text-sm font-bold text-[#D946EF]">
        <Star className="w-4 h-4" />
        <span>Produit en Vedette</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{product.title}</h2>
      <p className="text-white/70 mb-6">{product.tagline}</p>
      
      {product.testimonial && (
        <blockquote className="border-l-4 border-[#D946EF] pl-4 italic text-white/80 mb-6">
          <p>"{product.testimonial.text}"</p>
          <cite className="block text-right mt-2 not-italic text-sm text-white/60">- {product.testimonial.author}</cite>
        </blockquote>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <a href={product.purchaseLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-[#D946EF] rounded-lg text-white text-lg font-bold hover:bg-[#C026D3] transition-colors transform hover:scale-105">
          <ShoppingCart className="w-5 h-5" />
          Obtenir pour {product.price.toFixed(2)}€
        </a>
        {product.demoLink && (
          <a href={product.demoLink} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors font-semibold">
            Voir la démo live
          </a>
        )}
      </div>
    </motion.div>
  </div>
);


export default function ProductsPage() {
  const [filterCategory, setFilterCategory] = useState<string>("Tous");
  const categories = ["Tous", ...Array.from(new Set(productsData.map(p => p.category)))];

  const featuredProduct = useMemo(() => productsData.find(p => p.featured), []);
  
  const filteredProducts = useMemo(() => {
    const otherProducts = productsData.filter(p => !p.featured);
    if (filterCategory === "Tous") {
      return otherProducts;
    }
    return otherProducts.filter(p => p.category === filterCategory);
  }, [filterCategory]);

  return (
    <>
      <Head>
        <title>Boutique - Produits pour Développeurs par Brice A.</title>
        <meta name="description" content="Découvrez des templates, kits UI et scripts de haute qualité pour accélérer vos projets de développement." />
      </Head>

      <div className="bg-[#1A1F2C] text-white">
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            >
              Accélérez Vos Projets
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mx-auto text-lg text-white/70"
            >
              Des templates et kits UI prêts à l'emploi, conçus avec soin pour vous faire gagner du temps et produire un travail de qualité professionnelle.
            </motion.p>
          </div>
        </section>

        {featuredProduct && (
          <section className="pb-16">
            <div className="container mx-auto px-4">
              <FeaturedProduct product={featuredProduct} />
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center p-4">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map(category => (
                  <button 
                    key={category} 
                    onClick={() => setFilterCategory(category)} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      filterCategory === category 
                        ? "bg-[#D946EF] text-white shadow-lg" 
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {category}
                    {filterCategory === category && (
                      <X size={14} className="text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

             {filteredProducts.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center py-12"
                >
                    <Filter className="w-16 h-16 mx-auto text-[#D946EF]/50 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Aucun produit dans cette catégorie</h3>
                    <p className="text-white/60">Essayez de sélectionner une autre catégorie.</p>
                </motion.div>
             )}
          </div>
        </section>
      </div>
    </>
  );
}