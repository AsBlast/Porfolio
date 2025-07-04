import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Code,
  Cpu,
  Layout,
  Database,
  Cloud,
  Rocket,
  Star,
  ChevronRight,
  Search,
  Filter,
  ArrowUpDown,
  X
} from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";

// --- Définitions et Données Statiques ---
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  live: string;
  tags: string[];
  status?: string;
  featured?: boolean;
  category: string;
  date: string; // Ajouté pour le tri
  complexity: number; // 1-5 pour le niveau de difficulté
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Projet Alpha",
    description: "Application Web moderne créée avec React, exploitant Tailwind CSS pour le style et Vite pour un développement ultra-rapide.",
    image: "/images/alpha.png",
    github: "https://github.com",
    live: "http://mg-remote-work.netlify.app/",
    tags: ["React", "Tailwind CSS", "Vite"],
    status: "En production",
    featured: true,
    category: "frontend",
    date: "2023-10-15",
    complexity: 3
  },
  {
    id: 2,
    title: "Projet Beta",
    description: "Solution de e-commerce avancée utilisant WordPress avec intégration WooCommerce et générateur de pages Elementor.",
    image: "/images/samsung.png",
    github: "https://github.com",
    live: "http://asblast-samsung.netlify.app/",
    tags: ["WordPress", "WooCommerce", "Elementor"],
    status: "En production",
    featured: true,
    category: "cms",
    date: "2023-08-22",
    complexity: 2
  },
  {
    id: 3,
    title: "Projet Gamma",
    description: "Application Web complète utilisant Node JS (en cours de développement).",
    image: "/images/AKATA.png",
    github: "https://github.com",
    live: "http://akata.netlify.app/",
    tags: ["Node JS", "MySQL"],
    status: "En développement",
    category: "backend",
    date: "2023-11-05",
    complexity: 4
  },
  {
    id: 4,
    title: "Projet Delta",
    description: "Application mobile React Native pour la gestion de tâches.",
    image: "/images/mobile-app.jpg",
    github: "https://github.com",
    live: "https://expo.io/projects/delta",
    tags: ["React Native", "Redux", "Firebase"],
    status: "En maintenance",
    category: "mobile",
    date: "2023-05-18",
    complexity: 3
  },
  {
    id: 5,
    title: "Projet Epsilon",
    description: "Dashboard analytique avec visualisations de données en React et TypeScript.",
    image: "/images/dashboard.jpg",
    github: "https://github.com",
    live: "https://epsilon-dashboard.netlify.app/",
    tags: ["D3.js", "Chart.js", "React", "TypeScript"],
    status: "En développement",
    category: "frontend",
    date: "2023-09-30",
    complexity: 5
  },
];

const categoryLabels = {
  "Tous": "Tous",
  "frontend": "Frontend",
  "backend": "Backend",
  "cms": "CMS",
  "mobile": "Mobile"
};

const sortOptions = [
  { id: 'date-desc', label: 'Plus récent', icon: <ArrowUpDown size={14} /> },
  { id: 'date-asc', label: 'Plus ancien', icon: <ArrowUpDown size={14} /> },
  { id: 'complexity-desc', label: 'Plus complexe', icon: <Rocket size={14} /> },
  { id: 'complexity-asc', label: 'Moins complexe', icon: <Rocket size={14} /> },
  { id: 'alphabetical', label: 'A-Z', icon: <Filter size={14} /> },
];

const skills = [
  {
    category: "Frontend",
    icon: <Layout className="w-5 h-5" />,
    items: [
      { name: "JavaScript", level: 85 }, 
      { name: "React", level: 95 }, 
      { name: "TypeScript", level: 40 }, 
      { name: "Tailwind CSS", level: 87 }, 
      { name: "Angular", level: 15 }
    ],
  },
  {
    category: "Backend",
    icon: <Database className="w-5 h-5" />,
    items: [
      { name: "Node.js", level: 80 }, 
      { name: "PHP/Laravel", level: 35 }, 
      { name: "REST API", level: 70 }, 
      { name: "MySQL", level: 40 }, 
      { name: "Python/Django", level: 55 }
    ],
  },
  {
    category: "DevOps, CMS, Tools",
    icon: <Cloud className="w-5 h-5" />,
    items: [
      { name: "Wordpress", level: 85 }, 
      { name: "Git", level: 80 }, 
      { name: "Docker", level: 25 }, 
      { name: "Postman/Insomnia", level: 70 }, 
      { name: "Nginx", level: 22 }
    ],
  },
];

