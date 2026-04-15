// src/pages/ProductsPage.tsx

import React, { useState, useMemo, FC } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Filter, X, Cpu, Zap, Layers, Box } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { productsData, Product } from '../data/products';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const ProductCard: FC<{ product: Product }> = ({ product }) => (
  <motion.div
    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
    className="group relative hud-glass flex flex-col h-full border-white/5 hover:border-quantum/40 transition-all duration-500"
  >
    <Link to={`/produits/${product.slug}`} className="block overflow-hidden relative aspect-[16/10]">
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-transparent" />
      <span className="absolute top-4 right-4 px-3 py-1 bg-space-950/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono font-bold text-quantum uppercase tracking-widest">
        {product.category}
      </span>
    </Link>

    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-tighter group-hover:text-quantum transition-colors">
        {product.title}
      </h3>
      <p className="text-slate-400 text-xs font-mono mb-6 line-clamp-2 flex-grow">
        {product.tagline}
      </p>

      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Acquisition_Cost</span>
          <div className="flex items-baseline gap-2">
             <span className="text-2xl font-black text-white">
               {typeof product.price === 'object' ? product.price.current.toFixed(2) : product.price.toFixed(2)}€
             </span>
          </div>
        </div>
        <Link 
          to={`/produits/${product.slug}`}
          className="p-3 bg-quantum/10 text-quantum border border-quantum/20 rounded-xl hover:bg-quantum hover:text-space-950 transition-all shadow-neon-cyan/10"
        >
          <Box size={20} />
        </Link>
      </div>
    </div>
  </motion.div>
);

const ProductsPage: FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>("Tous");
  const categories = ["Tous", ...new Set(productsData.map((p) => p.category))];
  
  const featuredProduct = useMemo(() => productsData.find((p) => p.featured), []);
  const otherProducts = useMemo(() => {
    const list = productsData.filter((p) => !p.featured);
    return filterCategory === "Tous" ? list : list.filter(p => p.category === filterCategory);
  }, [filterCategory]);

  return (
    <>
      <Helmet>
        <title>Boutique - Modules Technologiques par Brice-Dev</title>
      </Helmet>

      <main className="bg-space-950 text-white pt-32 pb-24 min-h-screen">
        <div className="container mx-auto px-4">
          
          {/* Header */}
          <div className="max-w-3xl mb-20">
            <div className="flex items-center gap-3 text-quantum font-mono text-xs uppercase tracking-[0.4em] mb-4">
              <Layers size={16} /> <span>Tech_Distribution_Center</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 leading-none">
              Orbital <span className="text-quantum">Store</span>
            </h1>
            <p className="text-slate-400 font-mono text-lg border-l-2 border-quantum/30 pl-6">
              Modules d'ingénierie logicielle haute-fidélité pour architectes numériques exigeants.
            </p>
          </div>

          {/* Featured */}
          {featuredProduct && filterCategory === "Tous" && (
            <div className="mb-24">
               <div className="flex items-center gap-3 mb-8 text-nebula font-black uppercase tracking-widest text-xs">
                 <Star size={14} fill="currentColor" /> <span>Alpha_Selection_Module</span>
               </div>
               <div className="hud-glass grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border-nebula/20">
                  <div className="relative aspect-video lg:aspect-auto h-full overflow-hidden">
                    <img src={featuredProduct.image} alt="" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-space-950/80 to-transparent" />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center bg-space-900/40 backdrop-blur-xl">
                    <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">{featuredProduct.title}</h2>
                    <p className="text-xl text-slate-300 font-mono mb-8 leading-relaxed">{featuredProduct.tagline}</p>
                    <Link to={`/produits/${featuredProduct.slug}`} className="hud-corners bg-nebula text-white px-8 py-4 font-black uppercase tracking-widest text-center sm:self-start hover:shadow-neon-purple transition-all">
                      Analyser le module
                    </Link>
                  </div>
               </div>
            </div>
          )}

          {/* Filtres HUD */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-white/5 pb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat} onClick={() => setFilterCategory(cat)}
                  className={`px-6 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${
                    filterCategory === cat ? "bg-quantum text-space-950 font-black shadow-neon-cyan" : "bg-white/5 text-slate-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Available_Units: {otherProducts.length + (filterCategory === "Tous" ? 1 : 0)}
            </div>
          </div>

          {/* Grille */}
          <motion.div 
            variants={containerVariants} initial="hidden" animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {otherProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </motion.div>

        </div>
      </main>
    </>
  );
};

export default ProductsPage;