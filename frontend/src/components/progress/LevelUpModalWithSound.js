import React, { useEffect, useState, useMemo } from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';
import './LevelUpModal.css';

const LevelUpModalWithSound = ({ show, newLevel, onClose, previousLevel }) => {
  const { playSound } = useSoundContext();
  const [isVisible, setIsVisible] = useState(false);
  
  const soundManager = useMemo(() => new SoundManager(playSound), [playSound]);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Play level up sound when modal appears
      soundManager.playLevelUp({ volume: 0.6 });
    } else {
      // Play modal close sound when hiding
      soundManager.playModalClose();
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [show, soundManager]);

  const handleClose = () => {
    soundManager.playModalClose();
    if (onClose) {
      onClose();
    }
  };

  const handleShareAchievement = () => {
    soundManager.playAchievementUnlock();
    // Implement share functionality
    alert('Achievement shared! 🎉');
  };

  if (!isVisible) return null;

  return (
    <div className={`modal-overlay ${show ? 'show' : 'hide'}`}>
      <div className={`level-up-modal ${show ? 'slide-in' : 'slide-out'}`}>
        <div className="modal-header">
          <div className="level-icon">🏆</div>
          <h2 className="level-title">Level Up!</h2>
        </div>
        
        <div className="level-content">
          <div className="level-progress">
            <div className="previous-level">Level {previousLevel || (newLevel - 1)}</div>
            <div className="level-arrow">→</div>
            <div className="new-level">Level {newLevel}</div>
          </div>
          
          <div className="achievement-text">
            <p>Congratulations! You've reached a new milestone!</p>
            <p>Keep up the great work on your journey of self-improvement.</p>
          </div>
          
          <div className="rewards">
            <div className="reward-item">
              <span className="reward-icon">⭐</span>
              <span className="reward-text">New Achievement Unlocked</span>
            </div>
            <div className="reward-item">
              <span className="reward-icon">💎</span>
              <span className="reward-text">Bonus XP Points</span>
            </div>
          </div>
        </div>
        
        <div className="modal-actions">
          <button 
            className="share-button"
            onClick={handleShareAchievement}
          >
            Share Achievement
          </button>
          <button 
            className="continue-button"
            onClick={handleClose}
          >
            Continue Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelUpModalWithSound;
