# Experimental Color Palette Design

## New Base Colors

The following color families have been provided for experimentation:

### Powder Blush (Warm Pink)

```css
--powder-blush-50: #faeeeb;
--powder-blush-100: #f4ddd7;
--powder-blush-200: #eabaae;
--powder-blush-300: #df9886;
--powder-blush-400: #d4765e;
--powder-blush-500: #c95336;
--powder-blush-600: #a1432b;
--powder-blush-700: #793220;
--powder-blush-800: #512115;
--powder-blush-900: #28110b;
--powder-blush-950: #1c0c07;
```

### Cinnamon Wood (Warm Brown)

```css
--cinnamon-wood-50: #f8efed;
--cinnamon-wood-100: #f1e0da;
--cinnamon-wood-200: #e2c0b6;
--cinnamon-wood-300: #d4a191;
--cinnamon-wood-400: #c6816c;
--cinnamon-wood-500: #b86247;
--cinnamon-wood-600: #934e39;
--cinnamon-wood-700: #6e3b2b;
--cinnamon-wood-800: #49271d;
--cinnamon-wood-900: #25140e;
--cinnamon-wood-950: #1a0e0a;
```

### Wisteria (Purple)

```css
--wisteria-50: #f2ebf9;
--wisteria-100: #e6d8f3;
--wisteria-200: #ccb1e7;
--wisteria-300: #b28adb;
--wisteria-400: #9963cf;
--wisteria-500: #7f3cc3;
--wisteria-600: #66309c;
--wisteria-700: #4c2475;
--wisteria-800: #33184e;
--wisteria-900: #190c27;
--wisteria-950: #12081b;
```

### Lavender Purple (Soft Purple)

```css
--lavender-purple-50: #f1eef7;
--lavender-purple-100: #e4dcef;
--lavender-purple-200: #c8bade;
--lavender-purple-300: #ad97ce;
--lavender-purple-400: #9274be;
--lavender-purple-500: #7652ad;
--lavender-purple-600: #5f418b;
--lavender-purple-700: #473168;
--lavender-purple-800: #2f2145;
--lavender-purple-900: #181023;
--lavender-purple-950: #110b18;
```

### Pearl Aqua (Soft Teal)

```css
--pearl-aqua-50: #eef7f5;
--pearl-aqua-100: #dcefeb;
--pearl-aqua-200: #baded7;
--pearl-aqua-300: #97cec3;
--pearl-aqua-400: #74beaf;
--pearl-aqua-500: #52ad9b;
--pearl-aqua-600: #418b7c;
--pearl-aqua-700: #31685d;
--pearl-aqua-800: #21453e;
--pearl-aqua-900: #10231f;
--pearl-aqua-950: #0b1816;
```

### Muted Teal (Deep Teal)

```css
--muted-teal-50: #eff6f3;
--muted-teal-100: #deede7;
--muted-teal-200: #bedad0;
--muted-teal-300: #9dc8b8;
--muted-teal-400: #7cb6a1;
--muted-teal-500: #5ca389;
--muted-teal-600: #49836e;
--muted-teal-700: #376252;
--muted-teal-800: #254137;
--muted-teal-900: #12211b;
--muted-teal-950: #0d1713;
```

---

## Theme Experiments

### Option 1: Soft & Warm (Powder Blush + Cinnamon Wood)

#### Light Mode

```css
:root[data-theme="light"] {
  /* Backgrounds */
  --background-default: #f8efed; /* cinnamon-wood-50 */
  --background-paper: #ffffff;
  --background-elevated: #f1e0da; /* cinnamon-wood-100 */

  /* Primary Colors - Powder Blush */
  --primary-main: #c95336; /* powder-blush-500 */
  --primary-light: #eabaae; /* powder-blush-200 */
  --primary-dark: #a1432b; /* powder-blush-600 */
  --primary-contrast: #ffffff;

  /* Secondary Colors - Cinnamon Wood */
  --secondary-main: #b86247; /* cinnamon-wood-500 */
  --secondary-light: #e2c0b6; /* cinnamon-wood-200 */
  --secondary-dark: #934e39; /* cinnamon-wood-600 */
  --secondary-contrast: #ffffff;

  /* Text */
  --text-primary: #28110b; /* powder-blush-900 */
  --text-secondary: #793220; /* powder-blush-700 */
  --text-disabled: #d4a191; /* cinnamon-wood-300 */

  /* Borders & Shadows */
  --border-primary: #a1432b; /* powder-blush-600 */
  --border-secondary: #eabaae; /* powder-blush-200 */
  --shadow-color: rgba(201, 83, 54, 0.15); /* powder-blush-500 with opacity */
}
```

#### Dark Mode

