import TimelineSection from "../components/ui/TimelineSection";
import educationData from "../data/education.json";
import { useSEO } from "../hooks/useSEO";
const Education = () => {
  useSEO({
    title: "Education - Vivek J. Utture | Qualifications",
    description:
      "Learn about my educational background and academic qualifications. Engineering degree with focus on software development and computer science.",
    keywords:
      "education, qualifications, degree, engineering, computer science, academic, learning",
    canonical: "https://vivekjutture.com/education",
    applyOn: "/education",
  });

  return (
    <TimelineSection
      title="Education Journey"
      data={educationData}
      gradient="from-violet-600 to-fuchsia-500"
      variant="education"
    />
  );
};
export default Education;
