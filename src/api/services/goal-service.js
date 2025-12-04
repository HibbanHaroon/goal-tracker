/**
 * Goal service for Firestore CRUD operations
 * Uses two collections:
 * - goals/current: Persistent goal list (text, order)
 * - dailyProgress/{date}: Daily completion status (completed goal IDs)
 */
import {
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {
  getCurrentGoalsDocRef,
  getDailyProgressDocRef,
  getDailyProgressCollectionRef,
} from "../client";
import Goal from "../models/goal";

// ============================================
// CURRENT GOALS OPERATIONS
// ============================================

/**
 * Get user's current goal list
 * @param {string} userId - User's UID
 * @returns {Promise<{goals: Goal[], error: string|null}>}
 */
export const getCurrentGoals = async (userId) => {
  try {
    const docRef = getCurrentGoalsDocRef(userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const goals = (data.items || []).map((g) => Goal.fromFirestore(g));
      return { goals, error: null };
    }

    return { goals: [], error: null };
  } catch (error) {
    console.error("Error fetching current goals:", error);
    return { goals: [], error: error.message };
  }
};

/**
 * Save user's current goal list
 * @param {string} userId - User's UID
 * @param {Goal[]} goals - Array of Goal instances
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const saveCurrentGoals = async (userId, goals) => {
  try {
    const docRef = getCurrentGoalsDocRef(userId);
    const items = goals.map((g, index) => ({
      id: g.id,
      text: g.text,
      order: index,
      createdAt: g.createdAt || new Date(),
    }));

    await setDoc(docRef, {
      items,
      updatedAt: new Date(),
    });

    return { success: true, error: null };
  } catch (error) {
    console.error("Error saving current goals:", error);
    return { success: false, error: error.message };
  }
};

// ============================================
// DAILY PROGRESS OPERATIONS
// ============================================

/**
 * Get completed goal IDs for a specific date
 * @param {string} userId - User's UID
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @returns {Promise<{completedIds: string[], error: string|null}>}
 */
export const getDailyProgress = async (userId, dateKey) => {
  try {
    const docRef = getDailyProgressDocRef(userId, dateKey);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return { completedIds: data.completedGoals || [], error: null };
    }

    return { completedIds: [], error: null };
  } catch (error) {
    console.error("Error fetching daily progress:", error);
    return { completedIds: [], error: error.message };
  }
};

/**
 * Save completed goal IDs for a specific date
 * @param {string} userId - User's UID
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @param {string[]} completedIds - Array of completed goal IDs
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const saveDailyProgress = async (userId, dateKey, completedIds) => {
  try {
    const docRef = getDailyProgressDocRef(userId, dateKey);

    await setDoc(docRef, {
      completedGoals: completedIds,
      updatedAt: new Date(),
    });

    return { success: true, error: null };
  } catch (error) {
    console.error("Error saving daily progress:", error);
    return { success: false, error: error.message };
  }
};

// ============================================
// COMBINED OPERATIONS
// ============================================

/**
 * Get goals with today's completion status merged
 * @param {string} userId - User's UID
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @returns {Promise<{goals: Object[], error: string|null}>}
 */
export const getGoalsWithStatus = async (userId, dateKey) => {
  try {
    // Fetch both current goals and daily progress in parallel
    const [goalsResult, progressResult] = await Promise.all([
      getCurrentGoals(userId),
      getDailyProgress(userId, dateKey),
    ]);

    if (goalsResult.error) {
      return { goals: [], error: goalsResult.error };
    }

    const completedIds = new Set(progressResult.completedIds || []);

    // Merge completion status into goals (convert to plain objects)
    const goalsWithStatus = goalsResult.goals.map((goal) => ({
      id: goal.id,
      text: goal.text,
      order: goal.order,
      createdAt: goal.createdAt,
      completed: completedIds.has(goal.id),
    }));

    return { goals: goalsWithStatus, error: null };
  } catch (error) {
    console.error("Error fetching goals with status:", error);
    return { goals: [], error: error.message };
  }
};

/**
 * Toggle a goal's completion status for today
 * @param {string} userId - User's UID
 * @param {string} dateKey - Date in YYYY-MM-DD format
 * @param {string} goalId - Goal ID to toggle
 * @param {boolean} completed - New completion status
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const toggleGoalComplete = async (
  userId,
  dateKey,
  goalId,
  completed
) => {
  try {
    if (!userId || !dateKey || !goalId) {
      console.error("toggleGoalComplete: Missing required params", {
        userId,
        dateKey,
        goalId,
      });
      return { success: false, error: "Missing required parameters" };
    }

    const { completedIds, error: fetchError } = await getDailyProgress(
      userId,
      dateKey
    );

    if (fetchError) {
      console.error(
        "toggleGoalComplete: Error fetching daily progress",
        fetchError
      );
    }

    let updatedIds;
    if (completed) {
      // Add to completed list
      updatedIds = [...new Set([...completedIds, goalId])];
    } else {
      // Remove from completed list
      updatedIds = completedIds.filter((id) => id !== goalId);
    }

    const result = await saveDailyProgress(userId, dateKey, updatedIds);

    if (result.error) {
      console.error(
        "toggleGoalComplete: Error saving daily progress",
        result.error
      );
    }

    return result;
  } catch (error) {
    console.error("Error toggling goal complete:", error);
    return { success: false, error: error.message };
  }
};

// ============================================
// GOAL CRUD OPERATIONS (Updates Current Goals)
// ============================================

/**
 * Add a new goal to current goals
 * @param {string} userId - User's UID
 * @param {Object} goalData - Goal data (id, text)
 * @returns {Promise<{goal: Goal|null, error: string|null}>}
 */
