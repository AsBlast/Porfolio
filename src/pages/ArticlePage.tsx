// src/pages/ArticlePage.tsx

import React, { Suspense, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { articles } from '../articles'; 
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Share2, Clock, Terminal } from 'lucide-react';
import { CtaBox } from "@/components/CtaBox";

const ArticleLoader = () => (
  <div className="flex flex-col justify-center items-center h-96 gap-4">
    <div className="w-12 h-12 border-2 border-quantum border-t-transparent rounded-full animate-spin"></div>
    <p className="font-mono text-xs text-quantum animate-pulse">DECRYPTING_DATA_STREAM...</p>
  </div>
);

export default function ArticlePage() {
  const { slug } = useParams();
  
  const ArticleContent = useMemo(() => {
    if (!slug) return null;
    return React.lazy(() => import(`../articles/${slug}.mdx`));
  }, [slug]);

  const articleMeta = articles.find(article => article.slug === slug);

  if (!ArticleContent || !articleMeta) {
    return (
        <main className="bg-space-950 text-white pt-40 text-center h-screen">
            <h1 className="text-2xl font-mono text-nebula">ERROR_404: FILE_CORRUPTED_OR_MISSING</h1>
            <Link to="/blog" className="mt-8 inline-block text-quantum underline font-mono">Return to Archives</Link>
        </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${articleMeta.title} | Transmission`}</title>
      </Helmet>

      <main className="bg-space-950 text-white pt-32 pb-24">
        <div className="container mx-auto px-4">
          
          {/* Top Bar Navigation */}
          <div className="max-w-4xl mx-auto mb-12 flex justify-between items-center border-b border-white/5 pb-6">
            <Link to="/blog" className="flex items-center gap-2 text-[10px] font-mono uppercase text-slate-500 hover:text-quantum transition-colors">
              <ArrowLeft size={14} /> Retour_Archives
            </Link>
            <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase">
              <span className="flex items-center gap-1.5"><Clock size={12} /> 5min_read</span>
              <button className="hover:text-quantum transition-colors"><Share2 size={14} /></button>
            </div>
          </div>

          <article className="max-w-4xl mx-auto">
            {/* Header de l'article */}
            <header className="mb-16">
              <div className="flex gap-2 mb-6">
                {articleMeta.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-quantum/10 border border-quantum/20 text-quantum text-[9px] font-black uppercase tracking-widest rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-8 leading-[0.95]">
                {articleMeta.title}
              </h1>
              <p className="text-xl text-slate-400 font-mono leading-relaxed border-l-4 border-quantum pl-6 py-2">
                {articleMeta.summary}
              </p>
            </header>

            {/* Image de couverture HUD */}
            <div className="relative hud-glass rounded-3xl overflow-hidden mb-16 p-1">
               <div className="absolute inset-0 z-10 pointer-events-none border-[12px] border-space-950/50 rounded-[1.4rem]" />
               <img src={articleMeta.image} alt="" className="w-full h-auto rounded-2xl opacity-90" />
            </div>
            
            {/* Contenu MDX stylisé */}
            <div className="
              prose prose-invert prose-quantum 
              max-w-none
              prose-headings:uppercase prose-headings:italic prose-headings:font-black prose-headings:tracking-tighter
              prose-h2:text-3xl prose-h2:text-quantum prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-4
              prose-p:font-mono prose-p:text-slate-400 prose-p:leading-relaxed
              prose-strong:text-white prose-strong:font-bold
              prose-code:text-nebula prose-code:bg-space-900 prose-code:px-1.5 prose-code:rounded
              prose-blockquote:border-nebula prose-blockquote:bg-nebula/5 prose-blockquote:py-2
            ">
              <Suspense fallback={<ArticleLoader />}>
                <ArticleContent components={{ CtaBox }} />
              </Suspense>
            </div>

            {/* Footer de l'article */}
            <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center gap-8">
               <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500 uppercase tracking-[0.4em]">
                 <Terminal size={14} /> End_Of_Transmission
               </div>
               
               <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <Link to="/blog" className="hud-corners border border-white/10 text-white px-8 py-4 font-black uppercase text-xs tracking-widest text-center hover:bg-white/5 transition-all">
                    Explorer d'autres logs
                  </Link>
                  <Link to="/" className="hud-corners bg-quantum text-space-950 px-8 py-4 font-black uppercase text-xs tracking-widest text-center hover:shadow-neon-cyan transition-all">
                    Retour au Terminal Principal
                  </Link>
               </div>
            </footer>
          </article>
        </div>
      </main>
    </>
  );
}