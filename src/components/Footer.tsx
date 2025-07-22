import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Rocket, Code2, Sparkles, ChevronUpIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Accueil", href: "#home" },
    { name: "A propos", href: "#about" },
    { name: "Produits", href: "#products" },
    { name: "Projets", href: "#projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "#contact" }
  ];

  const legalPages = [
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "Mentions légales", href: "/terms" },
  ];

  const socialLinks = [
    { name: "Github", icon: <Github size={24} />, href: "https://github.com/AsBlast" },
    { name: "LinkedIn", icon: <Linkedin size={24} />, href: "https://linkedin.com/in/brice-yakim-andriamahefaromisa-6a8a2b200" },
    { name: "Facebook", icon: <Facebook size={24} />, href: "https://facebook.com/" }
  ];

  // --- CORRECTION : Une nouvelle fonction de navigation plus polyvalente ---
  const handleFooterLinkClick = (href: string) => {
    // Cas 1 : C'est une route de page (ex: /blog)
    if (href.startsWith('/')) {
      navigate(href);
    } 
    // Cas 2 : C'est un lien d'ancrage pour la page d'accueil (ex: #home)
    else if (href.startsWith('#')) {
      const sectionId = href.substring(1); // Retire le '#'

      // Si on est déjà sur la page d'accueil, on défile simplement
      if (location.pathname === '/') {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Sinon, on navigue vers la page d'accueil et on lui dit de défiler
        navigate('/', { state: { scrollToSection: sectionId } });
      }
    }
  };

  return (
    <footer className="relative bg-[#0F172A] w-full border-t border-cyan-500/20 overflow-hidden">
      <div className="absolute inset-0 opacity-20"><div className="absolute -top-1/3 left-1/4 w-[800px] h-[800px] bg-radial-gradient(from_60%_50%_at_50%_50%,#D946EF/10%,transparent_70%) animate-float" /><div className="absolute -bottom-1/4 right-1/4 w-[600px] h-[600px] bg-radial-gradient(from_60%_50%_at_50%_50%,#8B5CF6/15%,transparent_70%) animate-float-delayed" /></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
            <div className="flex items-center gap-4"><div className="p-3 bg-[#D946EF]/10 rounded-xl"><Code2 className="w-8 h-8 text-[#D946EF]" /></div><span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Brice-Dev</span></div>
            <p className="text-lg text-cyan-300/80 font-mono flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-400" />Créer l'excellence numérique</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">Explorez l'univers</h3>
            <nav aria-label="Navigation du pied de page">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {navItems.map((item) => (
                  <motion.div key={item.name} whileHover={{ x: 5 }} className="group">
                    <button
                      // --- CORRECTION : Utilisation de la nouvelle fonction ---
                      onClick={() => handleFooterLinkClick(item.href)}
                      className="flex items-center gap-3 text-cyan-300/80 hover:text-cyan-300 transition-colors font-mono py-2 rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full transition-all bg-cyan-500/30 group-hover:bg-[#D946EF] group-hover:shadow-glow-purple" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-12 border-t border-cyan-500/20 pt-8 flex justify-center gap-8 text-cyan-300/80 text-sm">
              {legalPages.map((page) => (<Link key={page.name} to={page.href} className="hover:text-cyan-300 transition-colors">{page.name}</Link>))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex flex-col items-center gap-8 py-12 border-y border-cyan-500/20">
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <motion.a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Visiter mon profil ${link.name}`} className="p-4 bg-white/5 rounded-2xl backdrop-blur-lg hover:bg-white/10 transition-all text-cyan-300 hover:text-[#D946EF]" whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>{link.icon}</motion.a>
            ))}
          </div>
           
          <button onClick={() => handleFooterLinkClick('#home')} className="flex items-center gap-3 text-cyan-300/80 hover:text-cyan-300 cursor-pointer">
             <ChevronUpIcon className="w-6 h-6 text-purple-400 animate-launch" />
            <span className="font-mono">Retourner en haut   </span>
            <ChevronUpIcon className="w-6 h-6 text-purple-400 animate-launch" />
          </button>
           <Rocket className="w-6 h-6 text-purple-400 animate-launch" />

        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="text-center text-sm text-cyan-300/60 mt-12 pt-8">
          <p className="mb-4">© {new Date().getFullYear()} Brice-Dev. Tous droits réservés.</p>
          <p className="text-xs text-cyan-500/40">Conçu et développé avec <span className="text-[#D946EF]">♥</span> à Madagascar</p>
        </motion.div>
      </div>
    </footer>
  );
}