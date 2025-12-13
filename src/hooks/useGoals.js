import { useState, useEffect, useCallback } from "react";
import { UserAuth } from "../context/AuthContext";
import { getTodayDateKey } from "../utils/date-utils";
import {
  getGoalsWithStatus,
  addGoal as addGoalService,
  updateGoal as updateGoalService,
  deleteGoal as deleteGoalService,
  reorderGoals as reorderGoalsService,
  toggleGoalComplete as toggleGoalCompleteService,
} from "../api/services/goal-service";

/**
 * Custom hook for managing goals with Firestore
 *
 * Uses two collections:
 * - Current Goals: Persistent goal list (text, order) - updates on add/edit/delete/reorder
 * - Daily Progress: Completion status per day - updates only on toggle complete
 *
 * Each new day starts with all goals uncompleted (fresh start)
 */
const useGoals = () => {
  const { user, loading: authLoading } = UserAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dateKey = getTodayDateKey();
  const userId = user?.uid;

  /**
   * Fetch current goals merged with today's completion status
   */
  const fetchGoals = useCallback(async () => {
    // Wait for auth to be ready and user to be authenticated
    if (authLoading || !userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { goals: fetchedGoals, error: fetchError } = await getGoalsWithStatus(
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
   * Add a new goal (updates current goals)
   * @param {string} text - Goal text
   */
  const addGoal = useCallback(
    async (text) => {
      if (!userId || !text.trim()) return;

      const goalId = Date.now().toString();

      // Optimistic update
      const tempGoal = {
        id: goalId,
        text: text.trim(),
        order: 0,
        completed: false,
        createdAt: new Date(),
      };

      setGoals((prev) => [tempGoal, ...prev]);

      const { error: addError } = await addGoalService(userId, {
        id: goalId,
        text: text.trim(),
      });

      if (addError) {
        setError(addError);
        await fetchGoals();
      }
    },
    [userId, fetchGoals]
  );

  /**
   * Delete a goal (updates current goals and removes from today's dailyProgress)
   * @param {string} goalId - Goal ID to delete
   */
  const deleteGoal = useCallback(
    async (goalId) => {
      if (!userId) return;

      // Optimistic update
      setGoals((prev) => prev.filter((g) => g.id !== goalId));

      const { error: deleteError } = await deleteGoalService(
        userId,
        goalId,
        dateKey
      );

      if (deleteError) {
        setError(deleteError);
        await fetchGoals();
      }
    },
    [userId, dateKey, fetchGoals]
  );

  /**
   * Toggle goal completed status (updates only daily progress)
   * @param {string} goalId - Goal ID to toggle
   */
  const toggleCompleted = useCallback(
    async (goalId) => {
      if (!userId) return;

      const goal = goals.find((g) => g.id === goalId);
      if (!goal) return;

      const newCompletedStatus = !goal.completed;
      // Get current total goals count to store with daily progress
      const totalGoals = goals.length;

      // Optimistic update
      setGoals((prev) =>
        prev.map((g) =>
          g.id === goalId ? { ...g, completed: newCompletedStatus } : g
        )
      );

      const { error: toggleError } = await toggleGoalCompleteService(
        userId,
        dateKey,
        goalId,
        newCompletedStatus,
        totalGoals
      );

      if (toggleError) {
        setError(toggleError);
        await fetchGoals();
      }
    },
    [userId, dateKey, goals, fetchGoals]
  );

  /**
   * Update goal text (updates current goals)
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

      const { error: updateError } = await updateGoalService(userId, goalId, {
        text: newText.trim(),
      });

      if (updateError) {
        setError(updateError);
        await fetchGoals();
      }
    },
    [userId, fetchGoals]
  );

  /**
   * Reorder goals after drag and drop (updates current goals)
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

      const { error: reorderError } = await reorderGoalsService(
        userId,
        reorderedGoals
      );

      if (reorderError) {
        setError(reorderError);
        await fetchGoals();
      }
    },
    [userId, goals, fetchGoals]
  );

  /**
   * Sort goals - incomplete first, then by order
   */
  const sortGoals = useCallback((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return (a.order ?? 0) - (b.order ?? 0);
  }, []);

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
