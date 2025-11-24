# Component Reference Guide

## Quick Reference for Habit System Components

---

## CreateHabitModal

**Purpose**: Main interface for creating and editing habits

**Props**:

```javascript
{
  isOpen: boolean,           // Controls modal visibility
  onClose: function,         // Called when modal should close
  habitToEdit: object|null  // If provided, opens in edit mode
}
```

**Key Features**:

- Multi-step form with template selection
- Real-time validation with inline errors
- Loading states during save operations
- ErrorSnackbar for general errors
- XP calculation based on difficulty

**Usage Example**:

```javascript
<CreateHabitModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  habitToEdit={editingHabit}
/>
```

---

## HabitCard

**Purpose**: Main display component for individual habits

**Props**:

```javascript
{
  habit: object,       // Habit data object
  onEdit: function     // Called when edit button clicked
}
```

**Performance Features**:

- React.memo wrapper for optimization
- useMemo for expensive calculations
- useCallback for event handlers
- Separate loading states for completion vs delete

**Internal State**:

```javascript
const [loading, setLoading] = useState(false); // Completion loading
const [deleteLoading, setDeleteLoading] = useState(false); // Delete loading
const [error, setError] = useState(null); // Error state
```

---

## HabitCardHeader

**Purpose**: Displays habit title, description, and action buttons

**Props**:

```javascript
{
  habit: object,       // Habit data
  onEdit: function,    // Edit handler
  onDelete: function,  // Delete handler
  loading: boolean,    // Delete loading state
  streak: number       // Current streak count
}
```

**Key Features**:

- Tooltip with detailed habit information
- Edit and delete buttons with loading states
- Streak badge display
- Gray hover effect on title

---

## HabitCardWeekly

**Purpose**: Weekly progress grid with interactive checkboxes

**Props**:

```javascript
{
  last5Days: array,           // Date objects for last 5 days
  isDayCompleted: function,  // Check if day is completed
  isToday: function,          // Check if date is today
  handleToggleDay: function,  // Toggle completion handler
  completedToday: boolean,    // Today's completion status
  loading: boolean,          // Completion loading state
  habit: object,             // Habit data
  getTodayCompletionCount: number  // Today's completion count
}
```

**Loading State Features**:

- CircularProgress with pulse animation
- Blur overlay effect
- 400ms artificial delay for UX

---

## HabitCardActions

**Purpose**: Edit and delete buttons for habit cards

**Props**:

```javascript
{
  habit: object,       // Habit data
  onEdit: function,    // Edit handler
  onDelete: function,  // Delete handler
  loading: boolean     // Delete loading state
}
```

**Styling Features**:

- Sharp border radius (0.5) for angular look
- Black borders with shadow effects
- Loading spinner in delete button
- Hover animations

---

## DeleteConfirmationModal

**Purpose**: Confirmation dialog for habit deletion

**Props**:

```javascript
{
  isOpen: boolean,      // Modal visibility
  onClose: function,   // Close handler
  onConfirm: function,  // Delete confirmation handler
  habitName: string    // Name of habit to delete
}
```

**Features**:

- Loading state during deletion (800ms delay)
- ErrorSnackbar for error handling
- Prevents closing during operation
- Warning message with consequences

---

## CloseModalButton

**Purpose**: Reusable close button for modals

**Props**:

```javascript
{
  onClick: function,   // Click handler
  size: string,        // Button size ('small', 'medium', 'large')
  variant: string      // Style variant ('default', 'minimal')
}
```

**Variants**:

- `default`: Red hover effect, shadow effects
- `minimal`: Black hover effect, simple styling

**Usage Examples**:

```javascript
<CloseModalButton onClick={onClose} />                    // Default
<CloseModalButton onClick={onClose} variant="minimal" />  // Minimal
```

---

## ErrorSnackbar

**Purpose**: Consistent error display across components

**Props**:

```javascript
{
  error: string|null,  // Error message to display
  onClose: function    // Manual close handler
}
```

**Features**:

- Auto-dismiss after 6 seconds
- Manual close option
- Consistent styling
- Only shows when error prop is provided

---

## IconSelector

**Purpose**: Icon selection interface for habits

**Props**:

```javascript
{
  selectedIcon: string,      // Currently selected icon name
  selectedColor: string,     // Currently selected color
  onIconSelect: function,    // Icon selection handler
  onColorSelect: function,   // Color selection handler
  disabled: boolean          // Disable interaction
}
```

**Features**:

- Grid layout with categorized icons
- Color picker with preview
- Search functionality
- CloseModalButton integration

---

## Common Patterns

### Error Handling Pattern

```javascript
const [error, setError] = useState(null);

try {
  await operation();
  // Success logic
} catch (err) {
  if (err.message.includes("network")) {
    setError("Network error. Please check your connection and try again.");
  } else if (err.message.includes("permission")) {
    setError("Permission denied. Please log in again.");
  } else {
    setError("Operation failed. Please try again.");
  }
}

// In JSX
<ErrorSnackbar error={error} onClose={() => setError(null)} />;
```

### Loading State Pattern

```javascript
const [loading, setLoading] = useState(false);

const handleOperation = async () => {
  setLoading(true);
  try {
    await asyncOperation();
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};

// In JSX
{
  loading && <CircularProgress size={16} />;
}
```

### Performance Optimization Pattern

```javascript
// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data);
}, [data]);

// Memoize event handlers
const handleClick = useCallback(() => {
  doSomething(dependency);
}, [dependency]);

// Wrap component
export default React.memo(Component);
```

### Form Validation Pattern

```javascript
const [formData, setFormData] = useState(initialState);
const [formErrors, setFormErrors] = useState({});

const validateForm = () => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required";
  }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Submit form
};
```

---

## Context Integration

### HabitsContext Usage

```javascript
const {
  habits, // All habits array
  addHabit, // Add new habit
  updateHabit, // Update existing habit
  deleteHabit, // Delete habit
  toggleHabitCompletion, // Toggle completion
  getHabitStreak, // Get habit streak
} = useHabits();
```

### TimeTravelContext Usage

```javascript
const {
  currentDate, // Current date object
  currentDateString, // Current date string (YYYY-MM-DD)
  setCurrentDate, // Change current date
} = useTimeTravel();
```

### AuthContext Usage

```javascript
const {
  user, // User object
  archetype, // User archetype
  archetypeCategory, // User archetype category
} = useAuth();
```

---

## Styling Guidelines

### Common Theme Values

```javascript
// Colors
primary: '#1976d2'
secondary: '#dc004e'
error: '#f44336'
warning: '#ff9800'
info: '#2196f3'
success: '#4caf50'

// Typography
fontFamily: '"IBM Plex Mono", monospace'

// Spacing
px: 1,    // Horizontal padding
py: 1,    // Vertical padding
mb: 1,    // Margin bottom

// Borders
border: '2px solid black'
borderRadius: 0.5  // Sharp corners
boxShadow: '3px 3px 0px rgba(0,0,0,1)'
```

### Hover Effects

```javascript
'&:hover': {
  transform: 'translate(1px, 1px)',
  boxShadow: '2px 2px 0px rgba(0,0,0,1)'
}
```

### Loading States

```javascript
animation: 'pulse 1.5s ease-in-out infinite',
'@keyframes pulse': {
  '0%': { opacity: 1 },
  '50%': { opacity: 0.6 },
  '100%': { opacity: 1 }
}
```

---

This reference guide provides quick access to component props, patterns, and common usage examples for the habit system.
