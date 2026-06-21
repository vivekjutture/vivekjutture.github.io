import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Achievements from "./pages/Achievements";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const Portfolio = () => (
  <Layout>
    <div className="flex flex-col">
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="education">
        <Education />
      </section>
      <section id="achievements">
        <Achievements />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </div>
  </Layout>
);

function App() {
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, "");
    if (path && path !== "") {
      const element = document.getElementById(path);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, []);
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />

          <Route path="/about" element={<Portfolio />} />
          <Route path="/projects" element={<Portfolio />} />
          <Route path="/skills" element={<Portfolio />} />
          <Route path="/experience" element={<Portfolio />} />
          <Route path="/education" element={<Portfolio />} />
          <Route path="/achievements" element={<Portfolio />} />
          <Route path="/contact" element={<Portfolio />} />

          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
