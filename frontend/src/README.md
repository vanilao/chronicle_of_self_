# Chronicle of Self - Frontend Structure

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Shared components (buttons, inputs, etc.)
│   ├── landing/        # Landing page specific components
│   │   ├── HeroSection.js
│   │   ├── HowItWorksSection.js
│   │   ├── ArchetypesSection.js
│   │   └── CTASection.js
│   └── layout/         # Layout components
│       ├── Navbar.js   # Public navbar (for non-logged users)
│       └── Footer.js
│
├── pages/              # Page components (route endpoints)
│   └── landing/
│       └── LandingPage.js  # Marketing/landing page
│
├── contexts/           # React Context providers
│   └── ThemeContext.js     # Theme management (light/dark mode)
│
├── App.js             # Main app with routing
├── index.js           # Entry point
└── index.css          # Global styles (Tailwind + custom)
```

## 🎨 Design System

### Colors
- **Light Mode**: White bg, pastel accents (blue, pink, green)
- **Dark Mode**: Navy bg, vibrant accents

### Fonts
- `font-pixel` (VT323) - Headers and titles
- `font-mono` (IBM Plex Mono) - Body text
- `font-retro` (Press Start 2P) - Special elements

### Styling Utilities
- `retro-card` - Card with border and flat shadow
- `retro-button` - Button with hover effects

## 🚀 Future Structure

### To be added:
```
pages/
├── auth/
│   ├── LoginPage.js
│   └── RegisterPage.js
├── dashboard/
│   └── DashboardPage.js   # User home page (after login)
├── habits/
│   └── HabitsPage.js
└── progress/
    └── ProgressPage.js

components/
├── auth/              # Auth forms and components
├── dashboard/         # Dashboard widgets
├── habits/            # Habit cards, forms
├── progress/          # Charts, heatmaps
└── user/             # User profile, dropdown, avatar
    └── UserNav.js    # Authenticated user navbar
```

## 📝 Notes

- **Current**: Landing page for marketing/non-logged users
- **Next**: Authentication pages and user dashboard
- All components use Tailwind CSS with custom retro theme
- React Router for navigation
- Theme context for light/dark mode
