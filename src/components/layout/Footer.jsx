import data from "../../data/personal.json";
import SocialIcons from "../ui/SocialIcons";
const Footer = () => {
  const handleFooterNav = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
      window.history.pushState(null, "", id === "home" ? "/" : `/${id}`);
    }
  };
  const footerSections = [
    {
      title: "Main",
      links: [
        { name: "Home", path: "home" },
        { name: "About", path: "about" },
        { name: "Contact", path: "contact" },
      ],
    },
    {
      title: "Portfolio",
      links: [
        { name: "Skills", path: "skills" },
        { name: "Projects", path: "projects" },
        { name: "Experience", path: "experience" },
        { name: "Education", path: "education" },
        { name: "Achievements", path: "achievements" },
      ],
    },
    {
      title: "Meta",
      links: [
        { name: "Sitemap", path: "/sitemap.xml", external: true },
        { name: "Robots.txt", path: "/robots.txt", external: true },
      ],
    },
  ];
  return (
    <footer className="bg-gray-50 dark:bg-slate-900 pt-16 pb-12 border-t border-gray-200 dark:border-slate-800 font-sans transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-12">
          <div className="md:col-span-5 space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <button
              onClick={() => (window.location.href = "/")}
              className="text-2xl font-bold font-display tracking-tighter text-gray-900 dark:text-white cursor-pointer"
              aria-label="Go to home"
            >
              Dev
              <span className="text-violet-600">.</span>
            </button>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              {data.tagline}
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center md:text-left">
            {footerSections.map((section) => (
              <div
                key={section.title}
                className="flex flex-col items-center md:items-start"
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-base">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-colors"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <button
                          onClick={() => handleFooterNav(link.path)}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-violet-600 transition-colors cursor-pointer"
                        >
                          {link.name}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}{" "}
            <div className="flex flex-col items-center text-center">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-base">
                Connect
              </h4>
              <div className="flex justify-center md:justify-start w-full">
                <SocialIcons />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 dark:border-slate-800 items-center text-center">
          <p className="text-sm text-gray-500">
            Copyright &copy; {new Date().getFullYear()} | Made with ❤️ by{" "}
            {data.name} | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
