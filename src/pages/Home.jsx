import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaArrowRight, FaEnvelope } from "react-icons/fa";
import personalInfo from "../data/personal.json";
import Button from "../components/ui/Button";
import SocialIcons from "../components/ui/SocialIcons";
import { useSEO } from "../hooks/useSEO";
import { useLeetCodeStats } from "../hooks/useLeetCodeStats";

const Typewriter = ({ words, delay = 100, deleteDelay = 50 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    const atWordEnd = !reverse && subIndex === words[index].length + 1;
    const atWordStart = reverse && subIndex === 0;

    const stepDelay = atWordEnd
      ? 1200 // pause on the fully typed word
      : atWordStart
        ? 400 // brief pause before the next word
        : Math.max(reverse ? deleteDelay : delay, parseInt(Math.random() * 350));

    const timeout = setTimeout(() => {
      if (atWordEnd) {
        setReverse(true);
      } else if (atWordStart) {
        setReverse(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      }
    }, stepDelay);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, delay, deleteDelay]);

  return (
    <span className="inline-block min-h-[1.2em]">
      {words[index].substring(0, subIndex)}
      <span
        className={`ml-1 border-r-2 border-violet-500 ${
          blink ? "opacity-100" : "opacity-0"
        }`}
      >
        &nbsp;
      </span>
    </span>
  );
};

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", id === "home" ? "/" : `/${id}`);
  }
};

const StatCard = ({ value, label, live }) => (
  <div className="relative w-[calc(50%-0.375rem)] sm:w-48 flex flex-col items-center justify-center rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm px-3 py-4 md:py-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40">
    {live && (
      <span className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-green-500">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
        </span>
        Live
      </span>
    )}
    <span className="text-2xl md:text-3xl font-bold font-display bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-fuchsia-500">
      {value}
    </span>
    <span className="mt-1 text-[11px] md:text-xs font-medium text-gray-500 dark:text-gray-400 text-center leading-tight">
      {label}
    </span>
  </div>
);

const Home = () => {
  useSEO({ applyOn: "/" });

  const leet = useLeetCodeStats();
  const roles =
    personalInfo.roles && personalInfo.roles.length
      ? personalInfo.roles
      : [personalInfo.role, "Problem Solver"];

  const resolveStat = (stat) => {
    if (stat.live === "solved") return leet.solved ?? stat.value;
    if (stat.live === "rating") return leet.rating ?? stat.value;
    return stat.value;
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden flex flex-col justify-center">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <h1 className="font-bold font-display mb-6 tracking-tight text-gray-900 dark:text-white">
            <span className="block text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-2 font-medium">
              Hey, I'm
            </span>

            <span className="block text-5xl md:text-7xl text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-fuchsia-400 pb-2">
              {personalInfo.name}
            </span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-display text-gray-700 dark:text-gray-300 mb-8 font-light h-16 md:h-auto">
            <Typewriter words={roles} />
          </h2>

          <p className="text-lg md:text-xl font-sans text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {personalInfo.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-sans mb-10">
            <Button
              onClick={() => scrollToSection("projects")}
              variant="primary"
              className="px-8 py-3.5 rounded-full"
            >
              View Projects <FaArrowRight size={14} />
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="px-8 py-3.5 rounded-full hover:border-violet-500 hover:text-violet-500 dark:hover:text-violet-400"
            >
              <FaEnvelope size={15} /> Get in Touch
            </Button>
            <Button
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              className="px-8 py-3.5 rounded-full"
            >
              <FaDownload size={14} /> Resume
            </Button>
          </div>

          <div className="flex justify-center mb-12">
            <SocialIcons />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-2xl mx-auto"
          >
            {personalInfo.stats?.map((stat) => (
              <StatCard
                key={stat.label}
                value={resolveStat(stat)}
                label={stat.label}
                live={!!stat.live && leet.isLive}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
