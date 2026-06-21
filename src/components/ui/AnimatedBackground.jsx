const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-0 -left-4 w-72 h-72 md:w-96 md:h-96 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:bg-violet-900 dark:mix-blend-lighten dark:opacity-20"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 md:w-96 md:h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:bg-purple-900 dark:mix-blend-lighten dark:opacity-20"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 md:w-96 md:h-96 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:bg-fuchsia-900 dark:mix-blend-lighten dark:opacity-20"></div>
    </div>
  );
};
export default AnimatedBackground;
