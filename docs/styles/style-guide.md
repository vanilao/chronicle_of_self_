# Chronicle of Self – Style Guide

## Overview

Chronicle of Self uses a **retro-inspired flat design** with bold borders, flat shadows, and a playful-yet-clean color system. The design supports **light and dark modes** and is implemented with **Material UI (MUI)** plus custom styles.

---

## 🎨 Color Palette

### Light Mode

| Role               | Token (MUI)          | Hex                         | Usage                             |
| ------------------ | -------------------- | --------------------------- | --------------------------------- |
| **Background**     | `background.default` | `#F5F5DC` (Beige/Cream)     | Page background, card backgrounds |
| **Surface**        | `background.paper`   | `#FFFFFF` (White)           | Cards, dialogs, elevated surfaces |
| **Primary**        | `primary.main`       | `#87CEEB` (Sky Blue)        | Primary buttons, accents, headers |
| **Secondary**      | `secondary.main`     | `#FFB6C1` (Light Pink)      | Secondary buttons, highlights     |
| **Tertiary**       | `tertiary.main`      | `#98FB98` (Pale Green)      | Success states, badges            |
| **Error**          | `error.main`         | `#EF4444` (Red)             | Delete actions, errors            |
| **Warning**        | `warning.main`       | `#F59E0B` (Amber)           | Cautions, warnings                |
| **Text Primary**   | `text.primary`       | `#2F4F4F` (Dark Slate Gray) | Headlines, primary text           |
| **Text Secondary** | `text.secondary`     | `#696969` (Dim Gray)        | Supporting text, captions         |
| **Border**         | (custom)             | `#000000` (Black)           | All borders and flat shadows      |

#### Light-mode accent palette (for chips/badges)

| Category | Background               | Text                    |
| -------- | ------------------------ | ----------------------- |
| Body     | `#dcfce7` (Light Green)  | `#166534` (Dark Green)  |
| Mind     | `#e0e7ff` (Light Indigo) | `#3730a3` (Dark Indigo) |
| Spirit   | `#fce7f3` (Light Pink)   | `#9f1239` (Dark Pink)   |
| Creative | `#fef3c7` (Light Yellow) | `#92400e` (Dark Amber)  |

---

### Dark Mode

| Role               | Token (MUI)          | Hex                    | Usage                             |
| ------------------ | -------------------- | ---------------------- | --------------------------------- |
| **Background**     | `background.default` | `#1A1A2E` (Dark Navy)  | Page background                   |
| **Surface**        | `background.paper`   | `#16213E` (Deep Blue)  | Cards, dialogs, elevated surfaces |
| **Primary**        | `primary.main`       | `#0F4C75` (Deep Blue)  | Primary buttons, accents          |
| **Secondary**      | `secondary.main`     | `#E94560` (Pink Red)   | Secondary buttons, highlights     |
| **Tertiary**       | `tertiary.main`      | `#3FC1C9` (Cyan)       | Success states, badges            |
| **Error**          | `error.main`         | `#EF4444` (Red)        | Delete actions, errors            |
| **Warning**        | `warning.main`       | `#F59E0B` (Amber)      | Cautions, warnings                |
| **Text Primary**   | `text.primary`       | `#F5F5F5` (Off White)  | Headlines, primary text           |
| **Text Secondary** | `text.secondary`     | `#BBBBBB` (Light Gray) | Supporting text, captions         |
| **Border**         | (custom)             | `#000000` (Black)      | All borders and flat shadows      |

#### Dark-mode accent palette (for chips/badges)

| Category | Background              | Text                     |
| -------- | ----------------------- | ------------------------ |
| Body     | `#166534` (Dark Green)  | `#dcfce7` (Light Green)  |
| Mind     | `#3730a3` (Dark Indigo) | `#e0e7ff` (Light Indigo) |
| Spirit   | `#9f1239` (Dark Pink)   | `#fce7f3` (Light Pink)   |
| Creative | `#92400e` (Dark Amber)  | `#fef3c7` (Light Yellow) |

---

## 🌓 Theme Toggle Implementation

- **Provider:** `ThemeContext` wraps the app.
- **Persistence:** Selected theme persists in `localStorage` under key `theme`.
- **Default:** Light mode.
- **Toggle UI:** IconButton in the authenticated navbar (sun/moon icons).
- **Applied class:** `light` or `dark` on the root element for CSS overrides.

---

## 🖋️ Typography

| Role               | Font                          | Sizes (px) | Weight     | Use Cases                                         |
| ------------------ | ----------------------------- | ---------- | ---------- | ------------------------------------------------- |
| **Display/Header** | VT323 (Google Fonts)          | 24–72      | Normal     | Page titles, section headers, “CHRONICLE OF SELF” |
| **Body**           | IBM Plex Mono (Google Fonts)  | 14–16      | Normal/600 | Paragraphs, labels, buttons                       |
| **Special UI**     | Press Start 2P (Google Fonts) | 12–16      | Normal     | Rare: special badges or retro UI elements         |

### Typography tokens in MUI

