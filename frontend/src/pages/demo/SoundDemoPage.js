import React, { useState } from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';
import HabitCardWithSound from '../../components/habits/HabitCardWithSound';
import LevelUpModalWithSound from '../../components/progress/LevelUpModalWithSound';
import SoundSettings from '../../components/user/SoundSettings';
import SoundDebug from '../../components/debug/SoundDebug';
import QuickSoundTest from '../../components/debug/QuickSoundTest';
import AudioTroubleshooter from '../../components/debug/AudioTroubleshooter';
import ModernSoundTest from '../../components/debug/ModernSoundTest';
import LevelUpSoundTest from '../../components/debug/LevelUpSoundTest';
import AllSoundsTest from '../../components/debug/AllSoundsTest';
import XPTest from '../../components/debug/XPTest';
import './SoundDemoPage.css';

const SoundDemoPage = () => {
  const { playSound } = useSoundContext();
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(5);
  const [totalXP, setTotalXP] = useState(0);
  
  const soundManager = new SoundManager(playSound);

  // Sample habit data
  const sampleHabits = [
    {
      id: 1,
      name: 'Morning Meditation',
      description: 'Start the day with 10 minutes of mindfulness meditation',
      streak: 12,
      completedToday: false
    },
    {
      id: 2,
      name: 'Read for 30 Minutes',
      description: 'Read educational or personal development content',
      streak: 7,
      completedToday: false
    },
    {
      id: 3,
      name: 'Exercise',
      description: 'Complete a workout session of at least 20 minutes',
      streak: 3,
      completedToday: false
    }
  ];

  const handleHabitComplete = (habitId) => {
    // Simulate XP gain
    const xpGained = Math.floor(Math.random() * 30) + 10;
    setTotalXP(prev => prev + xpGained);
    
    // Check for level up (every 100 XP)
    if ((totalXP + xpGained) >= currentLevel * 100) {
      setTimeout(() => {
        setShowLevelUpModal(true);
        setCurrentLevel(prev => prev + 1);
      }, 1000);
    }
  };

  const handleXPChange = (xp) => {
    setTotalXP(prev => prev + xp);
  };

  const closeLevelUpModal = () => {
    setShowLevelUpModal(false);
  };

  const testIndividualSound = (soundName) => {
    switch (soundName) {
      case 'button-click':
        soundManager.playButtonClick();
        break;
      case 'theme-toggle':
        soundManager.playThemeToggle();
        break;
      case 'modal-open':
        soundManager.playModalOpen();
        break;
      case 'modal-close':
        soundManager.playModalClose();
        break;
      case 'habit-complete':
        soundManager.playHabitComplete();
        break;
      case 'xp-gain':
        soundManager.playXPGain(25);
        break;
      case 'level-up':
        soundManager.playLevelUp();
        break;
      case 'achievement':
        soundManager.playAchievementUnlock();
        break;
      case 'streak':
        soundManager.playStreakMilestone(7);
        break;
      default:
        break;
    }
  };

  return (
    <div className="sound-demo-page">
      <XPTest />
      <QuickSoundTest />
      <ModernSoundTest />
      <LevelUpSoundTest />
      <AllSoundsTest />
      <div className="demo-header">
        <h1>🎵 Sound Effects Demo</h1>
        <p>Experience the interactive sound system for Chronicle of Self</p>
      </div>

      <div className="demo-stats">
        <div className="stat-card">
          <h3>Current Level</h3>
          <div className="level-display">{currentLevel}</div>
        </div>
        <div className="stat-card">
          <h3>Total XP</h3>
          <div className="xp-display">{totalXP}</div>
        </div>
        <div className="stat-card">
          <h3>Next Level</h3>
          <div className="progress-display">
            {totalXP % 100}/100 XP
          </div>
        </div>
      </div>

      <div className="demo-sections">
        <div className="demo-section">
          <h2>🎯 Interactive Habit Cards</h2>
          <p>Complete habits to hear reward sounds and XP gains</p>
          
          <div className="habits-demo">
            {sampleHabits.map(habit => (
              <HabitCardWithSound
                key={habit.id}
                habit={habit}
                onComplete={() => handleHabitComplete(habit.id)}
                onXPChange={handleXPChange}
              />
            ))}
          </div>
        </div>

        <div className="demo-section">
          <h2>🎛️ Sound Test Panel</h2>
          <p>Test individual sound effects</p>
          
          <div className="sound-test-grid">
            <button
              className="test-button"
              onClick={() => testIndividualSound('button-click')}
            >
              🖱️ Button Click
            </button>
            <button
              className="test-button"
              onClick={() => testIndividualSound('theme-toggle')}
            >
              🎨 Theme Toggle
            </button>
            <button
              className="test-button"
              onClick={() => testIndividualSound('modal-open')}
            >
              📂 Modal Open
            </button>
            <button
              className="test-button"
              onClick={() => testIndividualSound('modal-close')}
            >
              📁 Modal Close
            </button>
            <button
              className="test-button"
              onClick={() => testIndividualSound('habit-complete')}
            >
              ✅ Habit Complete
            </button>
            <button
              className="test-button"
              onClick={() => testIndividualSound('xp-gain')}
            >
              ⭐ XP Gain
            </button>
            <button
              className="test-button"
              onClick={() => testIndividualSound('level-up')}
            >
              🏆 Level Up
            </button>
            <button
              className="test-button"
              onClick={() => testIndividualSound('achievement')}
            >
              🎉 Achievement
            </button>
            <button
              className="test-button"
              onClick={() => testIndividualSound('streak')}
            >
              🔥 Streak Milestone
            </button>
          </div>
        </div>

        <div className="demo-section">
          <h2>⚙️ Sound Settings</h2>
          <p>Configure your audio preferences</p>
          <SoundSettings />
        </div>

        <div className="demo-section">
          <h2>🔧 Sound Debug</h2>
          <p>Troubleshoot sound issues and test browser compatibility</p>
          <SoundDebug />
        </div>

        <div className="demo-section">
          <h2>🚨 Audio Troubleshooter</h2>
          <p>Step-by-step audio debugging if you can't hear any sounds</p>
          <AudioTroubleshooter />
        </div>
      </div>

      <LevelUpModalWithSound
        show={showLevelUpModal}
        newLevel={currentLevel}
        previousLevel={currentLevel - 1}
        onClose={closeLevelUpModal}
      />

      <div className="demo-footer">
        <p>💡 <strong>Tip:</strong> Try completing habits above to trigger level up animations and sounds!</p>
        <p>🎵 <strong>Note:</strong> This demo uses fallback tones when actual sound files are not present.</p>
      </div>
    </div>
  );
};

export default SoundDemoPage;
