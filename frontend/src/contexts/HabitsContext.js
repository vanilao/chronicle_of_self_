import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useTimeTravel } from './TimeTravelContext';
import { calculateXPReward } from '../utils/levelingSystem';
import { getUserStorageKey, getCurrentUserId } from '../utils/userStorage';

const HabitsContext = createContext();

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
};

export const HabitsProvider = ({ children }) => {
  const { awardXP, user } = useAuth();
  const { currentDate } = useTimeTravel();
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [xpToast, setXpToast] = useState(null);

  useEffect(() => {
    // Load habits from user-specific localStorage
    const userId = getCurrentUserId();
    if (userId) {
      const habitsKey = getUserStorageKey(userId, 'habits');
      const storedHabits = localStorage.getItem(habitsKey);
      if (storedHabits) {
        setHabits(JSON.parse(storedHabits));
      } else {
        setHabits([]); // Fresh start for new user
      }
    } else {
      setHabits([]); // No user, no habits
    }
    setIsLoading(false);
  }, [user?.email]); // Reload when user changes

  const saveHabits = (updatedHabits) => {
    setHabits(updatedHabits);
    const userId = getCurrentUserId();
    if (userId) {
      const habitsKey = getUserStorageKey(userId, 'habits');
      localStorage.setItem(habitsKey, JSON.stringify(updatedHabits));
    }
  };

  const addHabit = (habitData) => {
    const newHabit = {
      id: Date.now().toString(),
      ...habitData,
      createdAt: new Date().toISOString(),
      completionHistory: {} // { 'YYYY-MM-DD': true/false }
    };
    const updatedHabits = [...habits, newHabit];
    saveHabits(updatedHabits);
    return newHabit;
  };

  const updateHabit = (habitId, updates) => {
    const updatedHabits = habits.map(habit =>
      habit.id === habitId ? { ...habit, ...updates } : habit
    );
    saveHabits(updatedHabits);
  };

  const deleteHabit = (habitId) => {
    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    saveHabits(updatedHabits);
  };

  const toggleHabitCompletion = (habitId, date) => {
    let xpAwarded = 0;
    let habitName = '';

    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const completionHistory = { ...habit.completionHistory };
        const wasCompleted = completionHistory[date];

        // Toggle completion for the date
        completionHistory[date] = !completionHistory[date];

        // Calculate XP with archetype bonus at completion time
        // Use baseXp (from CreateHabitModal) or fall back to xpReward
        const baseXP = habit.baseXp || habit.xpReward || 0;
        const { finalXP } = calculateXPReward(
          baseXP,
          habit.category,
          user?.archetypeCategory
        );

        // Award or remove XP
        if (!wasCompleted && completionHistory[date]) {
          // Completing the habit - award XP
          xpAwarded = finalXP;
          habitName = habit.name;
          if (awardXP && xpAwarded > 0) {
            awardXP(xpAwarded);
          }
        } else if (wasCompleted && !completionHistory[date]) {
          // Uncompleting the habit - remove XP
          xpAwarded = -finalXP;
          habitName = habit.name;
          if (awardXP && xpAwarded < 0) {
            awardXP(xpAwarded);
          }
        }

        return { ...habit, completionHistory };
      }
      return habit;
    });

    saveHabits(updatedHabits);

    // Show XP toast notification
    if (xpAwarded !== 0) {
      setXpToast({
        amount: xpAwarded,
        habitName: habitName
      });

      // Auto-dismiss toast after 3 seconds
      setTimeout(() => {
        setXpToast(null);
      }, 3000);
    }
  };

  const dismissXpToast = () => {
    setXpToast(null);
  };

  const getHabitStreak = useCallback((habitId) => {
    // Find the habit by ID
    const habit = habits.find(h => h.id === habitId);
    if (!habit || !habit.completionHistory) return 0;

    let streak = 0;
    const today = new Date(currentDate);

    // Count backwards from today
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      if (habit.completionHistory[dateStr]) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }, [habits, currentDate]);

  const value = {
    habits,
    isLoading,
    xpToast,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    getHabitStreak,
    dismissXpToast
  };

  return (
    <HabitsContext.Provider value={value}>
      {children}
    </HabitsContext.Provider>
  );
};
