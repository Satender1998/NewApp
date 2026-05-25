import axios from "axios";
import { useCallback, useEffect, useState } from "react";

// API endpoints for each story feed, keyed by the tab name used in the UI.
const FEEDS = {
  top: "/api/topstories",
  new: "/api/newstories",
  best: "/api/beststories",
};

const EMPTY_DATA = { top: [], new: [], best: [] };

// Fetches the top/new/best Hacker News feeds and exposes their combined loading
// and error state. The three requests are treated as a single unit: while any is
// in flight `loading` is true, and if any fails `error` is set. `retry` re-runs
// all three fetches.
export function useStories() {
  const [data, setData] = useState(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const entries = await Promise.all(
        Object.entries(FEEDS).map(async ([key, url]) => {
          const res = await axios.get(url);
          return [key, res.data?.stories ?? []];
        })
      );
      setData(Object.fromEntries(entries));
    } catch (err) {
      console.error("Failed to load stories:", err);
      setError("Unable to load stories. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return { data, loading, error, retry: fetchStories };
}
