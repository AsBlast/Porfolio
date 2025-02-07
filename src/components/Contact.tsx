import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="py-20 bg-[#221F26]">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          Contact
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Let's Connect</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-[#D946EF]" />
                <span className="text-white/80">asblastb@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-[#D946EF]" />
                <span className="text-white/80">+261 38 91 754 07</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-[#D946EF]" />
                <span className="text-white/80">Antananarivo, Madagascar</span>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-white/80 italic">
                "Innovation distinguishes between a leader and a follower. Let's create something amazing together."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#D946EF] text-white placeholder:text-white/50"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#D946EF] text-white placeholder:text-white/50"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#D946EF] text-white placeholder:text-white/50"
                  required
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-3 bg-[#D946EF] text-white rounded-lg hover:bg-[#8B5CF6] transition-colors"
                type="submit"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}