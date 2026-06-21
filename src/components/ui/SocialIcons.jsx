import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaCode,
} from "react-icons/fa";
import personalData from "../../data/personal.json";
const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  twitter: FaTwitter,
  youtube: FaYoutube,
  leetcode: FaCode,
};
const SocialIcons = ({ className = "", itemClassName = "" }) => {
  const { socials } = personalData;
  const socialLinks = Object.entries(socials);
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map(([key, url]) => {
        const Icon = iconMap[key.toLowerCase()];
        if (!Icon) return null;
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-xl transition-all duration-300
            bg-white dark:bg-slate-800 
            text-gray-600 dark:text-gray-400 
            hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white
            shadow-sm hover:shadow-lg hover:-translate-y-1 border border-gray-200 dark:border-slate-700 ${itemClassName}`}
            aria-label={key}
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
};
export default SocialIcons;
