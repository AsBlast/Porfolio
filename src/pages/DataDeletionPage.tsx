import { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation"; 
import { Trash2, UserCheck, HelpCircle, Mail, ShieldCheck } from "lucide-react";

const sections = [
    {
      id: "introduction",
      title: "Votre Droit à l'Effacement",
      icon: <Trash2 size={20} />,
      content: (
        <>
          <p className="mb-4">
            Bienvenue sur la page de demande de suppression des données pour le portfolio Brice-Dev. Cette page explique la procédure pour exercer votre droit à l'effacement de vos données personnelles, conformément au RGPD.
          </p>
          <p>
            Comme précisé dans notre politique de confidentialité, ce site ne stocke pas de données personnelles identifiables directement. Les demandes concernent principalement les données de navigation collectées par des services tiers.
          </p>
        </>
      )
    },
    {
      id: "procedure",
      title: "Procédure de Demande",
      icon: <HelpCircle size={20} />,
      content: (
        <>
          <p className="mb-6">Pour initier une demande de suppression de données, vous avez deux options simples et directes. Nous nous engageons à traiter votre demande rapidement.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#2D374B] p-6 rounded-xl border border-cyan-500/20 text-center">
              <div className="inline-block p-3 rounded-full bg-cyan-500/10 mb-4">
                <Mail className="w-8 h-8 text-cyan-300" />
              </div>
              <h4 className="font-bold text-lg text-cyan-300 mb-2">Par Formulaire de Contact</h4>
              <p className="text-sm mb-4">La méthode la plus rapide. Utilisez le formulaire sur notre page d'accueil pour nous envoyer votre demande.</p>
              <Link to="/#contact" className="font-bold text-white hover:text-cyan-300 transition-colors">Accéder au formulaire →</Link>
            </div>
            <div className="bg-[#2D374B] p-6 rounded-xl border border-purple-500/20 text-center">
               <div className="inline-block p-3 rounded-full bg-purple-500/10 mb-4">
                <Mail className="w-8 h-8 text-purple-300" />
              </div>
              <h4 className="font-bold text-lg text-purple-300 mb-2">Par E-mail Direct</h4>
              <p className="text-sm mb-4">Vous pouvez également nous écrire directement. Assurez-vous de mentionner "Demande de suppression de données".</p>
              <a href="mailto:briceyakimasblast@gmail.com" className="font-bold text-white hover:text-purple-300 transition-colors">Envoyer un e-mail →</a>
            </div>
          </div>
        </>
      )
    },
    {
      id: "scope",
      title: "Périmètre de la Suppression",
      icon: <UserCheck size={20} />,
      content: (
        <>
          <p className="mb-4">
            Une fois votre demande reçue, nous agirons sur les points suivants :
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Purge des communications :</strong> Toute conversation initiée via le formulaire de contact sera supprimée de nos systèmes.</li>
            <li><strong>Instructions pour les tiers :</strong> Nous vous fournirons des liens et instructions pour gérer vos données auprès des services d'analyse que nous utilisons (Google Analytics, etc.).</li>
            <li><strong>Confirmation :</strong> Nous vous enverrons une confirmation par e-mail une fois la procédure terminée de notre côté.</li>
          </ul>
          <p className="mt-6 text-sm bg-[#0F172A] p-4 rounded-lg border border-cyan-500/30">
            <span className="font-bold text-cyan-300">Note importante :</span> Nous ne pouvons pas supprimer les données que nous ne contrôlons pas directement. Notre rôle est de faciliter votre démarche auprès des plateformes tierces.
          </p>
        </>
      )
    }
];

export default function DataDeletionPage() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Suppression des Données - Brice-Dev Portfolio</title>
        <meta name="description" content="Instructions pour demander la suppression de vos données personnelles conformément au RGPD sur le portfolio de Brice Yakim." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen text-white bg-[#1A1F2C]">
        <Navigation />
        
        <div className="max-w-5xl mx-auto px-4 pt-32 pb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-block p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 mb-6">
              <Trash2 className="w-12 h-12 text-cyan-400 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Demande de Suppression des Données
            </h1>
            <p className="text-lg text-cyan-200/80 max-w-2xl mx-auto">
              Votre contrôle sur votre vie privée est notre priorité.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
              <div className="sticky top-28 bg-[#0F172A] rounded-2xl p-6 border border-cyan-500/20">
                <h2 className="text-xl font-bold mb-6 text-cyan-300">Sections</h2>
                <ul className="space-y-3">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all hover:bg-white/5 focus:bg-white/10 outline-none"
                      >
                        <span className="text-cyan-400">{section.icon}</span>
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-purple-500/20">
                  <Link to="/privacy" className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Politique de Confidentialité</span>
                  </Link>
                </div>
              </div>
            </aside>

            <main className="md:col-span-3">
              <div className="bg-[#0F172A] rounded-2xl p-6 md:p-8 border border-cyan-500/20">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`section-title-${section.id}`}
                    className={`mb-10 pb-10 scroll-mt-28 ${index !== sections.length - 1 ? 'border-b border-cyan-500/20' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">{section.icon}</div>
                      <h2 id={`section-title-${section.id}`} className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {section.title}
                      </h2>
                    </div>
                    <div className="prose prose-invert max-w-none text-cyan-200/90">
                      {section.content}
                    </div>
                  </section>
                ))}

                <div className="mt-8 pt-8 border-t border-cyan-500/20">
                  <h3 className="text-xl font-bold mb-4 text-cyan-300">Une Question ?</h3>
                  <p>
                    Si vous avez la moindre question sur cette procédure, n'hésitez pas à nous contacter. Nous sommes là pour vous aider à naviguer ces questions de confidentialité.
                  </p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}