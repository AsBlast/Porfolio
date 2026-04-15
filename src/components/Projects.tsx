// src/components/Projects.tsx

import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Github, ExternalLink, Layout, Database, Cloud,
  Rocket, Star, Search, Filter, ArrowUpDown, X,
  Grip, List, Cpu, Terminal, Activity, Zap
} from "lucide-react";
import { useState, useMemo } from "react";

// --- Types ---
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

// --- Données Intégrales (Aucun projet supprimé) ---
const projectsData: Project[] = [
  {
    id: 1,
    title: "Remote work",
    description: "Application Web moderne créée avec React, exploitant Tailwind CSS pour le style et Vite pour un développement ultra-rapide.",
    image: "/images/alpha.webp",
    github: "https://github.com",
    live: "http://mg-remote-work.netlify.app/",
    tags: ["React", "Tailwind CSS", "Vite"],
    status: "En production",
    featured: false,
    category: "frontend",
    date: "2023-10-15",
    complexity: 3,
  },
  {
    id: 2,
    title: "Python Hackers",
    description: "Site d'affiliation créée avec React avec solution d'achat redirigée vers Amazon.fr pour guide pratique : Python pour les hackers",
    image: "/images/Python-hackers.jpg",
    github: "https://github.com",
    live: "https://asblast-affiliation.netlify.app/",
    tags: ["React", "Tailwind CSS", "Vite"],
    status: "En production",
    featured: false,
    category: "frontend",
    date: "2023-08-22",
    complexity: 2,
  },
  {
    id: 3,
    title: "Akata",
    description: "Application Web complète utilisant React, Vite, Tailwind CSS pour le frontend et Node JS pour le backend (en cours).",
    image: "/images/AKATA.webp",
    github: "https://github.com",
    live: "https://akata.netlify.app/",
    tags: ["Node JS", "MySQL", "React"],
    status: "En développement",
    featured: false,
    category: "backend",
    date: "2023-11-05",
    complexity: 4,
  },
  {
    id: 4,
    title: "TextAnalyzer",
    description: "Conçu comme une application web qui s'exécute entièrement côté client. En utilisant React et Vite, l'application est non seulement ultra-rapide, mais elle garantit aussi que 100% des calculs sont effectués sur votre appareil.",
    image: "images/texAnalyzer.webp",
    github: "https://github.com",
    live: "https://text-analyzer-pro-two.vercel.app/",
    tags: ["React", "tailwind", "Vite"],
    status: "En production",
    featured: true,
    category: "mobile",
    date: "2023-05-18",
    complexity: 3,
  },
  {
    id: 5,
    title: "Les 7 Pilotes (IntegratorOS)",
    description: "Dashboard analytique de développement personnel gamifié. Permet le suivi de l'état psychologique via 7 archétypes, avec visualisation de données temporelles.",
    image: "images/neurocockpit.webp",
    github: "https://github.com",
    live: "https://neuronal-cockpit.asblast.space/",
    tags: ["React", "Vite", "Tailwind CSS"],
    status: "En production",
    featured: true,
    category: "frontend",
    date: "2025-12-22",
    complexity: 4,
  },
  {
    id: 6,
    title: "meyrin-petanque",
    description: "Application Web complète utilisant React, Vite, Tailwind CSS pour le frontend et Node JS pour le backend (en cours).",
    image: "/images/meyrin.webp",
    github: "https://github.com",
    live: "https://meyrin-petanque.vercel.app/",
    tags: ["Node JS", "Tailwind CSS", "React"],
    status: "En développement",
    featured: false,
    category: "backend",
    date: "2025-11-05",
    complexity: 3,
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
    ],
  },
  {
    category: "Backend",
    icon: <Database className="w-5 h-5" />,
    items: [
      { name: "Node.js", level: 80 },
      { name: "REST API", level: 70 },
      { name: "MySQL", level: 40 },
      { name: "Python", level: 55 },
    ],
  },
  {
    category: "Architecture & Tools",
    icon: <Cloud className="w-5 h-5" />,
    items: [
      { name: "Wordpress", level: 85 },
      { name: "Git", level: 80 },
      { name: "Docker", level: 25 },
      { name: "AI Integration", level: 75 },
    ],
  },
];

const categoryLabels = { Tous: "Tous", frontend: "UI/UX", backend: "Core", cms: "CMS", mobile: "Labs" };

const sortOptions = [
  { id: "date-desc", label: "Plus récent", icon: <ArrowUpDown size={14} /> },
  { id: "complexity-desc", label: "Plus complexe", icon: <Rocket size={14} /> },
  { id: "alphabetical", label: "A-Z", icon: <Filter size={14} /> },
];

