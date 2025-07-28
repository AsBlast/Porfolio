// src/pages/ProductDetailPage.tsx

import React, { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { productsData } from '../data/products';
import { ShoppingCart, Target, BrainCircuit, Sparkles, CheckCircle, ArrowLeft } from 'lucide-react';
import NotFoundPage from './NotFoundPage';

const ProductDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const product = productsData.find((p) => p.slug === slug);

  // Si le produit n'est pas trouvé, on affiche la page 404
  if (!product) {
    return <NotFoundPage />; 
  }

  return (
    <>
      <Helmet>
        <title>{`${product.title} - Brice-Dev`}</title>
        <meta name="description" content={product.tagline} />
        <meta property="og:title" content={`${product.title} - Brice-Dev`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
      </Helmet>

      <main className="bg-[#1A1F2C] text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* --- Lien de retour pour une meilleure UX --- */}
            <div className="mb-8">
              <Link to="/produits" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium group">
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                <span>Retour à tous les produits</span>
              </Link>
            </div>
            
            {/* Section principale : Image + Achat */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
              <div className="aspect-video rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <img src={product.image} alt={`Image de ${product.title}`} className="w-full h-full object-cover"/>
              </div>
              <div>
                <span className="text-sm font-bold text-cyan-400 mb-2 block">{product.category}</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{product.title}</h1>
                <p className="text-white/70 mb-8 text-lg">{product.tagline}</p>

                <div className="flex flex-wrap items-center gap-4">
                  <a href={product.purchaseLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-[#D946EF] rounded-lg text-white text-lg font-bold hover:bg-[#C026D3] transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    Obtenir pour {typeof product.price === 'object' ? product.price.current.toFixed(2) : product.price.toFixed(2)}€
                  </a>
                  {product.demoLink && (
                    <a href={product.demoLink} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors font-semibold">Voir la démo live</a>
                  )}
                </div>
              </div>
            </div>

            {/* Section Détails : Challenge, Solution, Bénéfices */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                {product.challenge && (
                  <div>
                    <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-4"><Target className="text-[#D946EF]" />Le Défi</h3>
                    <p className="text-white/70 leading-relaxed">{product.challenge}</p>
                  </div>
                )}
                 {product.solution && (
                  <div>
                    <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-4"><BrainCircuit className="text-[#D946EF]" />La Solution</h3>
                    <p className="text-white/70 leading-relaxed">{product.solution}</p>
                  </div>
                )}
              </div>
              
              <div className="bg-white/5 p-8 rounded-lg border border-white/10">
                <h3 className="flex items-center gap-3 text-2xl font-bold text-white mb-6"><Sparkles className="text-green-400" />Bénéfices Clés</h3>
                <ul className="space-y-4">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-white/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section Témoignage */}
            {product.testimonial && (
              <div className="mt-16 max-w-3xl mx-auto text-center">
                 <h3 className="text-2xl font-bold text-white mb-8">Ce qu'ils en disent</h3>
                 <blockquote className="border-l-4 border-[#D946EF] pl-6 italic text-white/80 text-xl">
                   <p>"{product.testimonial.text}"</p>
                   <cite className="block text-right mt-4 not-italic text-base text-white/60">- {product.testimonial.author}</cite>
                 </blockquote>
              </div>
            )}
            
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default ProductDetailPage;