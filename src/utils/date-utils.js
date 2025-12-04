/**
 * Date utility functions
 */

/**
 * Get today's date in YYYY-MM-DD format (local timezone)
 * Used as document key for daily goals in Firestore
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const getTodayDateKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Get a specific date in YYYY-MM-DD format (local timezone)
 * @param {Date} date - Date object
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/**
 * Get the current year as a string
 * @returns {string} Year string (e.g., "2025")
 */
export const getCurrentYear = () => {
  return new Date().getFullYear().toString();
};