```javascript
typography: {
  fontFamily: '"IBM Plex Mono", monospace',
  h1: { fontFamily: '"VT323", monospace', fontSize: '3rem' },
  h2: { fontFamily: '"VT323", monospace', fontSize: '2.5rem' },
  body1: { fontFamily: '"IBM Plex Mono", monospace', fontSize: '1rem' },
  button: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }
}
```

---

## 🎯 Design Tokens & Patterns

### Borders

- **Width:** `3px` (bold retro look)
- **Color:** `#000000` (always black for contrast)
- **Radius:** `8px` (slight rounding, not too modern)

### Shadows (Flat Retro)

- **Small:** `4px 4px 0px rgba(0,0,0,1)`
- **Large:** `8px 8px 0px rgba(0,0,0,1)`
- **Pressed/active:** `2px 2px 0px rgba(0,0,0,1)` (inset effect via translate)

### Spacing

- Use MUI spacing units (`spacing(1) = 8px`).
- Common gaps: `spacing(2)` (16px) between elements; `spacing(3)` (24px) for sections.

### Component Patterns

#### Cards

```javascript
sx={{
  bgcolor: 'background.paper',
  border: '3px solid black',
  borderRadius: 2,
  boxShadow: '4px 4px 0px rgba(0,0,0,1)'
}}
```

#### Buttons (contained)

```javascript
sx={{
  border: '3px solid black',
  borderRadius: 2,
  boxShadow: '4px 4px 0px rgba(0,0,0,1)',
  '&:hover': {
    transform: 'translate(2px, 2px)',
    boxShadow: '2px 2px 0px rgba(0,0,0,1)'
  }
}}
```

#### Chips/Badges (category/difficulty)

```javascript
sx={{
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '0.75rem',
  bgcolor: categoryColors[category].bg,
  color: categoryColors[category].color,
  border: '2px solid black',
  borderRadius: 1
}}
```

---

## 🧩 Component-Specific Styling

### Navbar

- **Public:** Light background (`background.default`), logo + links, theme toggle.
- **User:** Same background, user dropdown with avatar/level, theme toggle.

### HabitCard

- **Header:** Icon in colored box (`primary.main`), name + badges.
- **Badges:** Category, difficulty (color-coded), XP, streak.
- **Weekly grid:** 7 columns, clickable only for today.

### Dashboard

- **Level bar:** LinearProgress with border and custom bar color.
- **Stats cards:** Large numbers in VT323, labels in IBM Plex Mono.

### Progress Page

- **Heatmap:** Custom `HeatmapCalendar` with color intensity.
- **Achievement cards:** `secondary.main` when unlocked, dim when locked.

---

## 📱 Responsive Behavior

| Breakpoint | Max Width | Adjustments                                             |
| ---------- | --------- | ------------------------------------------------------- |
| **xs**     | 599px     | Stack columns, shrink fonts, hide some sidebar elements |
| **sm**     | 959px     | Adjust spacing, moderate font sizes                     |
| **md**     | 1279px    | Standard layout, 2–3 column grids                       |
| **lg**     | 1919px    | Full layout, larger fonts, wider gaps                   |
| **xl**     | 1920px+   | Optional: max-width containers                          |

---

## 🛠️ Implementation Notes

- **Theme provider:** Wrap app with `ThemeProvider` from `@mui/material/styles`.
- **Custom tokens:** Extend `palette` with `tertiary` and custom accent colors.
- **CSS overrides:** Use `sx` prop for one-off styles; avoid inline styles.
- **Dark mode class:** Applied to root; CSS variables are not used—MUI palette is preferred.
- **Icons:** Lucide React or MUI icons; color set to `text.primary` or `text.secondary`.

---

## ✅ Dos and Don’ts

### ✅ Do

- Use `sx` for component-specific styles.
- Keep borders black and `3px` wide.
- Apply flat shadows (`4px 4px 0px black`) to interactive elements.
- Use VT323 for headers; IBM Plex Mono for body text.
- Respect light/dark palette tokens.

### ❌ Don’t

- Use rounded corners larger than `8px`.
- Apply gradients or glossy effects (keep it flat).
- Use arbitrary hex colors outside the palette unless absolutely necessary.
- Mix typography fonts within the same UI element.
- Forget to test both themes; ensure contrast passes WCAG AA.

---

## 📦 Where to Find Styles in the Code

- **Theme definition:** `src/contexts/ThemeContext.js`
- **Global overrides:** `src/index.css` (minimal, mainly font imports)
- **Component styles:** Look for `sx` props in each component file.
- **Icons:** `src/components/...` import from `@mui/icons-material` or `lucide-react`.

---

### Quick Reference: Palette by Mode

```javascript
// Light mode
light: {
  bg: '#F5F5DC',
  paper: '#FFFFFF',
  primary: '#87CEEB',
  secondary: '#FFB6C1',
  tertiary: '#98FB98',
  text: '#2F4F4F',
  textSecondary: '#696969'
}
// Dark mode
dark: {
  bg: '#1A1A2E',
  paper: '#16213E',
  primary: '#0F4C75',
  secondary: '#E94560',
  tertiary: '#3FC1C9',
  text: '#F5F5F5',
  textSecondary: '#BBBBBB'
}
```

---

**Last updated:** November 20, 2025  
**Maintained by:** Chronicle of Self team
