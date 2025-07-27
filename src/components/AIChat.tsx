import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, CornerDownLeft, X } from "lucide-react";
import { useFirstVisit } from "../hooks/useFirstVisit"; // Assurez-vous que ce hook est corrigé comme dans notre première discussion

const getApiEndpoint = () => {
  if (import.meta.env.PROD) return "/.netlify/functions/chat";
  return "http://localhost:8888/.netlify/functions/chat";
};

export function AIChat() {
  const { isFirstVisit } = useFirstVisit();

  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    api: getApiEndpoint(),
  });

  const glassStyle =
    "bg-slate-900/40 backdrop-blur-md border border-cyan-500/10";

  // Fait défiler vers le bas quand un message arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Ouvre le chat lors de la première visite
  useEffect(() => {
    if (isFirstVisit) {
      const welcomeTimer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(welcomeTimer);
    }
  }, [isFirstVisit]);

  // *** BLOC CORRIGÉ ***
  // Gère l'auto-fermeture uniquement si l'utilisateur est inactif
  useEffect(() => {
    // La condition pour lancer le minuteur est :
    // 1. Le chat est ouvert
    // 2. Aucun message n'a encore été envoyé
    // 3. L'IA ne génère pas de réponse
    // 4. L'utilisateur N'A PAS commencé à taper dans le champ de saisie
    if (isOpen && messages.length === 0 && !isLoading && input.trim() === '') {
      const autoCloseTimer = setTimeout(() => {
        setIsOpen(false);
      }, 8000);

      // Le nettoyage est crucial : il annule le minuteur si une des dépendances change.
      // Par exemple, si l'utilisateur commence à taper, `input` change, l'effet
      // est nettoyé, et le minuteur est annulé.
      return () => clearTimeout(autoCloseTimer);
    }
    // On ajoute `input` aux dépendances pour que l'effet se ré-exécute à chaque frappe.
  }, [isOpen, messages, isLoading, input]);

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Ouvrir le chat avec l'agent IA"
      >
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
            >
              <X className="text-white" size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
            >
              <Bot className="text-white" size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed bottom-28 right-6 z-50 w-[90vw] max-w-md h-[70vh] max-h-[600px] rounded-2xl ${glassStyle} flex flex-col shadow-2xl`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-cyan-500/10 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full flex items-center justify-center">
                <Bot className="text-white" size={22} />
              </div>
              <div>
                <h3 className="font-bold text-white">AsBlast AI</h3>
                <p className="text-xs text-cyan-300/80">
                  Votre majordome numérique
                </p>
              </div>
            </div>

            {/* Conteneur des Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.length === 0 && !isLoading && (
                <div className="text-center text-slate-400 text-sm p-4">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-4"
                  >
                    Bonjour ! Je suis AsBlast AI, votre majordome. Comment
                    puis-je vous guider dans l'univers de Brice aujourd'hui ?
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-2 gap-2 text-xs"
                  >
                    <button
                      onClick={() => setInput("Quels sont ses projets ?")}
                      className="p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      Voir ses projets
                    </button>
                    <button
                      onClick={() => setInput("Comment le contacter ?")}
                      className="p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                    >
                      Moyens de contact
                    </button>
                  </motion.div>
                </div>
              )}

              {/* Messages */}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${
                    m.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex-shrink-0 flex items-center justify-center">
                      <Bot size={16} className="text-cyan-300" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-xl max-w-[80%] ${
                      m.role === "user"
                        ? "bg-purple-600 text-white rounded-br-none"
                        : "bg-slate-800/60 text-slate-200 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))}

              {/* Indicateur de frappe */}
              {isLoading && (
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex-shrink-0 flex items-center justify-center">
                    <Bot size={16} className="text-cyan-300" />
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/60 flex items-center space-x-1.5">
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Formulaire d'envoi */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-cyan-500/10 flex-shrink-0"
            >
              <div className="relative">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Posez une question sur Brice..."
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-full pl-4 pr-12 py-2 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-500 rounded-full hover:bg-cyan-400 transition-colors disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CornerDownLeft size={16} className="text-slate-900" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}