// src/pages/BlogPage.tsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Tag } from "lucide-react";

import { articles, ArticleMeta } from '../articles'; // Assurez-vous que le chemin est correct

// Composant pour une carte d'article - VERSION AVEC BACKGROUND IMAGE (ROBUSTE)
const ArticleCard = ({ article }: { article: ArticleMeta }) => {
  // On détermine la classe de position pour le background.
  // Tailwind génère ces classes car elles sont statiques (`bg-top`, `bg-center`, etc.)
  const positionClass = article.imagePosition ? `bg-${article.imagePosition}` : 'bg-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 rounded-lg overflow-hidden border border-white/10 group flex flex-col"
    >
      <Link to={`/blog/${article.slug}`} className="flex flex-col flex-grow">
        {/* L'image est maintenant un div avec un style en ligne pour l'URL et une classe pour la position */}
        <div
          className={`aspect-video w-full bg-cover transition-transform duration-500 group-hover:scale-105 ${positionClass}`}
          style={{ backgroundImage: `url(${article.image})` }}
          role="img"
          aria-label={article.title}
        ></div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-4 text-xs text-white/60 mb-2">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(article.date).toLocaleDateString('fr-FR')}</span>
            <span className="flex items-center gap-1.5"><Tag size={14} /> {article.tags[0]}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D946EF] transition-colors">{article.title}</h3>
          {/* J'ai ajouté mt-auto pour pousser le résumé vers le bas, utile avec flex-grow */}
          <p className="text-white/70 text-sm line-clamp-3">{article.summary}</p>
        </div>
      </Link>
    </motion.div>
  );
};


export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Blog - Brice Yakim | Développement Web & Tech</title>
        <meta name="description" content="Découvrez mes articles sur le développement web, React, la performance, et d'autres sujets techniques." />
      </Helmet>
      
      <main className="bg-[#1A1F2C] text-white">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold text-white mb-4">Mon Blog</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-2xl mx-auto text-lg text-white/70">
              Je partage ici mes expériences, tutoriels et réflexions sur le monde du développement web.
            </motion.p>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}