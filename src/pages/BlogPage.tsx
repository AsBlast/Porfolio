// src/pages/BlogPage.tsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Tag, ChevronRight, Database, activity } from "lucide-react";
import { articles, ArticleMeta } from '../articles';

const ArticleCard = ({ article }: { article: ArticleMeta }) => {
  const positionClass = article.imagePosition ? `bg-${article.imagePosition}` : 'bg-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative hud-glass rounded-2xl overflow-hidden border-white/5 hover:border-quantum/40 transition-all duration-500 flex flex-col h-full"
    >
      <Link to={`/blog/${article.slug}`} className="flex flex-col h-full">
        {/* Thumbnail avec overlay technique */}
        <div className="relative aspect-video overflow-hidden">
          <div 
            className={`w-full h-full bg-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 ${positionClass}`}
            style={{ backgroundImage: `url(${article.image})` }}
            role="img"
            aria-label={article.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-space-950/20 to-transparent" />
          
          {/* Badge de catégorie HUD */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-space-950/80 backdrop-blur-md border border-white/10 rounded-full">
            <Tag size={10} className="text-quantum" />
            <span className="text-[10px] font-mono text-white uppercase tracking-tighter">{article.tags[0]}</span>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 mb-4 uppercase tracking-widest">
            <Calendar size={12} /> 
            <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
            <span className="text-white/10">|</span>
            <span>Transmission_Log</span>
          </div>

          <h3 className="text-xl font-black text-white mb-3 uppercase italic tracking-tighter group-hover:text-quantum transition-colors leading-tight">
            {article.title}
          </h3>

          <p className="text-slate-400 text-xs font-mono line-clamp-3 mb-6 leading-relaxed">
            {article.summary}
          </p>
          
          <div className="mt-auto flex items-center gap-2 text-quantum text-[10px] font-black uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
            Lire la transmission <ChevronRight size={14} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function BlogPage() {
  const sortedArticles = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Helmet>
        <title>Archives de Transmission | Brice-Dev Log</title>
      </Helmet>
      
      <main className="bg-space-950 text-white pt-32 pb-24 min-h-screen">
        <section className="container mx-auto px-4">
          
          {/* Header style Console */}
          <div className="max-w-3xl mb-20">
            <div className="flex items-center gap-3 text-nebula font-mono text-xs uppercase tracking-[0.4em] mb-4">
              <Database size={16} /> <span>Decrypted_Files_Access</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6 leading-none">
              Archives de <span className="text-nebula">Transmission</span>
            </h1>
            <p className="text-slate-400 font-mono text-lg border-l-2 border-nebula/30 pl-6">
              Exploration des frontières technologiques : IA, Performance Web et Stratégies Digitales.
            </p>
          </div>

          {/* Grid d'articles */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {sortedArticles.length === 0 && (
            <div className="text-center py-32 hud-glass">
              <p className="font-mono text-nebula animate-pulse">NO_DATA_STREAM_FOUND</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}