```css
:root[data-theme="dark"] {
  /* Backgrounds */
  --background-default: #1c0c07; /* powder-blush-950 */
  --background-paper: #28110b; /* powder-blush-900 */
  --background-elevated: #512115; /* powder-blush-800 */

  /* Primary Colors - Lighter Powder Blush */
  --primary-main: #eabaae; /* powder-blush-200 */
  --primary-light: #f4ddd7; /* powder-blush-100 */
  --primary-dark: #d4765e; /* powder-blush-400 */
  --primary-contrast: #28110b; /* powder-blush-900 */

  /* Secondary Colors - Soft Cinnamon */
  --secondary-main: #d4a191; /* cinnamon-wood-300 */
  --secondary-light: #e2c0b6; /* cinnamon-wood-200 */
  --secondary-dark: #c6816c; /* cinnamon-wood-400 */
  --secondary-contrast: #28110b; /* powder-blush-900 */

  /* Text */
  --text-primary: #faeeeb; /* powder-blush-50 */
  --text-secondary: #eabaae; /* powder-blush-200 */
  --text-disabled: #793220; /* powder-blush-700 */

  /* Borders & Shadows */
  --border-primary: #d4765e; /* powder-blush-400 */
  --border-secondary: #512115; /* powder-blush-800 */
  --shadow-color: rgba(234, 186, 174, 0.1); /* powder-blush-200 with opacity */
}
```

---

### Option 2: Purple & Teal Harmony

#### Light Mode

```css
:root[data-theme="light"] {
  /* Backgrounds */
  --background-default: #f2ebf9; /* wisteria-50 */
  --background-paper: #ffffff;
  --background-elevated: #e4dcef; /* lavender-purple-100 */

  /* Primary Colors - Wisteria */
  --primary-main: #7f3cc3; /* wisteria-500 */
  --primary-light: #ccb1e7; /* wisteria-200 */
  --primary-dark: #66309c; /* wisteria-600 */
  --primary-contrast: #ffffff;

  /* Secondary Colors - Pearl Aqua */
  --secondary-main: #52ad9b; /* pearl-aqua-500 */
  --secondary-light: #baded7; /* pearl-aqua-200 */
  --secondary-dark: #418b7c; /* pearl-aqua-600 */
  --secondary-contrast: #ffffff;

  /* Tertiary Colors - Lavender */
  --tertiary-main: #7652ad; /* lavender-purple-500 */
  --tertiary-light: #c8bade; /* lavender-purple-200 */
  --tertiary-dark: #5f418b; /* lavender-purple-600 */
  --tertiary-contrast: #ffffff;

  /* Text */
  --text-primary: #190c27; /* wisteria-900 */
  --text-secondary: #473168; /* lavender-purple-700 */
  --text-disabled: #9274be; /* lavender-purple-400 */

  /* Borders & Shadows */
  --border-primary: #66309c; /* wisteria-600 */
  --border-secondary: #ccb1e7; /* wisteria-200 */
  --shadow-color: rgba(127, 60, 195, 0.15); /* wisteria-500 with opacity */
}
```

#### Dark Mode

```css
:root[data-theme="dark"] {
  /* Backgrounds */
  --background-default: #12081b; /* wisteria-950 */
  --background-paper: #190c27; /* wisteria-900 */
  --background-elevated: #33184e; /* wisteria-800 */

  /* Primary Colors - Lighter Wisteria */
  --primary-main: #b28adb; /* wisteria-300 */
  --primary-light: #e6d8f3; /* wisteria-100 */
  --primary-dark: #9963cf; /* wisteria-400 */
  --primary-contrast: #f2ebf9; /* wisteria-50 */

  /* Secondary Colors - Soft Pearl Aqua */
  --secondary-main: #97cec3; /* pearl-aqua-300 */
  --secondary-light: #dcefeb; /* pearl-aqua-100 */
  --secondary-dark: #74beaf; /* pearl-aqua-400 */
  --secondary-contrast: #12081b; /* wisteria-950 */

  /* Tertiary Colors - Soft Lavender */
  --tertiary-main: #ad97ce; /* lavender-purple-300 */
  --tertiary-light: #e4dcef; /* lavender-purple-100 */
  --tertiary-dark: #9274be; /* lavender-purple-400 */
  --tertiary-contrast: #f2ebf9; /* wisteria-50 */

  /* Text */
  --text-primary: #f2ebf9; /* wisteria-50 */
  --text-secondary: #ccb1e7; /* wisteria-200 */
  --text-disabled: #66309c; /* wisteria-600 */

  /* Borders & Shadows */
  --border-primary: #9963cf; /* wisteria-400 */
  --border-secondary: #33184e; /* wisteria-800 */
  --shadow-color: rgba(178, 138, 219, 0.1); /* wisteria-300 with opacity */
}
```

---

### Option 3: Earth & Ocean (Cinnamon + Teal)

#### Light Mode

