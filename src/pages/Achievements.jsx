import TimelineSection from "../components/ui/TimelineSection";
import achievementsData from "../data/achievements.json";
import { useSEO } from "../hooks/useSEO";
const Achievements = () => {
  useSEO({
    title: "Achievements & Awards - Vivek J. Utture",
    description:
      "Explore my achievements, awards, and recognition, including problem-solving milestones, mentorship features, and other professional accomplishments.",
    keywords:
      "achievements, awards, recognition, honors, accomplishments, Star of Month, mentorship",
    canonical: "https://vivekjutture.com/achievements",
    applyOn: "/achievements",
  });

  return (
    <TimelineSection
      title="Honors & Achievements"
      data={achievementsData}
      gradient="from-violet-600 to-fuchsia-500"
      variant="achievements"
    />
  );
};
export default Achievements;
