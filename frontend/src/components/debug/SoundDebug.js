import React, { useState } from 'react';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';
import './SoundDebug.css';

const SoundDebug = () => {
  const { playSound, isMuted, volume, interactionSounds, rewardSounds, notificationSounds } = useSoundContext();
  const [debugInfo, setDebugInfo] = useState('');
  
  const soundManager = new SoundManager(playSound);

  const testSoundWithDebug = async (soundName) => {
    setDebugInfo(`Testing sound: ${soundName}`);
    
    try {
      // Test if sound file exists
      const response = await fetch(`/sounds/${soundName}.mp3`);
      const fileExists = response.ok;
      
      setDebugInfo(prev => prev + `\nFile exists: ${fileExists}`);
      
      if (!fileExists) {
        setDebugInfo(prev => prev + `\nUsing fallback tone...`);
      }
      
      // Test sound playback
      soundManager.play(soundName);
      setDebugInfo(prev => prev + `\nSound played successfully!`);
      
    } catch (error) {
      setDebugInfo(prev => prev + `\nError: ${error.message}`);
    }
  };

  const testWebAudioAPI = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      
      setDebugInfo('Web Audio API test tone played successfully!');
    } catch (error) {
      setDebugInfo(`Web Audio API error: ${error.message}`);
    }
  };

  const checkBrowserAudio = () => {
    const info = {
      'Web Audio API': !!(window.AudioContext || window.webkitAudioContext),
      'HTML5 Audio': !!window.Audio,
      'User Interaction Required': 'Yes (browser policy)',
      'Current Mute State': isMuted,
      'Volume Level': Math.round(volume * 100) + '%',
      'Interaction Sounds': interactionSounds,
      'Reward Sounds': rewardSounds,
      'Notification Sounds': notificationSounds
    };
    
    setDebugInfo('Browser Audio Support:\n' + 
      Object.entries(info).map(([key, value]) => `${key}: ${value}`).join('\n'));
  };

  return (
    <div className="sound-debug">
      <h3>🔧 Sound System Debug</h3>
      
      <div className="debug-section">
        <h4>Browser Check</h4>
        <button onClick={checkBrowserAudio}>Check Browser Audio Support</button>
      </div>

      <div className="debug-section">
        <h4>Web Audio API Test</h4>
        <button onClick={testWebAudioAPI}>Play Test Tone (440Hz)</button>
      </div>

      <div className="debug-section">
        <h4>Sound File Tests</h4>
        <div className="sound-test-buttons">
          <button onClick={() => testSoundWithDebug('button-click')}>Button Click</button>
          <button onClick={() => testSoundWithDebug('habit-complete')}>Habit Complete</button>
          <button onClick={() => testSoundWithDebug('level-up')}>Level Up</button>
          <button onClick={() => testSoundWithDebug('achievement-unlock')}>Achievement</button>
        </div>
      </div>

      <div className="debug-section">
        <h4>Debug Output</h4>
        <pre className="debug-output">{debugInfo || 'Click a test button to see debug information...'}</pre>
      </div>

      <div className="debug-info">
        <p><strong>Troubleshooting Tips:</strong></p>
        <ul>
          <li>Browsers require user interaction before playing audio</li>
          <li>If sound files don't exist, fallback tones should play</li>
          <li>Check browser console for additional error messages</li>
          <li>Ensure volume is up and not muted</li>
          <li>Try the Web Audio API test first</li>
        </ul>
      </div>
    </div>
  );
};

export default SoundDebug;
