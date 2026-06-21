import Header from "./Header";
import Footer from "./Footer";
import AnimatedBackground from "../ui/AnimatedBackground";
import BackToTop from "../ui/BackToTop";
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      <Header />
      <AnimatedBackground />
      <main className="grow relative z-0 pt-20">
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-violet-100/20 via-transparent to-transparent dark:from-violet-900/10"></div>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};
export default Layout;
