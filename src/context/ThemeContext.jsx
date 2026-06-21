import { useEffect, useLayoutEffect, useState } from "react";
import { ThemeContext } from "./theme-context";

const getInitialTheme = () => {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) setIsDark(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("theme-no-transition");
    root.classList.remove("light", "dark");
    root.classList.add(isDark ? "dark" : "light");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", isDark ? "#020617" : "#fdf8f2");
    const raf = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() =>
        root.classList.remove("theme-no-transition"),
      );
    });
    return () => window.cancelAnimationFrame(raf);
  }, [isDark]);

  const toggleTheme = () =>
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