// --- Helpers Styles ---
const getStatusStyles = (status: string) => {
  if (status === "En production") return "text-green-400 bg-green-500/10 border-green-500/20";
  if (status === "En développement") return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
  return "text-quantum bg-quantum/10 border-quantum/20";
};

export function Projects() {
  const [filters, setFilters] = useState({ category: "Tous", query: "", sortBy: "date-desc" });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return [...projectsData]
      .filter(p => (filters.category === "Tous" || p.category === filters.category) && 
                   (p.title.toLowerCase().includes(filters.query.toLowerCase()) || 
                    p.tags.some(t => t.toLowerCase().includes(filters.query.toLowerCase()))))
      .sort((a, b) => {
        if (filters.sortBy === "complexity-desc") return b.complexity - a.complexity;
        if (filters.sortBy === "alphabetical") return a.title.localeCompare(b.title);
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  }, [filters]);

  const { featured, others } = useMemo(() => ({
    featured: filteredProjects.filter(p => p.featured),
    others: filteredProjects.filter(p => !p.featured)
  }), [filteredProjects]);

  return (
    <section id="projects" className="py-24 bg-space-950 relative">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- SKILLS HUD --- */}
        <div className="mb-32">
          <div className="flex flex-col items-center mb-16">
            <div className="flex items-center gap-2 font-mono text-quantum text-xs uppercase tracking-[0.3em] mb-4">
               <Activity size={14} className="animate-pulse" /> <span>System_Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">Compétences</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <motion.div 
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                className="hud-glass p-6 group hover:border-quantum/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-quantum/10 rounded-lg text-quantum">{skillGroup.icon}</div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tighter">{skillGroup.category}</h3>
                </div>
                <div className="space-y-5">
                  {skillGroup.items.map((item) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono uppercase text-slate-400">
                        <span>{item.name}</span>
                        <span className="text-quantum">{item.level}%</span>
                      </div>
                      <div className="h-1 bg-space-950 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }} whileInView={{ width: `${item.level}%` }}
                          className="h-full bg-gradient-to-r from-quantum to-blue-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- PROJECTS HUD --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
             <div className="flex items-center gap-2 font-mono text-nebula text-xs uppercase tracking-[0.3em] mb-2">
               <Terminal size={14} /> <span>Deployed_Modules</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">Projets</h2>
          </div>

          <div className="flex flex-wrap gap-4 items-center bg-space-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
             <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-quantum/50" />
                <input 
                  type="text" placeholder="QUERY..." value={filters.query}
                  onChange={e => setFilters(f => ({...f, query: e.target.value}))}
                  className="bg-space-950 border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-quantum focus:border-quantum focus:ring-0 w-40"
                />
             </div>
             
             <div className="flex bg-space-950 p-1 rounded-xl border border-white/10">
                <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-quantum/20 text-quantum" : "text-slate-500"}`}><Grip size={16}/></button>
                <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg ${viewMode === "list" ? "bg-quantum/20 text-quantum" : "text-slate-500"}`}><List size={16}/></button>
             </div>

             <DropdownMenu.Root>
                <DropdownMenu.Trigger className="flex items-center gap-2 px-4 py-2 bg-space-950 border border-white/10 rounded-xl text-[10px] font-mono uppercase text-slate-300 hover:text-quantum transition-colors">
                  <ArrowUpDown size={14} /> Trier
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="bg-space-900 border border-white/10 p-2 rounded-xl z-50 shadow-2xl min-w-[160px]">
                    {sortOptions.map(opt => (
                      <DropdownMenu.Item 
                        key={opt.id} onSelect={() => setFilters(f => ({...f, sortBy: opt.id}))}
                        className="flex items-center gap-3 px-3 py-2 text-[10px] font-mono uppercase text-slate-400 hover:text-quantum outline-none cursor-pointer"
                      >
                        {opt.icon} {opt.label}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
             </DropdownMenu.Root>
          </div>
        </div>

        {/* Filtres de Catégories */}
        <div className="flex flex-wrap gap-2 mb-12">
           {Object.entries(categoryLabels).map(([id, label]) => (
             <button
              key={id} onClick={() => setFilters(f => ({...f, category: id}))}
              className={`px-6 py-2 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all border ${
                filters.category === id ? "bg-quantum text-space-950 border-quantum shadow-neon-cyan" : "bg-white/5 text-slate-400 border-white/10 hover:border-white/30"
              }`}
             >
               {label}
             </button>
           ))}
        </div>

        {/* Liste des Projets */}
        <motion.div layout className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-4"}>
           <AnimatePresence>
             {featured.map(p => <ProjectItem key={p.id} project={p} viewMode={viewMode} onOpen={() => setActiveProject(p)} isFeatured />)}
             {others.map(p => <ProjectItem key={p.id} project={p} viewMode={viewMode} onOpen={() => setActiveProject(p)} />)}
           </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-32 hud-glass rounded-3xl">
             <Search size={48} className="mx-auto text-quantum/20 mb-4" />
             <p className="font-mono text-quantum animate-pulse">ERROR: NO_MODULE_FOUND_AT_THIS_COORDINATE</p>
          </div>
        )}
      </div>

      <ProjectModal 
        project={activeProject} 
        open={!!activeProject} 
        onOpenChange={(open) => !open && setActiveProject(null)} 
      />
    </section>
  );
}

// --- Sous-composant pour les items de projet ---
function ProjectItem({ project, viewMode, onOpen, isFeatured }: { project: Project, viewMode: "grid" | "list", onOpen: () => void, isFeatured?: boolean }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className={`group relative hud-glass flex flex-col ${viewMode === "list" ? "md:flex-row" : ""}`}
    >
      <div className={`relative overflow-hidden ${viewMode === "grid" ? "aspect-video" : "md:w-72 aspect-video flex-shrink-0"}`}>
        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-transparent" />
        
        {isFeatured && (
          <div className="absolute top-4 left-4 bg-nebula text-white text-[8px] font-black uppercase px-2 py-1 rounded tracking-tighter shadow-neon-purple">Featured_Module</div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-black text-white uppercase italic group-hover:text-quantum transition-colors">{project.title}</h3>
          <span className={`text-[8px] px-2 py-0.5 rounded-full border font-mono ${getStatusStyles(project.status || "")}`}>
            {project.status}
          </span>
        </div>
        
        <p className="text-slate-400 text-xs font-mono mb-6 line-clamp-2 leading-relaxed flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(t => <span key={t} className="text-[9px] font-mono text-quantum/70 bg-quantum/5 px-2 py-0.5 border border-quantum/10 rounded tracking-tighter">{t}</span>)}
        </div>

        <button 
          onClick={onOpen}
          className="hud-corners w-full py-3 bg-white/5 border border-white/10 text-white hover:bg-quantum hover:text-space-950 text-[10px] font-black uppercase tracking-[0.2em] transition-all"
        >
          Accéder_Aux_Données
        </button>
      </div>
    </motion.article>
  );
}

// --- MODAL DE DÉTAILS ---
function ProjectModal({ project, open, onOpenChange }: { project: Project | null, open: boolean, onOpenChange: (o: boolean) => void }) {
  if (!project) return null;
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-space-950/90 backdrop-blur-xl z-[60]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-5xl h-[85vh] bg-space-900 border border-quantum/30 rounded-3xl z-[70] overflow-hidden flex flex-col shadow-neon-cyan/20">
          <div className="flex-1 overflow-y-auto">
            <div className="relative h-64 md:h-96">
              <img src={project.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-space-900 via-transparent to-transparent" />
              <Dialog.Close className="absolute top-6 right-6 p-3 bg-black/50 hover:bg-quantum text-white hover:text-black rounded-full transition-colors">
                <X size={24} />
              </Dialog.Close>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-6 mb-8 text-[10px] font-mono text-quantum uppercase tracking-widest">
                 <div className="flex items-center gap-2 px-3 py-1 bg-quantum/10 border border-quantum/30 rounded-lg">
                   <Activity size={14} /> COMPLEXITY: {project.complexity}/5
                 </div>
                 <div className="px-3 py-1 bg-white/5 rounded-lg text-slate-400">TIMESTAMP: {project.date}</div>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-8">
                {project.title}
              </h2>
              
              <p className="text-lg text-slate-300 font-mono leading-relaxed mb-12 max-w-4xl border-l-2 border-quantum/30 pl-6">
                {project.description}
              </p>

              <div className="grid lg:grid-cols-2 gap-12 pt-8 border-t border-white/5">
                 <div className="space-y-6">
                   <h4 className="flex items-center gap-3 text-quantum font-black uppercase tracking-[0.2em] text-sm">
                     <Zap size={18} /> Tech_Stack_Manifest
                   </h4>
                   <div className="flex flex-wrap gap-3">
                     {project.tags.map(t => (
                       <div key={t} className="px-5 py-2 bg-space-950 border border-white/10 rounded-xl text-white font-mono text-xs hover:border-quantum transition-colors">
                         {t}
                       </div>
                     ))}
                   </div>
                 </div>
                 
                 <div className="flex flex-col gap-4 justify-end">
                    <a href={project.live} target="_blank" rel="noreferrer" className="hud-corners bg-quantum text-space-950 py-5 text-center font-black uppercase tracking-[0.3em] hover:shadow-neon-cyan transition-all">
                      Initialiser Live_Link
                    </a>
                    <a href={project.github} target="_blank" rel="noreferrer" className="hud-corners border border-white/20 text-white py-5 text-center font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
                      Accès GitHub_Source
                    </a>
                 </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Projects;