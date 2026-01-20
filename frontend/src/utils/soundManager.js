// Sound Manager Utility for Chronicle of Self
// Provides centralized sound management and predefined sound configurations

export const SOUND_CATEGORIES = {
  INTERACTION: 'interaction',
  REWARD: 'reward',
  NOTIFICATION: 'notification',
  AMBIENT: 'ambient'
};

export const SOUND_CONFIGS = {
  'button-click': { category: 'interaction', volume: 0.3, loop: false },
  'click1': { category: 'interaction', volume: 0.3, loop: false },
  'menu-open': { category: 'interaction', volume: 0.2, loop: false },
  'menu-close': { category: 'interaction', volume: 0.2, loop: false },
  'toggle-on': { category: 'interaction', volume: 0.3, loop: false },
  'toggle-off': { category: 'interaction', volume: 0.3, loop: false },
  'achievement-unlock': { category: 'reward', volume: 0.5, loop: false },
  'level-up': { category: 'reward', volume: 0.6, loop: false },
  'streak-milestone': { category: 'reward', volume: 0.4, loop: false },
  'xp-gain': { category: 'reward', volume: 0.3, loop: false },
  'notification': { category: 'notification', volume: 0.4, loop: false },
  'reminder': { category: 'notification', volume: 0.3, loop: false },
  'main-theme': { category: 'ambient', volume: 0.3, loop: true },
  'night-theme': { category: 'ambient', volume: 0.4, loop: true },
  'cancel': { category: 'interaction', volume: 0.6, loop: false },
  'check': { category: 'interaction', volume: 0.7, loop: false },
  'time-travel': { category: 'interaction', volume: 0.8, loop: false },
  'theme-toggle': {
    category: SOUND_CATEGORIES.INTERACTION,
    volume: 0.4,
    duration: 0.15,
    description: 'Theme toggle sound effect'
  },
  'adriantnt-release-click': {
    category: SOUND_CATEGORIES.INTERACTION,
    volume: 0.5,
    duration: 0.15,
    description: 'Adriantnt release click sound effect'
  },
  'growtopia-trash-sound': {
    category: SOUND_CATEGORIES.INTERACTION,
    volume: 0.7,
    duration: 0.5,
    description: 'Growtopia trash sound effect for deletion'
  },
  'growtopia-race-sound': {
    category: SOUND_CATEGORIES.REWARD,
    volume: 0.8,
    duration: 0.6,
    description: 'Growtopia race sound effect for habit creation'
  },
  'habit-complete': {
    category: SOUND_CATEGORIES.REWARD,
    volume: 0.5,
    duration: 0.2,
    description: 'Light, positive chime for habit completion'
  },
  'xp-gain-small': {
    category: SOUND_CATEGORIES.REWARD,
    volume: 0.4,
    duration: 0.15,
    description: 'Quick ascending sparkle for small XP amounts'
  },
  'xp-gain-large': {
    category: SOUND_CATEGORIES.REWARD,
    volume: 0.5,
    duration: 0.2,
    description: 'More elaborate sparkle for large XP amounts'
  },
  'level-up': {
    category: SOUND_CATEGORIES.NOTIFICATION,
    volume: 0.6,
    duration: 0.8,
    description: 'Short fanfare for level up celebration'
  },
  
  // Navigation & UI
  'modal-open': {
    category: SOUND_CATEGORIES.INTERACTION,
    volume: 0.3,
    duration: 0.15,
    description: 'Soft whoosh for modal opening'
  },
  
  // Achievement System
  'achievement-unlock': {
    category: SOUND_CATEGORIES.REWARD,
    volume: 0.5,
    duration: 0.4,
    description: 'Rewarding sparkle for achievement unlocks'
  },
  'streak-milestone': {
    category: SOUND_CATEGORIES.NOTIFICATION,
    volume: 0.4,
    duration: 0.3,
    description: 'Fire crackle for streak milestones'
  },
  
  // Ambient & Background
  'main-theme': {
    category: SOUND_CATEGORIES.AMBIENT,
    volume: 0.3,
    duration: 120,
    description: 'Main background theme music',
    loop: true
  },
  'night-theme': {
    category: SOUND_CATEGORIES.AMBIENT,
    volume: 0.4,
    duration: 90,
    description: 'Night theme music for dark mode',
    loop: true
  }
};

