// src/pages/ProductsPage.tsx

import React, { useState, useMemo, FC } from "react";
import { motion, Variants } from "framer-motion";
import { Link } from 'react-router-dom';
import { ShoppingCart, Sparkles, Star, Filter, X, Target, BrainCircuit } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { productsData } from '../data/products';
import type { Product } from '../data/products';

// --- Définition des animations Framer Motion ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

// --- Sous-composant : ProductCard ---
// On type explicitement les props du composant avec FC (FunctionComponent)
const ProductCard: FC<{ product: Product }> = ({ product }) => (
  <Link to={`/produits/${product.slug}`} className="block h-full" aria-label={`Voir les détails pour ${product.title}`}>
    <motion.div
      variants={itemVariants}
      className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 group relative flex flex-col h-full hover:border-[#D946EF]/50 transition-colors duration-300"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img src={product.image} alt={`Aperçu du produit ${product.title}`} width="400" height="250" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <span className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/80">{product.category}</span>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D946EF] transition-colors">{product.title}</h3>
        <p className="text-white/60 text-sm mb-4 flex-grow">{product.tagline}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              {typeof product.price === 'object' ? product.price.current.toFixed(2) : product.price.toFixed(2)}€
            </span>
            {typeof product.price === 'object' && product.price.original && (
              <span className="line-through text-lg font-normal text-white/50">{product.price.original.toFixed(2)}€</span>
            )}
          </div>
          <span className="px-4 py-2 bg-white/10 rounded-lg text-white font-semibold">Voir détails</span>
        </div>
      </div>
    </motion.div>
  </Link>
);

// --- Sous-composant : FeaturedProduct ---
const FeaturedProduct: FC<{ product: Product }> = ({ product }) => (
  <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="aspect-video rounded-lg overflow-hidden border border-white/10 shadow-lg">
      <img src={product.image} alt={`Image principale du produit ${product.title}`} width="600" height="338" fetchPriority="high" className="w-full h-full object-cover" />
    </motion.div>
    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
      <div className="flex items-center gap-2 mb-4 text-sm font-bold text-yellow-400">
        <Star className="w-4 h-4" fill="currentColor" />
        <span>Produit en Vedette</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{product.title}</h2>
      <p className="text-white/70 mb-8">{product.tagline}</p>
      {/* Utilisation d'un Link pour aller à la page détail, qui contient ces informations */}
      <Link to={`/produits/${product.slug}`} className="flex items-center gap-3 px-6 py-3 bg-[#D946EF] rounded-lg text-white text-lg font-bold hover:bg-[#C026D3] transition-colors">
        <ShoppingCart className="w-5 h-5" />
        <span>Voir les détails et acheter</span>
      </Link>
    </motion.div>
  </div>
);


// --- Composant principal de la page ---
const ProductsPage: FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>("Tous");
  const categories = ["Tous", ...new Set(productsData.map((p) => p.category))];
  const featuredProduct = useMemo(() => productsData.find((p) => p.featured), []);

  const filteredProducts = useMemo(() => {
    const otherProducts = productsData.filter((p) => !p.featured);
    if (filterCategory === "Tous") return otherProducts;
    return otherProducts.filter((p) => p.category === filterCategory);
  }, [filterCategory]);

  return (
    <>
      <Helmet>
        <title>Boutique - Templates et Outils pour Développeurs par Brice A.</title>
        <meta name="description" content="Découvrez des templates, kits UI et scripts de haute qualité, conçus pour accélérer vos projets de développement web et mobile." />
      </Helmet>

      <main className="bg-[#1A1F2C] text-white">
        <section className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Accélérez Vos Projets
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="max-w-2xl mx-auto text-lg text-white/70">
              Des templates prêts à l'emploi, conçus avec soin pour vous faire gagner du temps et produire un travail de qualité professionnelle.
            </motion.p>
          </div>
        </section>

        {featuredProduct && (
          <section className="pb-16" aria-labelledby="featured-product-heading">
            <div className="container mx-auto px-4">
              <FeaturedProduct product={featuredProduct} />
            </div>
          </section>
        )}

        <section className="py-16" aria-labelledby="all-products-heading">
          <div className="container mx-auto px-4">
            <h2 id="all-products-heading" className="text-3xl font-bold text-center text-white mb-12">Tous les produits</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filtrer les produits par catégorie">
              {categories.map((category) => (
                <button key={category} onClick={() => setFilterCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${filterCategory === category ? "bg-[#D946EF] text-white shadow-lg" : "bg-white/10 text-white/70 hover:bg-white/20"}`}>
                  {category}
                  {filterCategory === category && filterCategory !== "Tous" && (
                    <span onClick={(e) => { e.stopPropagation(); setFilterCategory("Tous"); }} aria-label="Réinitialiser le filtre" role="button">
                      <X size={14} className="text-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <Filter className="w-16 h-16 mx-auto text-[#D946EF]/50 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Aucun produit dans cette catégorie</h3>
                <p className="text-white/60">Essayez de sélectionner une autre catégorie.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductsPage;