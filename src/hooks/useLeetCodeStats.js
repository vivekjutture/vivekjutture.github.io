import { useEffect, useState } from "react";
import personalData from "../data/personal.json";

const API_BASE = "https://leetpulse-api.vercel.app/api/leetcode";

// Module-level cache of the in-flight (or resolved) request. Because it lives
// outside React, it survives StrictMode's dev double-mount and is shared by any
// component using this hook — so the stats are fetched exactly once per page
// load instead of being duplicated/aborted on every mount.
let statsPromise = null;

/**
 * Performs the actual network fetch (solved + contest endpoints) and maps the
 * response to the UI shape, falling back to static numbers on any failure.
 * The 8s timeout guards a slow API; it does NOT abort on component unmount, so
 * the shared request can finish and populate the cache.
 */
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

/**
 * Fetches live LeetCode stats from my own LeetPulse API (self-built project).
 * Falls back to static, hand-verified numbers if the request fails or is slow,
 * so the UI never shows a broken/empty state.
 */
export const useLeetCodeStats = () => {
  const fallback = personalData.leetcodeFallback || {};
  const username = personalData.leetcodeUsername;
  const [stats, setStats] = useState({
    solved: fallback.solved ?? null,
    rating: fallback.rating ?? null,
    isLive: false,
    // Only start in a loading state if we actually have a user to fetch.
    loading: Boolean(username),
  });

  useEffect(() => {
    if (!username) return;

    let active = true;
    // Start the request only if no other mount/component already did.
    if (!statsPromise) statsPromise = fetchLeetCodeStats(username);

    statsPromise.then((result) => {
      if (active) setStats(result);
    });

    // Don't abort the shared request on unmount — just stop updating this
    // instance, so the cache still gets populated for the next mount.
    return () => {
      active = false;
    };
  }, [username]);

  return stats;
};

export default useLeetCodeStats;
