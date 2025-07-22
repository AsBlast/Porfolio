import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Github,
  ExternalLink,
  Layout,
  Database,
  Cloud,
  Rocket,
  Star,
  Search,
  Filter,
  ArrowUpDown,
  X,
  Grip,
  List,
} from "lucide-react";
import { useState, useMemo } from "react";

// --- Types et Données ---
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
  date: string;
  complexity: number;
}
const projectsData: Project[] = [
  {
    id: 1,
    title: "Projet Alpha",
    description:
      "Application Web moderne créée avec React, exploitant Tailwind CSS pour le style et Vite pour un développement ultra-rapide.",
    image: "/images/alpha.png",
    github: "https://github.com",
    live: "http://mg-remote-work.netlify.app/",
    tags: ["React", "Tailwind CSS", "Vite"],
    status: "En production",
    featured: true,
    category: "frontend",
    date: "2023-10-15",
    complexity: 3,
  },
  {
    id: 2,
    title: "Projet Beta",
    description:
      "Solution de e-commerce avancée utilisant WordPress avec intégration WooCommerce et générateur de pages Elementor.",
    image: "/images/samsung.webp",
    github: "https://github.com",
    live: "http://asblast-samsung.netlify.app/",
    tags: ["WordPress", "WooCommerce", "Elementor"],
    status: "En production",
    featured: true,
    category: "cms",
    date: "2023-08-22",
    complexity: 2,
  },
  {
    id: 3,
    title: "Projet Gamma",
    description:
      "Application Web complète utilisant Node JS (en cours de développement).",
    image: "/images/AKATA.png",
    github: "https://github.com",
    live: "http://akata.netlify.app/",
    tags: ["Node JS", "MySQL"],
    status: "En développement",
    category: "backend",
    date: "2023-11-05",
    complexity: 4,
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
    complexity: 3,
  },
  {
    id: 5,
    title: "Projet Epsilon",
    description:
      "Dashboard analytique avec visualisations de données en React et TypeScript.",
    image: "/images/dashboard.jpg",
    github: "https://github.com",
    live: "https://epsilon-dashboard.netlify.app/",
    tags: ["D3.js", "Chart.js", "React", "TypeScript"],
    status: "En développement",
    category: "frontend",
    date: "2023-09-30",
    complexity: 5,
  },
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
      { name: "Angular", level: 15 },
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
      { name: "Python/Django", level: 55 },
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
      { name: "Nginx", level: 22 },
    ],
  },
];
const categoryLabels = {
  Tous: "Tous",
  frontend: "Frontend",
  backend: "Backend",
  cms: "CMS",
  mobile: "Mobile",
};
const sortOptions = [
  { id: "date-desc", label: "Plus récent", icon: <ArrowUpDown size={14} /> },
  { id: "date-asc", label: "Plus ancien", icon: <ArrowUpDown size={14} /> },
  { id: "complexity-desc", label: "Plus complexe", icon: <Rocket size={14} /> },
  { id: "complexity-asc", label: "Moins complexe", icon: <Rocket size={14} /> },
  { id: "alphabetical", label: "A-Z", icon: <Filter size={14} /> },
];

// --- Fonctions d'aide et Sous-composants ---
const getStatusColor = (status) =>
  status === "En production"
    ? "bg-green-500/20 text-green-400"
    : status === "En maintenance"
    ? "bg-yellow-500/20 text-yellow-400"
    : "bg-blue-500/20 text-blue-400";
const getStatusDotColor = (status) =>
  status === "En production"
    ? "bg-green-500"
    : status === "En maintenance"
    ? "bg-yellow-500"
    : "bg-blue-500";
const getStatusPingColor = (status) =>
  status === "En production"
    ? "bg-green-400"
    : status === "En maintenance"
    ? "bg-yellow-400"
    : "bg-blue-400";
const ComplexityIndicator = ({ level }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`w-2 h-2 rounded-full ${
          i < level ? "bg-[#D946EF]" : "bg-white/20"
        }`}
      />
    ))}
  </div>
);

