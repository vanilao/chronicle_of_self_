import React, { useMemo } from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';
import './SoundSettings.css';

const SoundSettings = () => {
  const {
    isMuted,
    setIsMuted,
    volume,
    setVolume,
    interactionSounds,
    rewardSounds,
    notificationSounds,
    ambientSounds,
    toggleCategory,
    playSound,
    stopMainTheme
  } = useSoundContext();

  const soundManager = useMemo(() => new SoundManager(playSound), [playSound]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    // Play a test sound when volume changes (if not muted)
    if (!isMuted) {
      soundManager.playButtonClick({ volume: newVolume });
    }
  };

  const handleToggleMute = () => {
    setIsMuted();
    // Play a sound when unmuting
    if (isMuted) {
      setTimeout(() => {
        soundManager.playThemeToggle();
      }, 100);
    }
  };

  const handleCategoryToggle = (category) => {
    toggleCategory(category);
    // Play a test sound for the category being enabled
    if (category === 'interaction' && !interactionSounds) {
      setTimeout(() => soundManager.playButtonClick(), 100);
    } else if (category === 'reward' && !rewardSounds) {
      setTimeout(() => soundManager.playHabitComplete(), 100);
    } else if (category === 'notification' && !notificationSounds) {
      setTimeout(() => soundManager.playLevelUp({ volume: 0.3 }), 100);
    } else if (category === 'ambient' && !ambientSounds) {
      setTimeout(() => soundManager.playMainTheme({ volume: 0.2 }), 100);
    }
  };

  const testAllSounds = () => {
    if (isMuted) return;
    
    const sounds = [
      { name: 'Button Click', action: () => soundManager.playButtonClick() },
      { name: 'Theme Toggle', action: () => soundManager.playThemeToggle() },
      { name: 'Habit Complete', action: () => soundManager.playHabitComplete() },
      { name: 'XP Gain', action: () => soundManager.playXPGain(25) },
      { name: 'Level Up', action: () => soundManager.playLevelUp({ volume: 0.3 }) },
      { name: 'Achievement', action: () => soundManager.playAchievementUnlock({ volume: 0.3 }) },
      { name: 'Streak Milestone', action: () => soundManager.playStreakMilestone(7) },
      { name: 'Main Theme', action: () => soundManager.playMainTheme({ volume: 0.2 }) },
    ];

    let delay = 0;
    sounds.forEach(sound => {
      setTimeout(() => {
        console.log(`Playing: ${sound.name}`);
        sound.action();
      }, delay);
      delay += 800; // 800ms between sounds
    });
  };

  return (
    <div className="sound-settings">
      <div className="settings-header">
        <h2>🔊 Sound Settings</h2>
        <p>Customize your audio feedback experience</p>
      </div>

      <div className="settings-section">
        <div className="setting-item">
          <div className="setting-label">
            <span className="setting-icon">🔇</span>
            <div>
              <h3>Master Mute</h3>
              <p>Turn all sounds on or off</p>
            </div>
          </div>
          <button
            className={`toggle-button ${isMuted ? 'muted' : 'unmuted'}`}
            onClick={handleToggleMute}
          >
            {isMuted ? '🔇 Muted' : '🔊 Unmuted'}
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <span className="setting-icon">🎚️</span>
            <div>
              <h3>Volume Level</h3>
              <p>Adjust overall sound volume</p>
            </div>
          </div>
          <div className="volume-control">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              disabled={isMuted}
              className="volume-slider"
            />
            <span className="volume-percentage">{Math.round(volume * 100)}%</span>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>📂 Category Controls</h3>
        <p>Enable or disable specific types of sounds</p>

        <div className="setting-item">
          <div className="setting-label">
            <span className="setting-icon">👆</span>
            <div>
              <h4>Interaction Sounds</h4>
              <p>Button clicks, theme toggles, modal sounds</p>
            </div>
          </div>
          <button
            className={`toggle-button ${interactionSounds ? 'enabled' : 'disabled'}`}
            onClick={() => handleCategoryToggle('interaction')}
            disabled={isMuted}
          >
            {interactionSounds ? '✅ On' : '❌ Off'}
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <span className="setting-icon">🎉</span>
            <div>
              <h4>Reward Sounds</h4>
              <p>Habit completion, XP gain, achievements</p>
            </div>
          </div>
          <button
            className={`toggle-button ${rewardSounds ? 'enabled' : 'disabled'}`}
            onClick={() => handleCategoryToggle('reward')}
            disabled={isMuted}
          >
            {rewardSounds ? '✅ On' : '❌ Off'}
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <span className="setting-icon">🔔</span>
            <div>
              <h4>Notification Sounds</h4>
              <p>Level ups, streak milestones</p>
            </div>
          </div>
          <button
            className={`toggle-button ${notificationSounds ? 'enabled' : 'disabled'}`}
            onClick={() => handleCategoryToggle('notification')}
            disabled={isMuted}
          >
            {notificationSounds ? '✅ On' : '❌ Off'}
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <span className="setting-icon">🎵</span>
            <div>
              <h4>Ambient Sounds</h4>
              <p>Background theme music</p>
            </div>
          </div>
          <button
            className={`toggle-button ${ambientSounds ? 'enabled' : 'disabled'}`}
            onClick={() => handleCategoryToggle('ambient')}
            disabled={isMuted}
          >
            {ambientSounds ? '✅ On' : '❌ Off'}
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3>🎵 Test Sounds</h3>
        <p>Preview all available sound effects</p>
        
        <button
          className="test-button"
          onClick={testAllSounds}
          disabled={isMuted}
        >
          🎵 Play All Sounds
        </button>
        
        <div className="test-grid">
          <button
            className="test-sound-button"
            onClick={() => soundManager.playButtonClick()}
            disabled={isMuted || !interactionSounds}
          >
            Button Click
          </button>
          <button
            className="test-sound-button"
            onClick={() => soundManager.playHabitComplete()}
            disabled={isMuted || !rewardSounds}
          >
            Habit Complete
          </button>
          <button
            className="test-sound-button"
            onClick={() => soundManager.playLevelUp({ volume: 0.3 })}
            disabled={isMuted || !notificationSounds}
          >
            Level Up
          </button>
          <button
            className="test-sound-button"
            onClick={() => soundManager.playAchievementUnlock({ volume: 0.3 })}
            disabled={isMuted || !rewardSounds}
          >
            Achievement
          </button>
          <button
            className="test-sound-button"
            onClick={() => soundManager.playMainTheme({ volume: 0.2 })}
            disabled={isMuted || !ambientSounds}
          >
            Main Theme
          </button>
          <button
            className="test-sound-button stop-button"
            onClick={stopMainTheme}
            disabled={isMuted || !ambientSounds}
          >
            Stop Theme
          </button>
        </div>
      </div>

      <div className="settings-info">
        <p>💡 <strong>Tip:</strong> Sound settings are automatically saved and will persist between sessions.</p>
        <p>🎯 <strong>Note:</strong> If sound files are missing, the system will use fallback tones.</p>
      </div>
    </div>
  );
};

export default SoundSettings;
