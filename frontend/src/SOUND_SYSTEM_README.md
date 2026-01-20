# Chronicle of Self - Sound Effects System

A comprehensive, minimalist sound effects system designed to enhance user experience without being intrusive.

## 🎯 Overview

The sound system provides audio feedback for key interactions in the Chronicle of Self application. It features:

- **Minimalist Design**: Short, subtle sounds (0.1-0.5 seconds)
- **Retro Aesthetic**: 8-bit/16-bit inspired chiptune tones
- **Accessibility**: Full user controls and visual alternatives
- **Fallback System**: Web Audio API tones when sound files are missing
- **Persistent Settings**: User preferences saved in localStorage

## 📁 File Structure

```
frontend/
├── public/
│   └── sounds/                    # Sound files directory
│       ├── habit-complete.mp3     # Placeholder files (replace with actual sounds)
│       ├── xp-gain-small.mp3
│       ├── xp-gain-large.mp3
│       ├── level-up.mp3
│       ├── achievement-unlock.mp3
│       ├── streak-milestone.mp3
│       ├── button-click.mp3
│       ├── theme-toggle.mp3
│       ├── modal-open.mp3
│       └── modal-close.mp3
└── src/
    ├── contexts/
    │   └── SoundContext.js        # React context provider
    ├── hooks/
    │   └── useSound.js            # Main sound hook with state management
    ├── utils/
    │   └── soundManager.js        # Sound management utility and configurations
    ├── components/
    │   ├── habits/
    │   │   └── HabitCardWithSound.js      # Example component with sound integration
    │   ├── progress/
    │   │   └── LevelUpModalWithSound.js   # Modal component with sound effects
    │   └── user/
    │       └── SoundSettings.js           # Complete settings UI for sound controls
    └── pages/
        └── demo/
            └── SoundDemoPage.js           # Interactive demo page
```

## 🛠 Core Components

### 1. useSound Hook

The main hook that provides sound functionality:

```javascript
import { useSoundContext } from '../contexts/SoundContext';

const MyComponent = () => {
  const { playSound, isMuted, volume, setVolume } = useSoundContext();
  
  const handleClick = () => {
    playSound('button-click', { volume: 0.5 });
  };
  
  return <button onClick={handleClick}>Click Me</button>;
};
```

**Features:**
- Master mute control
- Volume adjustment (0-100%)
- Category-specific toggles (interaction, reward, notification)
- localStorage persistence
- Fallback tone generation

### 2. SoundManager Utility

High-level sound management with predefined configurations:

```javascript
import SoundManager from '../utils/soundManager';

const soundManager = new SoundManager(playSoundFunction);

// Convenience methods
soundManager.playHabitComplete();
soundManager.playXPGain(25);
soundManager.playLevelUp();
soundManager.playButtonClick();
```

**Features:**
- Predefined sound configurations
- Category-based organization
- Dynamic sound selection (e.g., XP amount determines sound)
- Streak milestone variations

### 3. SoundContext Provider

React context that makes sound functionality available throughout the app:

```javascript
// Already integrated in App.js
<SoundProvider>
  <Router>
    <AppRoutes />
  </Router>
</SoundProvider>
```

## 🎵 Sound Categories

### Interaction Sounds
- Button clicks
- Theme toggles
- Modal open/close

### Reward Sounds
- Habit completion
- XP gain (small/large)
- Achievement unlocks

### Notification Sounds
- Level ups
- Streak milestones

## 🎛️ User Controls

### Settings Interface
The `SoundSettings` component provides:

- **Master Mute Toggle**: Turn all sounds on/off
- **Volume Slider**: Adjust overall volume (0-100%)
- **Category Toggles**: Enable/disable specific sound types
- **Test Panel**: Preview all available sounds
- **Live Testing**: Hear sounds as you adjust settings

### Programmatic Control

```javascript
const {
  playSound,
  isMuted,
  setIsMuted,
  volume,
  setVolume,
  interactionSounds,
  rewardSounds,
  notificationSounds,
  toggleCategory
} = useSoundContext();

// Toggle master mute
setIsMuted();

// Adjust volume
setVolume(0.7);

// Toggle category
toggleCategory('reward');
```

## 🔄 Fallback System

When sound files are missing, the system automatically uses Web Audio API to generate fallback tones:

- **Habit Complete**: C major arpeggio
- **XP Gain**: A major ascending notes
- **Level Up**: C major fanfare
- **Button Click**: Simple high-frequency tone
- **And more...**