export const addGoal = async (userId, goalData) => {
  try {
    const { goals, error: fetchError } = await getCurrentGoals(userId);

    if (fetchError) {
      return { goal: null, error: fetchError };
    }

    const newGoal = new Goal({
      id: goalData.id || Date.now().toString(),
      text: goalData.text,
      order: 0,
      createdAt: new Date(),
    });

    // Add new goal at the beginning
    const updatedGoals = [newGoal, ...goals];
    await saveCurrentGoals(userId, updatedGoals);

    return { goal: newGoal, error: null };
  } catch (error) {
    console.error("Error adding goal:", error);
    return { goal: null, error: error.message };
  }
};

/**
 * Update a goal's text in current goals
 * @param {string} userId - User's UID
 * @param {string} goalId - Goal ID to update
 * @param {Object} updates - Fields to update (text)
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const updateGoal = async (userId, goalId, updates) => {
  try {
    const { goals } = await getCurrentGoals(userId);

    const updatedGoals = goals.map((goal) => {
      if (goal.id === goalId) {
        return new Goal({ ...goal, ...updates });
      }
      return goal;
    });

    await saveCurrentGoals(userId, updatedGoals);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error updating goal:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Delete a goal from current goals
 * Also removes the goal ID from today's dailyProgress
 * @param {string} userId - User's UID
 * @param {string} goalId - Goal ID to delete
 * @param {string} dateKey - Today's date key (optional, for cleaning dailyProgress)
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const deleteGoal = async (userId, goalId, dateKey = null) => {
  try {
    if (!goalId) {
      return { success: false, error: "Goal ID is required" };
    }

    const { goals, error: fetchError } = await getCurrentGoals(userId);

    if (fetchError) {
      return { success: false, error: fetchError };
    }

    const updatedGoals = goals.filter((goal) => goal.id !== goalId);

    // Only save if something was actually deleted
    if (updatedGoals.length === goals.length) {
      console.warn("Goal not found for deletion:", goalId);
      return { success: false, error: "Goal not found" };
    }

    await saveCurrentGoals(userId, updatedGoals);

    // Also remove from today's dailyProgress if dateKey provided
    if (dateKey) {
      const { completedIds } = await getDailyProgress(userId, dateKey);
      if (completedIds.includes(goalId)) {
        const updatedIds = completedIds.filter((id) => id !== goalId);
        await saveDailyProgress(userId, dateKey, updatedIds);
      }
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting goal:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Reorder goals in current goals
 * @param {string} userId - User's UID
 * @param {Goal[]} reorderedGoals - Goals in new order
 * @returns {Promise<{success: boolean, error: string|null}>}
 */
export const reorderGoals = async (userId, reorderedGoals) => {
  try {
    await saveCurrentGoals(userId, reorderedGoals);
    return { success: true, error: null };
  } catch (error) {
    console.error("Error reordering goals:", error);
    return { success: false, error: error.message };
  }
};

// ============================================
// YEARLY PROGRESS
// ============================================

/**
 * Get yearly progress data for graph
 * @param {string} userId - User's UID
 * @param {string} year - Year string (e.g., "2025")
 * @returns {Promise<{progress: Array, error: string|null}>}
 */
export const getYearlyProgress = async (userId, year) => {
  try {
    const collectionRef = getDailyProgressCollectionRef(userId);
    const snapshot = await getDocs(collectionRef);

    const { goals } = await getCurrentGoals(userId);
    const totalGoals = goals.length;

    const progress = [];
    snapshot.forEach((doc) => {
      // Filter by year
      if (doc.id.startsWith(year)) {
        const data = doc.data();
        const completed = (data.completedGoals || []).length;
        progress.push({
          date: doc.id,
          completed,
          total: totalGoals,
          percentage:
            totalGoals > 0 ? Math.round((completed / totalGoals) * 100) : 0,
        });
      }
    });

    // Sort by date
    progress.sort((a, b) => a.date.localeCompare(b.date));

    return { progress, error: null };
  } catch (error) {
    console.error("Error fetching yearly progress:", error);
    return { progress: [], error: error.message };
  }
};
