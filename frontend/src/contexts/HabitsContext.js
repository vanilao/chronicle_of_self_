import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useTimeTravel } from './TimeTravelContext';
import { calculateXPReward } from '../utils/levelingSystem';
import { getUserStorageKey, getCurrentUserId } from '../utils/userStorage';
import {
  migrateAllHabits,
  getCompletionCount,
  calculateStreak
} from '../utils/habitHelpers';

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
        try {
          const parsedHabits = JSON.parse(storedHabits);
          // Migrate legacy data format on load
          const migratedHabits = migrateAllHabits(parsedHabits);
          setHabits(migratedHabits);

          // Save migrated data back to localStorage
          if (JSON.stringify(parsedHabits) !== JSON.stringify(migratedHabits)) {
            localStorage.setItem(habitsKey, JSON.stringify(migratedHabits));
          }
        } catch (error) {
          console.error('Error loading habits:', error);
          setHabits([]);
        }
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

  const checkForDuplicateHabit = (habitData, existingHabits) => {
    const { name, category } = habitData;
    
    if (!name || !category) return false;
    
    const newName = name?.toLowerCase().trim();
    
    // Check for exact name match (case-insensitive)
    const exactDuplicate = existingHabits.find(habit => {
      const habitName = habit.name?.toLowerCase().trim();
      return habitName === newName && habit.category === category;
    });
    
    if (exactDuplicate) return exactDuplicate;
    
    // Check for very similar names (to prevent near-duplicates)
    const similarDuplicate = existingHabits.find(habit => {
      const habitName = habit.name?.toLowerCase().trim();
      
      // Check if names are very similar (more than 80% match or one contains the other)
      if (habit.category === category) {
        // Check if one name contains the other
        if (habitName.includes(newName) || newName.includes(habitName)) {
          return true;
        }
        
        // Check for simple variations (plurals, small differences)
        const similarity = calculateStringSimilarity(habitName, newName);
        if (similarity > 0.8) {
          return true;
        }
      }
      
      return false;
    });
    
    return similarDuplicate;
  };

  const calculateStringSimilarity = (str1, str2) => {
    // Simple similarity calculation based on common words and length
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const levenshteinDistance = (str1, str2) => {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const addHabit = async (habitData) => {
    // Add delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 800));

    // Check for duplicate habits
    const duplicate = checkForDuplicateHabit(habitData, habits);
    if (duplicate) {
      throw new Error(`A habit named "${habitData.name}" already exists in the ${habitData.category} category!`);
    }
    
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

  const updateHabit = async (habitId, updates) => {
    // Add delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 800));

    const updatedHabits = habits.map(habit =>
      habit.id === habitId ? { ...habit, ...updates } : habit
    );
    saveHabits(updatedHabits);
  };

  const deleteHabit = async (habitId) => {
    // Add delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 800));

    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    saveHabits(updatedHabits);
  };

  const toggleHabitCompletion = async (habitId, date) => {
    // Add delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 400));

    let xpAwarded = 0;
    let habitName = '';

    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const completionHistory = { ...habit.completionHistory };
        const targetCompletions = habit.targetCompletions || 1;

        // Get current completions for the date using helper
        const completionCount = getCompletionCount(completionHistory, date);

        let newCompletions;

        if (completionCount === 0) {
          // First completion - add timestamp
          newCompletions = [new Date().toISOString()];
        } else if (completionCount < targetCompletions) {
          // Add another completion
          const currentCompletions = completionHistory[date] || [];
          // Ensure currentCompletions is an array before spreading
          const currentArray = Array.isArray(currentCompletions) ? currentCompletions : [];
          newCompletions = [...currentArray, new Date().toISOString()];
        } else {
          // Already completed target - remove all completions (toggle back to 0)
          newCompletions = [];
        }

        // Update completion history
        completionHistory[date] = newCompletions;

        // Calculate XP with archetype bonus at completion time
        const baseXP = habit.baseXp || habit.xpReward || 0;
        const { finalXP } = calculateXPReward(
          baseXP,
          habit.category,
          user?.archetypeCategory
        );

        // Award XP only when reaching the target
        const wasPreviouslyComplete = completionCount >= targetCompletions;
        const isNowComplete = newCompletions.length >= targetCompletions;

        if (!wasPreviouslyComplete && isNowComplete) {
          // Reached target - award XP
          xpAwarded = finalXP;
          habitName = habit.name;
          if (awardXP && xpAwarded > 0) {
            awardXP(xpAwarded);
          }
        } else if (wasPreviouslyComplete && !isNowComplete) {
          // Fell below target - remove XP
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

  // Memoize streak calculations for better performance
  const habitStreaks = useMemo(() => {
    const streaks = {};
    habits.forEach(habit => {
      streaks[habit.id] = calculateStreak(habit, currentDate);
    });
    return streaks;
  }, [habits, currentDate]);

  const getHabitStreak = useCallback((habitId) => {
    return habitStreaks[habitId] || 0;
  }, [habitStreaks]);

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
