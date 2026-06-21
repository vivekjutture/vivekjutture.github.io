import { useEffect, useState } from "react";
import personalData from "../data/personal.json";

const API_BASE = "https://www.leetpulse-api.vercel.app/api/leetcode";

let statsPromise = null;

const fetchLeetCodeStats = async (username) => {
  const fb = personalData.leetcodeFallback || {};
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const [solvedRes, contestRes] = await Promise.all([
      fetch(`${API_BASE}/solved/${username}`, { signal: controller.signal }),
      fetch(`${API_BASE}/contest/${username}`, { signal: controller.signal }),
    ]);

    const solvedData = solvedRes.ok ? await solvedRes.json() : null;
    const contestData = contestRes.ok ? await contestRes.json() : null;

    const solvedCount = solvedData?.solvedProblem;
    const topPercentage = contestData?.contestRanking?.topPercentage;

    return {
      solved:
        typeof solvedCount === "number"
          ? `${solvedCount.toLocaleString()}+`
          : fb.solved ?? null,
      rating:
        typeof topPercentage === "number"
          ? `Top ${topPercentage.toFixed(1)}%`
          : fb.rating ?? null,
      isLive: typeof solvedCount === "number",
      loading: false,
    };
  } catch {
    return {
      solved: fb.solved ?? null,
      rating: fb.rating ?? null,
      isLive: false,
      loading: false,
    };
  } finally {
    clearTimeout(timeout);
  }
};

export const useLeetCodeStats = () => {
  const fallback = personalData.leetcodeFallback || {};
  const username = personalData.leetcodeUsername;
  const [stats, setStats] = useState({
    solved: fallback.solved ?? null,
    rating: fallback.rating ?? null,
    isLive: false,
    loading: Boolean(username),
  });

  useEffect(() => {
    if (!username) return;

    let active = true;
    if (!statsPromise) statsPromise = fetchLeetCodeStats(username);

    statsPromise.then((result) => {
      if (active) setStats(result);
    });

    return () => {
      active = false;
    };
  }, [username]);

  return stats;
};

export default useLeetCodeStats;
