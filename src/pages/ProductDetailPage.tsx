// src/pages/ProductDetailPage.tsx

import React, { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { productsData } from "../data/products";
import {
  ShoppingCart,
  Target,
  BrainCircuit,
  Zap,
  CheckCircle,
  ShieldCheck,
  Cpu,
  Activity,
  Lock,
  ArrowRight,
  DownloadCloud,
  Sparkles,
  HeartHandshake
} from "lucide-react";
import NotFoundPage from "./NotFoundPage";
import { SEO } from "@/components/SEO";

const ProductDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = productsData.find((p) => p.slug === slug);

  if (!product) return <NotFoundPage />;

  // --- LOGIQUE DE PRIX & DONATION ---
  const isDonation = product.price === "Donation_Libre";
  
  const currentPrice = typeof product.price === "object" 
    ? product.price.current 
    : product.price;
    
  const originalPrice = typeof product.price === "object" 
    ? product.price.original 
    : null;

const jsonLd = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": product.title,
  "image": `https://asblast.space${product.image}`,
  "description": product.description,
  "brand": {
    "@type": "Brand",
    "name": "AsBlast"
  },
  "offers": {
    "@type": "Offer",
    "url": window.location.href,
    "priceCurrency": "EUR",
    "price": isDonation ? "0" : currentPrice,
    "availability": "https://schema.org/InStock"
  }
};


  return (
    <>
    <SEO 
      title={`${product.title} | Brice Yakim`}
      description={product.tagline}
      image={product.image}
      slug={`/produits/${product.slug}`}
    />
    <script type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
      <Helmet>
        <title>{`${product.title} | ${isDonation ? 'Soutien Projet' : 'Acquisition Module'}`}</title>
        <meta name="description" content={product.tagline} />
      </Helmet>

      <main className="bg-space-950 text-white pt-32 pb-24 overflow-hidden relative">
        {/* Background Glow Dynamique */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full -z-10 opacity-10 ${isDonation ? 'bg-nebula' : 'bg-quantum'}`} />

        <div className="container mx-auto px-4">
          
          {/* --- NAV HUD --- */}
          <div className="mb-12 flex items-center justify-between border-b border-white/5 pb-6">
            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              <Link to="/produits" className="hover:text-quantum transition-colors flex items-center gap-2">
                <ArrowRight size={12} className="rotate-180" /> Central_Archive
              </Link>
              <span className="opacity-20">/</span>
              <span className={`${isDonation ? 'text-nebula' : 'text-quantum'} underline underline-offset-4`}>
                {product.title}
              </span>
            </div>
            <div className={`hidden md:flex items-center gap-2 text-[10px] font-mono ${isDonation ? 'text-nebula' : 'text-green-400'}`}>
              <Activity size={12} className="animate-pulse" />
              <span>STATUS: {isDonation ? 'OPEN_SOURCE_PROTOCOL' : 'MODULE_READY_FOR_TRANSFER'}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start mb-24">
            
            {/* --- ZONE VISUELLE --- */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 relative group"
            >
              <div className={`absolute -inset-1 bg-gradient-to-r ${isDonation ? 'from-nebula to-purple-800' : 'from-quantum to-blue-800'} rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000`} />
              <div className="relative hud-glass rounded-3xl overflow-hidden p-2 bg-space-900/50">
                <img src={product.image} alt={product.title} className="w-full h-auto rounded-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                <div className={`absolute top-6 left-6 px-3 py-1 bg-space-950/80 backdrop-blur-md border rounded text-[9px] font-mono uppercase tracking-tighter ${isDonation ? 'border-nebula text-nebula' : 'border-white/10 text-quantum'}`}>
                  Ref_ID: {product.id}
                </div>
              </div>
            </motion.div>

            {/* --- ZONE COMMERCIALE --- */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 space-y-8 lg:pl-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 text-space-950 text-[9px] font-black uppercase tracking-widest rounded-sm ${isDonation ? 'bg-nebula' : 'bg-quantum'}`}>
                    {product.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {isDonation ? 'COMMUNITY_DRIVEN' : 'VERIFIED_STABLE_VERSION'}
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">
                  {product.title}
                </h1>
                <p className="text-xl text-slate-400 font-mono leading-relaxed border-l-2 border-white/10 pl-6">
                  {product.tagline}
                </p>
              </div>

              {/* BOÎTE D'ACTION SPÉCIALE PAYPAL / ACHAT */}
              <div className={`p-8 border rounded-3xl shadow-2xl relative overflow-hidden group bg-gradient-to-br from-space-900 to-space-950 ${isDonation ? 'border-nebula/30' : 'border-white/10'}`}>
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  {isDonation ? <HeartHandshake size={120} /> : <DownloadCloud size={120} />}
                </div>

                <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-slate-500 tracking-[0.3em] block mb-2">
                      {isDonation ? 'Canal_De_Soutien' : 'Protocol_Access_Fee'}
                    </span>
                    <div className="flex items-center gap-4">
                      {isDonation ? (
                         <span className="text-3xl font-black text-nebula uppercase italic tracking-tighter">PayPal_Secure_Link</span>
                      ) : (
                        <>
                          <span className="text-5xl font-black text-white tracking-tighter">
                            {typeof currentPrice === "number" ? currentPrice.toFixed(2) : currentPrice}€
                          </span>
                          {originalPrice && (
                            <span className="text-xl text-slate-600 line-through font-mono">
                              {originalPrice.toFixed(2)}€
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className={`border px-4 py-2 rounded-xl ${isDonation ? 'bg-nebula/10 border-nebula/20' : 'bg-green-500/10 border-green-500/20'}`}>
                    <p className={`text-[10px] font-mono font-bold uppercase ${isDonation ? 'text-nebula' : 'text-green-400'}`}>
                      {isDonation ? 'Transfert_Libre' : 'Liaison_Instantanée'}
                    </p>
                    <p className="text-[9px] text-slate-500">
                      {isDonation ? 'Maintenez le projet en vie' : 'Accès immédiat après validation'}
                    </p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {isDonation ? (
                    <a 
                      href={product.purchaseLink} target="_blank" rel="noreferrer"
                      className="hud-corners col-span-2 py-5 font-black uppercase tracking-widest text-center transition-all flex items-center justify-center gap-3 bg-[#0070ba] text-white hover:shadow-[0_0_30px_rgba(0,112,186,0.4)]"
                    >
                      {/* Icône PayPal personnalisée */}
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.723a1.603 1.603 0 0 1 1.582-1.357H14.54a7.514 7.514 0 0 1 4.358 1.354c2.25 1.547 3.237 4.14 2.822 7.426-.856 6.78-5.385 10.19-12.644 10.19z" />
                      </svg>
                      Alimenter le Noyau via PayPal
                    </a>
                  ) : (
                    <a 
                      href={product.purchaseLink} target="_blank" rel="noreferrer"
                      className="hud-corners flex-1 bg-quantum text-space-950 py-5 font-black uppercase tracking-widest text-center hover:bg-white hover:shadow-neon-cyan transition-all flex items-center justify-center gap-3 group/btn"
                    >
                      <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" /> 
                      Acquérir le module
                    </a>
                  )}
                  
                  {product.demoLink && !isDonation && (
                    <a href={product.demoLink} target="_blank" rel="noreferrer" className="hud-corners flex-1 border border-white/10 text-white py-5 font-black uppercase tracking-widest text-center hover:bg-white/5 transition-all">
                      Test_En_Direct
                    </a>
                  )}
                </div>

                {isDonation && product.demoLink && (
                    <a href={product.demoLink} target="_blank" rel="noreferrer" className="mt-4 w-full block text-center py-3 border border-nebula/30 text-nebula text-[10px] font-mono uppercase tracking-[0.3em] hover:bg-nebula/5 rounded-xl transition-all">
                       &gt; Lancer_Integrator_OS_Maintenant
                    </a>
                )}

                {/* TRUST BADGES */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap justify-center gap-x-8 gap-y-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                   <div className="flex items-center gap-2">
                     <ShieldCheck size={14} className={isDonation ? 'text-nebula' : 'text-quantum'} /> {isDonation ? 'Encrypted_Donation' : 'Secure_Gateway'}
                   </div>
                   <div className="flex items-center gap-2">
                     <Lock size={14} className={isDonation ? 'text-nebula' : 'text-quantum'} /> 100%_Private_Data
                   </div>
                   <div className="flex items-center gap-2">
                     <Zap size={14} className={isDonation ? 'text-nebula' : 'text-quantum'} /> Lifetime_Access
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- DEEP DIVE SECTION --- */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="hud-glass p-10 rounded-3xl border-white/5 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-2 h-full opacity-20 ${isDonation ? 'bg-nebula' : 'bg-quantum'}`} />
                <h3 className="flex items-center gap-4 text-2xl font-black text-white uppercase italic tracking-tighter mb-8">
                  <Target className="text-nebula" /> {isDonation ? 'Finalité_Du_Projet' : 'Analyse_Du_Besoin'}
                </h3>
                <p className="text-lg text-slate-400 font-mono leading-relaxed">
                  {product.challenge}
                </p>
              </div>

              <div className="hud-glass p-10 rounded-3xl border-white/5 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-2 h-full opacity-20 ${isDonation ? 'bg-quantum' : 'bg-nebula'}`} />
                <h3 className="flex items-center gap-4 text-2xl font-black text-white uppercase italic tracking-tighter mb-8">
                  <BrainCircuit className="text-quantum" /> {isDonation ? 'Structure_Neural' : 'Ingénierie_Solution'}
                </h3>
                <p className="text-lg text-slate-400 font-mono leading-relaxed">
                  {product.solution}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* KEY FEATURES */}
              <div className="bg-space-900 border border-quantum/20 p-8 rounded-3xl shadow-hud-inner">
                <h3 className="text-xs font-black text-quantum uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                  <Cpu size={18} /> Module_Capabilities
                </h3>
                <ul className="space-y-6">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-slate-300 font-mono group/item">
                      <div className="mt-1 p-1 rounded-full bg-quantum/10 text-quantum group-hover/item:bg-quantum group-hover/item:text-black transition-colors">
                        <CheckCircle size={14} />
                      </div>
                      <span className="leading-tight group-hover/item:text-white transition-colors">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TESTIMONIAL */}
              {product.testimonial && (
                <motion.div whileHover={{ y: -5 }} className="p-8 bg-nebula/5 border border-nebula/20 rounded-3xl relative">
                  <div className="text-nebula mb-4 opacity-50"><Sparkles size={24} /></div>
                  <p className="text-slate-300 font-mono text-sm leading-relaxed mb-6 italic italic">"{product.testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-nebula" />
                    <cite className="text-nebula text-[10px] uppercase font-black not-italic tracking-[0.2em]">{product.testimonial.author}</cite>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetailPage;