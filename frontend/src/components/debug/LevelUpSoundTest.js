import React, { useState } from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';
import LevelUpModalWithSound from '../progress/LevelUpModalWithSound';

const LevelUpSoundTest = () => {
  const { playSound } = useSoundContext();
  const soundManager = new SoundManager(playSound);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(5);

  const triggerLevelUp = () => {
    setCurrentLevel(prev => prev + 1);
    setShowLevelUp(true);
  };

  const testDirectSound = () => {
    soundManager.playLevelUp({ volume: 0.6 });
  };

  const closeModal = () => {
    setShowLevelUp(false);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '140px', 
      right: '20px', 
      background: 'linear-gradient(135deg, #f093fb, #f5576c)', 
      padding: '15px', 
      borderRadius: '12px', 
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      zIndex: 9997,
      color: 'white',
      minWidth: '220px'
    }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
        🏆 Level Up Test
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <button
          onClick={testDirectSound}
          style={{
            padding: '8px 12px',
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
          🎵 Test Level Up Sound
        </button>
        
        <button
          onClick={triggerLevelUp}
          style={{
            padding: '8px 12px',
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
          🎉 Trigger Level Up Modal
        </button>
      </div>
      
      <div style={{ 
        margin: '8px 0 0 0', 
        fontSize: '11px', 
        opacity: 0.8,
        lineHeight: '1.3'
      }}>
        Current Level: {currentLevel}
      </div>
      
      <p style={{ 
        margin: '8px 0 0 0', 
        fontSize: '11px', 
        opacity: 0.8,
        lineHeight: '1.3'
      }}>
        Test both direct sound and modal
      </p>

      <LevelUpModalWithSound
        show={showLevelUp}
        newLevel={currentLevel}
        previousLevel={currentLevel - 1}
        onClose={closeModal}
      />
    </div>
  );
};

export default LevelUpSoundTest;
