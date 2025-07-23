import { motion } from "framer-motion";
import {
  ShoppingCart,
  Sparkles,
  Star,
  Filter,
  X,
  Target,
  BrainCircuit,
} from "lucide-react";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";

// --- Interface Product ---
interface Product {
  id: number;
  title: string;
  tagline: string;
  description: string;
  image: string;
  purchaseLink: string;
  demoLink?: string;
  price: number | { current: number; original?: number };
  tags: string[];
  category: "Template" | "UI Kit" | "Script";
  featured?: boolean;
  benefits: string[];
  testimonial?: { text: string; author: string };
  challenge?: string;
  solution?: string;
}

// --- Données des Produits ---
const productsData: Product[] = [
  {
    id: 101,
    title: "CreativePortfolio Pro",
    tagline: "Le template ultime pour les créatifs et freelances du web.",
    description:
      "Lancez votre portfolio professionnel en quelques minutes. Parfait pour les développeurs, designers, photographes et tous les créateurs de contenu.",
    image: "/images/creativePortfolio.webp",
    purchaseLink: "https://payhip.com/b/ZufXm",
    demoLink: "https://creative-portfolio-pro.netlify.app/",
    price: { current: 2.0, original: 7.0 },
    tags: ["Design Moderne", "Portfolio", "Responsive"],
    category: "Template",
    featured: true,
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
      "Les freelances et créatifs ont besoin d'une présence en ligne professionnelle pour attirer des clients, mais n'ont souvent pas le temps ou le budget pour un site sur mesure. Le défi était de créer un template qui soit à la fois esthétiquement premium, ultra-rapide et simple à personnaliser sans compétences techniques avancées.",
    solution:
      "J'ai conçu ce template 'mobile-first' en me concentrant sur l'impact visuel et la facilité d'utilisation. La structure est intuitive, permettant à n'importe qui d'ajouter ses projets et de personnaliser les couleurs en quelques minutes. Les performances sont optimisées pour garantir une excellente première impression auprès des visiteurs.",
  },
  {
    id: 103,
    title: "Analyseur de Texte - Offline",
    tagline: "Votre analyseur de texte 100% privé et qui fonctionne partout.",
    description:
      "Un outil puissant pour écrivains, étudiants et professionnels. Obtenez une analyse détaillée de vos textes en temps réel, directement dans votre navigateur. Vos données ne quittent JAMAIS votre machine.",
    image: "/images/TextAnalis.webp",
    purchaseLink: "https://payhip.com/b/SB18R",
    price: 5.0,
    tags: ["React", "Vite", "Tailwind CSS", "Sécurité"],
    demoLink: "https://textanalyser-offline.netlify.app/",
    category: "Template",
    featured: false,
    benefits: [
      "100% Confidentiel",
      "Fonctionne Sans Internet",
      "Analyse Instantanée",
      "Aucune Limite de Mots",
    ],
    challenge:
      "Les outils d'analyse de texte en ligne forcent les utilisateurs à envoyer leurs écrits, parfois confidentiels, sur des serveurs externes, créant un risque pour la vie privée. De plus, leur dépendance à une connexion internet les rend inutilisables en déplacement.",
    solution:
      "Cet outil a été conçu comme une application web qui s'exécute entièrement côté client. En utilisant React et Vite, l'application est non seulement ultra-rapide, mais elle garantit aussi que 100% des calculs sont effectués sur votre appareil. Aucune donnée n'est jamais transmise, pour une tranquillité d'esprit totale.",
  },
];