```css
:root[data-theme="light"] {
  /* Backgrounds */
  --background-default: #f8efed; /* cinnamon-wood-50 */
  --background-paper: #ffffff;
  --background-elevated: #eff6f3; /* muted-teal-50 */

  /* Primary Colors - Cinnamon Wood */
  --primary-main: #b86247; /* cinnamon-wood-500 */
  --primary-light: #e2c0b6; /* cinnamon-wood-200 */
  --primary-dark: #934e39; /* cinnamon-wood-600 */
  --primary-contrast: #ffffff;

  /* Secondary Colors - Muted Teal */
  --secondary-main: #5ca389; /* muted-teal-500 */
  --secondary-light: #bedad0; /* muted-teal-200 */
  --secondary-dark: #49836e; /* muted-teal-600 */
  --secondary-contrast: #ffffff;

  /* Tertiary Colors - Pearl Aqua */
  --tertiary-main: #52ad9b; /* pearl-aqua-500 */
  --tertiary-light: #baded7; /* pearl-aqua-200 */
  --tertiary-dark: #418b7c; /* pearl-aqua-600 */
  --tertiary-contrast: #ffffff;

  /* Text */
  --text-primary: #25140e; /* cinnamon-wood-900 */
  --text-secondary: #6e3b2b; /* cinnamon-wood-700 */
  --text-disabled: #c6816c; /* cinnamon-wood-400 */

  /* Borders & Shadows */
  --border-primary: #934e39; /* cinnamon-wood-600 */
  --border-secondary: #e2c0b6; /* cinnamon-wood-200 */
  --shadow-color: rgba(184, 98, 71, 0.15); /* cinnamon-wood-500 with opacity */
}
```

#### Dark Mode

```css
:root[data-theme="dark"] {
  /* Backgrounds */
  --background-default: #1a0e0a; /* cinnamon-wood-950 */
  --background-paper: #25140e; /* cinnamon-wood-900 */
  --background-elevated: #49271d; /* cinnamon-wood-800 */

  /* Primary Colors - Lighter Cinnamon */
  --primary-main: #d4a191; /* cinnamon-wood-300 */
  --primary-light: #e2c0b6; /* cinnamon-wood-200 */
  --primary-dark: #c6816c; /* cinnamon-wood-400 */
  --primary-contrast: #25140e; /* cinnamon-wood-900 */

  /* Secondary Colors - Soft Muted Teal */
  --secondary-main: #9dc8b8; /* muted-teal-300 */
  --secondary-light: #deede7; /* muted-teal-100 */
  --secondary-dark: #7cb6a1; /* muted-teal-400 */
  --secondary-contrast: #25140e; /* cinnamon-wood-900 */

  /* Tertiary Colors - Soft Pearl Aqua */
  --tertiary-main: #97cec3; /* pearl-aqua-300 */
  --tertiary-light: #dcefeb; /* pearl-aqua-100 */
  --tertiary-dark: #74beaf; /* pearl-aqua-400 */
  --tertiary-contrast: #25140e; /* cinnamon-wood-900 */

  /* Text */
  --text-primary: #f8efed; /* cinnamon-wood-50 */
  --text-secondary: #e2c0b6; /* cinnamon-wood-200 */
  --text-disabled: #934e39; /* cinnamon-wood-600 */

  /* Borders & Shadows */
  --border-primary: #c6816c; /* cinnamon-wood-400 */
  --border-secondary: #49271d; /* cinnamon-wood-800 */
  --shadow-color: rgba(212, 161, 145, 0.1); /* cinnamon-wood-300 with opacity */
}
```

---

## Design Considerations

### Retro Gaming Compatibility

All options maintain the retro flat design aesthetic with:

- **Thick borders (3px)** for that pixelated look
- **Flat shadows** without blur effects
- **High contrast** for readability
- **Bold color choices** that fit gaming themes

### Accessibility

- **WCAG AA compliance** with proper contrast ratios
- **Clear text hierarchy** with distinct primary/secondary text colors
- **Focus states** that are visible in both themes

### Component Mapping

- **Primary**: Main actions, buttons, highlights
- **Secondary**: Supporting elements, cards, backgrounds
- **Tertiary**: Accent elements, special states
- **Background**: Layered surfaces for depth

### Recommended Next Steps

1. **Test each option** in the actual application
2. **Gather user feedback** on preference
3. **Consider seasonal themes** (warm for autumn, cool for spring)
4. **Implement theme switcher** to allow user selection
5. **Document component-specific usage** guidelines

---

## Implementation Notes

To implement these themes:

1. Update `theme.js` or theme context with new CSS variables
2. Modify Material UI theme configuration
3. Update component-specific styles where hardcoded colors exist
4. Test across all components for consistency
5. Verify dark/light mode transitions work smoothly

These palettes offer a modern evolution of the current retro aesthetic while maintaining the bold, playful character of the Chronicle of Self brand.
