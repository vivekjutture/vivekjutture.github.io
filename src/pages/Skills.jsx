import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useSEO } from "../hooks/useSEO";
import {
  FcDatabase,
  FcDataConfiguration,
  FcGlobe,
  FcMindMap,
  FcTreeStructure,
  FcFlowChart,
} from "react-icons/fc";
import { GiArtificialIntelligence } from "react-icons/gi";
import skillsData from "../data/skills.json";

const iconMap = {
  FcDatabase,
  FcDataConfiguration,
  FcGlobe,
  FcMindMap,
  FcTreeStructure,
  FcFlowChart,
  GiArtificialIntelligence,
};

const SkillCard = ({ skill }) => {
  const isCustomIcon = skill.type === "icon";
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(
          textRef.current.scrollWidth > textRef.current.clientWidth,
        );
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [skill.name]);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative flex flex-col items-center justify-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 group h-26 w-full"
    >
      <div className="mb-2 text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center h-10 w-10 shrink-0">
        {isCustomIcon ? (
          (() => {
            const IconComponent = iconMap[skill.icon] || FcDatabase;
            return <IconComponent size={36} />;
          })()
        ) : (
          <i className={`${skill.icon} dark:text-white`}></i>
        )}
      </div>

      <div className="relative w-full flex justify-center">
        {isTruncated && (
          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-lg">
            {skill.name}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
          </div>
        )}

        <h3
          ref={textRef}
          className={`font-bold text-gray-800 dark:text-gray-200 font-sans text-center text-xs md:text-sm w-full truncate px-1 ${
            isTruncated ? "cursor-pointer" : "cursor-default"
          }`}
        >
          {skill.name}
        </h3>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  useSEO({
    title: "Skills - Vivek J. Utture | Technical Expertise",
    description:
      "Discover my technical skills and expertise. Proficient in Java, Spring Boot, React, Python, Machine Learning, and cloud technologies. Full-stack development capabilities.",
    keywords:
      "skills, technical expertise, Java, Spring Boot, React, Python, machine learning, cloud, full-stack",
    canonical: "https://vivekjutture.com/skills",
    applyOn: "/skills",
  });
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-6 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-fuchsia-500">
            Technical Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-sans text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise, from languages
            to system architecture.
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-display border-l-4 border-violet-500 pl-4">
                {category.category}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4"
              >
                {category.items.map((skill, i) => (
                  <motion.div variants={item} key={i}>
                    <SkillCard skill={skill} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Skills;
