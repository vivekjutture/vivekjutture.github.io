import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
export const ProjectSpotlight = ({
  children,
  className = "",
  color = "var(--accent-glow)",
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={`group relative border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${color},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};
export const NeonPulse = ({
  children,
  className = "",
  borderGradient = "from-purple-600 to-pink-600",
}) => {
  return (
    <div className={`relative group h-full ${className}`}>
      <div
        className={`absolute -inset-1 bg-linear-to-r ${borderGradient} rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200`}
      ></div>

      <div className="relative h-full bg-white dark:bg-slate-900 ring-1 ring-gray-200 dark:ring-gray-800 rounded-2xl">
        {children}
      </div>
    </div>
  );
};
export const ElasticScale = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      className={`h-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl cursor-default
      hover:border-violet-500/50 dark:hover:border-violet-400/50 hover:shadow-xl transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};
export const GradientBorder = ({ children, className = "" }) => {
  return (
    <div
      className={`group relative h-full bg-white dark:bg-slate-900 rounded-2xl ${className}`}
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-violet-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
      <div className="relative h-full bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 group-hover:border-transparent transition-colors">
        {children}
      </div>
    </div>
  );
};
export const DefaultWrapper = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-gray-200/50 dark:shadow-none hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${className}`}
  >
    {children}
  </div>
);
