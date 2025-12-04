import { useState, useEffect, useCallback } from "react";
import { UserAuth } from "../context/AuthContext";
import { getCurrentYear } from "../utils/date-utils";
import { getYearlyProgress } from "../api/services/goal-service";

/**
 * Generate all dates for a given year
 * @param {string} year - Year string (e.g., "2025")
 * @returns {string[]} Array of date strings in YYYY-MM-DD format
 */
const generateYearDates = (year) => {
  const dates = [];
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const yyyy = currentDate.getFullYear();
    const mm = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dd = String(currentDate.getDate()).padStart(2, "0");
    dates.push(`${yyyy}-${mm}-${dd}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

/**
 * Format date for display (e.g., "Jan 1", "Feb 15")
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @returns {string} Formatted date
 */
const formatDateLabel = (dateKey) => {
  const date = new Date(dateKey + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

/**
 * Custom hook for fetching yearly progress data
 * Fills in missing days with 0%
 * @param {string|null} year - Year to fetch (defaults to current year)
 * @param {number} refreshKey - Key to trigger refresh (changes trigger refetch)
 */
const useYearlyProgress = (year = null, refreshKey = 0) => {
  const { user, loading: authLoading } = UserAuth();
  const [progress, setProgress] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedYear = year || getCurrentYear();
  const userId = user?.uid;

  const fetchProgress = useCallback(
    async (isInitial = false) => {
      if (authLoading || !userId) {
        if (isInitial) setInitialLoading(false);
        return;
      }

      // Only show loading spinner on initial load
      if (isInitial) setInitialLoading(true);
      setError(null);

      const { progress: fetchedProgress, error: fetchError } =
        await getYearlyProgress(userId, selectedYear);

      if (fetchError) {
        setError(fetchError);
        if (isInitial) setInitialLoading(false);
        return;
      }

      // Create a map of existing progress data
      const progressMap = new Map();
      fetchedProgress.forEach((item) => {
        progressMap.set(item.date, item);
      });

      // Generate all dates for the year and fill in missing days
      const allDates = generateYearDates(selectedYear);
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      const fullProgress = allDates
        .filter((date) => date <= todayStr) // Only show dates up to today
        .map((date) => {
          const existing = progressMap.get(date);
          return {
            date,
            label: formatDateLabel(date),
            completed: existing?.completed || 0,
            total: existing?.total || 0,
            percentage: existing?.percentage || 0,
          };
        });

      setProgress(fullProgress);
      if (isInitial) setInitialLoading(false);
    },
    [userId, selectedYear, authLoading]
  );

  // Initial fetch
  useEffect(() => {
    if (!authLoading) {
      fetchProgress(true);
    }
  }, [authLoading, userId, selectedYear]);

  // Silent refetch when refreshKey changes (skip initial)
  useEffect(() => {
    if (!authLoading && refreshKey > 0) {
      fetchProgress(false);
    }
  }, [refreshKey]);

  return {
    progress,
    loading: initialLoading || authLoading,
    error,
    refetch: () => fetchProgress(false),
    year: selectedYear,
  };
};

export default useYearlyProgress;
