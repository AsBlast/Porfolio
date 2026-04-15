// src/components/Contact.tsx

import { useState, FormEvent, ChangeEvent, FocusEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, Rocket, AlertCircle,
  CheckCircle, Send, Terminal, Zap, Activity
} from "lucide-react";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) validateField(name, value);
  };

  const validateField = (name: string, value: string): boolean => {
    let errorMsg = "";
    if (name === "name" && !value) errorMsg = "IDENT_REQUIRED: Nom manquant";
    if (name === "email") {
      if (!value) errorMsg = "ADDR_REQUIRED: Email requis";
      else if (!isValidEmail(value)) errorMsg = "INVALID_FORMAT: Adresse corrompue";
    }
    if (name === "message" && !value) errorMsg = "DATA_REQUIRED: Signal vide";
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };

  const validateForm = (): boolean => {
    setTouched({ name: true, email: true, message: true });
    return validateField("name", form.name) && validateField("email", form.email) && validateField("message", form.message);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      await fetch("https://formspree.io/f/xyzjwoqr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        mode: "no-cors",
      });
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setSubmitError("COMMS_FAILURE: Échec de la liaison montante");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-space-950 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-quantum/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* EN-TÊTE DE TERMINAL */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-quantum text-[10px] uppercase tracking-[0.4em] mb-4">
             <Activity size={14} className="animate-pulse" /> <span>Establish_Connection</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            Ouvrir un <span className="text-quantum">Canal</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          
          {/* --- LIAISONS DE COMMUNICATION (SIDEBAR) --- */}
          <div className="space-y-6">
            {[
              { icon: Mail, title: "Quantum_Mail", val: "briceyakimasblast@gmail.com", color: "quantum" },
              { icon: Phone, title: "Comms_Link", val: "+261 38 91 754 07", color: "nebula" },
              { icon: MapPin, title: "Base_Coords", val: "Antananarivo, MG", color: "quantum" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 10 }}
                className="p-6 hud-glass group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-space-950 border border-${item.color}/30 rounded-xl text-${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.title}</p>
                    <p className="text-sm font-bold text-white group-hover:text-quantum transition-colors">{item.val}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Quote HUD Style */}
            <div className="p-8 bg-quantum/5 border border-quantum/10 rounded-3xl mt-12 hidden lg:block">
               <Terminal size={20} className="text-quantum mb-4" />
               <p className="text-slate-400 font-mono text-xs italic leading-relaxed">
                 "Chaque grand voyage numérique commence par une simple connexion."
               </p>
            </div>
          </div>

          {/* --- CONSOLE DE TRANSMISSION (FORMULAIRE) --- */}
          <div className="lg:col-span-2">
            <div className="relative hud-glass p-8 md:p-12 rounded-3xl border-white/5 shadow-neon-cyan/5">
              
              {/* Indicateurs de bordure */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-quantum/30 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-quantum/30 rounded-br-3xl" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 space-y-6"
                  >
                    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                       <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Transmission Réussie</h3>
                    <p className="text-slate-400 font-mono text-sm">Votre signal a été capté. Brice-Dev vous répondra sous peu.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-quantum font-mono text-[10px] uppercase underline tracking-widest pt-4"
                    >
                      Nouvelle Transmission
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* NOM */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-quantum uppercase tracking-[0.2em] ml-2">ID_Utilisateur</label>
                        <div className="relative">
                          <input 
                            name="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
                            placeholder="VOTRE_NOM..."
                            className={`w-full bg-space-950/50 border ${touched.name && errors.name ? 'border-red-500' : 'border-white/10 focus:border-quantum'} rounded-xl px-4 py-4 text-sm font-mono text-white transition-all outline-none`}
                          />
                          {touched.name && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              {errors.name ? <AlertCircle size={16} className="text-red-500" /> : <CheckCircle size={16} className="text-green-500" />}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* EMAIL */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-quantum uppercase tracking-[0.2em] ml-2">Flux_Email</label>
                        <div className="relative">
                          <input 
                            type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
                            placeholder="ADRESSE@LIAISON.COM..."
                            className={`w-full bg-space-950/50 border ${touched.email && errors.email ? 'border-red-500' : 'border-white/10 focus:border-quantum'} rounded-xl px-4 py-4 text-sm font-mono text-white transition-all outline-none`}
                          />
                          {touched.email && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              {errors.email ? <AlertCircle size={16} className="text-red-500" /> : <CheckCircle size={16} className="text-green-500" />}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-quantum uppercase tracking-[0.2em] ml-2">Contenu_Du_Signal</label>
                      <div className="relative">
                        <textarea 
                          name="message" value={form.message} onChange={handleChange} onBlur={handleBlur}
                          placeholder="INITIALISEZ VOTRE MESSAGE ICI..." rows={5}
                          className={`w-full bg-space-950/50 border ${touched.message && errors.message ? 'border-red-500' : 'border-white/10 focus:border-quantum'} rounded-2xl px-4 py-4 text-sm font-mono text-white transition-all outline-none resize-none`}
                        />
                        {touched.message && (
                          <div className="absolute right-4 top-4">
                            {errors.message ? <AlertCircle size={16} className="text-red-500" /> : <CheckCircle size={16} className="text-green-500" />}
                          </div>
                        )}
                      </div>
                    </div>

                    {submitError && (
                      <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono">
                        <AlertCircle size={16} /> <span>{submitError}</span>
                      </div>
                    )}

                    <motion.button
                      type="submit" disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="hud-corners w-full py-5 bg-quantum text-space-950 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:shadow-neon-cyan transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>MODULATING_SIGNAL...</>
                      ) : (
                        <>
                          <Send size={18} /> Exécuter la Transmission
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* --- FOOTER SECTION DÉCOR --- */}
        <div className="mt-24 flex justify-center">
           <motion.div 
            animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
            className="flex flex-col items-center gap-4"
           >
             <Rocket className="text-nebula transform -rotate-45" size={32} />
             <div className="w-px h-20 bg-gradient-to-b from-nebula via-white/10 to-transparent" />
           </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;