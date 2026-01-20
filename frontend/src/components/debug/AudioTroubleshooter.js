import React, { useState } from 'react';
import './AudioTroubleshooter.css';

const AudioTroubleshooter = () => {
  const [logs, setLogs] = useState([]);
  const [audioContext, setAudioContext] = useState(null);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const initializeAudioContext = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(ctx);
      addLog(`✅ AudioContext created successfully (state: ${ctx.state})`);
      
      if (ctx.state === 'suspended') {
        addLog("⚠️ AudioContext is suspended - needs user interaction");
      }
      return ctx;
    } catch (error) {
      addLog(`❌ AudioContext creation failed: ${error.message}`);
      return null;
    }
  };

  const resumeAudioContext = () => {
    if (!audioContext) {
      const ctx = initializeAudioContext();
      if (ctx) {
        ctx.resume().then(() => {
          addLog("✅ AudioContext resumed successfully");
        }).catch(error => {
          addLog(`❌ Failed to resume AudioContext: ${error.message}`);
        });
      }
    } else {
      audioContext.resume().then(() => {
        addLog("✅ AudioContext resumed successfully");
      }).catch(error => {
        addLog(`❌ Failed to resume AudioContext: ${error.message}`);
      });
    }
  };

  const testDirectWebAudio = () => {
    addLog("🔊 Testing direct Web Audio API...");
    
    try {
      const ctx = audioContext || initializeAudioContext();
      if (!ctx) return;
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.setValueAtTime(440, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 1);
      
      addLog("✅ Web Audio API test tone played (440Hz, 1 second)");
    } catch (error) {
      addLog(`❌ Web Audio API test failed: ${error.message}`);
    }
  };

  const testHTML5Audio = () => {
    addLog("🔊 Testing HTML5 Audio with data URL...");
    
    try {
      // Create a simple sine wave as data URL
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const sampleRate = 44100;
      const duration = 0.5;
      const numSamples = Math.floor(sampleRate * duration);
      
      const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
      const channelData = buffer.getChannelData(0);
      
      for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        channelData[i] = Math.sin(2 * Math.PI * 440 * t) * 0.3 * Math.exp(-t * 2);
      }
      
      // Convert to WAV
      const wav = audioBufferToWav(buffer);
      const blob = new Blob([wav], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);
      
      const audio = new Audio(audioUrl);
      audio.volume = 0.5;
      
      audio.play().then(() => {
        addLog("✅ HTML5 Audio with data URL played successfully");
      }).catch(error => {
        addLog(`❌ HTML5 Audio failed: ${error.message}`);
      });
      
    } catch (error) {
      addLog(`❌ HTML5 Audio test failed: ${error.message}`);
    }
  };

  const audioBufferToWav = (buffer) => {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const bitDepth = 16;
    const numSamples = buffer.length;
    const blockAlign = numChannels * bitDepth / 8;
    const byteRate = sampleRate * blockAlign;
    const dataSize = numSamples * blockAlign;
    const bufferLength = 44 + dataSize;
    
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);
    
    // WAV header
    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, bufferLength - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);
    
    // Convert float samples to 16-bit PCM
    let offset = 44;
    for (let i = 0; i < numSamples; i++) {
      for (let channel = 0; channel < numChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
        view.setInt16(offset, sample * 0x7FFF, true);
        offset += 2;
      }
    }
    
    return arrayBuffer;
  };

  const testSystemSound = () => {
    addLog("🔊 Testing system sound through useSound hook...");
    
    // This will test the actual sound system
    try {
      const event = new CustomEvent('test-system-sound');
      window.dispatchEvent(event);
      addLog("✅ System sound test event dispatched");
    } catch (error) {
      addLog(`❌ System sound test failed: ${error.message}`);
    }
  };

  const checkBrowserInfo = () => {
    addLog("🔍 Checking browser information...");
    
    const info = {
      'User Agent': navigator.userAgent,
      'AudioContext Support': !!(window.AudioContext || window.webkitAudioContext),
      'HTML5 Audio Support': !!window.Audio,
      'Web Audio API Name': window.AudioContext ? 'AudioContext' : (window.webkitAudioContext ? 'webkitAudioContext' : 'None'),
      'Cookies Enabled': navigator.cookieEnabled,
      'Online Status': navigator.onLine ? 'Online' : 'Offline'
    };
    
    Object.entries(info).forEach(([key, value]) => {
      addLog(`${key}: ${value}`);
    });
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="audio-troubleshooter">
      <h3>🔧 Audio Troubleshooter</h3>
      
      <div className="troubleshoot-section">
        <h4>Step 1: Browser Check</h4>
        <button onClick={checkBrowserInfo}>Check Browser Info</button>
      </div>

      <div className="troubleshoot-section">
        <h4>Step 2: Initialize Audio</h4>
        <button onClick={initializeAudioContext}>Initialize AudioContext</button>
        <button onClick={resumeAudioContext}>Resume AudioContext</button>
      </div>

      <div className="troubleshoot-section">
        <h4>Step 3: Test Audio Methods</h4>
        <button onClick={testDirectWebAudio}>Test Web Audio API</button>
        <button onClick={testHTML5Audio}>Test HTML5 Audio</button>
        <button onClick={testSystemSound}>Test System Sound</button>
      </div>

      <div className="troubleshoot-section">
        <h4>Debug Logs</h4>
        <div className="log-container">
          {logs.length === 0 ? (
            <p>Click a test button to see logs...</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="log-entry">
                {log}
              </div>
            ))
          )}
        </div>
        <button onClick={clearLogs} className="clear-button">Clear Logs</button>
      </div>

      <div className="troubleshoot-info">
        <h4>📋 Troubleshooting Steps:</h4>
        <ol>
          <li><strong>Click any button above</strong> - This establishes user interaction</li>
          <li><strong>Check browser info</strong> - Verify audio support</li>
          <li><strong>Initialize AudioContext</strong> - Required for Web Audio API</li>
          <li><strong>Test Web Audio API</strong> - Most reliable method</li>
          <li><strong>Check console</strong> - Look for additional error messages</li>
        </ol>
        
        <h4>🚨 Common Issues:</h4>
        <ul>
          <li><strong>Browser requires user interaction</strong> - Click any button first</li>
          <li><strong>AudioContext suspended</strong> - Click "Resume AudioContext"</li>
          <li><strong>Volume muted</strong> - Check system and browser volume</li>
          <li><strong>Headphones/speakers</strong> - Ensure audio output is connected</li>
        </ul>
      </div>
    </div>
  );
};

export default AudioTroubleshooter;
