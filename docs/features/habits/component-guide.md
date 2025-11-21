# Habits Component Guide

## Overview

This guide provides detailed documentation for each component in the habits system, including props, usage examples, and implementation details.

## Category Components

### CategoryCount

Displays the number of habits in each category.

**Props:**

```javascript
{
  category: string,      // Category name
  count: number,        // Habit count
  total: number         // Total habits
}
```

**Usage:**

```javascript
<CategoryCount category="Body" count={5} total={12} />
```

### CategoryFilter

Dropdown filter for selecting habit categories.

**Props:**

```javascript
{
  selectedCategory: string,
  onCategoryChange: function,
  categories: array
}
```

**Usage:**

```javascript
<CategoryFilter
  selectedCategory="All"
  onCategoryChange={handleCategoryChange}
  categories={categoriesWithCounts}
/>
```

### CategoryIndicator

Visual indicator showing category with appropriate styling.

**Props:**

```javascript
{
  category: string,
  size?: 'small' | 'medium' | 'large'
}
```

**Usage:**

```javascript
<CategoryIndicator category="Body" size="small" />
```

### CategoryMenuItem

Menu item component for category selection in dropdowns.

**Props:**

```javascript
{
  category: string,
  count?: number,
  isSelected: boolean,
  onClick: function
}
```

**Usage:**

```javascript
<CategoryMenuItem
  category="Mind"
  count={3}
  isSelected={false}
  onClick={() => selectCategory("Mind")}
/>
```

### CategoryText

Text component with category-specific styling.

**Props:**

```javascript
{
  category: string,
  children: ReactNode
}
```

**Usage:**

```javascript
<CategoryText category="Spirit">Meditation</CategoryText>
```

## Filter Components

### HabitFilters

Main filtering component for habits list.

**Props:**

```javascript
{
  selectedCategory: string,
  selectedDifficulty: string,
  selectedFrequency: string,
  searchTerm: string,
  sortBy: string,
  sortOrder: string,
  onCategoryChange: function,
  onDifficultyChange: function,
  onFrequencyChange: function,
  onSearchChange: function,
  onSortChange: function,
  onSortOrderChange: function,
  habits: array,
  compact?: boolean
}
```

**Usage:**

```javascript
<HabitFilters
  selectedCategory={filters.category}
  selectedDifficulty={filters.difficulty}
  selectedFrequency={filters.frequency}
  searchTerm={filters.searchTerm}
  sortBy={filters.sortBy}
  sortOrder={filters.sortOrder}
  onCategoryChange={updateFilter}
  onDifficultyChange={updateFilter}
  onFrequencyChange={updateFilter}
  onSearchChange={updateFilter}
  onSortChange={updateFilter}
  onSortOrderChange={updateFilter}
  habits={habits}
  compact={false}
/>
```

**Features:**

- Category filtering
- Difficulty filtering
- Frequency filtering
- Search functionality
- Sort options (name, difficulty, created date, completion rate, streak)
- Sort order toggle
- Clear filters button
- Keyboard shortcuts

### DropdownItem

Generic dropdown item component used in filters.

**Props:**

```javascript
{
  item: object,         // Item with name and count
  isSelected: boolean,
  onSelect: function,
  type: string          // 'category' | 'difficulty' | 'frequency'
}
```

**Usage:**

```javascript
<DropdownItem
  item={{ name: "Body", count: 5 }}
  isSelected={selectedCategory === "Body"}
  onSelect={onCategoryChange}
  type="category"
/>
```

## Form Components

### CategorySelector

Category selection component for habit creation/editing.

**Props:**

```javascript
{
  selectedCategory: string,
  onCategoryChange: function,
  userArchetypeCategory: string,
  userArchetype: string
}
```

**Usage:**

```javascript
<CategorySelector
  selectedCategory={formData.category}
  onCategoryChange={handleCategoryChange}
  userArchetypeCategory={user?.archetypeCategory}
  userArchetype={user?.archetype}
/>
```

**Features:**

- Grid layout with icons
- Visual selection feedback
- Archetype bonus indicators
- Hover effects
- Accessibility support

### DifficultySelector

Difficulty selection component with XP values.

**Props:**

```javascript
{
  selectedDifficulty: string,
  onDifficultyChange: function
}
```

**Usage:**

```javascript
<DifficultySelector
  selectedDifficulty={formData.difficulty}
  onDifficultyChange={handleDifficultyChange}
/>
```

**Features:**

- Three difficulty levels
- XP value display
- Visual selection feedback
- Hover effects

### XPRewardPreview

Real-time XP reward calculation display.

**Props:**

```javascript
{
  baseXp: number,
  bonusMultiplier: number,
  xpReward: number,
  userArchetypeCategory: string,
  selectedCategory: string,
  userArchetype: string
}
```

**Usage:**

```javascript
<XPRewardPreview
  baseXp={baseXp}
  bonusMultiplier={bonusMultiplier}
  xpReward={xpReward}
  userArchetypeCategory={user?.archetypeCategory}
  selectedCategory={formData.category}
  userArchetype={user?.archetype}
/>
```

**Features:**

- Base XP display
- Bonus calculation
- Total reward display
- Dynamic updates

### FrequencySelector

Frequency type selection with conditional weekday selector.

**Props:**

```javascript
{
  frequencyType: string,
  selectedDays: array,
  onFrequencyTypeChange: function,
  onDayToggle: function
}
```

**Usage:**

```javascript
<FrequencySelector
  frequencyType={formData.frequencyType}
  selectedDays={formData.selectedDays}
  onFrequencyTypeChange={handleFrequencyTypeChange}
  onDayToggle={toggleDaySelection}
/>
```