const SkillCategory = ({ category }) => (
  <motion.div
    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
    className="bg-white/5 rounded-xl p-6 border border-white/10"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-[#D946EF]/20 rounded-lg">{category.icon}</div>
      <h3 className="text-xl font-bold text-white">{category.category}</h3>
    </div>
    <div className="space-y-4">
      {category.items.map((skill, i) => (
        <div
          key={skill.name}
          className="space-y-2"
          role="meter"
          aria-valuenow={skill.level}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${skill.name}: ${skill.level}%`}
        >
          <div
            className="flex justify-between text-sm text-white/80"
            aria-hidden="true"
          >
            <span>{skill.name}</span>
            <span>{skill.level}%</span>
          </div>
          <div
            className="h-2 bg-white/10 rounded-full overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);
const ProjectCard = ({ project, viewMode, onOpen }) => (
  <motion.button
    layout
    variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
    onClick={onOpen}
    className={`group text-left w-full transition-colors duration-300 relative ${
      viewMode === "grid"
        ? "bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transform hover:-translate-y-1 border border-white/10"
        : "bg-transparent hover:bg-white/5 p-4 rounded-lg flex flex-col sm:flex-row gap-4 items-start"
    }`}
  >
    {project.featured && viewMode === "grid" && (
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#D946EF] text-white px-3 py-1 rounded-full text-xs font-bold">
        <Star className="w-3 h-3" fill="white" /> Vedette
      </div>
    )}
    {project.status && viewMode === "grid" && (
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>
        <span className="relative flex h-3 w-3">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getStatusPingColor(
              project.status
            )}`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${getStatusDotColor(
              project.status
            )}`}
          ></span>
        </span>
      </div>
    )}
    <div
      className={`relative overflow-hidden ${
        viewMode === "grid"
          ? "aspect-video"
          : "w-full sm:w-48 flex-shrink-0 aspect-video rounded-md"
      }`}
    >
      <img
        src={project.image}
        alt={`Aperçu du projet ${project.title}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className={`flex-grow ${viewMode === "grid" ? "p-4" : ""}`}>
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-white group-hover:text-[#D946EF] transition-colors text-lg">
          {project.title}
        </h4>
        {project.status && viewMode === "list" && (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
              project.status
            )}`}
          >
            {project.status}
          </span>
        )}
      </div>
      <p className="text-white/70 text-sm line-clamp-2 mt-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-3">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-[#D946EF]/10 text-[#D946EF]/80 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.button>
);
const ProjectModal = ({ project, open, onOpenChange }) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <AnimatePresence>
      {open && project && (
        <Dialog.Portal forceMount>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
          </motion.div>
          <Dialog.Content
            forceMount
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[85vh] bg-[#1A1F2C] rounded-xl overflow-y-auto border border-[#D946EF]/30 focus:outline-none"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
            >
              <div>
                <div className="aspect-video relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-[#D946EF]/20 rounded-full text-sm font-medium text-[#D946EF]">
                      {categoryLabels[project.category] || project.category}
                    </span>
                    {project.status && (
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                        <span className="relative flex h-3 w-3">
                          <span
                            className={`animate-ping absolute inline-flex h-3 w-3 rounded-full ${getStatusPingColor(
                              project.status
                            )} opacity-75`}
                          ></span>
                          <span
                            className={`relative inline-flex rounded-full h-3 w-3 ${getStatusDotColor(
                              project.status
                            )}`}
                          ></span>
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-white/70 text-sm">Complexité:</span>
                      <ComplexityIndicator level={project.complexity} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-white/70 mt-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-[#D946EF] rounded-lg text-white hover:bg-[#C026D3]"
                    >
                      <ExternalLink size={18} />
                      Voir le projet
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg text-white hover:bg-white/20"
                    >
                      <Github size={18} />
                      Code Source
                    </a>
                  </div>
                </div>
              </div>
              <Dialog.Close asChild>
                <button
                  className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </Dialog.Close>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </AnimatePresence>
  </Dialog.Root>
);

export function Projects() {
  const [filters, setFilters] = useState({
    category: "Tous",
    query: "",
    sortBy: "date-desc",
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const categories = ["Tous", ...new Set(projectsData.map((p) => p.category))];
  const filteredProjects = useMemo(
    () =>
      [...projectsData]
        .filter(
          (p) =>
            (filters.category === "Tous" || p.category === filters.category) &&
            (filters.query.toLowerCase() === "" ||
              p.title.toLowerCase().includes(filters.query.toLowerCase()) ||
              p.description
                .toLowerCase()
                .includes(filters.query.toLowerCase()) ||
              p.tags.some((tag) =>
                tag.toLowerCase().includes(filters.query.toLowerCase())
              ))
        )
        .sort((a, b) => {
          switch (filters.sortBy) {
            case "date-desc":
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            case "date-asc":
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            case "complexity-desc":
              return b.complexity - a.complexity;
            case "complexity-asc":
              return a.complexity - b.complexity;
            default:
              return a.title.localeCompare(b.title);
          }
        }),
    [filters]
  );
  const { featured, others } = useMemo(
    () => ({
      featured: filteredProjects.filter((p) => p.featured),
      others: filteredProjects.filter((p) => !p.featured),
    }),
    [filteredProjects]
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-20 bg-[#1A1F2C]"
    >
      <div className="container mx-auto px-4">
        <h2 id="projects-heading" className="sr-only">
          Projets et Compétences
        </h2>
        <section aria-labelledby="skills-heading" className="mb-24">
          <motion.h3
            id="skills-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-white"
          >
            Compétences
          </motion.h3>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-3 gap-8"
          >
            {skills.map((skill) => (
              <SkillCategory key={skill.category} category={skill} />
            ))}
          </motion.div>
        </section>
        <section aria-labelledby="portfolio-heading">
          <motion.h3
            id="portfolio-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-center text-white"
          >
            Mes Projets
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/70 mb-12 max-w-2xl mx-auto"
          >
            Découvrez une sélection de mes réalisations, du développement
            frontend aux solutions backend.
          </motion.p>
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilters((f) => ({ ...f, category: cat }))}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.category === cat
                      ? "bg-[#D946EF] text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  {categoryLabels[cat] || cat}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="relative">
                <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={filters.query}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, query: e.target.value }))
                  }
                  className="w-full md:w-auto pl-10 pr-4 py-2 bg-white/10 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#D946EF]"
                />
              </div>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button
                    aria-label="Options de tri"
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-full text-white/70 hover:text-white"
                  >
                    <ArrowUpDown size={16} />
                    <span className="hidden sm:inline">Trier</span>
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    align="end"
                    className="w-56 bg-[#1E293B] rounded-lg shadow-lg py-1 z-20 border border-white/10 text-white"
                  >
                    {sortOptions.map((opt) => (
                      <DropdownMenu.Item
                        key={opt.id}
                        onSelect={() =>
                          setFilters((f) => ({ ...f, sortBy: opt.id }))
                        }
                        className="px-3 py-2 flex items-center gap-2 hover:bg-[#D946EF]/10 focus:bg-[#D946EF]/10 focus:outline-none cursor-pointer"
                      >
                        {sortOptions.find((o) => o.id === opt.id).icon || (
                          <Filter size={14} />
                        )}
                        {opt.label}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
              <div className="flex border border-white/20 rounded-full">
                <button
                  aria-label="Vue en grille"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-[#D946EF] text-white"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Grip size={18} />
                </button>
                <button
                  aria-label="Vue en liste"
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${
                    viewMode === "list"
                      ? "bg-[#D946EF] text-white"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* --- CORRECTION FINALE DE LA GRILLE --- */}
          <div>
            {featured.length > 0 && (
              <>
                <h4 className="text-xl font-bold text-white my-8 flex items-center gap-2">
                  <Star className="text-yellow-400" /> Projets en Vedette
                </h4>
                <motion.div
                  layout
                  className={
                    viewMode === "grid"
                      ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {featured.map((p) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      viewMode={viewMode}
                      onOpen={() => setActiveProject(p)}
                    />
                  ))}
                </motion.div>
              </>
            )}

            {others.length > 0 && (
              <>
                <h4 className="text-xl font-bold text-white my-8 flex items-center gap-2">
                  Autres Projets
                </h4>
                <motion.div
                  layout
                  className={
                    viewMode === "grid"
                      ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {others.map((p) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      viewMode={viewMode}
                      onOpen={() => setActiveProject(p)}
                    />
                  ))}
                </motion.div>
              </>
            )}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <Search size={48} className="mx-auto text-[#D946EF]/50 mb-4" />
              <h4 className="text-xl font-bold">Aucun projet trouvé</h4>
              <p className="text-white/60">Essayez d'ajuster vos filtres.</p>
            </div>
          )}
        </section>
      </div>
      <ProjectModal
        project={activeProject}
        open={!!activeProject}
        onOpenChange={() => setActiveProject(null)}
      />
    </section>
  );
}