This ensures the system works immediately without requiring external sound files.

## 📱 Example Components

### HabitCardWithSound
Demonstrates sound integration with habit completion:

```javascript
<HabitCardWithSound
  habit={habitData}
  onComplete={handleCompletion}
  onXPChange={handleXPChange}
/>
```

**Features:**
- Completion sound on habit check
- XP gain sound with amount-based variation
- Streak milestone sounds (every 7 days)
- Visual animations synchronized with sounds

### LevelUpModalWithSound
Modal with celebration sounds:

```javascript
<LevelUpModalWithSound
  show={showModal}
  newLevel={currentLevel}
  previousLevel={previousLevel}
  onClose={handleClose}
/>
```

**Features:**
- Automatic level up fanfare
- Modal open/close sounds
- Share achievement sound effect

## 🎮 Demo Page

Visit `/sound-demo` to experience the complete sound system:

- Interactive habit cards with sound feedback
- Individual sound testing buttons
- Live settings adjustment
- XP and level progression simulation
- Visual animations synchronized with audio

## 🔧 Integration Guide

### 1. Basic Usage

```javascript
import { useSoundContext } from '../contexts/SoundContext';

const MyComponent = () => {
  const { playSound } = useSoundContext();
  
  return (
    <button onClick={() => playSound('button-click')}>
      Click Me
    </button>
  );
};
```

### 2. Advanced Usage with SoundManager

```javascript
import SoundManager from '../utils/soundManager';

const MyComponent = () => {
  const { playSound } = useSoundContext();
  const soundManager = new SoundManager(playSound);
  
  const handleAction = () => {
    soundManager.playHabitComplete();
    // Or with custom options
    soundManager.play('button-click', { volume: 0.8, rate: 1.2 });
  };
  
  return <button onClick={handleAction}>Action</button>;
};
```

### 3. Adding New Sounds

1. **Add sound file** to `public/sounds/`
2. **Add configuration** to `soundManager.js`:

```javascript
export const SOUND_CONFIGS = {
  // ... existing sounds
  'new-sound': {
    category: SOUND_CATEGORIES.INTERACTION,
    volume: 0.5,
    duration: 0.2,
    description: 'Description of the new sound'
  }
};
```

3. **Add fallback tone** in `useSound.js`:

```javascript
const frequencies = {
  // ... existing frequencies
  'new-sound': [440, 550], // Frequency array for fallback
};
```

## 🎨 Sound Design Guidelines

### Duration
- **Interaction sounds**: 0.05-0.15 seconds
- **Reward sounds**: 0.15-0.4 seconds
- **Notification sounds**: 0.3-0.8 seconds

### Volume
- **Default**: 40% of system volume
- **Interaction**: 30-40%
- **Rewards**: 40-50%
- **Notifications**: 50-60%

### Frequency
- **Avoid**: Piercing high frequencies (>2000Hz)
- **Prefer**: Mid-range pleasant tones (200-800Hz)
- **Consistency**: Similar timbre across all effects

## 🔍 Browser Compatibility

- **Modern browsers**: Full support with Web Audio API fallbacks
- **Mobile devices**: Optimized for touch interactions
- **Autoplay policies**: Requires user interaction for first sound
- **Performance**: Minimal impact on app performance

## 📦 Dependencies

All dependencies are already included in the project:
- React (for hooks and context)
- Web Audio API (built into browsers)
- localStorage (built into browsers)

No additional packages required!

## 🚀 Getting Started

1. **System is already integrated** in `App.js`
2. **Visit demo page**: Navigate to `/sound-demo` after logging in
3. **Test sounds**: Use the demo interface to experience all sounds
4. **Add to components**: Import `useSoundContext` and add sounds to your components
5. **Replace placeholder files**: Add actual MP3 files to `public/sounds/` (optional)

## 🎯 Best Practices

1. **Use sparingly**: Only add sounds to meaningful interactions
2. **Test without sound**: Ensure all functionality works with audio disabled
3. **Respect user preferences**: Honor mute and volume settings
4. **Keep it short**: Avoid long or complex sound effects
5. **Provide feedback**: Use visual cues alongside audio feedback

## 🔮 Future Enhancements

- Custom sound packs (user-selectable themes)
- Seasonal sound variations
- Achievement-specific fanfares
- Ambient focus mode sounds
- Sound visualization components

---

**Implementation Complete**: ✅ All components, hooks, and utilities are fully implemented and ready for use!
