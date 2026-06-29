import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaLaptopCode,
  FaTrophy,
  FaStar,
  FaAward,
} from "react-icons/fa";
import {
  FcBriefcase,
  FcGraduationCap,
  FcDepartment,
  FcGlobe,
  FcLibrary,
} from "react-icons/fc";

import Modal from "./Modal";
import {
  ProjectSpotlight,
  GradientBorder,
  NeonPulse,
  DefaultWrapper,
} from "./CardEffects";

const iconMap = {
  FaBriefcase: FcBriefcase,
  FaLaptopCode: FaLaptopCode,
  FaTrophy: FaTrophy,
  FaStar: FaStar,
  FaAward: FaAward,
  FaGraduationCap: FcGraduationCap,
  FaSchool: FcLibrary,
};

const colorMap = {
  FaBriefcase:
    "bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800",
  FaLaptopCode:
    "bg-violet-50 dark:bg-violet-900/10 border-violet-100 dark:border-violet-800",
  FaTrophy:
    "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-800",
  FaStar:
    "bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800",
  FaAward:
    "bg-pink-50 dark:bg-pink-900/10 border-pink-100 dark:border-pink-800",
  FaGraduationCap:
    "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800",
  FaSchool:
    "bg-teal-50 dark:bg-teal-900/10 border-teal-100 dark:border-teal-800",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TimelineItem = ({ item, index, onOpen, EffectWrapper }) => {
  const descRef = useRef(null);

  const tags = Array.isArray(item?.tags) ? item.tags : [];
  const description = item?.description || "";
  const title = item?.degree || item?.role || item?.title || "No Title";
  const institution = item?.institution || item?.company || "";
  const period = item?.period || "";
  const iconKey = item?.icon || "";

  const maxVisibleTags = 4;
  const visibleTags = tags.slice(0, maxVisibleTags);
  const hiddenTagCount = Math.max(0, tags.length - maxVisibleTags);

  const [isDescTruncated, setIsDescTruncated] = useState(false);

  const IconComponent = iconMap[iconKey] || FcGlobe;
  const styleClasses =
    colorMap[iconKey] ||
    "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700";
  const isOdd = index & 1;

  const checkTruncation = () => {
    if (descRef.current) {
      setIsDescTruncated(
        descRef.current.scrollHeight > descRef.current.clientHeight,
      );
    }
  };

  useLayoutEffect(() => {
    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [item]);

  const showReadMore = isDescTruncated || hiddenTagCount > 0;

  return (
    <motion.div
      variants={itemVariants}
      className={`relative mb-12 w-full md:w-1/2 pl-16 md:pl-0 group ${
        isOdd ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
      }`}
    >
      <div
        className={`absolute top-6 w-5 h-5 rounded-full border-4 transition-all duration-300 z-20 shadow-sm bg-gray-50 dark:bg-slate-950 border-gray-300 dark:border-slate-700 group-hover:border-violet-500 dark:group-hover:border-violet-500 left-3.75 ${
          isOdd ? "md:left-auto md:-right-2.5" : "md:-left-2.5"
        }`}
      ></div>

      <EffectWrapper>
        <div className="h-full flex flex-col items-start text-left p-6 font-sans">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4 w-full">
            <div
              className={`shrink-0 p-3 rounded-xl border self-start ${styleClasses} group-hover:scale-110 transition-transform duration-300 origin-center`}
            >
              <IconComponent size={28} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white font-display">
                {title}
              </h3>
              {institution && (
                <h4 className="font-medium mt-1 text-gray-600 dark:text-slate-400">
                  {institution}
                </h4>
              )}
            </div>
            {period && (
              <span className="shrink-0 flex items-center gap-2 text-xs font-medium px-2.5 py-1 rounded-full border bg-gray-100 dark:bg-slate-950 border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 self-start sm:self-auto whitespace-nowrap h-fit mt-0.5">
                <FaCalendarAlt size={12} className="text-gray-500" />
                {period}
              </span>
            )}
          </div>

          {description && (
            <div className="mb-4 relative w-full">
              <p
                ref={descRef}
                className="leading-relaxed text-gray-600 dark:text-slate-300 line-clamp-3 text-sm"
              >
                {description}
              </p>
            </div>
          )}

          {tags.length > 0 && (
            <div className="mt-auto w-full">
              <div className="flex gap-2 items-center flex-wrap justify-start">
                {visibleTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-md border transition-colors whitespace-nowrap text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20"
                  >
                    {tag}
                  </span>
                ))}
                {hiddenTagCount > 0 && (
                  <span className="px-2 py-1 text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    +{hiddenTagCount}
                  </span>
                )}
              </div>
            </div>
          )}

          {showReadMore && (
            <button
              onClick={() => onOpen(item)}
              className="text-violet-600 dark:text-violet-400 text-xs font-bold mt-4 flex items-center gap-1 hover:underline cursor-pointer"
            >
              Read More <FaArrowRight size={10} />
            </button>
          )}
        </div>
      </EffectWrapper>
    </motion.div>
  );
};

const TimelineSection = ({ title, data = [], gradient, variant }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const getEffectWrapper = () => {
    switch (variant) {
      case "experience":
        return GradientBorder;
      case "education":
        return ProjectSpotlight;
      case "achievements":
        return (props) => (
          <NeonPulse
            {...props}
            borderGradient="from-violet-400 to-fuchsia-500"
          />
        );
      default:
        return DefaultWrapper;
    }
  };
  const ActiveWrapper = getEffectWrapper();

  if (!data || data.length === 0) return null;

  return (
    <div className="min-h-screen pt-20 pb-20 px-6 transition-colors duration-300 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-4xl md:text-5xl font-bold text-center mb-16 font-display bg-clip-text text-transparent bg-linear-to-r ${gradient}`}
        >
          {title}
        </motion.h2>

        <div className="relative">
          <div className="absolute top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-800 left-6 md:left-1/2 md:-translate-x-1/2"></div>
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[...data].reverse().map((item, index) => (
              <TimelineItem
                key={item?.id || index}
                item={item}
                index={index}
                onOpen={setSelectedItem}
                EffectWrapper={ActiveWrapper}
              />
            ))}
          </motion.div>
        </div>

        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={
            selectedItem?.degree ||
            selectedItem?.role ||
            selectedItem?.title ||
            "Details"
          }
        >
          {selectedItem && (
            <div className="space-y-6 font-sans">
              {(() => {
                const IconComp = iconMap[selectedItem.icon] || FcGlobe;
                const fullColorClasses =
                  colorMap[selectedItem.icon] ||
                  "bg-violet-50 dark:bg-violet-900/10 border-violet-100 dark:border-violet-800";
                return (
                  <div
                    className={`w-full h-48 rounded-xl flex items-center justify-center border ${fullColorClasses}`}
                  >
                    <IconComp size={80} />
                  </div>
                );
              })()}

              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2 font-display">
                  About
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                  {selectedItem.description || "No description provided."}
                </p>
              </div>

              <div>
                <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                    <span className="font-bold text-gray-800 dark:text-white text-lg">
                      {selectedItem.institution || selectedItem.company}
                    </span>
                    {selectedItem.period && (
                      <span className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt /> {selectedItem.period}
                      </span>
                    )}
                  </div>
                </div>
                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 font-display">
                      Skills & Tech
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-sm font-medium rounded-full bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default TimelineSection;
