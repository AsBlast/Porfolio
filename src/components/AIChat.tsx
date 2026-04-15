// src/components/AIChat.tsx

import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  CornerDownLeft,
  X,
  Mail,
  Zap,
  CheckCircle2,
  Lock,
  ShieldCheck,
  FileDown,
} from "lucide-react";
import { useFirstVisit } from "../hooks/useFirstVisit";
import { Link } from "react-router-dom";

import ReactMarkdown from "react-markdown";

const getApiEndpoint = () => {
  if (import.meta.env.DEV) return "http://localhost:3000/api/chat";
  return "/api/chat";
};

export function AIChat() {
  const { isFirstVisit } = useFirstVisit();
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- ÉTATS DE CONVERSION ---
  const [messageCount, setMessageCount] = useState(0);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    api: getApiEndpoint(),
    onFinish: () => {
      // On incrémente le compteur à chaque réponse du majordome
      setMessageCount((prev) => prev + 1);
    },
  });

  const glassStyle =
    "bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20";

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, showEmailCapture, isUnlocked]);

  // Ouverture automatique (Première visite)
  useEffect(() => {
    if (isFirstVisit) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit]);

  // Déclencheur du Lead Magnet (après 2 réponses de l'IA)
  useEffect(() => {
    if (messageCount >= 2 && !isEmailSent && !isUnlocked) {
      const triggerTimer = setTimeout(() => setShowEmailCapture(true), 1000);
      return () => clearTimeout(triggerTimer);
    }
  }, [messageCount, isEmailSent, isUnlocked]);

  // Auto-fermeture si inactif
  useEffect(() => {
    if (
      isOpen &&
      messages.length === 0 &&
      !isLoading &&
      input.trim() === "" &&
      !showEmailCapture
    ) {
      const timer = setTimeout(() => setIsOpen(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages, isLoading, input, showEmailCapture]);

  // --- LOGIQUE D'ENVOI DU LEAD ---
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;

    try {
      // Envoi vers Formspree avec contexte
      await fetch("https://formspree.io/f/xyzjwoqr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          subject: "Nouveau Lead - Protocole Performance",
          message: `L'utilisateur veut le pack. Historique du chat : ${messages
            .map((m) => m.content)
            .join(" | ")}`,
        }),
      });

      setIsEmailSent(true);
      setShowEmailCapture(false);

      // Simulation de déverrouillage de fichier
      setTimeout(() => {
        setIsUnlocked(true);
      }, 8000); // 800ms pour l'effet "décryptage"
    } catch (err) {
      console.error("Liaison interrompue");
    }
  };

  return (
    <>
      {/* BOUTON FLOTTANT HUD */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-nebula to-quantum rounded-full flex items-center justify-center shadow-lg shadow-quantum/20 border border-white/20"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <X key="x" className="text-white" size={28} />
          ) : (
            <Bot key="bot" className="text-white" size={28} />
          )}
        </AnimatePresence>
        {!isOpen && !isEmailSent && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-nebula rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-bounce">
            1
          </span>
        )}
      </motion.button>

      {/* FENÊTRE DE CHAT D'EXTRACTION */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className={`fixed bottom-28 right-6 z-50 w-[92vw] max-w-md h-[75vh] max-h-[650px] rounded-3xl ${glassStyle} flex flex-col shadow-neon-cyan/10 overflow-hidden`}
          >
            {/* HEADER HUD */}
            <div className="flex items-center gap-3 p-5 border-b border-white/5 bg-white/5">
              <div className="relative">
                <Bot className="text-quantum" size={24} />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="font-black text-white text-xs uppercase tracking-[0.2em]">
                  AsBlast_AI.sys
                </h3>
                <p className="text-[10px] text-quantum/60 font-mono">
                  STATUS: CONNECTED // LEAD_MODE_ACTIVE
                </p>
              </div>
            </div>

            {/* MESSAGES & CONVERSION */}
            <div className="flex-1 p-5 space-y-6 overflow-y-auto scrollbar-hide">
              {/* Message de bienvenue si vide */}
              {messages.length === 0 && !isLoading && (
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-sm text-slate-300 font-mono leading-relaxed">
                    Initialisation du protocole d'accueil... <br />
                    Je suis AsBlast AI. Comment puis-je assister votre projet
                    aujourd'hui ?
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => setInput("Analyse mes projets")}
                      className="text-left p-3 rounded-xl bg-quantum/10 border border-quantum/20 text-quantum text-[10px] uppercase font-bold hover:bg-quantum hover:text-black transition-all"
                    >
                      &gt; Explorer le catalogue modules
                    </button>
                    <button
                      onClick={() =>
                        setInput("Comment travailler avec Brice ?")
                      }
                      className="text-left p-3 rounded-xl bg-nebula/10 border border-nebula/20 text-nebula text-[10px] uppercase font-bold hover:bg-nebula hover:text-white transition-all"
                    >
                      &gt; Lancer une requête de collaboration
                    </button>
                  </div>
                </div>
              )}

              {/* Rendu des messages */}
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: m.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-quantum text-space-950 font-bold rounded-tr-none font-sans"
                        : "bg-white/5 border border-white/10 text-slate-200 rounded-tl-none font-mono"
                    }`}
                  >
                    {/* --- RENDU OPTIMISÉ ICI --- */}
                    <div className="prose prose-invert prose-xs max-w-none 
          prose-p:leading-relaxed prose-p:mb-3 last:prose-p:mb-0
          prose-strong:text-quantum prose-strong:font-black
          prose-ul:list-disc prose-ul:pl-4 prose-li:mb-2
          prose-code:bg-quantum/20 prose-code:text-quantum prose-code:px-1 prose-code:rounded">
                      <ReactMarkdown>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* --- BLOC DE CAPTURE (LEAD MAGNET) --- */}
              <AnimatePresence>
                {showEmailCapture && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-gradient-to-br from-quantum/20 to-nebula/20 border border-quantum/40 shadow-neon-cyan/20 space-y-4"
                  >
                    <div className="flex items-center gap-2 text-quantum font-black text-[11px] uppercase tracking-tighter">
                      <Lock size={16} /> Ressource Restreinte Détectée
                    </div>
                    <p className="text-xs text-white leading-relaxed">
                      Souhaitez-vous recevoir le **Protocole de Performance
                      v1.0** (Checklist pour un score Lighthouse 95+)
                      directement par signal mail ?
                    </p>
                    <form onSubmit={handleEmailSubmit} className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="votre@liaison.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 bg-space-950 border border-white/20 rounded-lg px-3 py-2 text-[11px] text-white focus:border-quantum outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-quantum text-space-950 p-2 rounded-lg hover:bg-white transition-colors"
                      >
                        <Mail size={18} />
                      </button>
                    </form>
                    <button
                      onClick={() => setShowEmailCapture(false)}
                      className="text-[9px] text-slate-500 uppercase underline w-full text-center"
                    >
                      Ignorer l'avantage
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* --- BLOC DE LIVRAISON (VALEUR AJOUTÉE) --- */}
              <AnimatePresence>
                {isUnlocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 rounded-2xl bg-green-500/10 border border-green-500/50 space-y-4 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                  >
                    <div className="flex items-center gap-2 text-green-400 font-black text-[11px] uppercase tracking-tighter">
                      <ShieldCheck size={18} /> Accès Autorisé : Pack_Expert
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href="/files/Checklist_Performance.pdf"
                        download
                        className="bg-green-500 text-space-950 p-3 rounded-xl text-[10px] font-black uppercase flex flex-col items-center gap-2 hover:bg-white transition-all"
                      >
                        <FileDown size={20} /> PDF_PACK
                      </a>
                      <Link
                        to="/blog/guide-optimisation-lighthouse"
                        className="border border-green-500/50 text-green-400 p-3 rounded-xl text-[10px] font-black uppercase flex flex-col items-center gap-2 hover:bg-green-500/10 transition-all text-center"
                      >
                        <Zap size={20} /> LIRE_LOGS
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Indicateur de frappe IA */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl flex gap-1.5 items-center border border-white/5">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-1.5 h-1.5 bg-quantum rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-quantum rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-quantum rounded-full"
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT DE CHAT (Masqué pendant la capture pour focus) */}
            <AnimatePresence mode="wait">
              {!showEmailCapture && (
                <motion.form
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: 20 }}
                  onSubmit={handleSubmit}
                  className="p-5 border-t border-white/5 bg-white/5"
                >
                  <div className="relative flex items-center">
                    <input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Transmettre une requête..."
                      className="w-full bg-space-950 border border-white/10 rounded-xl pl-5 pr-14 py-4 text-xs font-mono text-white focus:border-quantum focus:ring-1 focus:ring-quantum/50 outline-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="absolute right-2 p-3 bg-quantum text-space-950 rounded-lg hover:shadow-neon-cyan disabled:opacity-50 transition-all"
                    >
                      <CornerDownLeft size={18} />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
