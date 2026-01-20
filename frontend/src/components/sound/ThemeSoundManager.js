import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSoundContext } from '../../contexts/SoundContext';

const ThemeSoundManager = ({ children }) => {
  const { theme } = useTheme();
  const { ambientSounds, playSound, stopAllThemes } = useSoundContext();
  const currentThemeRef = useRef(theme);
  const isInitialized = useRef(false);
  const hasInteracted = useRef(false);

  // Function to play the appropriate theme music
  const playThemeMusic = (themeName) => {
    console.log(`🎵 Playing theme music for ${themeName} mode`);
    
    // Force stop all themes first to prevent overlap
    console.log('🛑 Force stopping all themes before playing new one');
    stopAllThemes();
    
    // Wait a moment to ensure clean stop, then play new theme
    setTimeout(() => {
      if (themeName === 'dark') {
        console.log('🌙 Starting Night Theme at volume 0.4');
        playSound('night-theme', { category: 'ambient', volume: 0.4, loop: true });
      } else {
        console.log('☀️ Starting Main Theme at volume 0.3');
        playSound('main-theme', { category: 'ambient', volume: 0.3, loop: true });
      }
    }, 50); // Reduced delay for faster switching
  };

  // Auto-start music on app load (after user interaction)
  useEffect(() => {
    // This effect runs once on app mount
    console.log('🚀 App loaded - Current theme:', theme, 'Ambient enabled:', ambientSounds);
    
    const handleInitialInteraction = () => {
      console.log('👆 Initial user interaction detected');
      hasInteracted.current = true;
      
      // Only stop themes if we haven't initialized yet and need to start fresh
      // Don't stop themes if music is already playing properly
      if (!isInitialized.current) {
        console.log('🛑 Stopping any existing themes for fresh start');
        stopAllThemes();
        
        // Start music if ambient is enabled and not already started
        if (ambientSounds) {
          console.log(`🎵 Auto-starting theme music for ${theme} mode on app load`);
          
          // Wait a moment to ensure clean stop, then start correct theme
          setTimeout(() => {
            if (theme === 'dark') {
              console.log('🌙 App starting in DARK mode - playing Night Theme');
              playSound('night-theme', { category: 'ambient', volume: 0.4, loop: true });
            } else {
              console.log('☀️ App starting in LIGHT mode - playing Main Theme');
              playSound('main-theme', { category: 'ambient', volume: 0.3, loop: true });
            }
            isInitialized.current = true;
            currentThemeRef.current = theme;
          }, 300);
        }
      } else {
        console.log('🎵 Music already initialized, not stopping themes');
      }
    };

    // Add event listeners for first user interaction
    const events = ['click', 'keydown', 'touchstart', 'scroll', 'mousedown', 'pointerdown'];
    events.forEach(event => {
      document.addEventListener(event, handleInitialInteraction, { once: true });
    });

    // Also try to start music immediately (might work in some browsers)
    setTimeout(() => {
      if (!hasInteracted.current && ambientSounds) {
        console.log('🎵 Attempting direct autoplay (may fail in Chrome)');
        const audio = new Audio(theme === 'dark' ? '/sounds/Night theme.mp3' : '/sounds/Main theme.mp3');
        audio.loop = true;
        audio.volume = theme === 'dark' ? 0.4 : 0.3;
        audio.play()
          .then(() => {
            console.log(`✅ Direct autoplay successful! Playing ${theme} theme.`);
            isInitialized.current = true;
            currentThemeRef.current = theme;
          })
          .catch(() => {
            console.log('❌ Direct autoplay failed - waiting for user interaction');
            console.log('💡 Click anywhere on the page to start the theme music');
          });
      }
    }, 1000);

    // Add a more aggressive fallback after 3 seconds
    setTimeout(() => {
      if (!hasInteracted.current && ambientSounds && !isInitialized.current) {
        console.log('⏰ Still no interaction - adding visible click prompt');
        // Create a subtle visual prompt for users
        const prompt = document.createElement('div');
        prompt.innerHTML = '🎵 Click to start music';
        prompt.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 10px 15px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          z-index: 9999;
          animation: pulse 2s infinite;
        `;
        prompt.onclick = () => {
          handleInitialInteraction();
          document.body.removeChild(prompt);
        };
        document.body.appendChild(prompt);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
          if (document.body.contains(prompt)) {
            document.body.removeChild(prompt);
          }
        }, 10000);
      }
    }, 3000);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleInitialInteraction);
      });
    };
  }, []); // Empty dependency array - only runs once on mount

  // Handle theme changes and ambient sound toggle
  useEffect(() => {
    console.log('🎨 Theme or ambient setting changed:', { theme, ambientSounds, initialized: isInitialized.current });
    
    // Only stop themes if ambient sounds are being disabled
    if (!ambientSounds) {
      console.log('🔇 Ambient sounds disabled, stopping all themes');
      stopAllThemes();
      currentThemeRef.current = theme;
      isInitialized.current = false; // Reset initialization so music can start later
      return;
    }

    // If user has interacted and ambient is enabled, start music if not already playing
    if (hasInteracted.current && ambientSounds && !isInitialized.current) {
      console.log(`🎵 Starting theme music for ${theme} mode`);
      setTimeout(() => {
        playThemeMusic(theme);
        isInitialized.current = true;
        currentThemeRef.current = theme; // ← Set current theme when music starts
      }, 200);
      return;
    }

    // Handle theme switching (only if already initialized)
    if (isInitialized.current && currentThemeRef.current !== theme) {
      console.log(`🔄 Theme switching from ${currentThemeRef.current} to ${theme}`);
      console.log(`🎵 isInitialized: ${isInitialized.current}, currentThemeRef: ${currentThemeRef.current}, new theme: ${theme}`);
      
      // Use the playThemeMusic function which handles clean stopping and starting
      setTimeout(() => {
        console.log(`🎵 Starting theme for ${theme} mode`);
        playThemeMusic(theme);
        currentThemeRef.current = theme;
      }, 200); // Reduced delay for faster switching
    }
  }, [theme, ambientSounds]);

  // Additional effect to handle post-login navigation (removed - handled by main useEffect)
  // useEffect(() => {
  //   // Check if we're on a page that should have music (like dashboard) but music isn't playing
  //   if (hasInteracted.current && ambientSounds && !isInitialized.current) {
  //     // Small delay to ensure page is fully loaded
  //     const timer = setTimeout(() => {
  //       console.log(`🎵 Detected navigation to new page - starting ${theme} theme music`);
  //       playThemeMusic(theme);
  //       isInitialized.current = true;
  //     }, 1000);
      
  //     return () => clearTimeout(timer);
  //   }
  // }, [theme, ambientSounds]); // This will trigger on route changes

  return children;
};

export default ThemeSoundManager;
