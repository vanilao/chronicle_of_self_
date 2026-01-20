import React from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';

const ModernSoundTest = () => {
  const { playSound } = useSoundContext();
  const soundManager = new SoundManager(playSound);

  const modernSounds = [
    { name: 'Modern Click', action: () => soundManager.playButtonClick() },
    { name: 'Soft Chime', action: () => soundManager.playHabitComplete() },
    { name: 'Gentle Sparkle', action: () => soundManager.playXPGain(25) },
    { name: 'Celebration', action: () => soundManager.playLevelUp() },
    { name: 'Achievement', action: () => soundManager.playAchievementUnlock() },
    { name: 'Warm Glow', action: () => soundManager.playStreakMilestone(7) },
    { name: 'Smooth Toggle', action: () => soundManager.playThemeToggle() },
  ];

  return (
    <div style={{ 
      position: 'fixed', 
      top: '80px', 
      right: '20px', 
      background: 'linear-gradient(135deg, #667eea, #764ba2)', 
      padding: '15px', 
      borderRadius: '12px', 
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      zIndex: 9998,
      color: 'white',
      minWidth: '200px'
    }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
        🎵 Modern Sounds
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {modernSounds.map((sound, index) => (
          <button
            key={index}
            onClick={sound.action}
            style={{
              padding: '6px 10px',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {sound.name}
          </button>
        ))}
      </div>
      <p style={{ 
        margin: '12px 0 0 0', 
        fontSize: '11px', 
        opacity: 0.8,
        lineHeight: '1.3'
      }}>
        ✨ Modern, pleasant sounds designed for comfort
      </p>
    </div>
  );
};

export default ModernSoundTest;
