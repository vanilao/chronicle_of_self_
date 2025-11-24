// Habit System Constants
// Centralized constants for the habit tracking system

export const DIFFICULTY_LEVELS = [
  { name: 'Easy', xp: 10 },
  { name: 'Medium', xp: 25 },
  { name: 'Hard', xp: 50 }
];

export const FREQUENCY_TYPES = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly'
};

export const CATEGORIES = {
  BODY: 'Body',
  MIND: 'Mind',
  SPIRIT: 'Spirit',
  CREATIVE: 'Creative'
};

export const VALIDATION_LIMITS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 200,
  TARGET_COMPLETIONS_MIN: 1,
  TARGET_COMPLETIONS_MAX: 10,
  TARGET_COMPLETIONS_WARNING: 8
};

export const DEFAULT_HABIT_VALUES = {
  category: CATEGORIES.BODY,
  difficulty: 'Medium',
  frequencyType: FREQUENCY_TYPES.DAILY,
  frequency: FREQUENCY_TYPES.DAILY,
  selectedDays: [],
  notificationsEnabled: false,
  notificationTime: '08:00',
  targetCompletions: 1,
  customIcon: '',
  useCustomIcon: false,
  iconColor: '#1976d2'
};
