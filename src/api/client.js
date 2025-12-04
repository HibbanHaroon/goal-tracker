/**
 * Firestore client and helper functions
 */
import { doc, collection } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Get document reference for a user's daily goals
 * @param {string} userId - User's UID
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @returns {DocumentReference} Firestore document reference
 */
export const getDailyGoalsDocRef = (userId, dateKey) => {
  return doc(db, "users", userId, "dailyGoals", dateKey);
};

/**
 * Get collection reference for a user's all daily goals
 * @param {string} userId - User's UID
 * @returns {CollectionReference} Firestore collection reference
 */
export const getDailyGoalsCollectionRef = (userId) => {
  return collection(db, "users", userId, "dailyGoals");
};

export { db };