// --- Animations et Sous-Composants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};
const ProductCard = ({ product }: { product: Product }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 group relative flex flex-col h-full hover:border-[#D946EF]/50 transition-colors duration-300"
  >
    <div className="aspect-[16/10] overflow-hidden relative">
      <img
        src={product.image}
        alt={`Aperçu du produit ${product.title}`}
        width="400"
        height="250"
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <span className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/80">
        {product.category}
      </span>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D946EF] transition-colors">
        {product.title}
      </h3>
      <p className="text-white/60 text-sm mb-4 flex-grow">{product.tagline}</p>
      <div className="mb-6 space-y-2">
        {product.benefits.slice(0, 3).map((benefit, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-sm text-green-400"
          >
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            {typeof product.price === "object"
              ? product.price.current.toFixed(2)
              : product.price.toFixed(2)}
            €
          </span>
          {typeof product.price === "object" && product.price.original && (
            <span className="line-through text-lg font-normal text-white/50">
              {product.price.original.toFixed(2)}€
            </span>
          )}
        </div>
        <a
          href={product.purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-[#D946EF] rounded-lg text-white font-semibold hover:bg-[#C026D3] transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Acheter
        </a>
      </div>
      {product.demoLink && (
        <a
          href={product.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center mt-3 text-sm text-white/60 hover:text-white transition-colors"
        >
          Voir la démo
        </a>
      )}
    </div>
  </motion.div>
);
const FeaturedProduct = ({ product }: { product: Product }) => (
  <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="aspect-video rounded-lg overflow-hidden border border-white/10 shadow-lg"
    >
      <img
        src={product.image}
        alt={`Image principale du produit ${product.title}`}
        width="600"
        height="338"
        fetchpriority="high"
        className="w-full h-full object-cover"
      />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 mb-4 text-sm font-bold text-yellow-400">
        <Star className="w-4 h-4" fill="currentColor" />
        <span>Produit en Vedette</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
        {product.title}
      </h2>
      <p className="text-white/70 mb-8">{product.tagline}</p>
      <div className="space-y-6 bg-white/5 p-6 rounded-lg border border-white/10 mb-8">
        <div>
          <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-2">
            <Target className="text-[#D946EF]" />
            Le Défi
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">
            {product.challenge}
          </p>
        </div>
        <div>
          <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-2">
            <BrainCircuit className="text-[#D946EF]" />
            La Solution
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">
            {product.solution}
          </p>
        </div>
      </div>
      {product.testimonial && (
        <blockquote className="border-l-4 border-[#D946EF] pl-4 italic text-white/80 mb-8">
          <p>"{product.testimonial.text}"</p>
          <cite className="block text-right mt-2 not-italic text-sm text-white/60">
            - {product.testimonial.author}
          </cite>
        </blockquote>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <a
          href={product.purchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-6 py-3 bg-[#D946EF] rounded-lg text-white text-lg font-bold hover:bg-[#C026D3] transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <div className="flex items-baseline gap-2">
            {typeof product.price === "object" ? (
              <>
                <span>Obtenir pour {product.price.current.toFixed(2)}€</span>
                {product.price.original && (
                  <span className="line-through text-base font-normal text-white/60">
                    {product.price.original.toFixed(2)}€
                  </span>
                )}
              </>
            ) : (
              <span>Obtenir pour {product.price.toFixed(2)}€</span>
            )}
          </div>
        </a>
        {product.demoLink && (
          <a
            href={product.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors font-semibold"
          >
            Voir la démo live
          </a>
        )}
      </div>
    </motion.div>
  </div>
);

// --- Page principale ---
export default function ProductsPage() {
  const [filterCategory, setFilterCategory] = useState<string>("Tous");
  const categories = ["Tous", ...new Set(productsData.map((p) => p.category))];
  const featuredProduct = useMemo(
    () => productsData.find((p) => p.featured),
    []
  );
  const filteredProducts = useMemo(() => {
    const otherProducts = productsData.filter((p) => !p.featured);
    if (filterCategory === "Tous") return otherProducts;
    return otherProducts.filter((p) => p.category === filterCategory);
  }, [filterCategory]);

  return (
    <>
      <Helmet>
        <title>
          Boutique - Templates et Outils pour Développeurs par Brice A.
        </title>
        <meta
          name="description"
          content="Découvrez des templates, kits UI et scripts de haute qualité, conçus pour accélérer vos projets de développement web et mobile."
        />
      </Helmet>

      <main className="bg-[#1A1F2C] text-white">
        <section className="pt-32 pb-16">
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
              Des templates prêts à l'emploi, conçus avec soin pour vous faire
              gagner du temps et produire un travail de qualité professionnelle.
            </motion.p>
          </div>
        </section>

        {featuredProduct && (
          <section className="pb-16" aria-labelledby="featured-product-heading">
            <div className="container mx-auto px-4">
              <h2 id="featured-product-heading" className="sr-only">
                Produit en vedette
              </h2>
              <FeaturedProduct product={featuredProduct} />
            </div>
          </section>
        )}

        <section className="py-16" aria-labelledby="all-products-heading">
          <div className="container mx-auto px-4">
            <h2
              id="all-products-heading"
              className="text-3xl font-bold text-center text-white mb-12"
            >
              Tous les produits
            </h2>
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center p-4">
              <div
                className="flex flex-wrap justify-center gap-2"
                role="group"
                aria-label="Filtrer les produits par catégorie"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    // --- CORRECTION DE LA SYNTAXE ---
                    onClick={() => setFilterCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      filterCategory === category
                        ? "bg-[#D946EF] text-white shadow-lg"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {category}
                    {filterCategory === category &&
                      filterCategory !== "Tous" && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            setFilterCategory("Tous");
                          }}
                          aria-label="Réinitialiser le filtre"
                          role="button"
                        >
                          <X size={14} className="text-white" />
                        </span>
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
                <h3 className="text-xl font-bold text-white mb-2">
                  Aucun produit dans cette catégorie
                </h3>
                <p className="text-white/60">
                  Essayez de sélectionner une autre catégorie.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
