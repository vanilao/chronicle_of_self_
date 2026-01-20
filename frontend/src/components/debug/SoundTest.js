import React from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import { useTheme } from '../../contexts/ThemeContext';
import SoundManager from '../../utils/soundManager';

const SoundTest = () => {
  const {
    playSound,
    isMuted,
    volume,
    interactionSounds,
    rewardSounds,
    notificationSounds,
    ambientSounds,
    toggleCategory,
    stopMainTheme,
    stopNightTheme,
    stopAllThemes,
    playMainThemeAuto,
    playNightThemeAuto
  } = useSoundContext();

  const { theme, toggleTheme } = useTheme();
  const soundManager = new SoundManager(playSound);

  const testMainTheme = () => {
    console.log('Testing main theme directly...');
    console.log('State:', { isMuted, volume, ambientSounds });
    
    // First enable ambient if not already enabled
    if (!ambientSounds) {
      console.log('Enabling ambient sounds first...');
      toggleCategory('ambient');
      setTimeout(() => {
        console.log('Now playing main theme...');
        soundManager.playMainTheme({ volume: 0.5 });
      }, 100);
    } else {
      console.log('Ambient already enabled, playing main theme...');
      soundManager.playMainTheme({ volume: 0.5 });
    }
  };

  const testNightTheme = () => {
    console.log('Testing night theme directly...');
    console.log('State:', { isMuted, volume, ambientSounds });
    
    // First enable ambient if not already enabled
    if (!ambientSounds) {
      console.log('Enabling ambient sounds first...');
      toggleCategory('ambient');
      setTimeout(() => {
        console.log('Now playing night theme...');
        soundManager.playNightTheme({ volume: 0.5 });
      }, 100);
    } else {
      console.log('Ambient already enabled, playing night theme...');
      soundManager.playNightTheme({ volume: 0.5 });
    }
  };

  const testDirectSound = () => {
    console.log('Testing direct sound call...');
    playSound('main-theme', { category: 'ambient', volume: 0.5, loop: true });
  };

  const testDirectNightTheme = () => {
    console.log('Testing direct night theme play...');
    playSound('night-theme', { category: 'ambient', volume: 0.5, loop: true });
  };

  const testDirectMainTheme = () => {
    console.log('Testing direct main theme play...');
    playSound('main-theme', { category: 'ambient', volume: 0.5, loop: true });
  };

  const testCurrentTheme = () => {
    console.log('🎵 Testing current theme music...');
    console.log('Current theme:', theme);
    console.log('Ambient enabled:', ambientSounds);
    
    if (!ambientSounds) {
      console.log('Enabling ambient sounds first...');
      toggleCategory('ambient');
      setTimeout(() => {
        if (theme === 'dark') {
          playSound('night-theme', { category: 'ambient', volume: 0.5, loop: true });
        } else {
          playSound('main-theme', { category: 'ambient', volume: 0.5, loop: true });
        }
      }, 100);
    } else {
      if (theme === 'dark') {
        playSound('night-theme', { category: 'ambient', volume: 0.5, loop: true });
      } else {
        playSound('main-theme', { category: 'ambient', volume: 0.5, loop: true });
      }
    }
  };

  return (
    <div style={{ padding: '20px', background: 'white', margin: '20px', borderRadius: '8px' }}>
      <h3>🔧 Sound Debug Test</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Current State:</strong>
        <ul>
          <li>Theme: {theme}</li>
          <li>Muted: {isMuted ? 'Yes' : 'No'}</li>
          <li>Volume: {volume}</li>
          <li>Ambient Sounds: {ambientSounds ? 'Enabled' : 'Disabled'}</li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={testCurrentTheme} style={{ padding: '10px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🎵 Play Current Theme
        </button>
        
        <button onClick={testDirectMainTheme} style={{ padding: '10px', background: '#60a5fa', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ☀️ Force Main Theme
        </button>

        <button onClick={testDirectNightTheme} style={{ padding: '10px', background: '#475569', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🌙 Force Night Theme
        </button>
        
        <button onClick={toggleTheme} style={{ padding: '10px', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🎨 Toggle Theme
        </button>
        
        <button onClick={() => toggleCategory('ambient')} style={{ padding: '10px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🔊 Toggle Ambient
        </button>
        
        <button onClick={stopAllThemes} style={{ padding: '10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🛑 Stop All Music
        </button>
      </div>

      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <strong>How theme music works:</strong>
        <ol>
          <li>Enable Ambient Sounds toggle</li>
          <li>Click anywhere on the page (user interaction)</li>
          <li>Theme music starts automatically based on current theme</li>
          <li>Switching themes changes the music automatically</li>
        </ol>
        <strong>Theme Mapping:</strong>
        <ul>
          <li>Light Mode → Main Theme music</li>
          <li>Dark Mode → Night Theme music</li>
        </ul>
        <strong>Debug:</strong> Open browser console (F12) to see debug messages
      </div>
    </div>
  );
};

export default SoundTest;
