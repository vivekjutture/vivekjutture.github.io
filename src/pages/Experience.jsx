import TimelineSection from "../components/ui/TimelineSection";
import experienceData from "../data/experience.json";
import { useSEO } from "../hooks/useSEO";
const Experience = () => {
  useSEO({
    title: "Professional Experience - Vivek J. Utture",
    description:
      "Explore my professional experience and career journey as a backend-focused Software Engineer with expertise in backend development, microservices, and scalable systems.",
    keywords:
      "experience, professional, software engineer, backend, microservices, career, employment",
    canonical: "https://vivekjutture.com/experience",
    applyOn: "/experience",
  });

  return (
    <TimelineSection
      title="Professional Experience"
      data={experienceData}
      gradient="from-violet-600 to-fuchsia-500"
      variant="experience"
    />
  );
};
export default Experience;
