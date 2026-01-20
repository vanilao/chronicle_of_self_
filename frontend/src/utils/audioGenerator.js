// Audio Generator for creating simple sound effects using Web Audio API
// This generates data URLs that can be used as actual audio files

export const generateAudioDataUrl = (frequency = 440, duration = 0.2, type = 'sine') => {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * duration);
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // Create audio buffer
  const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
  const channelData = buffer.getChannelData(0);
  
  // Generate sine wave
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const envelope = Math.exp(-t * 3); // Exponential decay
    channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
  }
  
  // Convert to WAV
  const wav = audioBufferToWav(buffer);
  const blob = new Blob([wav], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
};

export const audioBufferToWav = (buffer) => {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
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
  view.setUint16(20, format, true);
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

// Pre-generated sound effects - Modern and pleasant
export const SOUND_FILES = {
  'button-click': () => {
    // Try to use the custom minecraft-click-cropped.mp3 file
    // If the file doesn't exist, fall back to generated sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 2205, 44100); // 0.05 seconds
    const data = buffer.getChannelData(0);
    
    // Minecraft-style click - short, punchy, satisfying
    for (let i = 0; i < 2205; i++) {
      const t = i / 44100;
      // Quick attack, sharp decay - Minecraft click style
      const envelope = Math.exp(-t * 120); // Faster decay for punchy feel
      // Lower frequency for Minecraft feel
      data[i] = Math.sin(2 * Math.PI * 800 * t) * envelope * 0.3;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },

  'click1': () => {
    // Fallback generated sound for Click1
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 5292, 44100); // 0.12 seconds
    const data = buffer.getChannelData(0);
    
    // Click1 style - sharp click with slight resonance
    for (let i = 0; i < 5292; i++) {
      const t = i / 44100;
      // Sharp attack with medium decay
      const envelope = Math.exp(-t * 25);
      // Mid frequency for click sound
      data[i] = Math.sin(2 * Math.PI * 900 * t) * envelope * 0.4;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },

  'menu-open': () => {
    // Fallback generated sound for MenuOpen
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 6615, 44100); // 0.15 seconds
    const data = buffer.getChannelData(0);
    
    // MenuOpen style - smooth opening sound
    for (let i = 0; i < 6615; i++) {
      const t = i / 44100;
      // Smooth attack and release for opening feel
      const envelope = t < 0.05 ? t * 20 : Math.exp(-(t - 0.05) * 8);
      // Ascending frequency for opening effect
      const freq = 600 + (200 * t / 0.15);
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.5;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },

  'menu-close': () => {
    // Fallback generated sound for MenuClose
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 6615, 44100); // 0.15 seconds
    const data = buffer.getChannelData(0);
    
    // MenuClose style - smooth closing sound
    for (let i = 0; i < 6615; i++) {
      const t = i / 44100;
      // Smooth attack and release for closing feel
      const envelope = t < 0.05 ? t * 20 : Math.exp(-(t - 0.05) * 8);
      // Descending frequency for closing effect
      const freq = 800 - (200 * t / 0.15);
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.5;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },

  'adriantnt-release-click': () => {
    // Fallback generated sound for adriantnt release click
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 2205, 44100); // 0.05 seconds
    const data = buffer.getChannelData(0);
    
    // Release click style - smooth release with slight decay
    for (let i = 0; i < 2205; i++) {
      const t = i / 44100;
      // Smooth envelope for release feel
      const envelope = Math.exp(-t * 80);
      // Mid frequency for release sound
      data[i] = Math.sin(2 * Math.PI * 1000 * t) * envelope * 0.4;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },
  
  'growtopia-trash-sound': () => {
    // Fallback generated sound for trash/deletion
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 22050, 44100); // 0.5 seconds
    const data = buffer.getChannelData(0);
    
    // Trash/deletion sound - descending sweep with noise
    for (let i = 0; i < 22050; i++) {
      const t = i / 44100;
      // Descending frequency sweep for trash effect
      const freq = 400 - (300 * t / 0.5);
      // Quick decay for trash sound
      const envelope = Math.exp(-t * 4);
      // Add some noise for texture
      const noise = (Math.random() - 0.5) * 0.1;
      data[i] = (Math.sin(2 * Math.PI * freq * t) + noise) * envelope * 0.3;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },

  'growtopia-race-sound': () => {
    // Fallback generated sound for race/creation
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 26460, 44100); // 0.6 seconds
    const data = buffer.getChannelData(0);
    
    // Race/creation sound - ascending energetic sweep
    for (let i = 0; i < 26460; i++) {
      const t = i / 44100;
      // Ascending frequency sweep for race effect
      const freq = 300 + (500 * t / 0.6);
      // Envelope with attack and sustain for race feel
      const envelope = t < 0.1 ? t * 10 : Math.exp(-(t - 0.1) * 2);
      // Add harmonics for rich race sound
      const fundamental = Math.sin(2 * Math.PI * freq * t);
      const harmonic = Math.sin(2 * Math.PI * freq * 2 * t) * 0.3;
      data[i] = (fundamental + harmonic) * envelope * 0.4;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },
  
  'theme-toggle': () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 4410, 44100); // 0.1 seconds
    const data = buffer.getChannelData(0);
    
    // Smooth slide sound - gentle whoosh
    for (let i = 0; i < 4410; i++) {
      const t = i / 44100;
      const freq = 800 + (400 * Math.sin(t * 20)); // Gentle frequency modulation
      const envelope = Math.exp(-t * 15) * (1 - t * 5); // Smooth fade out
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.15;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },
  
  'habit-complete': () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 8820, 44100); // 0.2 seconds
    const data = buffer.getChannelData(0);
    
    // Pleasant completion chime - soft bell-like
    const notes = [659.25, 783.99, 880]; // E, G, A - pleasant major third
    const noteDuration = 8820 / 3;
    
    for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
      const freq = notes[noteIndex];
      const startSample = noteIndex * noteDuration;
      
      for (let i = 0; i < noteDuration; i++) {
        const t = i / 44100;
        const envelope = Math.exp(-t * 6); // Gentle decay
        // Add harmonics for richer sound
        const fundamental = Math.sin(2 * Math.PI * freq * t);
        const harmonic = Math.sin(2 * Math.PI * freq * 2 * t) * 0.3;
        data[startSample + i] = (fundamental + harmonic) * envelope * 0.2;
      }
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },
  
  'xp-gain-small': () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 6615, 44100); // 0.15 seconds
    const data = buffer.getChannelData(0);
    
    // Gentle sparkle - soft ascending tones
    for (let i = 0; i < 6615; i++) {
      const t = i / 44100;
      const freq = 600 + (200 * t / 0.15); // Ascending frequency
      const envelope = Math.exp(-t * 8);
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.15;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },
  
  'xp-gain-large': () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 8820, 44100); // 0.2 seconds
    const data = buffer.getChannelData(0);
    
    // More elaborate sparkle
    for (let i = 0; i < 8820; i++) {
      const t = i / 44100;
      const freq = 500 + (400 * t / 0.2);
      const envelope = Math.exp(-t * 5);
      // Add chorus effect
      const tone1 = Math.sin(2 * Math.PI * freq * t);
      const tone2 = Math.sin(2 * Math.PI * (freq * 1.01) * t) * 0.5;
      data[i] = (tone1 + tone2) * envelope * 0.18;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },
  
  'level-up': () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 35280, 44100); // 0.8 seconds
    const data = buffer.getChannelData(0);
    
    // Pleasant celebration fanfare
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C, E, G, C, E
    const noteDuration = 35280 / notes.length;
    
    for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
      const freq = notes[noteIndex];
      const startSample = noteIndex * noteDuration;
      
      for (let i = 0; i < noteDuration; i++) {
        const t = i / 44100;
        const envelope = Math.exp(-t * 3);
        // Rich harmonics for celebration feel
        const fundamental = Math.sin(2 * Math.PI * freq * t);
        const harmonic2 = Math.sin(2 * Math.PI * freq * 2 * t) * 0.4;
        const harmonic3 = Math.sin(2 * Math.PI * freq * 3 * t) * 0.2;
        data[startSample + i] = (fundamental + harmonic2 + harmonic3) * envelope * 0.15;
      }
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },
  
  'achievement-unlock': () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 17640, 44100); // 0.4 seconds
    const data = buffer.getChannelData(0);
    
    // Rewarding sparkle - gentle harp-like
    for (let i = 0; i < 17640; i++) {
      const t = i / 44100;
      const freq = 800 + (600 * Math.sin(t * 10)); // Gentle vibrato
      const envelope = Math.exp(-t * 4) * (1 + 0.3 * Math.sin(t * 30)); // Tremolo
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.2;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },
  
  'streak-milestone': () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 13230, 44100); // 0.3 seconds
    const data = buffer.getChannelData(0);
    
    // Warm, gentle glow sound
    for (let i = 0; i < 13230; i++) {
      const t = i / 44100;
      const freq = 440 + (100 * Math.cos(t * 5)); // Gentle frequency modulation
      const envelope = Math.exp(-t * 3);
      // Warm harmonics
      const fundamental = Math.sin(2 * Math.PI * freq * t);
      const warmHarmonic = Math.sin(2 * Math.PI * freq * 1.5 * t) * 0.6;
      data[i] = (fundamental + warmHarmonic) * envelope * 0.18;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },
  
  'modal-open': () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 6615, 44100); // 0.15 seconds
    const data = buffer.getChannelData(0);
    
    // Soft whoosh up - gentle appearance
    for (let i = 0; i < 6615; i++) {
      const t = i / 44100;
      const freq = 300 + (200 * t / 0.15); // Ascending whoosh
      const envelope = t * 2 * Math.exp(-t * 8); // Quick attack, gentle decay
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.15;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },
  
  'modal-close': () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = audioContext.createBuffer(1, 6615, 44100); // 0.15 seconds
    const data = buffer.getChannelData(0);
    
    // Soft whoosh down - gentle disappearance
    for (let i = 0; i < 6615; i++) {
      const t = i / 44100;
      const freq = 500 - (200 * t / 0.15); // Descending whoosh
      const envelope = (1 - t * 3) * Math.exp(-t * 8); // Gentle fade
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.15;
    }
    
    const wav = audioBufferToWav(buffer);
    const blob = new Blob([wav], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  },
};

export default SOUND_FILES;
