import { useState, useEffect, useCallback } from "react";
import { UserAuth } from "../context/AuthContext";
import { getTodayDateKey } from "../utils/date-utils";
import {
  getGoals,
  saveGoals,
  addGoal as addGoalService,
  deleteGoal as deleteGoalService,
  updateGoal as updateGoalService,
} from "../api/services/goal-service";

/**
 * Custom hook for managing goals with Firestore
 * Handles CRUD operations and syncs with database
 */
const useGoals = () => {
  const { user, loading: authLoading } = UserAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dateKey = getTodayDateKey();
  const userId = user?.uid;

  /**
   * Fetch goals from Firestore
   */
  const fetchGoals = useCallback(async () => {
    // Wait for auth to be ready and user to be authenticated
    if (authLoading || !userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { goals: fetchedGoals, error: fetchError } = await getGoals(
      userId,
      dateKey
    );

    if (fetchError) {
      setError(fetchError);
    } else {
      setGoals(fetchedGoals);
    }

    setLoading(false);
  }, [userId, dateKey, authLoading]);

  /**
   * Load goals on mount and when user/auth state changes
   */
  useEffect(() => {
    // Only fetch when auth is done loading
    if (!authLoading) {
      fetchGoals();
    }
  }, [fetchGoals, authLoading]);

  /**
   * Add a new goal
   * @param {string} text - Goal text
   */
  const addGoal = useCallback(
    async (text) => {
      if (!userId || !text.trim()) return;

      // Optimistic update
      const tempGoal = {
        id: Date.now().toString(),
        text: text.trim(),
        order: 0,
        completed: false,
        createdAt: new Date(),
      };

      setGoals((prev) => [tempGoal, ...prev]);

      const { error: addError } = await addGoalService(userId, dateKey, {
        text: text.trim(),
        order: 0,
      });

      if (addError) {
        setError(addError);
        // Revert on error
        await fetchGoals();
      }
    },
    [userId, dateKey, fetchGoals]
  );

  /**
   * Delete a goal
   * @param {string} goalId - Goal ID to delete
   */
  const deleteGoal = useCallback(
    async (goalId) => {
      if (!userId) return;

      // Optimistic update
      setGoals((prev) => prev.filter((g) => g.id !== goalId));

      const { error: deleteError } = await deleteGoalService(
        userId,
        dateKey,
        goalId
      );

      if (deleteError) {
        setError(deleteError);
        await fetchGoals();
      }
    },
    [userId, dateKey, fetchGoals]
  );

  /**
   * Toggle goal completed status
   * @param {string} goalId - Goal ID to toggle
   */
  const toggleCompleted = useCallback(
    async (goalId) => {
      if (!userId) return;

      // Optimistic update
      setGoals((prev) =>
        prev.map((g) =>
          g.id === goalId ? { ...g, completed: !g.completed } : g
        )
      );

      const goal = goals.find((g) => g.id === goalId);
      if (!goal) return;

      const { error: updateError } = await updateGoalService(
        userId,
        dateKey,
        goalId,
        { completed: !goal.completed }
      );

      if (updateError) {
        setError(updateError);
        await fetchGoals();
      }
    },
    [userId, dateKey, goals, fetchGoals]
  );

  /**
   * Update goal text
   * @param {string} goalId - Goal ID to update
   * @param {string} newText - New text content
   */
  const updateGoalText = useCallback(
    async (goalId, newText) => {
      if (!userId || !newText.trim()) return;

      // Optimistic update
      setGoals((prev) =>
        prev.map((g) => (g.id === goalId ? { ...g, text: newText.trim() } : g))
      );

      const { error: updateError } = await updateGoalService(
        userId,
        dateKey,
        goalId,
        { text: newText.trim() }
      );

      if (updateError) {
        setError(updateError);
        await fetchGoals();
      }
    },
    [userId, dateKey, fetchGoals]
  );

  /**
   * Reorder goals after drag and drop
   * @param {number} sourceIndex - Original index
   * @param {number} destinationIndex - New index
   */
  const reorderGoals = useCallback(
    async (sourceIndex, destinationIndex) => {
      if (!userId) return;

      const updatedGoals = Array.from(goals);
      const [movedGoal] = updatedGoals.splice(sourceIndex, 1);
      updatedGoals.splice(destinationIndex, 0, movedGoal);

      // Update order property
      const reorderedGoals = updatedGoals.map((goal, index) => ({
        ...goal,
        order: index,
      }));

      // Optimistic update
      setGoals(reorderedGoals);

      const { error: saveError } = await saveGoals(
        userId,
        dateKey,
        reorderedGoals
      );

      if (saveError) {
        setError(saveError);
        await fetchGoals();
      }
    },
    [userId, dateKey, goals, fetchGoals]
  );

  /**
   * Sort goals - incomplete first, then by order
   * @param {Object} a - First goal
   * @param {Object} b - Second goal
   * @returns {number} Sort order
   */
  const sortGoals = useCallback((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return a.order - b.order;
  }, []);

  /**
   * Get sorted goals
   */
  const sortedGoals = [...goals].sort(sortGoals);

  return {
    goals: sortedGoals,
    loading: loading || authLoading,
    error,
    addGoal,
    deleteGoal,
    toggleCompleted,
    updateGoalText,
    reorderGoals,
    refetch: fetchGoals,
  };
};

export default useGoals;
