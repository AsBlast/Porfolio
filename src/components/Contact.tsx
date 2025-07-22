import { useState, FormEvent, ChangeEvent, FocusEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Rocket,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// Helper pour la validation d'email
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const validateField = (name: string, value: string): boolean => {
    let errorMsg = "";
    if (name === "name" && !value) errorMsg = "Le nom est obligatoire.";
    if (name === "email") {
      if (!value) errorMsg = "L'email est obligatoire.";
      else if (!isValidEmail(value))
        errorMsg = "Le format de l'email est invalide.";
    }
    if (name === "message" && !value) errorMsg = "Le message est obligatoire.";

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };

  const validateForm = (): boolean => {
    setTouched({ name: true, email: true, message: true });
    const nameIsValid = validateField("name", form.name);
    const emailIsValid = validateField("email", form.email);
    const messageIsValid = validateField("message", form.message);
    return nameIsValid && emailIsValid && messageIsValid;
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
      setTouched({ name: false, email: false, message: false });
    } catch (err) {
      setSubmitError("Erreur réseau. Veuillez vérifier votre connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBorderColor = (field: "name" | "email" | "message") => {
    if (!touched[field]) return "border-cyan-500/30";
    return errors[field] ? "border-red-500" : "border-green-500";
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-28 bg-[#19171F] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-1/3 left-1/4 w-[800px] h-[800px] bg-radial-gradient(from_60%_50%_at_50%_50%,#D946EF/20%,transparent_70%) animate-float" />
        <div className="absolute -bottom-1/4 right-1/4 w-[600px] h-[600px] bg-radial-gradient(from_60%_50%_at_50%_50%,#8B5CF6/15%,transparent_70%) animate-float-delayed" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-24 text-center bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent"
        >
          Prêt pour le décollage ?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-20">
          <aside className="md:col-span-1 flex flex-col gap-8 justify-center">
            {[
              {
                icon: Mail,
                title: "Missive numérique",
                content: "briceyakimasblast@gmail.com",
                delay: 0.2,
              },
              {
                icon: Phone,
                title: "Canal de fréquence",
                content: "+261 38 91 754 07",
                delay: 0.4,
              },
              {
                icon: MapPin,
                title: "Station orbitale",
                content: "Antananarivo, Madagascar",
                delay: 0.6,
              },
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
                  <p className="text-base text-white/80 font-mono">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </aside>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 flex items-center"
          >
            <div className="w-full">
              <h3 className="text-2xl font-bold mb-6 text-center text-cyan-300">
                Envoyer un message
              </h3>
              {submitted ? (
                <div
                  role="alert"
                  className="text-green-400 text-center text-lg py-8"
                >
                  Merci pour votre message ! Je vous répondrai rapidement.
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-cyan-200 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby="name-error"
                      className={`w-full px-4 py-3 rounded-lg bg-[#19171F] border text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#19171F] focus:ring-[#D946EF] transition-colors pr-10 ${getBorderColor(
                        "name"
                      )}`}
                    />
                    <div className="absolute inset-y-0 right-3 top-7 flex items-center pointer-events-none">
                      {touched.name &&
                        (errors.name ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ))}
                    </div>
                    {errors.name && (
                      <p
                        id="name-error"
                        role="alert"
                        className="text-red-400 text-sm mt-1"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="block text-cyan-200 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby="email-error"
                      className={`w-full px-4 py-3 rounded-lg bg-[#19171F] border text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#19171F] focus:ring-[#D946EF] transition-colors pr-10 ${getBorderColor(
                        "email"
                      )}`}
                    />
                    <div className="absolute inset-y-0 right-3 top-7 flex items-center pointer-events-none">
                      {touched.email &&
                        (errors.email ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ))}
                    </div>
                    {errors.email && (
                      <p
                        id="email-error"
                        role="alert"
                        className="text-red-400 text-sm mt-1"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block text-cyan-200 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby="message-error"
                      className={`w-full px-4 py-3 rounded-lg bg-[#19171F] border text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#19171F] focus:ring-[#D946EF] transition-colors resize-none pr-10 ${getBorderColor(
                        "message"
                      )}`}
                    />
                    <div className="absolute top-12 right-3 flex items-center pointer-events-none">
                      {touched.message &&
                        (errors.message ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ))}
                    </div>
                    {errors.message && (
                      <p
                        id="message-error"
                        role="alert"
                        className="text-red-400 text-sm mt-1"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>
                  {submitError && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="flex items-center justify-center gap-2 text-red-400 text-center"
                    >
                      <AlertCircle size={16} />
                      <span>{submitError}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D946EF] via-[#8B5CF6] to-[#3B82F6] text-white font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-4">
            <Rocket className="w-8 h-8 text-[#D946EF] animate-launch" />
            <p className="text-2xl italic text-white/80">
              "Chaque grand{" "}
              <span className="text-[#D946EF]">voyage numérique</span>
              <br /> commence par une simple{" "}
              <span className="text-[#8B5CF6]">connexion</span>."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