const containerVariants = { 
  hidden: { opacity: 0 }, 
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1 
    } 
  } 
};

const itemVariants = { 
  hidden: { y: 20, opacity: 0 }, 
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: "spring" as const, 
      stiffness: 100 
    } 
  } 
};

const skillVariants = { 
  hidden: { opacity: 0, x: -20 }, 
  visible: (i: number) => ({ 
    opacity: 1, 
    x: 0, 
    transition: { 
      delay: i * 0.1 
    } 
  }) 
};

// --- Fonctions d'aide pour les styles ---
const getStatusColor = (status: string) => {
  switch (status) {
    case "En production": return "bg-green-500/20 text-green-400";
    case "En maintenance": return "bg-yellow-500/20 text-yellow-400";
    case "En développement": return "bg-blue-500/20 text-blue-400";
    default: return "bg-[#D946EF]/20 text-[#D946EF]";
  }
};

const getStatusDotColor = (status: string) => {
  switch (status) {
    case "En production": return "bg-green-500";
    case "En maintenance": return "bg-yellow-500";
    case "En développement": return "bg-blue-500";
    default: return "bg-[#D946EF]";
  }
};

const getStatusPingColor = (status: string) => {
  switch (status) {
    case "En production": return "bg-green-400";
    case "En maintenance": return "bg-yellow-400";
    case "En développement": return "bg-blue-400";
    default: return "bg-[#D946EF]";
  }
};

const ComplexityIndicator = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <div 
        key={i} 
        className={`w-2 h-2 rounded-full ${i < level ? "bg-[#D946EF]" : "bg-white/20"}`}
      />
    ))}
  </div>
);

