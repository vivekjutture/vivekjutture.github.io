import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-9999"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-[10px] font-bold rounded-md whitespace-nowrap shadow-xl"
              >
                Back to Top
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={scrollToTop}
            className="group relative flex items-center justify-center 
                       w-12 h-12 md:w-14 md:h-14 rounded-full 
                       backdrop-blur-xl bg-white/40 dark:bg-slate-800/40 
                       border border-white/50 dark:border-slate-700/50 
                       shadow-2xl hover:scale-110 active:scale-95 
                       transition-transform duration-300 hover-shine 
                       overflow-hidden cursor-pointer outline-none"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <FaArrowUp
                className="w-5 h-5 md:w-6 md:h-6"
                style={{ fill: "url(#fixed-bt-grad)" }}
              />
              <svg width="0" height="0" className="absolute">
                <linearGradient
                  id="fixed-bt-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop stopColor="var(--accent)" offset="0%" />
                  <stop stopColor="var(--accent-2)" offset="100%" />
                </linearGradient>
              </svg>
            </div>

            <div className="absolute inset-0 bg-linear-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default BackToTop;
