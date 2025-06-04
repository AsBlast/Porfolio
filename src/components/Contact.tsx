import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Rocket } from "lucide-react";
import "../styles/globals.css";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!form.name || !form.email || !form.message) {
    setError("Tous les champs sont obligatoires.");
    return;
  }
  try {
    const response = await fetch("https://formspree.io/f/xyzjwoqr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } else {
      setError("Erreur lors de l'envoi, veuillez réessayer.");
    }
  } catch {
    setError("Erreur réseau, veuillez réessayer.");
  }
};

  return (
    <section id="contact" className="relative py-28 bg-[#19171F] overflow-hidden">
      {/* Effets d'arrière-plan dynamiques */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-1/3 left-1/4 w-[800px] h-[800px] bg-radial-gradient(from_60%_50%_at_50%_50%,#D946EF/20%,transparent_70%) animate-float" />
        <div className="absolute -bottom-1/4 right-1/4 w-[600px] h-[600px] bg-radial-gradient(from_60%_50%_at_50%_50%,#8B5CF6/15%,transparent_70%) animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-6xl font-bold mb-24 text-center bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent"
        >
          Prêt pour le décollage ?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-20">
          {/* Informations de contact à gauche */}
          <aside className="md:col-span-1 flex flex-col gap-8 justify-center">
            {[
              {
                icon: Mail,
                title: "Missive numérique",
                content: "briceyakimasblast@gmail.com",
                delay: 0.2
              },
              {
                icon: Phone,
                title: "Canal de fréquence",
                content: "+261 38 91 754 07",
                delay: 0.4
              },
              {
                icon: MapPin,
                title: "Station orbitale",
                content: "Antananarivo, Madagascar",
                delay: 0.6
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay }}
                className="group relative bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#D946EF]/30 transition-all"
              >
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity before:absolute before:inset-0 before:bg-[linear-gradient(45deg,transparent_40%,#D946EF/30%,transparent_60%)] before:animate-hologram" />
                <div className="relative z-10 space-y-4">
                  <div className="p-3 bg-[#D946EF]/10 rounded-lg w-max transition-transform group-hover:rotate-12">
                    <item.icon className="w-7 h-7 text-[#D946EF] animate-pulse-slow" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-base text-white/80 font-mono hover:text-[#8B5CF6] transition-colors cursor-copy">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </aside>

          {/* Formulaire à droite */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 flex items-center"
          >
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-6 text-center text-cyan-300">Envoyer un message</h3>
              {submitted ? (
                <div className="text-green-400 text-center text-lg py-8">
                  Merci pour votre message ! Je vous répondrai rapidement.
                </div>
              ) : (
                <form action= "https://formspree.io/f/xyzjwoqr" method= 'POST'
                onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-cyan-200 mb-2">Nom</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-[#19171F] border border-cyan-500/30 text-white focus:outline-none focus:border-[#D946EF] transition"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-cyan-200 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-[#19171F] border border-cyan-500/30 text-white focus:outline-none focus:border-[#D946EF] transition"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-cyan-200 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-[#19171F] border border-cyan-500/30 text-white focus:outline-none focus:border-[#D946EF] transition resize-none"
                      rows={4}
                      required
                    />
                  </div>
                  {error && <div className="text-red-400 text-center">{error}</div>}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#3B82F6] text-white font-bold text-lg hover:scale-105 transition-transform"
                  >
                    Envoyer
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Section citation stylisée */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-4">
            <Rocket className="w-8 h-8 text-[#D946EF] animate-launch" />
            <p className="text-2xl italic text-white/80">
              "Chaque grand <span className="text-[#D946EF]">voyage numérique</span><br />
              commence par une simple <span className="text-[#8B5CF6]">connexion</span>."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
