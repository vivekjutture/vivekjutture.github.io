import { motion } from "framer-motion";
import { FaUserTie, FaServer, FaBrain, FaLightbulb } from "react-icons/fa";
import personalData from "../data/personal.json";
import { useSEO } from "../hooks/useSEO";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const About = () => {
  useSEO({
    title: "About - Vivek J. Utture | Software Engineer",
    description:
      "Learn about Vivek J. Utture's background, expertise, and approach to software engineering. Full-stack developer with experience in Java, Spring Boot, React, and cloud technologies.",
    keywords:
      "about, software engineer, Java, Spring Boot, React, backend development, microservices",
    canonical: "https://www.vivekjutture.com/about",
    applyOn: "/about",
  });
  const aboutCards = [
    {
      icon: FaUserTie,
      title: "The Professional",
      content:
        "I am a Software Engineer with a focus on backend excellence. I build production-grade systems that handle over 1 million records, prioritizing scalability, reliability, and clean architecture.",
    },
    {
      icon: FaServer,
      title: "Tech Stack",
      content:
        "My core expertise lies in Java, Spring Boot, and Microservices. I design enterprise-grade REST APIs and manage data with MySQL & MongoDB. I also bridge the gap to the frontend using React.js.",
    },
    {
      icon: FaBrain,
      title: "Problem Solving",
      content:
        "I don't just write code; I optimize it. With 1,350+ DSA problems solved and the LeetCode Guardian badge (global top 1.2%), I approach every challenge with a focus on edge cases, trade-offs, and algorithmic efficiency.",
    },
    {
      icon: FaLightbulb,
      title: "Impact & Mentorship",
      content:
        "Beyond code, I take ownership. From earning a 'Star of the Month' award for engineering impact to being featured at Times Square, New York as a mentor, I am driven by growth and community.",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 transition-colors duration-300 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative w-40 h-40 md:w-52 md:h-52">
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-violet-500 to-fuchsia-400 blur-xl opacity-40 animate-pulse"></div>

                <img
                  src={personalData.image}
                  alt="Vivek J Utture"
                  className="relative w-full h-full object-cover rounded-full shadow-xl"
                />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display bg-clip-text text-transparent bg-linear-to-r from-violet-600 to-fuchsia-400">
              About Me
            </h2>
            <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-400 font-sans">
              "I care deeply about writing clean, maintainable code that other
              engineers can easily understand, extend, and build upon."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            {aboutCards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="h-full"
              >
                <AboutCard
                  icon={card.icon}
                  title={card.title}
                  content={card.content}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const AboutCard = ({ icon: Icon, title, content }) => (
  <div
    className="relative p-8 h-full rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group
    bg-white dark:bg-slate-900/50 
    border-gray-200 dark:border-slate-800 
    hover:border-violet-500/30 dark:hover:border-violet-500/30"
  >
    <div
      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300
      bg-violet-50 dark:bg-slate-800 
      text-violet-600 dark:text-violet-400
      group-hover:bg-violet-600 group-hover:text-white"
    >
      <Icon size={28} />
    </div>

    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-display">
      {title}
    </h3>

    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
      {content}
    </p>
  </div>
);

export default About;
