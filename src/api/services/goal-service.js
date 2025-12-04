/**
 * Goal service for Firestore CRUD operations
 */
import { getDoc, setDoc } from "firebase/firestore";
import { getDailyGoalsDocRef } from "../client";
import Goal from "../models/goal";

/**
 * Get goals for a specific date
 * @param {string} userId - User's UID
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @returns {Promise<{goals: Goal[], error: string|null}>}
 */
export const getGoals = async (userId, dateKey) => {
  try {
    const docRef = getDailyGoalsDocRef(userId, dateKey);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const goals = (data.goals || []).map((g) => Goal.fromFirestore(g));
      return { goals, error: null };
    }

    return { goals: [], error: null };
  } catch (error) {
    console.error("Error fetching goals:", error);
    return { goals: [], error: error.message };
  }
};

/**
 * Save goals array for a specific date
 * @param {string} userId - User's UID
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @param {Goal[]} goals - Array of Goal instances
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const saveGoals = async (userId, dateKey, goals) => {
  try {
    const docRef = getDailyGoalsDocRef(userId, dateKey);
    const goalsData = goals.map((g) =>
      g instanceof Goal ? g.toFirestore() : new Goal(g).toFirestore()
    );

    await setDoc(
      docRef,
      {
        goals: goalsData,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    return { success: true, error: null };
  } catch (error) {
    console.error("Error saving goals:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Add a new goal
 * @param {string} userId - User's UID
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @param {Object} goalData - Goal data (text, order, etc.)
 * @returns {Promise<{goal: Goal|null, error: string|null}>}
 */
export const addGoal = async (userId, dateKey, goalData) => {
  try {
    const { goals } = await getGoals(userId, dateKey);

    const newGoal = new Goal({
      id: Date.now().toString(),
      text: goalData.text,
      order: goalData.order ?? 0,
      completed: false,
      createdAt: new Date(),
    });

    const updatedGoals = [newGoal, ...goals];
    await saveGoals(userId, dateKey, updatedGoals);

    return { goal: newGoal, error: null };
  } catch (error) {
    console.error("Error adding goal:", error);
    return { goal: null, error: error.message };
  }
};

/**
 * Update a specific goal
 * @param {string} userId - User's UID
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @param {string} goalId - Goal ID to update
 * @param {Object} updates - Fields to update (text, completed, order)
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const updateGoal = async (userId, dateKey, goalId, updates) => {
  try {
    const { goals } = await getGoals(userId, dateKey);

    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        return new Goal({ ...goal, ...updates });
      }
      return goal;
    });

    await saveGoals(userId, dateKey, updatedGoals);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error updating goal:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete a goal
 * @param {string} userId - User's UID
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @param {string} goalId - Goal ID to delete
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const deleteGoal = async (userId, dateKey, goalId) => {
  try {
    const { goals } = await getGoals(userId, dateKey);
    const updatedGoals = goals.filter((goal) => goal.id !== goalId);

    await saveGoals(userId, dateKey, updatedGoals);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting goal:", error);
    return { success: false, error: error.message };
  }
};
