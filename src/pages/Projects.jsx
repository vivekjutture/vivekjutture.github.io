import { useState, useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSEO } from "../hooks/useSEO";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaArrowRight,
  FaShippingFast,
  FaSearch,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import { FaJava } from "react-icons/fa6";
import { GiTicTacToe } from "react-icons/gi";
import { RiFocus2Line } from "react-icons/ri";
import { IoChatbubbles } from "react-icons/io5";
import { TbFaceId } from "react-icons/tb";
import { MdAirplaneTicket } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import {
  FcElectronics,
  FcPrivacy,
  FcFolder,
  FcCurrencyExchange,
} from "react-icons/fc";
import { BsFillTerminalFill, BsBank2 } from "react-icons/bs";
import { PiFarmFill } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import projectsData from "../data/projects.json";
import Modal from "../components/ui/Modal";
import { ElasticScale } from "../components/ui/CardEffects";
import Button from "../components/ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: 30, transition: { duration: 0.3, ease: "easeIn" } },
};

const iconMap = {
  GiTicTacToe,
  RiFocus2Line,
  IoChatbubbles,
  TbFaceId,
  MdAirplaneTicket,
  FaShippingFast,
  FcElectronics,
  FcPrivacy,
  FcCurrencyExchange,
  FcFolder,
  BsFillTerminalFill,
  BsBank2,
  PiFarmFill,
  FaJava,
  SiLeetcode,
  FaHeart,
};

