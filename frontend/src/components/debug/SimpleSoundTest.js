import React from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import { useTheme } from '../../contexts/ThemeContext';

const SimpleSoundTest = () => {
  const { theme } = useTheme();
  const {
    playSound,
    isMuted,
    volume,
    ambientSounds,
    interactionSounds,
    rewardSounds,
    notificationSounds
  } = useSoundContext();

  const testBasicSound = () => {
    console.log('=== TESTING BASIC SOUND ===');
    console.log('isMuted:', isMuted);
    console.log('volume:', volume);
    console.log('ambientSounds:', ambientSounds);
    console.log('interactionSounds:', interactionSounds);
    
    // Test a simple interaction sound
    console.log('Playing button-click sound...');
    playSound('button-click', { category: 'interaction' });
  };

  const testMainThemeDirect = () => {
    console.log('=== TESTING MAIN THEME ===');
    console.log('isMuted:', isMuted);
    console.log('volume:', volume);
    console.log('ambientSounds:', ambientSounds);
    
    // Test main theme directly
    console.log('Playing main-theme sound...');
    playSound('main-theme', { category: 'ambient', volume: 0.5, loop: false });
  };

  const testNightThemeDirect = () => {
    console.log('=== TESTING NIGHT THEME ===');
    console.log('isMuted:', isMuted);
    console.log('volume:', volume);
    console.log('ambientSounds:', ambientSounds);
    
    // Test night theme directly
    console.log('Playing night-theme sound...');
    playSound('night-theme', { category: 'ambient', volume: 0.5, loop: false });
  };

  const testAudioDirectly = () => {
    console.log('=== TESTING AUDIO DIRECTLY ===');
    
    try {
      const audio = new Audio('/sounds/Main theme.mp3');
      audio.volume = 0.5;
      console.log('Audio object created:', audio);
      
      audio.play().then(() => {
        console.log('✅ Direct audio play SUCCESS!');
      }).catch((error) => {
        console.log('❌ Direct audio play FAILED:', error);
      });
    } catch (error) {
      console.log('❌ Audio creation failed:', error);
    }
  };

  const testAutoStart = () => {
    console.log('=== TESTING AUTO-START FUNCTIONALITY ===');
    console.log('Simulating app load behavior...');
    
    // This simulates what happens when the app loads
    if (ambientSounds) {
      console.log('Ambient sounds enabled, ready for auto-start');
      console.log('Current theme would be detected and appropriate music would play after user interaction');
    } else {
      console.log('Ambient sounds disabled - music would not auto-start');
      console.log('Enable ambient sounds to test auto-start functionality');
    }
  };

  const testTimeTravelSound = () => {
    console.log('=== TESTING TIME TRAVEL SOUND ===');
    console.log('Playing Time travel sound at high volume for testing');
    
    // Play time travel sound at high volume to ensure it's audible
    playSound('time-travel', { category: 'interaction', volume: 0.9, loop: false });
  };

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px', borderRadius: '8px' }}>
      <h3>🔧 Simple Sound Debug</h3>
      
      <div style={{ marginBottom: '15px', fontSize: '12px', fontFamily: 'monospace' }}>
        <strong>Current State:</strong><br/>
        Muted: {isMuted ? 'YES' : 'NO'} | 
        Volume: {volume.toFixed(2)} | 
        Ambient: {ambientSounds ? 'ON' : 'OFF'} | 
        Interaction: {interactionSounds ? 'ON' : 'OFF'}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
        <button onClick={testBasicSound} style={{ padding: '8px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Test Basic Sound
        </button>
        
        <button onClick={testMainThemeDirect} style={{ padding: '8px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Test Main Theme
        </button>

        <button onClick={testNightThemeDirect} style={{ padding: '8px', background: '#1e293b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Test Night Theme
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
        <button onClick={testTimeTravelSound} style={{ padding: '8px', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ⏰ Test Time Travel Sound
        </button>

        <button onClick={() => {
          console.log('=== TESTING CHECK SOUND ===');
          console.log('Playing Check sound at high volume for testing');
          
          // Play check sound at high volume to ensure it's audible
          playSound('check', { category: 'interaction', volume: 0.9, loop: false });
        }} style={{ padding: '8px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          ✅ Test Check Sound
        </button>

        <button onClick={() => {
          console.log('=== TESTING CANCEL SOUND ===');
          console.log('Playing Cancel sound at high volume for testing');
          
          // Play cancel sound at high volume to ensure it's audible
          playSound('cancel', { category: 'interaction', volume: 0.8, loop: false });
        }} style={{ padding: '8px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🚫 Test Cancel Sound
        </button>

        <button onClick={testAutoStart} style={{ padding: '8px', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🚀 Test Auto-Start
        </button>

        <button onClick={() => {
          console.log('=== TESTING APP START BEHAVIOR ===');
          console.log('Current theme:', theme);
          console.log('This simulates exactly what happens when app starts');
          
          // Force stop all themes first (like app start does)
          console.log('🛑 Simulating app start - stopping all themes');
          
          // Simulate the app start behavior
          setTimeout(() => {
            if (theme === 'dark') {
              console.log('🌙 APP START SIMULATION: Dark mode detected - should play Night Theme');
              playSound('night-theme', { category: 'ambient', volume: 0.4, loop: false });
            } else {
              console.log('☀️ APP START SIMULATION: Light mode detected - should play Main Theme');
              playSound('main-theme', { category: 'ambient', volume: 0.3, loop: false });
            }
          }, 300);
        }} style={{ padding: '8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          🎯 Test App Start
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={testAudioDirectly} style={{ padding: '8px', background: '#64748b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Direct Main Audio
        </button>

        <button onClick={() => {
          console.log('=== TESTING NIGHT AUDIO DIRECTLY ===');
          try {
            const audio = new Audio('/sounds/Night theme.mp3');
            audio.volume = 0.5;
            console.log('Night audio object created:', audio);
            
            audio.play().then(() => {
              console.log('✅ Night direct audio play SUCCESS!');
            }).catch((error) => {
              console.log('❌ Night direct audio play FAILED:', error);
            });
          } catch (error) {
            console.log('❌ Night audio creation failed:', error);
          }
        }} style={{ padding: '8px', background: '#475569', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Direct Night Audio
        </button>
      </div>

      <div style={{ marginTop: '15px', fontSize: '11px', color: '#666' }}>
        <strong>Instructions:</strong><br/>
        1. Open browser console (F12)<br/>
        2. Click buttons from top to bottom<br/>
        3. Look for ✅ SUCCESS or ❌ FAILED messages<br/>
        4. Check for any red error messages
      </div>
    </div>
  );
};

export default SimpleSoundTest;
