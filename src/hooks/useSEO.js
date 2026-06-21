import { useEffect } from "react";

export const useSEO = ({
  title = "Vivek J. Utture | Software Engineer Portfolio",
  description = "Backend-focused Software Engineer building scalable, production-grade systems that handle 1M+ records with Java, Spring Boot & Microservices.",
  keywords = "software engineer, web developer, full stack developer, React, Java, Python, portfolio",
  canonical = "https://www.vivekjutture.com/",
  ogImage = "https://www.vivekjutture.com/my-image.webp",
  applyOn,
} = {}) => {
  useEffect(() => {
    const normalize = (p) => {
      if (!p) return "/";
      if (p === "/") return "/";
      return "/" + p.replace(/^\/+|\/+$/g, "");
    };

    if (applyOn !== undefined) {
      const current = normalize(window.location.pathname || "/");
      const target = normalize(applyOn);
      if (current !== target) return;
    }

    document.title = title;
    document.title = title;

    const descriptionMeta =
      document.querySelector("meta[name='description']") ||
      document.createElement("meta");
    descriptionMeta.name = "description";
    descriptionMeta.content = description;
    if (!descriptionMeta.parentElement)
      document.head.appendChild(descriptionMeta);

    const keywordsMeta =
      document.querySelector("meta[name='keywords']") ||
      document.createElement("meta");
    keywordsMeta.name = "keywords";
    keywordsMeta.content = keywords;
    if (!keywordsMeta.parentElement) document.head.appendChild(keywordsMeta);

    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property='${property}']`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    updateOGTag("og:title", title);
    updateOGTag("og:description", description);
    updateOGTag("og:url", canonical);
    updateOGTag("og:image", ogImage);

    const updateTwitterTag = (name, content) => {
      let tag = document.querySelector(`meta[name='${name}']`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    updateTwitterTag("twitter:title", title);
    updateTwitterTag("twitter:description", description);
    updateTwitterTag("twitter:image", ogImage);
  }, [title, description, keywords, canonical, ogImage, applyOn]);
};

export default useSEO;
