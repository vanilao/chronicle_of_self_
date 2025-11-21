# Habit Creation and Edit Flow Documentation

## Overview

This document details the complete flow for creating and editing habits in the Chronicle of Self Remake application.

## Flow Diagram

```
User Clicks "Add Habit" → CreateHabitModal Opens → Form Filling → XP Calculation → Submit → Habit Created
                                            ↑
                                    User Clicks "Edit" → Habit Data Loaded → Form Filling → XP Calculation → Submit → Habit Updated
```

## CreateHabitModal Component

### Props

| Prop          | Type     | Description                       |
| ------------- | -------- | --------------------------------- |
| `isOpen`      | boolean  | Controls modal visibility         |
| `onClose`     | function | Callback when modal is closed     |
| `habitToEdit` | object   | Optional habit data for edit mode |

### State Management

```javascript
const defaultFormState = {
  name: "",
  description: "",
  category: "Body",
  difficulty: "Medium",
  frequencyType: "Daily",
  frequency: "Daily",
  selectedDays: [],
  notificationsEnabled: false,
  notificationTime: "08:00",
};
```

## Form Fields

### 1. Habit Name

- **Required**: Yes
- **Type**: Text input
- **Placeholder**: "e.g., Morning Workout, Read 30 Minutes"
- **Validation**: Must not be empty

### 2. Description (Optional)

- **Required**: No
- **Type**: Textarea
- **Max Length**: 200 characters
- **Placeholder**: "Why is this habit important to you? What's your motivation?"

### 3. Category Selection

- **Required**: Yes
- **Type**: Grid selection with icons
- **Options**: Body, Mind, Spirit, Creative
- **Features**:
  - Visual category indicators
  - Archetype bonus indicators (+25% XP)
  - Hover effects and animations

### 4. Difficulty Selection

- **Required**: Yes
- **Type**: Grid selection
- **Options**: Easy (10 XP), Medium (25 XP), Hard (50 XP)
- **Features**:
  - XP value display
  - Visual selection feedback

### 5. Frequency Selection

- **Required**: Yes
- **Type**: Toggle button group
- **Options**: Daily, Specific Days
- **Conditional Logic**:
  - If "Daily": No additional options
  - If "Specific Days": Shows weekday selector

### 6. Weekday Selection (Conditional)

- **Required**: Only for "Specific Days" frequency
- **Type**: Button grid
- **Options**: Mon, Tue, Wed, Thu, Fri, Sat, Sun
- **Features**:
  - Multi-select capability
  - Visual selection feedback

### 7. Notification Settings (Coming Soon)

- **Required**: No
- **Type**: Toggle switch + time picker
- **Features**:
  - Enable/disable notifications
  - Time selection
  - Disabled state when notifications off

## XP Reward System

### Calculation Logic

```javascript
const difficulties = [
  { name: "Easy", xp: 10 },
  { name: "Medium", xp: 25 },
  { name: "Hard", xp: 50 },
];

const baseXp = selectedDifficulty.xp;
const bonusActive =
  userArchetypeCategory && formData.category === userArchetypeCategory;
const bonusMultiplier = bonusActive ? 1.25 : 1;
const xpReward = Math.round(baseXp * bonusMultiplier);
```

### Bonus Conditions

- **Archetype Match**: User's archetype category matches habit category
- **Bonus Amount**: +25% XP
- **Visual Indicator**: Chip showing "+25% XP" on matching categories

### XP Preview Component

Shows real-time XP calculation:

- Base XP amount
- Bonus status
- Total reward amount

## Form Validation

### Required Fields

- Habit name must not be empty
- Category must be selected
- Difficulty must be selected
- Frequency must be selected
- If frequency is "Specific Days", at least one day must be selected

### Validation Rules

```javascript
const handleSubmit = (e) => {
  e.preventDefault();

  // Form validation
  if (!formData.name.trim()) {
    // Show error for name
    return;
  }

  if (
    formData.frequencyType === "Specific Days" &&
    formData.selectedDays.length === 0
  ) {
    // Show error for no days selected
    return;
  }

  // Proceed with submission
};
```

## Submission Process

### Create Mode

1. Form data collected
2. XP calculation performed
3. Payload created with all necessary fields
4. `addHabit` called from context
5. Form reset to default state
6. Modal closed

### Edit Mode

1. Existing habit data loaded into form
2. User modifies fields
3. XP calculation updated in real-time
4. Payload created with updated fields
5. `updateHabit` called from context
6. Modal closed

### Payload Structure

```javascript
const payload = {
  ...formData,
  xpReward,
  baseXp,
  bonusMultiplier,
  bonusSource: bonusActive ? `${user?.archetype ?? "Class"} bonus` : null,
};
```

## Component Interactions

### Category Selector

- **Props**: `selectedCategory`, `onCategoryChange`, `userArchetypeCategory`, `userArchetype`
- **Events**: Calls `onCategoryChange` when category clicked

### Difficulty Selector

- **Props**: `selectedDifficulty`, `onDifficultyChange`
- **Events**: Calls `onDifficultyChange` when difficulty clicked

### Frequency Selector

- **Props**: `frequencyType`, `selectedDays`, `onFrequencyTypeChange`, `onDayToggle`
- **Events**:
  - `onFrequencyTypeChange` when frequency type changed
  - `onDayToggle` when weekday toggled

### Notification Settings

- **Props**: `notificationsEnabled`, `notificationTime`, `onNotificationToggle`, `onTimeChange`
- **Events**:
  - `onNotificationToggle` when switch toggled
  - `onTimeChange` when time changed

## Error Handling

### Form Errors

- Visual feedback for required fields
- Error messages for validation failures
- Disabled submit button until valid

### API Errors

- Error handling in context
- User feedback for failed operations
- Retry mechanisms

## Accessibility

### Keyboard Navigation

- Tab order follows logical sequence
- Escape key closes modal
- Enter key submits form

### Screen Reader Support

- Semantic HTML elements
- ARIA labels for custom components
- Focus management

### Visual Accessibility

- High contrast colors
- Clear focus indicators
- Sufficient color contrast ratios

## Performance Considerations

### Optimization

- useMemo for XP calculations
- Debounced inputs where appropriate
- Efficient re-rendering

### Memory Management

- Proper cleanup on unmount
- Event listener cleanup
- State reset on close

## Testing Strategy

### Unit Tests

- Form validation logic
- XP calculation accuracy
- Component rendering
- Event handling

### Integration Tests

- Complete creation flow
- Edit flow with data loading
- Modal interactions

### E2E Tests

- User journey testing
- Cross-browser compatibility
- Mobile responsiveness

## Future Enhancements

### Planned Features

- Habit templates
- Custom categories
- Advanced frequency options
- Habit suggestions

### Technical Improvements

- Auto-save drafts
- Form persistence
- Enhanced validation
- Better error messages

## Troubleshooting

### Common Issues

1. **Modal not opening**

   - Check `isOpen` prop
   - Verify event handler binding

2. **Form not submitting**

   - Check validation rules
   - Verify required fields

3. **XP not calculating**

   - Check difficulty selection
   - Verify archetype matching

4. **Edit mode not loading data**
   - Check `habitToEdit` prop
   - Verify useEffect dependencies

### Debug Tools

- React DevTools for state inspection
- Console logging for form data
- Network tab for API calls

## Best Practices

### Code Organization

- Separate components for each form section
- Clear prop interfaces
- Consistent naming conventions

### User Experience

- Clear visual feedback
- Smooth transitions
- Intuitive navigation
- Helpful error messages

### Maintainability

- Well-documented components
- Test coverage
- Consistent styling
- Modular architecture