const ProjectFilterBar = ({
  categories,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-12 pb-6 border-b border-gray-200 dark:border-slate-800 items-center justify-between font-sans">
      <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setSearchQuery("");
            }}
            className={`px-5 py-2 text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
              activeCategory === category
                ? "bg-transparent border-violet-500 text-violet-500 dark:text-violet-400 shadow-[0_0_15px_var(--ring-glow)]"
                : "border-gray-200 dark:border-slate-700 bg-transparent text-gray-600 dark:text-gray-400 hover:border-violet-300 dark:hover:border-violet-700 hover:text-violet-500 dark:hover:text-violet-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-80 group flex items-center">
        <FaSearch
          className="absolute left-4 text-gray-400 group-focus-within:text-violet-500 transition-colors"
          size={14}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full px-4 pl-10 pr-10 py-2.5 text-sm rounded-full bg-transparent border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-1 focus:ring-violet-500 focus:border-violet-500 focus:shadow-[0_0_15px_var(--ring-glow)] outline-none transition-all"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-125 hover:rotate-90 cursor-pointer flex items-center justify-center p-1"
            aria-label="Clear search"
          >
            <FaTimes size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onOpen }) => {
  const descRef = useRef(null);
  const [isDescTruncated, setIsDescTruncated] = useState(false);

  const maxTagsOnCard = 2;
  const projectTags = project.tags || [];
  const visibleTags = projectTags.slice(0, maxTagsOnCard);
  const hiddenTagsCount = Math.max(0, projectTags.length - maxTagsOnCard);

  const maxVisibleTech = 4;
  const visibleTech = project.tech.slice(0, maxVisibleTech);
  const hiddenTechCount = Math.max(0, project.tech.length - maxVisibleTech);

  const cardText = project.summary || project.desc;

  const IconComponent = iconMap[project.icon] || FcFolder;

  const defaultBg =
    "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700";

  const checkTruncation = useCallback(() => {
    if (descRef.current) {
      setIsDescTruncated(
        descRef.current.scrollHeight > descRef.current.clientHeight,
      );
    }
  }, []);

  useLayoutEffect(() => {
    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [checkTruncation]);

  const showReadMore =
    isDescTruncated || hiddenTechCount > 0 || !!project.summary;

  return (
    <ElasticScale className="flex flex-col h-125 cursor-default group">
      <div className="h-48 shrink-0 bg-linear-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-gray-300 relative overflow-hidden rounded-t-2xl group">
        {project.featured && (
          <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-violet-600/90 text-white text-xs font-bold rounded-full shadow-sm backdrop-blur-md flex items-center gap-1">
            <FaStar size={10} /> Featured
          </div>
        )}
        {project.status && (
          <div className="absolute top-3 right-3 z-10 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/60 text-yellow-800 dark:text-yellow-300 text-xs font-bold rounded-full border border-yellow-200 dark:border-yellow-700 shadow-sm backdrop-blur-md">
            {project.status}
          </div>
        )}

        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-2 mb-3 shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-lg shrink-0 border ${defaultBg} group-hover:scale-105 transition-transform duration-200`}
            >
              <span
                className={`text-2xl flex items-center justify-center ${project.iconColor || "text-gray-700"} dark:${project.iconColor || "text-gray-200"}`}
              >
                <IconComponent />
              </span>
            </div>
            <h3 className="text-xl font-bold group-hover:text-violet-500 transition-colors duration-200 font-display leading-tight">
              {project.title}
            </h3>
          </div>

          {projectTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pl-1">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] tracking-wider font-bold rounded-md bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800"
                >
                  {tag}
                </span>
              ))}
              {hiddenTagsCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-700">
                  +{hiddenTagsCount}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="grow overflow-hidden relative mb-4">
          <p
            ref={descRef}
            className="text-gray-600 dark:text-gray-400 text-sm font-sans leading-relaxed line-clamp-3"
          >
            {cardText}
          </p>
        </div>

        <div className="shrink-0 mb-4 font-sans">
          <div className="flex flex-wrap gap-2 items-center">
            {visibleTech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700 whitespace-nowrap"
              >
                {t}
              </span>
            ))}
            {hiddenTechCount > 0 && (
              <span
                className="px-2 py-1 text-xs font-bold text-gray-500 dark:text-gray-400"
                aria-label={`${hiddenTechCount} more technologies`}
              >
                +{hiddenTechCount}
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto shrink-0 space-y-4 font-sans">
          {showReadMore && (
            <button
              onClick={() => onOpen(project)}
              className="text-violet-600 dark:text-violet-400 text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              Read More <FaArrowRight size={12} />
            </button>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
            {project.github && (
              <Button
                href={project.github}
                target="_blank"
                rel="noreferrer"
                variant="outline"
                className="flex-1 text-sm py-2"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub size={16} /> Source Code
              </Button>
            )}
            {project.live && (
              <Button
                href={project.live}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                className="flex-1 text-sm py-2"
                onClick={(e) => e.stopPropagation()}
              >
                Live <FaExternalLinkAlt size={14} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </ElasticScale>
  );
};

const Projects = () => {
  useSEO({
    title: "Projects - Vivek J. Utture | Portfolio",
    description:
      "Explore my portfolio of projects including web applications, mobile apps, machine learning systems, and more. See my work with React, Java, Flutter, Python, and various technologies.",
    keywords:
      "projects, portfolio, web development, mobile apps, machine learning, React, Java, Flutter, open source",
    canonical: "https://www.vivekjutture.com/projects",
    applyOn: "/projects",
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const allCategories = [
      ...new Set(projectsData.map((project) => project.category)),
    ]
      .filter(Boolean)
      .sort();

    return ["All", ...allCategories];
  }, []);

  const filteredProjects = useMemo(() => {
    let projects = [...projectsData]
      .reverse()
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

    if (activeCategory !== "All") {
      projects = projects.filter(
        (project) => project.category === activeCategory,
      );
    }

    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      projects = projects.filter(
        (project) =>
          project.title.toLowerCase().includes(lowerQuery) ||
          project.desc.toLowerCase().includes(lowerQuery) ||
          (project.tech &&
            project.tech.some((t) => t.toLowerCase().includes(lowerQuery))),
      );
    }

    return projects;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-fuchsia-500">
            Projects
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-sans text-lg max-w-2xl mx-auto">
            A collection of projects demonstrating my engineering capabilities.
          </p>
        </motion.div>

        <ProjectFilterBar
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ProjectCard project={project} onOpen={setSelectedProject} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-20 text-center text-gray-500 dark:text-gray-400"
              >
                No projects found matching your criteria.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={
            selectedProject && (
              <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-3">
                  {(() => {
                    const IconComponent =
                      iconMap[selectedProject.icon] || FcFolder;
                    return (
                      <div className="p-2 rounded-lg border bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700">
                        <span className="text-2xl flex items-center justify-center text-gray-700 dark:text-gray-200">
                          <IconComponent />
                        </span>
                      </div>
                    );
                  })()}
                  <span className="text-xl md:text-2xl">
                    {selectedProject.title}
                  </span>

                  {selectedProject.status && (
                    <span className="hidden sm:inline-block px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700">
                      {selectedProject.status}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {selectedProject.status && (
                    <span className="sm:hidden px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700">
                      {selectedProject.status}
                    </span>
                  )}

                  {selectedProject.tags &&
                    selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs tracking-wider font-bold rounded-md bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>
            )
          }
        >
          {selectedProject && (
            <div className="space-y-6 font-sans">
              <div className="w-full h-64 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-slate-700">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FcFolder size={80} />
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-wider mb-2 font-display">
                  About Project
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                  {selectedProject.desc}
                </p>
              </div>

              <div>
                <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white tracking-wider mb-3 font-display">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 text-sm font-medium rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
                  <div className="flex gap-4">
                    {selectedProject.github && (
                      <Button
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        variant="outline"
                        className="flex-1"
                      >
                        <FaGithub size={20} /> View Code
                      </Button>
                    )}
                    {selectedProject.live && (
                      <Button
                        href={selectedProject.live}
                        target="_blank"
                        rel="noreferrer"
                        variant="primary"
                        className="flex-1"
                      >
                        <FaExternalLinkAlt size={18} /> Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};
export default Projects;