// --- Composant Principal ---
export function Projects() {
  const [filter, setFilter] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const categories = ["Tous", ...Array.from(new Set(projectsData.map(p => p.category)))];

  // Effet pour filtrer et trier les projets
  useEffect(() => {
    const filtered = projectsData.filter(project => {
      const lowerCaseQuery = searchQuery.toLowerCase();
    const matchesCategory = filter === "Tous" || project.category === filter.toLowerCase();
      const matchesSearch = 
        project.title.toLowerCase().includes(lowerCaseQuery) ||
        project.description.toLowerCase().includes(lowerCaseQuery) ||
        project.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
      
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "complexity-desc":
          return b.complexity - a.complexity;
        case "complexity-asc":
          return a.complexity - b.complexity;
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    setFilteredProjects(filtered);
  }, [filter, searchQuery, sortBy]);

  // Mémoriser les projets groupés
  const groupedProjects = useMemo(() => {
    const featured = filteredProjects.filter(p => p.featured);
    const others = filteredProjects.filter(p => !p.featured);
    return { featured, others };
  }, [filteredProjects]);

  // Gestion du clic en dehors du modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setActiveProject(null);
      }
    };

    if (activeProject) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [activeProject]);

  return (
    <section id="projects" className="py-20 bg-[#1A1F2C] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1f2c_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2c_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      
      {/* Section Compétences */}
      <div className="container mx-auto px-4 relative z-10 mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          Compétences
        </motion.h2>
        
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          className="grid md:grid-cols-3 gap-8"
        >
          {skills.map((skillCategory) => (
            <motion.div 
              key={skillCategory.category} 
              variants={itemVariants} 
              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#D946EF]/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#D946EF]/20 rounded-lg">
                  {skillCategory.icon}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {skillCategory.category}
                </h3>
              </div>
              
              <div className="space-y-4">
                {skillCategory.items.map((skill, i) => (
                  <motion.div 
                    key={skill.name} 
                    custom={i} 
                    variants={skillVariants} 
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-[#D946EF]">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        whileInView={{ width: `${skill.level}%` }} 
                        viewport={{ once: true }} 
                        transition={{ duration: 0.8, delay: i * 0.1 }} 
                        className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Section Projets */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-3xl md:text-4xl font-bold mb-6 text-center text-white"
        >
          Mes Projets
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          className="text-center text-white/70 mb-12 max-w-2xl mx-auto"
        >
          Découvrez une sélection de mes réalisations, du développement frontend aux solutions backend.
        </motion.p>

        {/* Contrôles de filtrage et d'affichage */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button 
                key={category} 
                onClick={() => setFilter(category)} 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  filter === category 
                    ? "bg-[#D946EF] text-white shadow-lg" 
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {categoryLabels[category as keyof typeof categoryLabels] || category}
                {filter === category && (
                  <X size={14} className="text-white" />
                )}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative w-full md:w-auto">
              <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full md:w-auto pl-10 pr-4 py-2 bg-white/10 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D946EF]" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
                  <ArrowUpDown size={16} />
                  <span className="hidden md:block">Trier</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-[#1E293B] rounded-lg shadow-lg py-2 z-20 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity border border-white/10">
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                      className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-[#D946EF]/10 ${
                        sortBy === option.id ? "text-[#D946EF]" : "text-white/70"
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex border border-white/20 rounded-full overflow-hidden">
                <button 
                  onClick={() => setViewMode("grid")} 
                  className={`p-2 ${viewMode === "grid" ? "bg-[#D946EF] text-white" : "text-white/70 hover:bg-white/10"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => setViewMode("list")} 
                  className={`p-2 ${viewMode === "list" ? "bg-[#D946EF] text-white" : "text-white/70 hover:bg-white/10"}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Compteur de projets */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-white/70">
            <span className="text-[#D946EF] font-bold">{filteredProjects.length}</span> projets trouvés
          </p>
          
          <div className="text-sm text-white/50">
            Tri: {sortOptions.find(o => o.id === sortBy)?.label}
          </div>
        </div>

        {/* Projets en vedette */}
        {groupedProjects.featured.length > 0 && (
          <>
            <motion.h3 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="flex items-center gap-2 text-xl font-bold mb-6 text-white mt-16"
            >
              <Star className="w-5 h-5 text-[#D946EF]" fill="#D946EF" />
              Projets
            </motion.h3>
            
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              className={`${viewMode === "grid" ? "grid md:grid-cols-2 gap-8" : "space-y-6"}`}
            >
              {groupedProjects.featured.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  viewMode={viewMode} 
                  onClick={() => setActiveProject(project)}
                />
              ))}
            </motion.div>
          </>
        )}

        {/* Tous les autres projets */}
        {groupedProjects.others.length > 0 && (
          <>
            <motion.h3 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              className="flex items-center gap-2 text-xl font-bold mb-6 text-white mt-16"
            >
              Autres Projets
            </motion.h3>
            
            <motion.div 
              variants={containerVariants} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              className={`${viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}`}
            >
              {groupedProjects.others.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  viewMode={viewMode} 
                  onClick={() => setActiveProject(project)}
                />
              ))}
            </motion.div>
          </>
        )}

        {/* Message si aucun projet trouvé */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-12"
          >
            <Search className="w-16 h-16 mx-auto text-[#D946EF]/50 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Aucun projet trouvé</h3>
            <p className="text-white/60 mb-4">Veuillez ajuster vos critères de recherche.</p>
            <button 
              onClick={() => { 
                setFilter("Tous"); 
                setSearchQuery(""); 
              }} 
              className="mt-2 px-6 py-3 bg-[#D946EF] hover:bg-[#C026D3] text-white rounded-lg transition-colors flex items-center gap-2 mx-auto"
            >
              <X size={16} />
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal de détails du projet */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1A1F2C] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#D946EF]/30"
            >
              <div className="relative">
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                <div className="aspect-video relative">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                
                <div className="p-8">
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 bg-[#D946EF]/20 rounded-full text-sm font-medium text-[#D946EF]">
                      {categoryLabels[activeProject.category as keyof typeof categoryLabels] || activeProject.category}
                    </span>
                    
                    {activeProject.status && (
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(activeProject.status)}`}>
                          {activeProject.status}
                        </span>
                        <span className="flex h-3 w-3">
                          <span
                            className={`animate-ping absolute inline-flex h-3 w-3 rounded-full ${getStatusPingColor(activeProject.status)} opacity-75`}
                          ></span>
                          <span
                            className={`relative inline-flex rounded-full h-3 w-3 ${getStatusDotColor(activeProject.status)}`}
                          ></span>
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-sm">Complexité:</span>
                      <ComplexityIndicator level={activeProject.complexity} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {activeProject.title}
                  </h3>
                  
                  <p className="text-white/80 mb-6">
                    {activeProject.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3 text-white">Technologies utilisées</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-white/10 rounded-full text-sm font-medium text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    {/* <motion.a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      Code source
                    </motion.a> */}
                    
                    <motion.a
                      href={activeProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 bg-[#D946EF] rounded-lg text-white hover:bg-[#C026D3] transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Voir le projet
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// --- Sous-composant ProjectCard ---
const ProjectCard = ({ 
  project, 
  viewMode,
  onClick
}: { 
  project: Project; 
  viewMode: "grid" | "list";
  onClick: () => void;
}) => {
  return (
    <motion.div 
      variants={itemVariants} 
      className={`group ${
        viewMode === "grid" 
          ? "bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 relative border border-white/10"
          : "bg-white/5 rounded-lg hover:bg-white/10 transition-colors p-6 flex flex-col md:flex-row gap-6 items-start"
      }`}
      onClick={onClick}
    >
      {project.featured && viewMode === "grid" && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-[#D946EF] text-white px-3 py-1 rounded-full text-xs font-bold">
          <Star className="w-3 h-3" fill="white" /> Vedette
        </div>
      )}
      
      <div className={`${viewMode === "grid" ? "aspect-video relative overflow-hidden" : "w-full md:w-64 flex-shrink-0"}`}>
        <img 
          src={project.image} 
          alt={project.title} 
          className={`w-full h-full object-cover transition-transform duration-500 ${
            viewMode === "grid" ? "group-hover:scale-110" : "rounded-lg"
          }`} 
        />
        {viewMode === "grid" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        )}
      </div>
      
      <div className={`${viewMode === "grid" ? "p-6 relative" : "flex-grow"}`}>
        {viewMode === "list" && project.featured && (
          <div className="mb-3 flex items-center gap-1.5 bg-[#D946EF]/20 text-[#D946EF] px-3 py-1 rounded-full text-xs font-bold w-fit">
            <Star className="w-3 h-3" fill="#D946EF" /> Vedette
          </div>
        )}
        
        {project.status && viewMode === "grid" && (
          <div className="absolute top-0 right-6 -translate-y-1/2 flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getStatusPingColor(project.status)}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${getStatusDotColor(project.status)}`}></span>
            </span>
          </div>
        )}
        
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className={`font-bold text-white group-hover:text-[#D946EF] transition-colors ${
              viewMode === "grid" ? "text-xl mb-2" : "text-lg mb-1"
            }`}>
              {project.title}
            </h3>
            
            <p className={`text-white/70 ${
              viewMode === "grid" ? "line-clamp-3 mb-4" : "line-clamp-2 mb-3"
            }`}>
              {project.description}
            </p>
          </div>
          
          {viewMode === "list" && project.status && (
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-[#D946EF]/10 rounded-full text-xs font-medium text-[#D946EF]/80"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 text-sm text-white/60">
            <span>{new Date(project.date).toLocaleDateString('fr-FR')}</span>
            <span>•</span>
            <ComplexityIndicator level={project.complexity} />
          </div>
          
          <div className="flex gap-3">
            <motion.a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.1, y: -2 }}
              onClick={e => e.stopPropagation()}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover={{ scale: 1.1, y: -2 }}
              onClick={e => e.stopPropagation()}
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;