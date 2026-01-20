import React, { useState, useCallback, useEffect, useRef } from 'react';
import { SOUND_FILES } from '../utils/audioGenerator';
import { useTheme } from '../contexts/ThemeContext';

const useSound = () => {
  const { theme } = useTheme();  // Add theme hook
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('sound-muted');
    return saved !== null ? JSON.parse(saved) : false;
  });
  
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('sound-volume');
    return saved !== null ? parseFloat(saved) : 0.4;
  });

  const [interactionSounds, setInteractionSounds] = useState(() => {
    const saved = localStorage.getItem('sound-interaction-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [rewardSounds, setRewardSounds] = useState(() => {
    const saved = localStorage.getItem('sound-reward-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [notificationSounds, setNotificationSounds] = useState(() => {
    const saved = localStorage.getItem('sound-notification-enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [ambientSounds, setAmbientSounds] = useState(() => {
    const saved = localStorage.getItem('sound-ambient-enabled');
    return saved !== null ? JSON.parse(saved) : false; // Default to false for ambient music
  });

  // Track the main theme audio element
  const [mainThemeAudio, setMainThemeAudio] = useState(null);
  const [nightThemeAudio, setNightThemeAudio] = useState(null);
  const mainThemeRef = useRef(null);
  const nightThemeRef = useRef(null);
  const hasInteractedRef = useRef(false);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('sound-muted', JSON.stringify(isMuted));
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('sound-volume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('sound-interaction-enabled', JSON.stringify(interactionSounds));
  }, [interactionSounds]);

  useEffect(() => {
    localStorage.setItem('sound-reward-enabled', JSON.stringify(rewardSounds));
  }, [rewardSounds]);

  useEffect(() => {
    localStorage.setItem('sound-notification-enabled', JSON.stringify(notificationSounds));
  }, [notificationSounds]);

  useEffect(() => {
    localStorage.setItem('sound-ambient-enabled', JSON.stringify(ambientSounds));
  }, [ambientSounds]);

  // Update main theme volume when master volume changes
  useEffect(() => {
    if (mainThemeAudio) {
      mainThemeAudio.volume = volume * 0.3;
    }
    if (nightThemeAudio) {
      nightThemeAudio.volume = volume * 0.4;
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mainThemeAudio) {
        mainThemeAudio.pause();
        mainThemeAudio.currentTime = 0;
      }
      if (nightThemeAudio) {
        nightThemeAudio.pause();
        nightThemeAudio.currentTime = 0;
      }
    };
  }, []);

  // Auto-start main theme when ambient sounds are enabled and user has interacted
  useEffect(() => {
    if (ambientSounds && !isMuted && hasInteractedRef.current && !mainThemeAudio) {
      console.log('Auto-starting main theme...');
      playMainThemeAuto();
    } else if (!ambientSounds && mainThemeAudio) {
      console.log('Stopping main theme due to ambient disabled...');
      stopMainTheme();
    }
  }, [ambientSounds, isMuted]);

  // Detect user interaction for autoplay compliance
  useEffect(() => {
    const handleUserInteraction = () => {
      hasInteractedRef.current = true;
      console.log('User interaction detected, enabling autoplay');
      // Auto-start main theme if ambient is enabled
      if (ambientSounds && !isMuted && !mainThemeAudio) {
        playMainThemeAuto();
      }
    };

    // Add event listeners for user interaction
    const events = ['click', 'keydown', 'touchstart', 'scroll'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [ambientSounds, isMuted, mainThemeAudio, theme]);

  // Auto-start main theme function (DISABLED - handled by ThemeSoundManager)
  const playMainThemeAuto = () => {
    // Disabled to prevent overlapping with ThemeSoundManager
    // ThemeSoundManager handles all theme music now
    console.log('🔇 playMainThemeAuto disabled - ThemeSoundManager handles theme music');
    return;
  };

  // Auto-start night theme function (DISABLED - handled by ThemeSoundManager)
  const playNightThemeAuto = () => {
    // Disabled to prevent overlapping with ThemeSoundManager
    // ThemeSoundManager handles all theme music now
    console.log('🔇 playNightThemeAuto disabled - ThemeSoundManager handles theme music');
    return;
  };

  // Fallback tone generator using Web Audio API
  const playFallbackTone = useCallback((soundName, options = {}) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different tones for different sound types
      const frequencies = {
        'habit-complete': [659.25, 783.99, 880], // E, G, A - pleasant major third
        'xp-gain': [600, 700, 800], // Gentle ascending tones
        'level-up': [523.25, 659.25, 783.99, 1046.50, 1318.51], // Rich celebration fanfare
        'achievement-unlock': [800, 1000, 1200], // Sparkle harmonics
        'streak-milestone': [440, 550], // Warm gentle tones
        'button-click': [800], // Minecraft-style click frequency
        'click1': [900], // Custom Click1 frequency
        'menu-open': [700], // MenuOpen frequency
        'menu-close': [800], // MenuClose frequency
        'adriantnt-release-click': [1000], // Release click frequency
        'growtopia-trash-sound': [400], // Low trash/deletion frequency
        'growtopia-race-sound': [600], // Mid race/creation frequency
        'theme-toggle': [800, 1000], // Smooth transition
        'modal-open': [300, 500], // Soft whoosh up
        'main-theme': [261.63, 329.63, 392.00, 523.25], // C, E, G, C - pleasant chord progression
        'night-theme': [220, 246.94, 293.66, 369.99], // A, B, D, F# - mysterious night chords
        'cancel': [600, 500, 400], // Descending tones for cancel action
        'check': [800, 1000], // Ascending tones for check action
        'time-travel': [400, 600, 800, 1000, 800, 600, 400], // Time travel whoosh effect
      };
      
      const freqArray = frequencies[soundName] || [440];
      const duration = options.duration || 0.2;
      
      oscillator.frequency.setValueAtTime(freqArray[0], audioContext.currentTime);
      gainNode.gain.setValueAtTime((options.volume || volume) * 0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
      
      // Play multiple notes if available
      if (freqArray.length > 1) {
        freqArray.forEach((freq, index) => {
          if (index > 0) {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.setValueAtTime(freq, audioContext.currentTime + (index * 0.05));
            gain.gain.setValueAtTime((options.volume || volume) * 0.1, audioContext.currentTime + (index * 0.05));
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (index * 0.05) + duration);
            osc.start(audioContext.currentTime + (index * 0.05));
            osc.stop(audioContext.currentTime + (index * 0.05) + duration);
          }
        });
      }
    } catch (error) {
      console.log("Fallback tone failed:", error);
    }
  }, [volume]);

  const playSound = useCallback(
    (soundName, options = {}) => {
      console.log(`playSound called: ${soundName}, muted: ${isMuted}, ambient: ${ambientSounds}`);
      if (isMuted) return;

      // Check category-specific settings
      const category = options.category || 'interaction';
      console.log(`Category: ${category}, interaction: ${interactionSounds}, reward: ${rewardSounds}, notification: ${notificationSounds}, ambient: ${ambientSounds}`);
      if (category === 'interaction' && !interactionSounds) return;
      if (category === 'reward' && !rewardSounds) return;
      if (category === 'notification' && !notificationSounds) return;
      if (category === 'ambient' && !ambientSounds) return;

      try {
        // Handle special filenames with spaces
        let soundFile = soundName;
        if (soundName === 'growtopia-trash-sound') {
          soundFile = 'Growtopia Trash Sound Effect';
        } else if (soundName === 'growtopia-race-sound') {
          soundFile = 'Growtopia Race Sound effect';
        } else if (soundName === 'button-click') {
          soundFile = 'Click1';
        } else if (soundName === 'click1') {
          soundFile = 'Click1';
        } else if (soundName === 'menu-open') {
          soundFile = 'MenuOpen';
        } else if (soundName === 'menu-close') {
          soundFile = 'MenuClose';
        } else if (soundName === 'main-theme') {
          soundFile = 'Main theme';
        } else if (soundName === 'night-theme') {
          soundFile = 'Night theme';
        } else if (soundName === 'cancel') {
          soundFile = 'Cancel';
        } else if (soundName === 'check') {
          soundFile = 'Check';
        } else if (soundName === 'adriantnt-release-click') {
          soundFile = 'adriantnt_release_click';
        } else if (soundName === 'time-travel') {
          soundFile = 'Time travel';
        }
        
        console.log(`Loading sound: ${soundName} as file: ${soundFile}.mp3`);
        const audio = new Audio(`/sounds/${soundFile}.mp3`);
        audio.volume = options.volume || volume;
        audio.playbackRate = options.rate || 1;
        
        // Handle looping for ambient themes (main and night themes)
        if (options.loop) {
          audio.loop = true;
          if (soundName === 'main-theme' || soundName === 'night-theme') {
            // Always stop existing ambient themes when playing a new theme
            // This ensures clean theme switching without overlap
            const isMainThemePlaying = mainThemeAudio || mainThemeRef.current;
            const isNightThemePlaying = nightThemeAudio || nightThemeRef.current;
            
            // Always stop main theme if we're playing any theme
            if (isMainThemePlaying) {
              console.log('🛑 Stopping main theme for clean switch');
              if (mainThemeAudio) {
                mainThemeAudio.pause();
                mainThemeAudio.currentTime = 0;
                setMainThemeAudio(null);
              }
              if (mainThemeRef.current) {
                mainThemeRef.current.pause();
                mainThemeRef.current.currentTime = 0;
                mainThemeRef.current = null;
              }
            }
            
            // Always stop night theme if we're playing any theme
            if (isNightThemePlaying) {
              console.log('🛑 Stopping night theme for clean switch');
              if (nightThemeAudio) {
                nightThemeAudio.pause();
                nightThemeAudio.currentTime = 0;
                setNightThemeAudio(null);
              }
              if (nightThemeRef.current) {
                nightThemeRef.current.pause();
                nightThemeRef.current.currentTime = 0;
                nightThemeRef.current = null;
              }
            }
            
            // Always start the new theme (allowing same theme to restart if needed)
            if (soundName === 'main-theme') {
              console.log('🎵 Starting main theme');
              setMainThemeAudio(audio);
              mainThemeRef.current = audio;
            } else if (soundName === 'night-theme') {
              console.log('🎵 Starting night theme');
              setNightThemeAudio(audio);
              nightThemeRef.current = audio;
            }
          }
        }
        
        audio.play().catch((e) => {
          console.log("MP3 sound play failed, trying generated audio:", e);
          
          // Try generated audio file as fallback
          if (options.fallback !== false && SOUND_FILES[soundName]) {
            try {
              const generatedAudio = new Audio(SOUND_FILES[soundName]());
              generatedAudio.volume = options.volume || volume;
              generatedAudio.playbackRate = options.rate || 1;
              generatedAudio.play().catch((genError) => {
                console.log("Generated audio failed, using Web Audio API fallback:", genError);
                playFallbackTone(soundName, options);
              });
            } catch (genError) {
              console.log("Generated audio creation failed, using Web Audio API fallback:", genError);
              playFallbackTone(soundName, options);
            }
          } else {
            // Try minecraft-click-cropped.mp3 as fallback
            if (soundName !== 'button-click') {
              try {
                const fallbackAudio = new Audio('/sounds/minecraft-click-cropped.mp3');
                fallbackAudio.volume = options.volume || volume;
                fallbackAudio.playbackRate = options.rate || 1;
                fallbackAudio.play().catch((fallbackError) => {
                  console.log("Fallback audio failed, using Web Audio API:", fallbackError);
                  playFallbackTone(soundName, options);
                });
              } catch (fallbackError) {
                console.log("Fallback audio creation failed, using Web Audio API:", fallbackError);
                playFallbackTone(soundName, options);
              }
            } else {
              // Final fallback to Web Audio API
              playFallbackTone(soundName, options);
            }
          }
        });
      } catch (error) {
        console.log("Audio creation failed, trying generated audio:", error);
        
        // Try generated audio file as fallback
        if (options.fallback !== false && SOUND_FILES[soundName]) {
          try {
            const generatedAudio = new Audio(SOUND_FILES[soundName]());
            generatedAudio.volume = options.volume || volume;
            generatedAudio.playbackRate = options.rate || 1;
            generatedAudio.play().catch((genError) => {
              console.log("Generated audio failed, using Web Audio API fallback:", genError);
              playFallbackTone(soundName, options);
            });
          } catch (genError) {
            console.log("Generated audio creation failed, using Web Audio API fallback:", genError);
            playFallbackTone(soundName, options);
          }
        } else {
          // Try minecraft-click-cropped.mp3 as fallback
          if (soundName !== 'button-click') {
            try {
              const fallbackAudio = new Audio('/sounds/minecraft-click-cropped.mp3');
              fallbackAudio.volume = options.volume || volume;
              fallbackAudio.playbackRate = options.rate || 1;
              fallbackAudio.play().catch((fallbackError) => {
                console.log("Fallback audio failed, using Web Audio API:", fallbackError);
                playFallbackTone(soundName, options);
              });
            } catch (fallbackError) {
              console.log("Fallback audio creation failed, using Web Audio API:", fallbackError);
              playFallbackTone(soundName, options);
            }
          } else {
            // Final fallback to Web Audio API
            playFallbackTone(soundName, options);
          }
        }
      }
    },
    [isMuted, volume, interactionSounds, rewardSounds, notificationSounds, playFallbackTone]
  );

  const toggleMute = () => setIsMuted(!isMuted);
  
  const toggleCategory = (category) => {
    switch (category) {
      case 'interaction':
        setInteractionSounds(!interactionSounds);
        break;
      case 'reward':
        setRewardSounds(!rewardSounds);
        break;
      case 'notification':
        setNotificationSounds(!notificationSounds);
        break;
      case 'ambient':
        const newAmbientState = !ambientSounds;
        setAmbientSounds(newAmbientState);
        // Stop all themes if ambient is being disabled
        if (!newAmbientState) {
          stopAllThemes();
        }
        break;
      default:
        break;
    }
  };

  // Stop main theme function
  const stopMainTheme = () => {
    if (mainThemeAudio || mainThemeRef.current) {
      const audio = mainThemeAudio || mainThemeRef.current;
      audio.pause();
      audio.currentTime = 0;
      setMainThemeAudio(null);
      mainThemeRef.current = null;
      console.log('Main theme stopped');
    }
  };

  // Stop night theme function
  const stopNightTheme = () => {
    if (nightThemeAudio || nightThemeRef.current) {
      const audio = nightThemeAudio || nightThemeRef.current;
      audio.pause();
      audio.currentTime = 0;
      setNightThemeAudio(null);
      nightThemeRef.current = null;
      console.log('Night theme stopped');
    }
  };

  // Stop all ambient themes
  const stopAllThemes = () => {
    console.log('🛑 Stopping ALL theme music');
    
    // Stop main theme
    if (mainThemeAudio) {
      console.log('Stopping main theme audio');
      mainThemeAudio.pause();
      mainThemeAudio.currentTime = 0;
      setMainThemeAudio(null);
    }
    if (mainThemeRef.current) {
      console.log('Stopping main theme ref');
      mainThemeRef.current.pause();
      mainThemeRef.current.currentTime = 0;
      mainThemeRef.current = null;
    }
    
    // Stop night theme
    if (nightThemeAudio) {
      console.log('Stopping night theme audio');
      nightThemeAudio.pause();
      nightThemeAudio.currentTime = 0;
      setNightThemeAudio(null);
    }
    if (nightThemeRef.current) {
      console.log('Stopping night theme ref');
      nightThemeRef.current.pause();
      nightThemeRef.current.currentTime = 0;
      nightThemeRef.current = null;
    }
    
    console.log('✅ All themes stopped');
  };

  return { 
    playSound, 
    isMuted, 
    setIsMuted: toggleMute, 
    volume, 
    setVolume,
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
  };
};

export default useSound;
