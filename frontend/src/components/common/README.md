# Icon Selector Components

A set of reusable icon selector components built with React, Material-UI, and Lucide React icons. Inspired by shadcn's icon picker but adapted for React/MUI projects.

## Features

### Basic IconSelector

- ✅ Search through 400+ Lucide icons
- ✅ Popular icons quick access
- ✅ Simple dropdown interface
- ✅ Customizable size and color
- ✅ MUI styling integration

### AdvancedIconSelector

- ✅ All basic features
- ✅ Icon categories (UI, Social, Navigation, etc.)
- ✅ Category filtering
- ✅ Enhanced search with keyword matching
- ✅ Tabbed interface
- ✅ Better organization and UX

## Installation

The components use these dependencies (already installed in your project):

```bash
npm install lucide-react cmdk
```

## Usage

### Basic Usage

```jsx
import { IconSelector } from "@/components/common";

function MyComponent() {
  const [selectedIcon, setSelectedIcon] = useState("Heart");

  return (
    <IconSelector
      value={selectedIcon}
      onChange={setSelectedIcon}
      placeholder="Select an icon..."
      size={24}
      color="#1976d2"
    />
  );
}
```

### Advanced Usage

```jsx
import { AdvancedIconSelector } from "@/components/common";

function MyComponent() {
  const [selectedIcon, setSelectedIcon] = useState("Star");

  return (
    <AdvancedIconSelector
      value={selectedIcon}
      onChange={setSelectedIcon}
      placeholder="Choose an icon..."
      size={20}
      color="#ff5722"
    />
  );
}
```

### Form Integration

```jsx
import { IconField } from "@/components/habits/form";

function HabitForm() {
  const [formData, setFormData] = useState({
    icon: "Heart",
    // ... other fields
  });

  return (
    <IconField
      value={formData.icon}
      onChange={(icon) => setFormData((prev) => ({ ...prev, icon }))}
      label="Habit Icon"
      required
      helperText="Choose an icon that represents your habit"
    />
  );
}
```

## Props

### IconSelector & AdvancedIconSelector

| Prop          | Type       | Default          | Description                    |
| ------------- | ---------- | ---------------- | ------------------------------ |
| `value`       | `string`   | -                | Currently selected icon name   |
| `onChange`    | `function` | -                | Callback when icon is selected |
| `placeholder` | `string`   | "Select an icon" | Button placeholder text        |
| `size`        | `number`   | 24               | Icon size in pixels            |
| `color`       | `string`   | "inherit"        | Icon color                     |

### IconField

| Prop         | Type       | Default   | Description                    |
| ------------ | ---------- | --------- | ------------------------------ |
| `value`      | `string`   | -         | Currently selected icon name   |
| `onChange`   | `function` | -         | Callback when icon is selected |
| `label`      | `string`   | "Icon"    | Field label                    |
| `required`   | `boolean`  | false     | Show required indicator        |
| `error`      | `boolean`  | false     | Show error state               |
| `helperText` | `string`   | -         | Helper text below field        |
| `size`       | `number`   | 24        | Icon size in pixels            |
| `color`      | `string`   | "inherit" | Icon color                     |

## Icon Categories (Advanced Version)

- **All Icons** - Complete icon library
- **Popular** - Most commonly used icons
- **UI & Design** - Settings, sliders, buttons
- **Social** - User, communication, sharing
- **Navigation** - Arrows, menu, home
- **Actions** - Plus, minus, edit, delete
- **Time & Calendar** - Clock, calendar, sun/moon
- **Notifications** - Bells, alerts, volume

## Customization

### Adding Custom Categories

You can extend the categories in `AdvancedIconSelector.js`:

```javascript
const categorizedIcons = {
  // ... existing categories
  custom: ["Icon1", "Icon2", "Icon3"], // Add your custom icons
};

const iconCategories = {
  // ... existing categories
  custom: { name: "Custom", icon: YourCustomIcon },
};
```

### Styling

Components use MUI's `sx` prop for easy customization:

```jsx
<AdvancedIconSelector
  value={selectedIcon}
  onChange={setSelectedIcon}
  sx={{
    "& .MuiButton-root": {
      borderColor: "custom.color",
    },
  }}
/>
```

## Demo

Run the demo component to see all features:

```jsx
import { IconSelectorDemo } from "@/components/common";

function App() {
  return <IconSelectorDemo />;
}
```

## Performance

- ✅ Lazy loading of icons
- ✅ Search debouncing
- ✅ Limited results (200 max)
- ✅ Memoized filtering
- ✅ Optimized re-renders

## Accessibility

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management
- ✅ ARIA labels
- ✅ High contrast support

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Contributing

To add new features:

1. Fork the component
2. Add your changes
3. Update the README
4. Test thoroughly

## License

MIT License - feel free to use in your projects!
