import React from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';

const QuickSoundTest = () => {
  const { playSound } = useSoundContext();
  const soundManager = new SoundManager(playSound);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      background: 'white', 
      padding: '15px', 
      borderRadius: '8px', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999
    }}>
      <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>🔊 Quick Sound Test</h4>
      <button 
        onClick={() => soundManager.playButtonClick()}
        style={{ 
          padding: '8px 12px', 
          background: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        Test Sound
      </button>
    </div>
  );
};

export default QuickSoundTest;
