import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import Button from "../components/ui/Button";
const NotFound = () => {
  useEffect(() => {
    document.title = "404 Not Found | Portfolio";
  }, []);
  return (
    <div className="flex flex-col items-center justify-center grow w-full text-center px-4 pt-32 pb-20 relative">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full animate-pulse pointer-events-none" />

        <h1 className="relative text-7xl md:text-9xl font-bold text-gray-900 dark:text-white font-display tracking-tighter">
          404
        </h1>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative z-10"
      >
        <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-500 mb-4 mt-4">
          <FaExclamationTriangle size={24} />
          <span className="font-semibold text-lg">Page Not Found</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8 text-lg font-sans leading-relaxed">
          Oops! It seems you've ventured into undefined territory. The page you
          are looking for might have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <Button to="/" replace={true} variant="primary">
            <FaHome size={18} />
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
export default NotFound;
