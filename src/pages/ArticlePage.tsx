// src/pages/ArticlePage.tsx

import React, { Suspense, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { articles } from '../articles'; 
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { CtaBox } from "@/components/CtaBox"; // 1. Importe le composant


// Composant de chargement simple
const ArticleLoader = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400"></div>
  </div>
);

export default function ArticlePage() {
  const { slug } = useParams();

  // Charge dynamiquement le contenu de l'article MDX
  const ArticleContent = useMemo(() => {
    if (!slug) return null;
    return React.lazy(() => import(`../articles/${slug}.mdx`));
  }, [slug]);

  // Trouve les métadonnées de l'article actuel pour le titre, etc.
  const articleMeta = articles.find(article => article.slug === slug);

  if (!ArticleContent || !articleMeta) {
    // Gérer le cas où l'article n'est pas trouvé
    return (
        <main className="bg-[#1A1F2C] text-white pt-32 pb-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold">Article non trouvé</h1>
                <p className="mt-4">Désolé, l'article que vous cherchez n'existe pas.</p>
            </div>
        </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${articleMeta.title} - Brice Yakim`}</title>
        <meta name="description" content={articleMeta.summary} />
      </Helmet>

      <main className="bg-[#1A1F2C] text-white">
        <div className="container mx-auto px-4 pt-32 pb-20">
          <article 
            className="
              prose prose-invert 
              lg:prose-xl 
              mx-auto
              prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-cyan-400 prose-headings:to-purple-500
              prose-a:text-cyan-400 prose-a:transition-colors hover:prose-a:text-cyan-300
              prose-strong:text-cyan-100
              prose-blockquote:border-cyan-500 prose-blockquote:text-cyan-200
            "
          >
            {/* L'image de couverture et le titre de l'article */}
            <h1>{articleMeta.title}</h1>
            <p className="lead !text-xl !text-cyan-200/80">{articleMeta.summary}</p>
            <img src={articleMeta.image} alt={articleMeta.title} className="rounded-lg shadow-lg mb-8" />
            
            {/* Le contenu de l'article MDX */}
            <Suspense fallback={<ArticleLoader />}>
              <ArticleContent components={{ CtaBox }}/>

              
            </Suspense>

            
          </article>
          <br />
           <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-[#D946EF] rounded-lg text-white text-lg font-bold hover:bg-[#C026D3] transition-colors transform hover:scale-105"
            >
              <Home className="w-5 h-5 " />
              Retourner à l'accueil
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-white/10 rounded-lg text-white/80 font-semibold hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Page précédente
            </button>
          </motion.div>
        </div>
        
      </main>
    </>
  );
}