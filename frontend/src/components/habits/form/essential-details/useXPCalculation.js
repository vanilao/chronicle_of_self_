import { useMemo } from 'react';

export const useXPCalculation = (userArchetypeCategory) => {
  const getDifficultyXP = useMemo(() => (difficulty) => {
    const baseXP = {
      'Easy': 10,
      'Medium': 20,
      'Hard': 30
    };
    
    const bonusActive = userArchetypeCategory;
    const bonusMultiplier = bonusActive ? 1.25 : 1;
    const totalXP = Math.round(baseXP[difficulty] * bonusMultiplier);
    
    return {
      base: baseXP[difficulty],
      total: totalXP,
      bonus: bonusActive
    };
  }, [userArchetypeCategory]);

  const getCategoryXP = useMemo(() => (category) => {
    const bonusActive = userArchetypeCategory && category === userArchetypeCategory;
    return {
      bonus: bonusActive,
      multiplier: bonusActive ? 1.25 : 1
    };
  }, [userArchetypeCategory]);

  return {
    getDifficultyXP,
    getCategoryXP
  };
};
