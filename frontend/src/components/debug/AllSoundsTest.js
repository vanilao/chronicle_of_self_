import React, { useState } from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';

const AllSoundsTest = () => {
  const { playSound } = useSoundContext();
  const soundManager = new SoundManager(playSound);
  const [testResults, setTestResults] = useState([]);

  const allSounds = [
    { 
      name: 'Button Click', 
      category: 'Interaction',
      action: () => soundManager.playButtonClick(),
      description: 'Modern click sound (1200Hz)'
    },
    { 
      name: 'Click1', 
      category: 'Interaction',
      action: () => soundManager.playClick1(),
      description: 'Custom Click1 sound effect'
    },
    { 
      name: 'MenuOpen', 
      category: 'Interaction',
      action: () => soundManager.playMenuOpen(),
      description: 'MenuOpen sound effect for modal opening'
    },
    { 
      name: 'MenuClose', 
      category: 'Interaction',
      action: () => soundManager.playMenuClose(),
      description: 'MenuClose sound effect for modal closing'
    },
    { 
      name: 'Adriantnt Release Click', 
      category: 'Interaction',
      action: () => soundManager.playAdriantntReleaseClick(),
      description: 'Custom adriantnt release click sound'
    },
    { 
      name: 'Growtopia Trash Sound', 
      category: 'Interaction',
      action: () => soundManager.playGrowtopiaTrashSound(),
      description: 'Growtopia trash sound effect for deletion'
    },
    { 
      name: 'Growtopia Race Sound', 
      category: 'Reward',
      action: () => soundManager.playGrowtopiaRaceSound(),
      description: 'Growtopia race sound effect for habit creation'
    },
    { 
      name: 'Habit Complete', 
      category: 'Reward',
      action: () => soundManager.playHabitComplete(),
      description: 'Positive chime for habit completion'
    },
    { 
      name: 'Theme Toggle', 
      category: 'Interaction',
      action: () => soundManager.playThemeToggle(),
      description: 'Smooth whoosh transition'
    },
    { 
      name: 'Modal Open', 
      category: 'Interaction',
      action: () => soundManager.playModalOpen(),
      description: 'Soft ascending whoosh'
    },
    { 
      name: 'Modal Close', 
      category: 'Interaction',
      action: () => soundManager.playModalClose(),
      description: 'Soft descending whoosh'
    },
    { 
      name: 'Habit Complete', 
      category: 'Reward',
      action: () => soundManager.playHabitComplete(),
      description: 'Pleasant 3-note chime (E-G-A)'
    },
    { 
      name: 'XP Gain Small', 
      category: 'Reward',
      action: () => soundManager.playXPGain(25),
      description: 'Gentle ascending sparkle'
    },
    { 
      name: 'XP Gain Large', 
      category: 'Reward',
      action: () => soundManager.playXPGain(100),
      description: 'Elaborate sparkle with chorus'
    },
    { 
      name: 'Level Up', 
      category: 'Reward',
      action: () => soundManager.playLevelUp({ volume: 0.6 }),
      description: 'Rich 5-note celebration fanfare'
    },
    { 
      name: 'Achievement Unlock', 
      category: 'Reward',
      action: () => soundManager.playAchievementUnlock(),
      description: 'Harp-like sparkle with vibrato'
    },
    { 
      name: 'Streak Milestone', 
      category: 'Notification',
      action: () => soundManager.playStreakMilestone(7),
      description: 'Warm, gentle glow sound'
    }
  ];

  const testSound = (sound, index) => {
    try {
      sound.action();
      addTestResult(`✅ ${sound.name} - Played successfully`, 'success');
    } catch (error) {
      addTestResult(`❌ ${sound.name} - Error: ${error.message}`, 'error');
    }
  };

  const addTestResult = (message, type) => {
    setTestResults(prev => [...prev.slice(-4), { message, type, time: new Date().toLocaleTimeString() }]);
  };

  const testAllSounds = () => {
    setTestResults([]);
    allSounds.forEach((sound, index) => {
      setTimeout(() => {
        testSound(sound, index);
      }, index * 1000); // Test each sound with 1 second delay
    });
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const soundsByCategory = {
    Interaction: allSounds.filter(s => s.category === 'Interaction'),
    Reward: allSounds.filter(s => s.category === 'Reward'),
    Notification: allSounds.filter(s => s.category === 'Notification')
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '200px', 
      right: '20px', 
      background: 'linear-gradient(135deg, #667eea, #764ba2)', 
      padding: '20px', 
      borderRadius: '12px', 
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      zIndex: 9996,
      color: 'white',
      minWidth: '280px',
      maxHeight: '80vh',
      overflowY: 'auto'
    }}>
      <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
        🎵 Complete Sound Test
      </h4>

      <button
        onClick={testAllSounds}
        style={{
          width: '100%',
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '16px',
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
        🎧 Test All Sounds (Sequential)
      </button>

      {Object.entries(soundsByCategory).map(([category, sounds]) => (
        <div key={category} style={{ marginBottom: '16px' }}>
          <h5 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '12px', 
            fontWeight: '600',
            opacity: 0.9,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {category} ({sounds.length})
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sounds.map((sound, index) => (
              <button
                key={index}
                onClick={() => testSound(sound, index)}
                style={{
                  padding: '8px 10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateX(2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                  {sound.name}
                </div>
                <div style={{ opacity: 0.7, fontSize: '10px' }}>
                  {sound.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {testResults.length > 0 && (
        <div style={{ 
          marginTop: '16px',
          padding: '12px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <h5 style={{ 
              margin: 0, 
              fontSize: '12px', 
              fontWeight: '600' 
            }}>
              Test Results
            </h5>
            <button
              onClick={clearResults}
              style={{
                padding: '4px 8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '10px'
              }}
            >
              Clear
            </button>
          </div>
          <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
            {testResults.map((result, index) => (
              <div key={index} style={{ 
                marginBottom: '4px',
                opacity: result.type === 'success' ? 1 : 0.8
              }}>
                <span style={{ opacity: 0.6 }}>{result.time}</span> {result.message}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ 
        marginTop: '16px', 
        padding: '12px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        fontSize: '10px',
        lineHeight: '1.4',
        opacity: 0.8
      }}>
        <strong>💡 Tips:</strong><br/>
        • Click individual sounds to test<br/>
        • Use "Test All" for sequential playback<br/>
        • Check console for errors<br/>
        • Ensure volume is up in settings
      </div>
    </div>
  );
};

export default AllSoundsTest;
