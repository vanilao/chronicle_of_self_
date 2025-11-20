# Chronicle of Self - Sound Effects Design Guide

## 🎵 Overview

Sound effects in Chronicle of Self are designed to be **minimal, satisfying, and non-intrusive**. The goal is to provide gentle audio feedback for key interactions without overwhelming the user or becoming distracting during regular use.

## 🎯 Design Principles

### 1. Minimalist Approach

- **Less is more**: Only sounds for meaningful interactions
- **Short duration**: 0.1-0.5 seconds maximum
- **Low volume**: 30-50% of system volume by default
- **No background music**: Focus on interaction feedback only

### 2. Retro Aesthetic

- **8-bit/16-bit inspired**: Simple, clean tones
- **Chiptune elements**: Light nostalgic gaming feel
- **Modern clarity**: Clean, not harsh or distorted
- **Consistent timbre**: Similar sound family across all effects

### 3. Accessibility

- **Visual alternatives**: All interactions work without sound
- **Volume controls**: Easy mute and adjustment options
- **No sudden loud sounds**: Gradual volume envelope
- **Frequency balanced**: Avoid piercing high frequencies

## 🔊 Sound Effect Categories

### Core Interactions

#### Habit Completion

- **Sound**: Light, positive chime (C major arpeggio)
- **Duration**: 0.2 seconds
- **Frequency**: Mid-range pleasant tones
- **Feeling**: Satisfying completion, gentle reward
- **Source**: Simple sine wave 合成 or soft bell sample

#### XP Gain

- **Sound**: Quick ascending sparkle (3-4 notes)
- **Duration**: 0.15 seconds
- **Frequency**: Bright but not piercing
- **Feeling**: Progress, achievement
- **Variation**: Slightly different for small vs large XP amounts

#### Level Up

- **Sound**: Short fanfare (5-6 notes, ascending then resolving)
- **Duration**: 0.8 seconds
- **Frequency**: Full chord progression
- **Feeling**: Celebration, milestone reached
- **Special**: Can be slightly more elaborate than other sounds

### Navigation & UI

#### Button Clicks

- **Sound**: Soft tap or click
- **Duration**: 0.05 seconds
- **Frequency**: Low-mid range
- **Feeling**: Responsive, tactile
- **Usage**: Only for primary actions, not every button

#### Theme Toggle

- **Sound**: Gentle switch or slide
- **Duration**: 0.1 seconds
- **Frequency**: Smooth transition
- **Feeling**: Mode change, smooth
- **Special**: Slightly different for light→dark vs dark→light

#### Modal Open/Close

- **Sound**: Soft whoosh or gentle pop
- **Duration**: 0.15 seconds
- **Frequency**: Breath-like
- **Feeling**: Appearance/disappearance
- **Direction**: Different sound for open vs close

### Achievement System

#### Achievement Unlock

- **Sound**: Rewarding sparkle (similar to XP but more elaborate)
- **Duration**: 0.4 seconds
- **Frequency**: Bright, celebratory
- **Feeling**: Special reward, recognition
- **Special**: Can have a slight delay/buildup

#### Streak Milestones

- **Sound**: Fire crackle or warm glow
- **Duration**: 0.3 seconds
- **Frequency**: Warm mid-range
- **Feeling**: Consistency, warmth
- **Variation**: Different for 7, 30, 100 day streaks

## 📁 File Organization

### Recommended Structure

```
frontend/
├── public/
│   └── sounds/
│       ├── habit-complete.mp3
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
    │   └── SoundContext.js
    ├── hooks/
    │   └── useSound.js
    └── utils/
        └── soundManager.js
```

### File Format

- **Format**: MP3 or OGG for best compression
- **Quality**: 128kbps (balance quality and size)
- **Sample Rate**: 44.1kHz
- **Channels**: Mono (stereo unnecessary for simple effects)

## 🛠 Technical Implementation

### Sound Manager Hook

```javascript
// useSound.js
const useSound = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);

  const playSound = useCallback(
    (soundName, options = {}) => {
      if (isMuted) return;

      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.volume = options.volume || volume;
      audio.playbackRate = options.rate || 1;

      audio.play().catch((e) => console.log("Sound play failed:", e));
    },
    [isMuted, volume]
  );

  return { playSound, isMuted, setIsMuted, volume, setVolume };
};
```

### Context Provider

```javascript
// SoundContext.js
const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const soundSettings = useSound();

  return (
    <SoundContext.Provider value={soundSettings}>
      {children}
    </SoundContext.Provider>
  );
};
```

## 🎚️ User Controls

### Settings Integration

- **Master Toggle**: Mute all sounds
- **Volume Slider**: 0-100% with default at 40%
- **Category Toggles**: Separate controls for:
  - Interaction sounds (clicks, toggles)
  - Reward sounds (XP, achievements)
  - Notification sounds (level up, streaks)

### Persistence

- Store preferences in localStorage
- Respect system mute status
- Initialize with safe defaults

## 📚 Sound Sources

### Free Resources

1. **Freesound.org** - Search for "chime", "click", "level up"
2. **OpenGameArt.org** - Game-ready sound effects
3. **Zapsplat** - Free with attribution
4. **Bfxr.net** - Generate retro 8-bit sounds

### Search Terms

- "retro chime", "8-bit coin", "level up fanfare"
- "soft click", "gentle pop", "achievement sound"
- "streak notification", "xp gain", "completion sound"

### Creation Tools

- **Bfxr/Bfxr Online** - Generate chiptune sounds
- **Audacity** - Edit and fine-tune recordings
- **Online Tone Generator** - Create simple sine wave tones

## 🎵 Implementation Examples

### Habit Completion

```javascript
const HabitCard = ({ habit, onComplete }) => {
  const { playSound } = useSound();

  const handleComplete = () => {
    onComplete();
    playSound("habit-complete");

    // Bonus sound for streak
    if (habit.streak > 0 && habit.streak % 7 === 0) {
      setTimeout(() => playSound("streak-milestone"), 300);
    }
  };

  return <Checkbox onClick={handleComplete}>{habit.name}</Checkbox>;
};
```

### Level Up

```javascript
const LevelUpModal = ({ show, newLevel }) => {
  const { playSound } = useSound();

  useEffect(() => {
    if (show) {
      playSound("level-up", { volume: 0.6 });
    }
  }, [show, playSound]);

  // ... modal component
};
```

## ✅ Success Metrics

### User Experience

- Sounds enhance but don't distract from core functionality
- Users can easily disable sounds if unwanted
- No performance impact on app loading or interactions
- Sounds work consistently across browsers

### Technical

- Total sound files under 500KB compressed
- No lag between user action and sound playback
- Graceful fallback when sounds fail to load
- Minimal impact on bundle size

## 🚫 Out of Scope

### Avoid These

- **Background music**: Too distracting for habit tracking
- **Voice overs**: Unnecessary complexity
- **Complex soundscapes**: Overkill for simple interactions
- **Loud or jarring sounds**: Disruptive to user focus
- **Different sounds per habit category**: Too much variation

### Future Considerations

- Custom sound packs (user-selectable themes)
- Seasonal sounds (holiday variations)
- Achievement-specific fanfares
- Ambient sounds for focus mode

---

**Last Updated**: November 20, 2025  
**Target Implementation**: Phase 2 - Enhanced Features  
**Priority**: Medium (nice-to-have for user engagement)
