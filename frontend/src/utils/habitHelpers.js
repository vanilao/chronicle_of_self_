/**
 * Habit Utility Helpers
 * Shared helper functions for habit management
 */

/**
 * Get the completion count for a specific date
 * Handles both array format (new) and boolean format (legacy)
 * @param {Object} completionHistory - The habit's completion history
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {number} Number of completions for that date
 */
export const getCompletionCount = (completionHistory, dateStr) => {
  if (!completionHistory?.[dateStr]) return 0;

  const completions = completionHistory[dateStr];

  // Handle array format (current)
  if (Array.isArray(completions)) {
    return completions.length;
  }

  // Handle legacy boolean format
  if (typeof completions === 'boolean') {
    return completions ? 1 : 0;
  }

  // Handle single timestamp (edge case)
  return completions ? 1 : 0;
};

/**
 * Check if a habit is completed for a specific date
 * @param {Object} completionHistory - The habit's completion history
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @param {number} targetCompletions - Target number of completions (default: 1)
 * @returns {boolean} Whether the habit is completed for that date
 */
export const isHabitCompletedForDate = (completionHistory, dateStr, targetCompletions = 1) => {
  const completionCount = getCompletionCount(completionHistory, dateStr);
  return completionCount >= targetCompletions;
};

/**
 * Migrate legacy completion history format to current array format
 * Converts boolean values to arrays of timestamps
 * @param {Object} completionHistory - The habit's completion history
 * @returns {Object} Migrated completion history
 */
export const migrateCompletionHistory = (completionHistory) => {
  if (!completionHistory) return {};

  const migratedHistory = {};

  Object.entries(completionHistory).forEach(([date, value]) => {
    // Already in array format
    if (Array.isArray(value)) {
      migratedHistory[date] = value;
    }
    // Legacy boolean format
    else if (typeof value === 'boolean') {
      migratedHistory[date] = value ? [new Date(date).toISOString()] : [];
    }
    // Single timestamp string (edge case)
    else if (typeof value === 'string') {
      migratedHistory[date] = [value];
    }
    // Any other truthy value
    else if (value) {
      migratedHistory[date] = [new Date(date).toISOString()];
    }
    // Falsy values
    else {
      migratedHistory[date] = [];
    }
  });

  return migratedHistory;
};

/**
 * Migrate a single habit's data format
 * @param {Object} habit - The habit object
 * @returns {Object} Migrated habit object
 */
export const migrateHabit = (habit) => {
  return {
    ...habit,
    completionHistory: migrateCompletionHistory(habit.completionHistory)
  };
};

/**
 * Migrate all habits' data format
 * @param {Array} habits - Array of habit objects
 * @returns {Array} Array of migrated habit objects
 */
export const migrateAllHabits = (habits) => {
  if (!Array.isArray(habits)) return [];
  return habits.map(migrateHabit);
};

/**
 * Calculate the current streak for a habit
 * @param {Object} habit - The habit object
 * @param {Date} currentDate - The current date
 * @returns {number} Current streak count
 */
export const calculateStreak = (habit, currentDate) => {
  if (!habit || !habit.completionHistory) return 0;

  let streak = 0;
  const today = new Date(currentDate);
  const targetCompletions = habit.targetCompletions || 1;

  // Count backwards from today
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const completionCount = getCompletionCount(habit.completionHistory, dateStr);

    if (completionCount >= targetCompletions) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

/**
 * Format date to YYYY-MM-DD string
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDateString = (date) => {
  return date.toISOString().split('T')[0];
};

/**
 * Get the last N days as Date objects
 * @param {number} count - Number of days to get
 * @param {Date} fromDate - Starting date (default: today)
 * @returns {Array<Date>} Array of Date objects
 */
export const getLastNDays = (count, fromDate = new Date()) => {
  const days = [];

  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(fromDate);
    date.setDate(date.getDate() - i);
    days.push(date);
  }

  return days;
};

/**
 * Validate habit name
 * @param {string} name - Habit name
 * @returns {string|null} Error message or null if valid
 */
export const validateHabitName = (name) => {
  if (!name?.trim()) {
    return 'Habit name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.trim().length > 100) {
    return 'Name must be less than 100 characters';
  }
  return null;
};

/**
 * Validate habit description
 * @param {string} description - Habit description
 * @returns {string|null} Error message or null if valid
 */
export const validateHabitDescription = (description) => {
  if (description && description.length > 200) {
    return 'Description must be less than 200 characters';
  }
  return null;
};

/**
 * Validate target completions
 * @param {number} targetCompletions - Target completions value
 * @returns {string|null} Error message or null if valid
 */
export const validateTargetCompletions = (targetCompletions) => {
  if (!targetCompletions || targetCompletions < 1) {
    return 'Target must be at least 1';
  }
  if (targetCompletions > 8) {
    return 'This target might be too ambitious. Consider starting smaller.';
  }
  if (!Number.isInteger(Number(targetCompletions))) {
    return 'Target must be a whole number';
  }
  return null;
};