**Features:**

- Toggle button group
- Conditional weekday selector
- Multi-select weekdays
- Visual feedback

### WeekdaySelector

Weekday selection component for specific days frequency.

**Props:**

```javascript
{
  selectedDays: array,
  onDayToggle: function
}
```

**Usage:**

```javascript
<WeekdaySelector
  selectedDays={formData.selectedDays}
  onDayToggle={toggleDaySelection}
/>
```

**Features:**

- 7-day grid layout
- Multi-select capability
- Visual selection feedback
- Responsive design

### NotificationSettings

Notification settings component with time picker.

**Props:**

```javascript
{
  notificationsEnabled: boolean,
  notificationTime: string,
  onNotificationToggle: function,
  onTimeChange: function
}
```

**Usage:**

```javascript
<NotificationSettings
  notificationsEnabled={formData.notificationsEnabled}
  notificationTime={formData.notificationTime}
  onNotificationToggle={handleNotificationToggle}
  onTimeChange={handleNotificationTimeChange}
/>
```

**Features:**

- Toggle switch
- Time picker input
- Disabled state handling
- Coming soon indicator

## Stats Components

### TodayStats

Displays today's habit statistics and progress.

**Props:**

```javascript
{
  stats: object,
  loading?: boolean
}
```

**Usage:**

```javascript
<TodayStats stats={todayStats} loading={false} />
```

**Features:**

- Completion rate
- XP earned
- Habits completed
- Streak information
- Progress indicators

## UI Components

### HabitCard

Individual habit display card.

**Props:**

```javascript
{
  habit: object,
  onComplete: function,
  onEdit: function,
  onDelete: function,
  compact?: boolean
}
```

**Usage:**

```javascript
<HabitCard
  habit={habit}
  onComplete={handleComplete}
  onEdit={handleEdit}
  onDelete={handleDelete}
  compact={false}
/>
```

**Features:**

- Habit information display
- Completion tracking
- Streak display
- XP reward display
- Action buttons
- Category indicator
- Progress indicators
- Hover effects

### HabitsEmptyState

Empty state component when no habits exist.

**Props:**

```javascript
{
  onCreateHabit: function,
  hasFilters?: boolean
}
```

**Usage:**

```javascript
<HabitsEmptyState
  onCreateHabit={openCreateModal}
  hasFilters={hasActiveFilters}
/>
```

**Features:**

- Empty state illustration
- Call-to-action button
- Filter-aware messaging
- Helpful guidance text

### SortIcon

Icon component for sort direction indicators.

**Props:**

```javascript
{
  direction: 'asc' | 'desc',
  active?: boolean
}
```

**Usage:**

```javascript
<SortIcon direction="asc" active={true} />
```

**Features:**

- Directional arrows
- Active state styling
- Hover effects
- Accessibility support

## Main Components

### CreateHabitModal

Main modal for creating and editing habits.

**Props:**

```javascript
{
  isOpen: boolean,
  onClose: function,
  habitToEdit?: object
}
```

**Usage:**

```javascript
<CreateHabitModal
  isOpen={isModalOpen}
  onClose={closeModal}
  habitToEdit={editingHabit}
/>
```

**Features:**

- Form management
- Validation
- XP calculation
- Edit/create modes
- Responsive design
- Accessibility

## Styling Guidelines

### Common Patterns

**Border and Shadow:**

```javascript
{
  border: '3px solid black',
  boxShadow: '4px 4px 0px rgba(0,0,0,1)',
  '&:hover': {
    boxShadow: '2px 2px 0px rgba(0,0,0,1)'
  }
}
```

**Typography:**

```javascript
{
  fontFamily: '"IBM Plex Mono", monospace',
  fontWeight: 700,
  fontSize: '0.875rem'
}
```

**Transitions:**

```javascript
{
  transition: "all 0.2s ease-in-out";
}
```

### Color Palette

**Primary Colors:**

- Primary: Theme primary color
- Secondary: Theme secondary color
- Background: Theme background color

**Category Colors:**

- Body: Green variants
- Mind: Blue variants
- Spirit: Purple variants
- Creative: Orange variants

## Accessibility Guidelines

### Keyboard Navigation

- Tab order follows logical sequence
- Escape key closes modals
- Enter key submits forms
- Arrow keys for navigation

### Screen Reader Support

- Semantic HTML elements
- ARIA labels for custom components
- Focus management
- Alternative text for icons

### Visual Accessibility

- High contrast colors
- Clear focus indicators
- Sufficient color contrast ratios
- Readable font sizes

## Performance Considerations

### Optimization Techniques

- useMemo for expensive calculations
- useCallback for event handlers
- Lazy loading for large lists
- Debounced inputs

### Memory Management

- Proper cleanup on unmount
- Event listener cleanup
- State reset when appropriate

## Testing Guidelines

### Unit Tests

- Component rendering
- Prop handling
- Event callbacks
- State changes

### Integration Tests

- Component interactions
- Data flow
- User workflows

### E2E Tests

- Complete user journeys
- Cross-browser compatibility
- Mobile responsiveness

## Migration Guide

### From Old Structure

1. Update import paths
2. Check prop compatibility
3. Update styling if needed
4. Test functionality

### Breaking Changes

- Component folder reorganization
- Updated prop interfaces
- New styling patterns
- Enhanced accessibility

## Best Practices

### Component Design

- Single responsibility principle
- Clear prop interfaces
- Consistent naming
- Proper documentation

### Performance

- Avoid unnecessary re-renders
- Use React.memo when appropriate
- Optimize expensive operations
- Monitor bundle size

### Maintainability

- Well-documented code
- Consistent patterns
- Test coverage
- Regular refactoring
