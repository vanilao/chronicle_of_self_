import { useCallback, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSoundContext } from '../contexts/SoundContext';
import SoundManager from '../utils/soundManager';

/**
 * Custom hook that wraps awardXP with sound effects
 */
export const useXPWithSound = () => {
  const { awardXP } = useAuth();
  const { playSound } = useSoundContext();
  const soundManager = useMemo(() => new SoundManager(playSound), [playSound]);

  const awardXPWithSound = useCallback((xpAmount) => {
    // XP gain sounds removed - only award XP silently

    // Award XP and get result
    const result = awardXP(xpAmount);

    // Play level up sound if leveled up
    if (result.leveledUp) {
      soundManager.playLevelUp({ volume: 0.6 });
    }

    return result;
  }, [awardXP, soundManager]);

  return { awardXP: awardXPWithSound };
};
