import { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation"; // Assurez-vous que ce chemin est correct
import { Scale, BookOpen, Shield, FileText, Mail, Briefcase, Github } from "lucide-react";

// Données des sections (contenu JSX complet)
const sections = [
    {
      id: "editor",
      title: "Éditeur du site",
      icon: <Briefcase size={20} />,
      content: (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#2D374B] p-5 rounded-xl border border-cyan-500/20"><h4 className="font-bold text-cyan-300 mb-3">Nom</h4><p>Brice ANDRIAMAHEFAROMISA</p></div>
            <div className="bg-[#2D374B] p-5 rounded-xl border border-purple-500/20"><h4 className="font-bold text-purple-300 mb-3">Statut</h4><p>Développeur Fullstack & Architecte de Solutions Augmentées par l'IA</p></div>
            <div className="bg-[#2D374B] p-5 rounded-xl border border-pink-500/20"><h4 className="font-bold text-pink-300 mb-3">Email</h4><p>briceyakimasblast@gmail.com</p></div>
            <div className="bg-[#2D374B] p-5 rounded-xl border border-white/20"><h4 className="font-bold text-white mb-3">Localisation</h4><p>Madagascar</p></div>
          </div>
          <p className="text-sm bg-[#0F172A] p-4 rounded-lg border border-cyan-500/30"><span className="font-bold text-cyan-300">Directeur de publication :</span> Brice  ANDRIAMAHEFAROMISA</p>
        </>
      )
    },
    {
      id: "hosting",
      title: "Hébergement",
      icon: <Scale size={20} />,
      content: (
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="font-bold text-cyan-300 mb-2">Fournisseur d'hébergement</h4>
            <p>Netlify, Inc. (610 22nd Street, Suite 315, San Francisco, CA 94107, États-Unis)</p>
            <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">https://netlify.com</a>
          </div>
          <div>
            <h4 className="font-bold text-purple-300 mb-2">Fournisseur du nom de domaine</h4>
            <p>Hostinger International Ltd. (61 Lordou Vironos Street, 6023 Larnaca, Chypre)</p>
            <a href="https://hostinger.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">https://hostinger.com</a>
          </div>
        </div>
      )
    },
    {
      id: "intellectual",
      title: "Propriété Intellectuelle & Code Source",
      icon: <BookOpen size={20} />,
      content: (
        <>
          <p className="mb-4">
            Ce projet est construit sur une double philosophie : le code est ouvert, le contenu est personnel.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#2D374B] p-4 rounded-xl border border-cyan-500/20">
              <h4 className="font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <Github size={18} /> Code Source (Licence MIT)
              </h4>
              <p className="text-sm">
                Le code source de ce portfolio est open-source. Vous êtes libre de le réutiliser, modifier et distribuer conformément aux termes de la licence MIT, disponible sur le dépôt GitHub du projet.
              </p>
            </div>
            <div className="bg-[#2D374B] p-4 rounded-xl border border-purple-500/20">
              <h4 className="font-bold text-purple-300 mb-2">Contenu & Marque</h4>
              <p className="text-sm">
                Cependant, les textes, articles de blog, études de cas, ainsi que les logos et noms ("AsBlast", "Brice-Dev") restent ma propriété intellectuelle exclusive. Leur reproduction nécessite une autorisation explicite.
              </p>
            </div>
          </div>
          <p className="text-sm bg-[#0F172A] p-4 rounded-lg border border-purple-500/30">
            <span className="font-bold text-purple-300">Crédits :</span> Les icônes utilisées sur le site proviennent de <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Lucide Icons</a>, également sous licence open-source.
          </p>
        </>
      )
    },
    {
      id: "responsibility",
      title: "Responsabilité",
      icon: <Shield size={20} />,
      content: (
        <>
          <p className="mb-4">En tant qu'éditeur du site, Brice-Dev s'efforce d'assurer l'exactitude des informations diffusées. Toutefois :</p>
          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-4"><div className="bg-cyan-500/10 p-2 rounded-lg mt-1"><div className="w-4 h-4 rounded-full bg-cyan-500" /></div><p>Brice-Dev ne garantit pas l'exhaustivité ni l'actualité des informations publiées</p></li>
            <li className="flex items-start gap-4"><div className="bg-purple-500/10 p-2 rounded-lg mt-1"><div className="w-4 h-4 rounded-full bg-purple-500" /></div><p>L'utilisateur assume l'entière responsabilité de l'utilisation des informations fournies</p></li>
            <li className="flex items-start gap-4"><div className="bg-pink-500/10 p-2 rounded-lg mt-1"><div className="w-4 h-4 rounded-full bg-pink-500" /></div><p>Brice-Dev décline toute responsabilité concernant les sites tiers accessibles via des liens hypertextes</p></li>
          </ul>
          <p className="italic text-cyan-300/80">Les informations techniques, descriptions et illustrations sont fournies à titre indicatif et peuvent évoluer sans préavis.</p>
        </>
      )
    },
    {
      id: "personal-data",
      title: "Données personnelles",
      icon: <FileText size={20} />,
      content: (
        <>
          <p className="mb-4">Pour toute information concernant la collecte et le traitement de vos données personnelles, nous vous invitons à consulter notre <Link to="/privacy" className="text-cyan-400 hover:underline">Politique de Confidentialité</Link>.</p>
          <p>Vous pouvez exercer vos droits (accès, rectification, opposition, etc.) en nous contactant via notre page de contact.</p>
        </>
      )
    }
];

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Mentions Légales - Brice-Dev Portfolio</title>
        <meta name="description" content="Consultez les mentions légales du site de Brice Yakim. Informations sur l'éditeur, l'hébergement, la propriété intellectuelle et la responsabilité." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen text-white bg-[#1A1F2C]">
        <Navigation />
        
        <div className="max-w-5xl mx-auto px-4 pt-32 pb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <div className="inline-block p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 mb-6">
              <Scale className="w-12 h-12 text-purple-400 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Mentions Légales
            </h1>
            <p className="text-lg text-cyan-200/80 max-w-2xl mx-auto">
              Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
              <div className="sticky top-28 bg-[#0F172A] rounded-2xl p-6 border border-purple-500/20">
                <h2 className="text-xl font-bold mb-6 text-purple-300">Sections</h2>
                <ul className="space-y-3">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all">
                        <span className="text-cyan-400">{section.icon}</span>
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-purple-500/20">
                  <Link to="/privacy" className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors">
                    <Shield className="w-5 h-5" />
                    <span>Politique de confidentialité</span>
                  </Link>
                </div>
              </div>
            </aside>

            <main className="md:col-span-3">
              <div className="bg-[#0F172A] rounded-2xl p-6 md:p-8 border border-purple-500/20">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`section-title-${section.id}`}
                    className={`mb-10 pb-10 scroll-mt-28 ${index !== sections.length - 1 ? 'border-b border-purple-500/20' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-purple-500/10 rounded-lg">{section.icon}</div>
                      <h2 id={`section-title-${section.id}`} className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {section.title}
                      </h2>
                    </div>
                    <div className="prose prose-invert max-w-none text-cyan-200/90">
                      {section.content}
                    </div>
                  </section>
                ))}
                <div className="mt-8 pt-8 border-t border-purple-500/20">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Mise à jour</h3>
                  <p>Ces mentions légales sont susceptibles d'être modifiées à tout moment. La version actuellement en ligne est la seule opposable pendant toute la durée d'utilisation du site.</p>
                  <p className="mt-4 flex items-center gap-2 text-cyan-300">
                    <Mail className="w-5 h-5" />
                    <span>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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