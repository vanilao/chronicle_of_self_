/**
 * Leveling System Utilities
 * Manages XP, levels, and titles for Chronicle of Self
 */

// XP required for each level follows a scaling formula
// Level 1->2: 100 XP
// Level 2->3: 150 XP
// Level 3->4: 225 XP
// Formula: baseXP * (1.5 ^ (level - 1))
const BASE_XP = 100;
const SCALING_FACTOR = 1.5;

/**
 * Calculate XP required to reach next level
 * @param {number} currentLevel - Current user level
 * @returns {number} XP required for next level
 */
export const getXPForNextLevel = (currentLevel) => {
  const normalizedLevel = Math.max(1, currentLevel ?? 1);
  return Math.floor(BASE_XP * Math.pow(SCALING_FACTOR, normalizedLevel - 1));
};

/**
 * Calculate total XP required to reach a specific level from level 1
 * @param {number} targetLevel - Target level
 * @returns {number} Total XP needed
 */
export const getTotalXPForLevel = (targetLevel) => {
  let totalXP = 0;
  for (let level = 1; level < targetLevel; level++) {
    totalXP += getXPForNextLevel(level);
  }
  return totalXP;
};

/**
 * Process XP gain and determine if user levels up
 * @param {number} currentLevel - Current level
 * @param {number} currentXP - Current XP progress towards next level
 * @param {number} xpToAdd - XP being added (can be negative)
 * @returns {object} { newLevel, newXP, leveledUp, levelsGained }
 */
export const processXPGain = (currentLevel, currentXP, xpToAdd) => {
  let level = Math.max(1, currentLevel); // Ensure level is at least 1
  let xp = currentXP + xpToAdd;
  let levelsGained = 0;

  // Handle positive XP - level up
  while (xp >= getXPForNextLevel(level) && level < 100) {
    xp -= getXPForNextLevel(level);
    level++;
    levelsGained++;
  }

  // Handle negative XP - level down (if XP goes below 0)
  while (xp < 0 && level > 1) {
    level--;
    xp += getXPForNextLevel(level);
    levelsGained--;
  }

  // Prevent XP from going below 0 at level 1
  if (level === 1 && xp < 0) {
    xp = 0;
  }

  return {
    newLevel: level,
    newXP: Math.max(0, xp), // Ensure XP is never negative
    nextLevelXP: getXPForNextLevel(level),
    leveledUp: levelsGained > 0,
    levelsGained
  };
};

/**
 * Get user title based on level
 * @param {number} level - User level
 * @returns {string} Title
 */
export const getTitleForLevel = (level) => {
  if (level <= 0 || Number.isNaN(level)) return 'Uninitiated';
  if (level === 1) return 'Novice Adventurer';
  if (level <= 5) return 'Aspiring Hero';
  if (level <= 10) return 'Steady Wanderer';
  if (level <= 15) return 'Skilled Tracker';
  if (level <= 20) return 'Seasoned Veteran';
  if (level <= 25) return 'Master of Habits';
  if (level <= 30) return 'Legendary Champion';
  if (level <= 40) return 'Mythic Paragon';
  if (level <= 50) return 'Eternal Guardian';
  return 'Transcendent Being';
};

/**
 * Calculate XP progress percentage
 * @param {number} currentXP - Current XP
 * @param {number} nextLevelXP - XP needed for next level
 * @returns {number} Percentage (0-100)
 */
export const getXPProgressPercentage = (currentXP, nextLevelXP) => {
  if (nextLevelXP === 0) return 100;
  return Math.min(100, Math.max(0, (currentXP / nextLevelXP) * 100));
};

/**
 * Get archetype bonus multiplier
 * @param {string} habitCategory - Habit category (Body/Mind/Spirit/Creative)
 * @param {string} userArchetypeCategory - User's archetype category
 * @returns {number} Multiplier (1.0 or 1.25)
 */
export const getArchetypeBonus = (habitCategory, userArchetypeCategory) => {
  if (!userArchetypeCategory || !habitCategory) return 1.0;
  return habitCategory === userArchetypeCategory ? 1.25 : 1.0;
};

/**
 * Calculate final XP reward with bonuses
 * @param {number} baseXP - Base XP from habit
 * @param {string} habitCategory - Habit category
 * @param {string} userArchetypeCategory - User's archetype category
 * @returns {object} { finalXP, bonus, bonusActive }
 */
export const calculateXPReward = (baseXP, habitCategory, userArchetypeCategory) => {
  const bonus = getArchetypeBonus(habitCategory, userArchetypeCategory);
  const finalXP = Math.round(baseXP * bonus);
  const bonusActive = bonus > 1.0;

  return {
    finalXP,
    bonus,
    bonusActive
  };
};

/**
 * Get level tier name for UI display
 * @param {number} level - User level
 * @returns {string} Tier name
 */
export const getLevelTier = (level) => {
  if (level <= 5) return 'Beginner';
  if (level <= 10) return 'Intermediate';
  if (level <= 20) return 'Advanced';
  if (level <= 30) return 'Expert';
  if (level <= 50) return 'Master';
  return 'Legendary';
};