export class SoundManager {
  constructor(playSoundFunction) {
    this.playSound = playSoundFunction;
  }

  // Play sound with predefined configuration
  play(soundName, customOptions = {}) {
    console.log(`SoundManager.play called: ${soundName}`, customOptions);
    const config = SOUND_CONFIGS[soundName];
    if (!config) {
      console.warn(`Sound configuration not found for: ${soundName}`);
      return this.playSound(soundName, customOptions);
    }

    const options = {
      ...config,
      ...customOptions,
      category: config.category
    };

    console.log(`SoundManager playing ${soundName} with options:`, options);
    return this.playSound(soundName, options);
  }

  // Convenience methods for common actions
  playHabitComplete(options = {}) {
    return this.play('habit-complete', options);
  }

  playXPGain(amount = 0, options = {}) {
    const soundName = amount > 50 ? 'xp-gain-large' : 'xp-gain-small';
    return this.play(soundName, options);
  }

  playLevelUp(options = {}) {
    return this.play('level-up', options);
  }

  playButtonClick(options = {}) {
    return this.play('button-click', options);
  }

  playClick1(options = {}) {
    return this.play('click1', options);
  }

  playMenuOpen(options = {}) {
    return this.play('menu-open', options);
  }

  playMenuClose(options = {}) {
    return this.play('menu-close', options);
  }

  playAdriantntReleaseClick(options = {}) {
    return this.play('adriantnt-release-click', options);
  }

  playGrowtopiaTrashSound(options = {}) {
    return this.play('growtopia-trash-sound', options);
  }

  playGrowtopiaRaceSound(options = {}) {
    return this.play('growtopia-race-sound', options);
  }

  playThemeToggle(options = {}) {
    return this.play('theme-toggle', options);
  }

  playModalOpen(options = {}) {
    return this.play('modal-open', options);
  }

  playAchievementUnlock(options = {}) {
    return this.play('achievement-unlock', options);
  }

  playStreakMilestone(days = 7, options = {}) {
    // Different variations for different streak lengths
    if (days >= 100) {
      return this.play('streak-milestone', { ...options, volume: 0.5 });
    } else if (days >= 30) {
      return this.play('streak-milestone', { ...options, volume: 0.45 });
    } else {
      return this.play('streak-milestone', options);
    }
  }

  playMainTheme(options = {}) {
    return this.play('main-theme', { ...options, loop: true });
  }

  playNightTheme(options = {}) {
    return this.play('night-theme', { ...options, loop: true });
  }

  playCancel(options = {}) {
    return this.play('cancel', options);
  }

  playCheck(options = {}) {
    return this.play('check', options);
  }

  playTimeTravel(options = {}) {
    return this.play('time-travel', options);
  }

  stopMainTheme() {
    // This will be handled by the useSound hook's stopMainTheme function
    // The hook should be accessed via the playSound function's context
    console.log('Stop main theme requested - use useSound hook stopMainTheme method');
  }

  // Get all available sound names
  getAvailableSounds() {
    return Object.keys(SOUND_CONFIGS);
  }

  // Get sound configuration
  getSoundConfig(soundName) {
    return SOUND_CONFIGS[soundName];
  }

  // Get sounds by category
  getSoundsByCategory(category) {
    return Object.entries(SOUND_CONFIGS)
      .filter(([_, config]) => config.category === category)
      .map(([name, config]) => ({ name, ...config }));
  }
}

// Hook to create sound manager instance
export const useSoundManager = () => {
  // Note: This hook needs to be used within a component that has access to SoundContext
  // Import useSoundContext in your component and create SoundManager instance directly
  throw new Error('useSoundManager is deprecated. Import useSoundContext and create SoundManager instance in your component instead.');
};

export default SoundManager;
