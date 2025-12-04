/**
 * Date utility functions
 */

/**
 * Get today's date in YYYY-MM-DD format
 * Used as document key for daily goals in Firestore
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const getTodayDateKey = () => {
  return new Date().toISOString().split("T")[0];
};

/**
 * Get a specific date in YYYY-MM-DD format
 * @param {Date} date - Date object
 * @returns {string} Date string in YYYY-MM-DD format
 */
export const getDateKey = (date) => {
  return date.toISOString().split("T")[0];
};

/**
 * Get the current year as a string
 * @returns {string} Year string (e.g., "2025")
 */
export const getCurrentYear = () => {
  return new Date().getFullYear().toString();
};
