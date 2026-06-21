import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";
const Modal = ({ isOpen, onClose, title, image, footer, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{
              scale: 0.95,
              opacity: 0,
              y: 20,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.95,
              opacity: 0,
              y: 20,
            }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-gray-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900 z-10">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white truncate pr-4">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {image && (
              <div className="shrink-0 w-full h-56 bg-gray-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-b border-gray-100 dark:border-slate-800">
                {image}
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {children}
            </div>
            {footer && (
              <div className="shrink-0 p-6 pt-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 z-10">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
export default Modal;
