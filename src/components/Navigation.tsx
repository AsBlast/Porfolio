import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-black/30 backdrop-blur-md border-b border-cyan-500/20 py-4" 
          : "py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]"
          >
            Brice-Dev
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-cyan-300/80 hover:text-cyan-300 transition-colors relative group font"
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-pink-500 transform scale-x-0 transition-transform group-hover:scale-x-100 shadow-[0_0_8px_rgba(0,255,255,0.5)]" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-cyan-300 p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/30"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-black/50 backdrop-blur-md border-y border-cyan-500/20"
          >
            <div className="flex flex-col space-y-4 p-4">
              {menuItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-cyan-300/80 hover:text-cyan-300 transition-colors font-mono px-4 py-2 rounded-lg hover:bg-cyan-950/30"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 10 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}




/******************************************* */
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Menu, X } from "lucide-react";

// export function Navigation() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const menuItems = [
//     { name: "Home", href: "#home" },
//     { name: "About", href: "#about" },
//     { name: "Projects", href: "#projects" },
//     { name: "Contact", href: "#contact" },
//   ];

//   return (
//     <nav
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         scrolled ? "bg-[#1A1F2C]/90 backdrop-blur-md py-4" : "py-6"
//       }`}
//     >
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="text-2xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] bg-clip-text text-transparent"
//           >
//             Brice-Dev
//           </motion.div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8">
//             {menuItems.map((item) => (
//               <motion.a
//                 key={item.name}
//                 href={item.href}
//                 className="text-white/80 hover:text-white transition-colors relative group"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 {item.name}
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D946EF] transform scale-x-0 transition-transform group-hover:scale-x-100" />
//               </motion.a>
//             ))}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-white"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="md:hidden absolute top-full left-0 w-full bg-[#1A1F2C]/95 backdrop-blur-md"
//           >
//             <div className="flex flex-col space-y-4 p-4">
//               {menuItems.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="text-white/80 hover:text-white transition-colors"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </div>
//     </nav>
//   );
// }