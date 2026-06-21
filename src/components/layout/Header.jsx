import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/theme-context";
import personalData from "../../data/personal.json";
const navLinks = [
  { name: "Home", path: "home" },
  { name: "About", path: "about" },
  { name: "Projects", path: "projects" },
  { name: "Skills", path: "skills" },
  { name: "Experience", path: "experience" },
  { name: "Education", path: "education" },
  { name: "Achievements", path: "achievements" },
  { name: "Contact", path: "contact" },
];
const getSectionFromPath = (pathname) => {
  const path = pathname.replace("/", "");
  const id = path === "" ? "home" : path;
  return navLinks.some((link) => link.path === id) ? id : null;
};

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() =>
    getSectionFromPath(window.location.pathname),
  );
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  const currentPathRef = useRef(window.location.pathname);
  const observerRef = useRef(null);

  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setActiveSection(getSectionFromPath(location.pathname));
    if (isOpen) setIsOpen(false);
  }

  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    if (!activeSection) {
      document.title = `Page Not Found | ${personalData.name}`;
      return;
    }
    const name =
      activeSection === "home"
        ? "Portfolio"
        : activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
    document.title = `${name} | ${personalData.name}`;
  }, [activeSection]);
  const handleNavClick = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      const newPath = id === "home" ? "/" : `/${id}`;
      if (currentPathRef.current !== newPath) {
        window.history.pushState(null, "", newPath);
        currentPathRef.current = newPath;
        setActiveSection(id);
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setActiveSection(id);
        }
      }, 100);
    }
  };
  useEffect(() => {
    if (activeSection === null) return;
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const newPath = id === "home" ? "/" : `/${id}`;
          if (currentPathRef.current !== newPath) {
            setActiveSection(id);
            currentPathRef.current = newPath;
            window.history.replaceState(null, "", newPath);
          }
        }
      });
    };
    observerRef.current = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    navLinks.forEach((link) => {
      const section = document.getElementById(link.path);
      if (section) observerRef.current.observe(section);
    });
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [location.pathname, activeSection]);
  const activeClass =
    "text-violet-600 dark:text-violet-400 font-bold decoration-2 underline-offset-8 lg:underline";
  const baseClass =
    "hover:text-violet-500 transition-colors duration-200 text-gray-600 dark:text-gray-300 font-medium cursor-pointer";
  return (
    <nav className="fixed top-0 left-0 w-full z-100 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          <button
            onClick={() => (window.location.href = "/")}
            className="shrink-0 font-bold text-2xl text-gray-900 dark:text-white cursor-pointer focus:outline-none font-display tracking-tight"
            aria-label="Go to home"
          >
            Portfolio
            <span className="text-violet-600">.</span>
          </button>

          <div className="hidden lg:flex ml-auto items-center gap-6 xl:gap-8 mr-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={
                  activeSection === link.path ? activeClass : baseClass
                }
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 ml-auto lg:ml-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer focus:outline-none"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <FaSun size={20} />
              ) : (
                <FaMoon size={20} />
              )}
            </button>
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 cursor-pointer focus:outline-none text-gray-900 dark:text-white"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800"
        >
          <div className="px-6 pt-6 pb-10 flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`w-full max-w-xs text-center px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-lg ${
                  activeSection === link.path
                    ? "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-slate-800/40"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Header;
