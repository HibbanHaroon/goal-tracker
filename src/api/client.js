/**
 * Firestore client and helper functions
 */
import { doc, collection } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Get document reference for user's current goals
 * Path: users/{userId}/goals/current
 * @param {string} userId - User's UID
 * @returns {DocumentReference} Firestore document reference
 */
export const getCurrentGoalsDocRef = (userId) => {
  return doc(db, "users", userId, "goals", "current");
};

/**
 * Get document reference for a user's daily progress
 * Path: users/{userId}/dailyProgress/{date}
 * @param {string} userId - User's UID
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @returns {DocumentReference} Firestore document reference
 */
export const getDailyProgressDocRef = (userId, dateKey) => {
  return doc(db, "users", userId, "dailyProgress", dateKey);
};

/**
 * Get collection reference for a user's all daily progress entries
 * Path: users/{userId}/dailyProgress
 * @param {string} userId - User's UID
 * @returns {CollectionReference} Firestore collection reference
 */
export const getDailyProgressCollectionRef = (userId) => {
  return collection(db, "users", userId, "dailyProgress");
};

export { db };
