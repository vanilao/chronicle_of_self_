/**
 * Achievements System
 * Defines and calculates user achievements based on habits and progress
 */

// Achievement definitions
export const ACHIEVEMENTS = [
  {
    id: 'first_habit',
    name: 'First Steps',
    description: 'Create your first habit',
    icon: 'Star',
    check: (stats) => stats.totalHabits >= 1
  },
  {
    id: 'habit_collector',
    name: 'Habit Collector',
    description: 'Create 5 habits',
    icon: 'Collections',
    check: (stats) => stats.totalHabits >= 5
  },
  {
    id: 'first_completion',
    name: 'Quest Begun',
    description: 'Complete your first habit',
    icon: 'CheckCircle',
    check: (stats) => stats.totalCompletions >= 1
  },
  {
    id: 'streak_starter',
    name: 'Streak Starter',
    description: 'Achieve a 3-day streak',
    icon: 'LocalFireDepartment',
    check: (stats) => stats.longestStreak >= 3
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Achieve a 7-day streak',
    icon: 'LocalFireDepartment',
    check: (stats) => stats.longestStreak >= 7
  },
  {
    id: 'dedicated',
    name: 'Dedicated',
    description: 'Complete 10 habits total',
    icon: 'EmojiEvents',
    check: (stats) => stats.totalCompletions >= 10
  },
  {
    id: 'committed',
    name: 'Committed',
    description: 'Complete 50 habits total',
    icon: 'EmojiEvents',
    check: (stats) => stats.totalCompletions >= 50
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Complete 100 habits total',
    icon: 'WorkspacePremium',
    check: (stats) => stats.totalCompletions >= 100
  },
  {
    id: 'xp_hunter',
    name: 'XP Hunter',
    description: 'Earn 500 XP',
    icon: 'FlashOn',
    check: (stats) => stats.totalXP >= 500
  },
  {
    id: 'xp_master',
    name: 'XP Master',
    description: 'Earn 2000 XP',
    icon: 'FlashOn',
    check: (stats) => stats.totalXP >= 2000
  },
  {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reach level 5',
    icon: 'TrendingUp',
    check: (stats) => stats.level >= 5
  },
  {
    id: 'level_10',
    name: 'Veteran',
    description: 'Reach level 10',
    icon: 'TrendingUp',
    check: (stats) => stats.level >= 10
  },
  {
    id: 'balanced',
    name: 'Balanced Life',
    description: 'Have habits in all 4 categories',
    icon: 'Balance',
    check: (stats) => {
      const categories = stats.categoryBreakdown || {};
      return categories.Body > 0 &&
             categories.Mind > 0 &&
             categories.Spirit > 0 &&
             categories.Creative > 0;
    }
  },
  {
    id: 'perfect_day',
    name: 'Perfect Day',
    description: 'Complete all habits in a single day',
    icon: 'Whatshot',
    check: (stats) => stats.hadPerfectDay
  },
  {
    id: 'fortnight',
    name: 'Fortnight Fighter',
    description: 'Achieve a 14-day streak',
    icon: 'LocalFireDepartment',
    check: (stats) => stats.longestStreak >= 14
  },
  {
    id: 'monthly_master',
    name: 'Monthly Master',
    description: 'Achieve a 30-day streak',
    icon: 'CalendarMonth',
    check: (stats) => stats.longestStreak >= 30
  }
];

/**
 * Calculate which achievements are unlocked based on user stats
 * @param {Object} stats - User statistics
 * @returns {Array} Array of unlocked achievement objects
 */
export const getUnlockedAchievements = (stats) => {
  return ACHIEVEMENTS.filter(achievement => achievement.check(stats));
};

/**
 * Get recently unlocked achievements (for display)
 * @param {Object} stats - User statistics
 * @param {number} limit - Max number to return
 * @returns {Array} Array of unlocked achievement objects
 */
export const getRecentAchievements = (stats, limit = 3) => {
  const unlocked = getUnlockedAchievements(stats);
  // Return most recent (last unlocked based on difficulty)
  return unlocked.slice(-limit).reverse();
};

/**
 * Get achievement progress for display
 * @param {string} achievementId - Achievement ID
 * @param {Object} stats - User statistics
 * @returns {Object} { current, target, percentage }
 */
export const getAchievementProgress = (achievementId, stats) => {
  const progressMap = {
    'first_habit': { current: stats.totalHabits, target: 1 },
    'habit_collector': { current: stats.totalHabits, target: 5 },
    'first_completion': { current: stats.totalCompletions, target: 1 },
    'streak_starter': { current: stats.longestStreak, target: 3 },
    'week_warrior': { current: stats.longestStreak, target: 7 },
    'dedicated': { current: stats.totalCompletions, target: 10 },
    'committed': { current: stats.totalCompletions, target: 50 },
    'centurion': { current: stats.totalCompletions, target: 100 },
    'xp_hunter': { current: stats.totalXP, target: 500 },
    'xp_master': { current: stats.totalXP, target: 2000 },
    'level_5': { current: stats.level, target: 5 },
    'level_10': { current: stats.level, target: 10 },
    'fortnight': { current: stats.longestStreak, target: 14 },
    'monthly_master': { current: stats.longestStreak, target: 30 }
  };

  const progress = progressMap[achievementId] || { current: 0, target: 1 };
  const percentage = Math.min(100, (progress.current / progress.target) * 100);

  return {
    ...progress,
    percentage
  };
};
