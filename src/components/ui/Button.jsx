import { Link } from "react-router-dom";
const Button = ({
  children,
  href,
  to,
  replace = false,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-medium transition-all duration-200 rounded-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 hover-shine relative overflow-hidden cursor-pointer";
  const variants = {
    primary:
      "bg-violet-600 hover:bg-violet-700 text-white border border-transparent",
    outline:
      "bg-transparent border-2 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:border-violet-500 hover:text-violet-500",
    ghost:
      "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
  };
  const combinedClass = `${baseStyle} ${variants[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} replace={replace} className={combinedClass} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={combinedClass} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
};
export default Button;
