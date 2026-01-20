import React, { useState, useMemo } from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';
import './HabitCard.css';

const HabitCardWithSound = ({ habit, onComplete, onXPChange }) => {
  const { playSound } = useSoundContext();
  const [isCompleting, setIsCompleting] = useState(false);
  
  // Create sound manager instance
  const soundManager = useMemo(() => new SoundManager(playSound), [playSound]);

  const handleComplete = async () => {
    if (isCompleting) return;
    
    setIsCompleting(true);
    
    try {
      // Play completion sound
      soundManager.playHabitComplete();
      
      // Simulate XP gain
      const xpGained = Math.floor(Math.random() * 30) + 10;
      
      // Play XP gain sound after a short delay
      setTimeout(() => {
        soundManager.playXPGain(xpGained);
        if (onXPChange) {
          onXPChange(xpGained);
        }
      }, 200);
      
      // Check for streak milestone (every 7 days)
      if (habit.streak > 0 && habit.streak % 7 === 0) {
        setTimeout(() => {
          soundManager.playStreakMilestone(habit.streak);
        }, 500);
      }
      
      // Call the original completion handler
      if (onComplete) {
        await onComplete();
      }
      
    } catch (error) {
      console.error('Error completing habit:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleButtonClick = () => {
    soundManager.playButtonClick();
  };

  return (
    <div className={`habit-card ${isCompleting ? 'completing' : ''}`}>
      <div className="habit-header">
        <h3 className="habit-name">{habit.name}</h3>
        <div className="habit-streak">
          🔥 {habit.streak || 0} day streak
        </div>
      </div>
      
      <div className="habit-description">
        {habit.description}
      </div>
      
      <div className="habit-actions">
        <button
          className={`complete-button ${habit.completedToday ? 'completed' : ''}`}
          onClick={handleComplete}
          disabled={isCompleting || habit.completedToday}
        >
          {habit.completedToday ? '✓ Completed' : 'Complete Habit'}
        </button>
        
        <button
          className="details-button"
          onClick={handleButtonClick}
        >
          View Details
        </button>
      </div>
      
      {isCompleting && (
        <div className="completion-animation">
          <div className="sparkle">✨</div>
        </div>
      )}
    </div>
  );
};

export default HabitCardWithSound;
