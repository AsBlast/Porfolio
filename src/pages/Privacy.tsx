import { useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ShieldCheck, Cookie, GanttChart, Users, ChevronUp } from "lucide-react";

// --- Données des sections avec le contenu JSX complet ---
const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <ShieldCheck size={20} />,
      content: (
        <>
          <p className="mb-4">Bienvenue sur la politique de confidentialité de Brice-Dev. Cette page vous informe sur la manière dont nous collectons, utilisons et protégeons vos données personnelles lorsque vous visitez mon portfolio.</p>
          <p>Conformément au RGPD et aux réglementations en vigueur, nous nous engageons à protéger votre vie privée. Cette politique s'applique à toutes les interactions sur le site <span className="text-cyan-400">asblast.space</span>.</p>
        </>
      )
    },
    {
      id: "data",
      title: "Données collectées",
      icon: <GanttChart size={20} />,
      content: (
        <>
          <p className="mb-4">Nous collectons deux types de données :</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><span className="font-medium">Données fournies volontairement</span> : Lorsque vous utilisez notre formulaire de contact (nom, email, message)</li>
            <li><span className="font-medium">Données techniques automatiques</span> : Adresse IP, type de navigateur, pages visitées, durée de visite</li>
          </ul>
          <p>Ces données nous aident à améliorer l'expérience utilisateur et à analyser le trafic via Google Analytics.</p>
        </>
      )
    },
    {
      id: "cookies",
      title: "Cookies et suivi",
      icon: <Cookie size={20} />,
      content: (
        <>
          <p className="mb-4">Mon site utilise des cookies pour :</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#2D374B] p-4 rounded-xl border border-cyan-500/20">
              <h4 className="font-bold text-cyan-300 mb-2">Cookies essentiels</h4>
              <p className="text-sm">Fonctionnalités de base et sécurité</p>
            </div>
            <div className="bg-[#2D374B] p-4 rounded-xl border border-purple-500/20">
              <h4 className="font-bold text-purple-300 mb-2">Cookies analytiques</h4>
              <p className="text-sm">Analyse d'audience via Google Analytics</p>
            </div>
            <div className="bg-[#2D374B] p-4 rounded-xl border border-pink-500/20">
              <h4 className="font-bold text-pink-300 mb-2">Cookies publicitaires</h4>
              <p className="text-sm">Publicités personnalisées via Google AdSense</p>
            </div>
            <div className="bg-[#2D374B] p-4 rounded-xl border border-white/20">
              <h4 className="font-bold text-white mb-2">Préférences</h4>
              <p className="text-sm">Mémorisation de vos paramètres</p>
            </div>
          </div>
          <p className="text-sm bg-[#0F172A] p-4 rounded-lg border border-cyan-500/30">
            <span className="font-bold text-cyan-300">Google AdSense :</span> Nous utilisons Google AdSense pour diffuser des publicités. Google utilise des cookies pour servir des annonces basées sur les visites précédentes des utilisateurs sur mon site ou d'autres sites. Vous pouvez désactiver la personnalisation des annonces via les <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Paramètres des annonces Google</a>.
          </p>
        </>
      )
    },
    {
      id: "adsense",
      title: "Publicité Google AdSense",
      icon: <Users size={20} />,
      content: (
        <>
          <p className="mb-4">Mon site affiche des publicités via Google AdSense. Voici ce que vous devez savoir :</p>
          <div className="space-y-4 mb-6">
            <div className="flex gap-3 items-start"><div className="bg-cyan-500/10 p-2 rounded-lg mt-1"><ChevronUp className="text-cyan-400" /></div><div><h4 className="font-bold text-cyan-300">Collecte de données</h4><p>Google collecte des données pour personnaliser les publicités (intérêts, localisation, type d'appareil)</p></div></div>
            <div className="flex gap-3 items-start"><div className="bg-purple-500/10 p-2 rounded-lg mt-1"><ChevronUp className="text-purple-400" /></div><div><h4 className="font-bold text-purple-300">Partenaires publicitaires</h4><p>Google travaille avec des partenaires qui peuvent utiliser des cookies ou d'autres technologies de suivi</p></div></div>
            <div className="flex gap-3 items-start"><div className="bg-pink-500/10 p-2 rounded-lg mt-1"><ChevronUp className="text-pink-400" /></div><div><h4 className="font-bold text-pink-300">Contrôle utilisateur</h4><p>Vous pouvez désactiver les cookies via les paramètres de votre navigateur ou utiliser des extensions comme Ghostery</p></div></div>
          </div>
          <p className="text-sm italic">* Conformément aux exigences d'AdSense, nous informons que des tiers peuvent utiliser des cookies pour recueillir des informations sur vos activités sur ce site et d'autres sites.</p>
        </>
      )
    },
    {
      id: "rights",
      title: "Vos droits",
      icon: <ShieldCheck size={20} />,
      content: (
        <>
          <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="grid md:grid-cols-2 gap-4 mb-6">
            <li className="bg-[#2D374B] p-3 rounded-lg border border-cyan-500/30">Droit d'accès à vos données</li>
            <li className="bg-[#2D374B] p-3 rounded-lg border border-purple-500/30">Droit de rectification</li>
            <li className="bg-[#2D374B] p-3 rounded-lg border border-pink-500/30">Droit à l'effacement</li>
            <li className="bg-[#2D374B] p-3 rounded-lg border border-white/30">Droit à la portabilité</li>
            <li className="bg-[#2D374B] p-3 rounded-lg border border-cyan-500/30">Droit d'opposition</li>
            <li className="bg-[#2D374B] p-3 rounded-lg border border-purple-500/30">Droit à la limitation</li>
          </ul>
          <p>Pour exercer ces droits ou pour toute question sur notre politique de confidentialité, contactez-nous via la page dédiée.</p>
        </>
      )
    }
];

export default function PrivacyPage() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Politique de Confidentialité - Brice-Dev Portfolio</title>
        <meta name="description" content="Découvrez comment vos données sont collectées, utilisées et protégées sur le portfolio de Brice Yakim. Informations sur le RGPD, les cookies et Google AdSense." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen text-white bg-[#1A1F2C]">
        <Navigation />
        
        <div className="max-w-5xl mx-auto px-4 pt-32 pb-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <div className="inline-block p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 mb-6">
              <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-cyan-200/80 max-w-2xl mx-auto">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
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
                  <Link to="/terms" className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Mentions Légales</span>
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
                  <h3 className="text-xl font-bold mb-4 text-cyan-300">Engagement de transparence</h3>
                  <p>
                    Nous nous engageons à protéger votre vie privée et à être transparent sur l'utilisation de vos données. 
                    Cette politique peut être mise à jour périodiquement. Nous vous encourageons à la consulter régulièrement.
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