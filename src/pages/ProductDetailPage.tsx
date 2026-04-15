// src/pages/ProductDetailPage.tsx

import React, { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { productsData } from '../data/products';
import { ShoppingCart, Target, BrainCircuit, Sparkles, CheckCircle, ArrowLeft, Cpu, Activity, ShieldCheck } from 'lucide-react';
import NotFoundPage from './NotFoundPage';

const ProductDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = productsData.find((p) => p.slug === slug);

  if (!product) return <NotFoundPage />;

  return (
    <>
      <Helmet>
        <title>{`${product.title} | Orbital Module`}</title>
      </Helmet>

      <main className="bg-space-950 text-white pt-32 pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          
          {/* Fil d'Ariane HUD */}
          <div className="mb-12 flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            <Link to="/produits" className="hover:text-quantum transition-colors">Archive</Link>
            <span>/</span>
            <span className="text-quantum">{product.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Visuals */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="relative group">
              <div className="absolute -inset-4 bg-quantum/10 blur-3xl rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative hud-glass rounded-3xl overflow-hidden p-2">
                 <div className="absolute inset-0 z-20 pointer-events-none border-[10px] border-space-950/50 rounded-2xl" />
                 <img src={product.image} alt={product.title} className="w-full h-auto rounded-2xl" />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div>
                <span className="px-3 py-1 bg-quantum/10 border border-quantum/30 rounded text-quantum text-[10px] font-black uppercase tracking-[0.3em] mb-4 inline-block">
                   Module_{product.category}
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
                  {product.title}
                </h1>
                <p className="text-xl text-slate-400 font-mono leading-relaxed">{product.tagline}</p>
              </div>

              <div className="p-8 bg-space-900 border border-white/5 rounded-3xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-slate-500 tracking-widest">Protocol_Access_Fee</span>
                  <span className="text-3xl font-black text-quantum">
                    {typeof product.price === 'object' ? product.price.current.toFixed(2) : product.price.toFixed(2)}€
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={product.purchaseLink} target="_blank" className="hud-corners flex-1 bg-quantum text-space-950 py-5 font-black uppercase tracking-widest text-center hover:shadow-neon-cyan transition-all flex items-center justify-center gap-3">
                    <ShoppingCart size={18} /> Acquérir le module
                  </a>
                  {product.demoLink && (
                    <a href={product.demoLink} target="_blank" className="hud-corners flex-1 border border-white/10 text-white py-5 font-black uppercase tracking-widest text-center hover:bg-white/5 transition-all">
                      Demo_Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Deep Dive Grid */}
          <div className="grid md:grid-cols-3 gap-8">
             <div className="md:col-span-2 space-y-8">
                <div className="hud-glass p-8 rounded-3xl border-white/5">
                   <h3 className="flex items-center gap-3 text-xl font-black text-white uppercase tracking-tighter mb-6">
                     <Target className="text-nebula" /> Le Défi_Technique
                   </h3>
                   <p className="text-slate-400 font-mono leading-relaxed">{product.challenge}</p>
                </div>
                <div className="hud-glass p-8 rounded-3xl border-white/5">
                   <h3 className="flex items-center gap-3 text-xl font-black text-white uppercase tracking-tighter mb-6">
                     <BrainCircuit className="text-quantum" /> Architecture_Solution
                   </h3>
                   <p className="text-slate-400 font-mono leading-relaxed">{product.solution}</p>
                </div>
             </div>

             <div className="space-y-8">
                <div className="bg-space-900 border border-quantum/20 p-8 rounded-3xl">
                   <h3 className="text-sm font-black text-quantum uppercase tracking-widest mb-8 flex items-center gap-2">
                     <Cpu size={16} /> Key_Features
                   </h3>
                   <ul className="space-y-4">
                     {product.benefits.map((b, i) => (
                       <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-mono leading-tight">
                         <CheckCircle size={14} className="text-quantum mt-0.5 shrink-0" />
                         <span>{b}</span>
                       </li>
                     ))}
                   </ul>
                </div>

                {product.testimonial && (
                  <div className="p-8 bg-nebula/5 border border-nebula/20 rounded-3xl italic">
                    <p className="text-slate-300 font-mono text-sm leading-relaxed mb-4">"{product.testimonial.text}"</p>
                    <cite className="text-nebula text-[10px] uppercase font-black not-italic tracking-widest">— {product.testimonial.author}</cite>
                  </div>
                )}
             </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default ProductDetailPage;