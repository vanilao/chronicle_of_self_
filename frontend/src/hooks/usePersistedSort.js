import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'habit-sort';
const DEFAULT_SORT = {
  sortBy: 'name',
  sortOrder: 'asc'
};

const SORT_OPTIONS = [
  { value: 'name', label: 'Name', icon: '📝' },
  { value: 'difficulty', label: 'Difficulty', icon: '⚡' },
  { value: 'createdDate', label: 'Created', icon: '📅' },
  { value: 'completionRate', label: 'Completion Rate', icon: '📊' },
  { value: 'currentStreak', label: 'Streak', icon: '🔥' }
];

const DIFFICULTY_ORDER = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };

export const usePersistedSort = (page = 'habits') => {
  const storageKey = `${STORAGE_KEY}-${page}`;
  
  const [sortConfig, setSortConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? { ...DEFAULT_SORT, ...JSON.parse(saved) } : DEFAULT_SORT;
    } catch (error) {
      console.warn('Error loading sort from localStorage:', error);
      return DEFAULT_SORT;
    }
  });

  // Save to localStorage whenever sort changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(sortConfig));
    } catch (error) {
      console.warn('Error saving sort to localStorage:', error);
    }
  }, [sortConfig, storageKey]);

  const updateSort = (sortBy) => {
    setSortConfig(prev => {
      // If same field, toggle order
      if (prev.sortBy === sortBy) {
        return {
          ...prev,
          sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
        };
      }
      // New field, default to asc
      return { sortBy, sortOrder: 'asc' };
    });
  };

  const getSortedHabits = useCallback((habits) => {
    if (!habits || habits.length === 0) return [];

    return [...habits].sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;

        case 'difficulty':
          comparison = DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
          break;

        case 'createdDate':
          comparison = new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
          break;

        case 'completionRate':
          const aRate = calculateCompletionRate(a);
          const bRate = calculateCompletionRate(b);
          comparison = aRate - bRate;
          break;

        case 'currentStreak':
          const aStreak = getHabitStreak(a.id);
          const bStreak = getHabitStreak(b.id);
          comparison = aStreak - bStreak;
          break;

        default:
          comparison = 0;
      }

      return sortConfig.sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [sortConfig]);

  const getSmartSortSuggestion = (activeFilters) => {
    // Smart suggestions based on current filters
    if (activeFilters.category !== 'All') {
      return {
        sortBy: 'completionRate',
        reason: 'See your best performing habits in this category'
      };
    }

    if (activeFilters.searchTerm) {
      return {
        sortBy: 'name',
        reason: 'Find matching habits more easily'
      };
    }

    if (activeFilters.difficulty !== 'All') {
      return {
        sortBy: 'currentStreak',
        reason: 'See your most consistent habits'
      };
    }

    // Default suggestions based on page
    if (page === 'dashboard') {
      return {
        sortBy: 'completionRate',
        reason: 'Focus on high-performing habits'
      };
    }

    return {
      sortBy: 'createdDate',
      reason: 'See your newest habits first'
    };
  };

  return {
    sortConfig,
    updateSort,
    getSortedHabits,
    SORT_OPTIONS,
    getSmartSortSuggestion
  };
};

// Helper functions (these would need to be imported from contexts/utils)
const calculateCompletionRate = (habit) => {
  if (!habit.completionHistory) return 0;
  
  const totalDays = Object.keys(habit.completionHistory).length;
  const completedDays = Object.values(habit.completionHistory).filter(Boolean).length;
  
  return totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
};

const getHabitStreak = (habitId) => {
  // This would need to be imported from HabitsContext
  return 0; // Placeholder
};
