# Habits System Documentation

## Overview

The Habits system is a core feature of the Chronicle of Self Remake application, allowing users to create, track, and manage daily habits with gamification elements including XP rewards, categories, and difficulty levels.

## Architecture

### Folder Structure

```
src/components/habits/
├── index.js                    # Main export file
├── CreateHabitModal.js         # Main modal component
├── category/                   # Category-related components
│   ├── CategoryCount.js       # Shows habit count per category
│   ├── CategoryFilter.js      # Category filter dropdown
│   ├── CategoryIndicator.js   # Visual category indicator
│   ├── CategoryMenuItem.js    # Category menu item
│   └── CategoryText.js        # Category text display
├── filters/                    # Filter-related components
│   ├── HabitFilters.js        # Main filters component
│   └── DropdownItem.js        # Generic dropdown item
├── form/                       # Form components for habit creation/editing
│   ├── CategorySelector.js    # Category selection UI
│   ├── DifficultySelector.js  # Difficulty selection UI
│   ├── XPRewardPreview.js     # XP reward calculation display
│   ├── FrequencySelector.js   # Frequency selection (daily/specific days)
│   ├── WeekdaySelector.js     # Weekday selection for specific days
│   └── NotificationSettings.js # Notification settings
├── stats/                      # Statistics components
│   └── TodayStats.js          # Today's habit statistics
└── ui/                         # UI components
    ├── HabitCard.js           # Individual habit card display
    ├── HabitsEmptyState.js   # Empty state when no habits
    └── SortIcon.js            # Sorting icon component
```

## Core Components

### CreateHabitModal

The main modal component for creating and editing habits.

**Props:**

- `isOpen` (boolean): Controls modal visibility
- `onClose` (function): Callback when modal is closed
- `habitToEdit` (object): Optional habit data for edit mode

**Features:**

- Form validation
- XP reward calculation with bonuses
- Category selection with archetype bonuses
- Difficulty selection
- Frequency selection (daily/specific days)
- Notification settings (coming soon)

### HabitCard

Displays individual habit information and provides interaction options.

**Props:**

- `habit` (object): Habit data
- `onComplete` (function): Callback for habit completion
- `onEdit` (function): Callback for habit editing
- `onDelete` (function): Callback for habit deletion

**Features:**

- Habit completion tracking
- Streak display
- XP reward display
- Edit and delete actions
- Category indicator

### HabitFilters

Provides filtering and sorting options for habits list.

**Props:**

- `selectedCategory` (string): Currently selected category
- `selectedDifficulty` (string): Currently selected difficulty
- `selectedFrequency` (string): Currently selected frequency
- `searchTerm` (string): Search term
- `sortBy` (string): Sort field
- `sortOrder` (string): Sort order
- Various onChange callbacks

**Features:**

- Category filtering
- Difficulty filtering
- Frequency filtering
- Search functionality
- Sorting options
- Clear filters button

## Data Models

### Habit Object

```javascript
{
  id: string,
  name: string,
  description: string,
  category: 'Body' | 'Mind' | 'Spirit' | 'Creative',
  difficulty: 'Easy' | 'Medium' | 'Hard',
  frequencyType: 'Daily' | 'Specific Days',
  frequency: string,
  selectedDays: string[],
  notificationsEnabled: boolean,
  notificationTime: string,
  xpReward: number,
  baseXp: number,
  bonusMultiplier: number,
  bonusSource: string,
  createdAt: string,
  updatedAt: string,
  completedDates: string[],
  currentStreak: number,
  bestStreak: number,
  completionRate: number
}
```

### Categories

```javascript
{
  name: string,
  icon: Component,
  color: string,
  bgColor: string,
  borderColor: string,
  hoverBg: string
}
```

### Difficulty Levels

```javascript
{
  name: 'Easy' | 'Medium' | 'Hard',
  xp: number (10 | 25 | 50)
}
```

## XP System

### Base XP Rewards

- Easy: 10 XP
- Medium: 25 XP
- Hard: 50 XP

### Bonuses

- Archetype Category Match: +25% XP
- Future: Streak bonuses
- Future: Perfect week bonuses

### XP Calculation

```javascript
const xpReward = Math.round(baseXp * bonusMultiplier);
```

## State Management

The habits system uses React Context for state management:

### HabitsContext

- `habits`: Array of habit objects
- `addHabit`: Function to add new habit
- `updateHabit`: Function to update existing habit
- `deleteHabit`: Function to delete habit
- `completeHabit`: Function to mark habit as complete
- `getHabitsByDate`: Function to get habits for specific date
- `getStats`: Function to get habit statistics

### usePersistedFilters Hook

Manages filter state with localStorage persistence:

- `filters`: Current filter values
- `updateFilter`: Function to update filter
- `clearFilters`: Function to reset filters
- `hasActiveFilters`: Boolean indicating if filters are active

## UI/UX Patterns

### Design System

- Uses Material-UI components
- Custom styling with IBM Plex Mono font
- Consistent border/shadow styling (3px borders, 4px shadows)
- Hover states and transitions

### Responsive Design

- Mobile-first approach
- Grid layouts for category selection
- Adaptive spacing and sizing
- Touch-friendly interactions

### Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- High contrast colors

## Integration Points

### Authentication

- User archetype affects XP bonuses
- User-specific habit data
- Progress tracking per user

### Progress System

- Habit completions contribute to overall progress
- Stats aggregation for progress tracking
- Achievement integration

### Notification System

- Future integration with push notifications
- Reminder settings stored with habits
- Time-based triggering

## Performance Considerations

### Optimization

- useMemo for expensive calculations
- Debounced search input
- Lazy loading for large habit lists
- Efficient re-rendering with proper dependencies

### Caching

- Habit data cached in context
- Filter state persisted in localStorage
- Category configuration cached

## Testing Strategy

### Unit Tests

- Component rendering
- Form validation
- XP calculations
- Filter logic

### Integration Tests

- Habit creation flow
- Filter application
- Data persistence

### E2E Tests

- Complete habit lifecycle
- User interactions
- Cross-browser compatibility

## Future Enhancements

### Planned Features

- Habit templates
- Habit sharing
- Advanced analytics
- Custom categories
- Habit chaining
- Social features

### Technical Improvements

- Offline support
- Real-time sync
- Performance optimizations
- Enhanced accessibility

## Troubleshooting

### Common Issues

1. **XP not calculating correctly**: Check archetype matching logic
2. **Filters not applying**: Verify filter state updates
3. **Modal not closing**: Check onClose callback propagation
4. **Habits not persisting**: Verify context and localStorage integration

### Debug Tools

- React DevTools for component state
- localStorage inspection for filter persistence
- Network tab for API calls
- Console logging for debugging

## Contributing

When contributing to the habits system:

1. Follow the established folder structure
2. Use consistent naming conventions
3. Add appropriate TypeScript types (if using TS)
4. Write tests for new features
5. Update documentation
6. Follow accessibility guidelines

## Dependencies

### External Libraries

- Material-UI (MUI) for UI components
- React Icons for iconography
- Date-fns for date manipulation

### Internal Dependencies

- HabitsContext for state management
- usePersistedFilters for filter persistence
- getCategoryConfig for category configuration
- AuthContext for user data
