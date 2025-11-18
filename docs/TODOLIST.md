# Chronicle of Self - Development TODO List

## 🎨 Design System & Foundation

### Color Palette (Flat Retro Theme)

**Light Mode:**
- Background: `#F5F5DC` (Beige/Cream)
- Surface: `#FFE4E1` (Misty Rose)
- Accent Primary: `#87CEEB` (Sky Blue)
- Accent Secondary: `#FFB6C1` (Light Pink)
- Accent Tertiary: `#98FB98` (Pale Green)
- Text Primary: `#2F4F4F` (Dark Slate Gray)
- Text Secondary: `#696969` (Dim Gray)
- Shadow: `#000000` (Black - for flat retro shadows)

**Dark Mode:**
- Background: `#1A1A2E` (Dark Navy)
- Surface: `#16213E` (Deep Blue)
- Accent Primary: `#0F4C75` (Deep Blue)
- Accent Secondary: `#E94560` (Pink Red)
- Accent Tertiary: `#3FC1C9` (Cyan)
- Text Primary: `#F5F5F5` (Off White)
- Text Secondary: `#BBBBBB` (Light Gray)
- Shadow: `#000000` (Black - for flat retro shadows)

### Typography
- **Primary Font**: VT323 (pixel font for headers/titles)
- **Secondary Font**: Press Start 2P (for special UI elements)
- **Body Font**: IBM Plex Mono / Space Mono (monospace for readability)

### Design Tokens
- **Border Radius**: 8px (slight rounding, not too modern)
- **Flat Shadow**: `4px 4px 0px rgba(0,0,0,1)` (retro flat shadow)
- **Heavy Shadow**: `8px 8px 0px rgba(0,0,0,1)` (for buttons/cards)
- **Border Width**: 3px (bold retro borders)

---

## 📋 Week 1: Setup & Theme System (Nov 12-18)

### Phase 1.1: Project Initialization
- [ ] Initialize Vite + React + TypeScript project
- [ ] Install dependencies:
  - [ ] `@radix-ui/react-*` (Shadcn dependencies)
  - [ ] `lucide-react` (icons)
  - [ ] `tailwindcss` (styling)
  - [ ] `class-variance-authority` (Shadcn utility)
  - [ ] `clsx` and `tailwind-merge`
- [ ] Configure Tailwind CSS with custom config
- [ ] Setup Shadcn UI CLI: `npx shadcn-ui@latest init`
- [ ] Create folder structure:
  ```
  src/
  ├── components/
  │   ├── ui/           (Shadcn components)
  │   ├── layout/       (Header, Footer, Sidebar)
  │   └── features/     (Habit cards, XP bar, etc.)
  ├── pages/
  ├── hooks/
  ├── lib/
  ├── types/
  └── styles/
  ```

### Phase 1.2: Theme System (CRITICAL - DO THIS FIRST!)
- [ ] Install Google Fonts: VT323, Press Start 2P, IBM Plex Mono
- [ ] Configure Tailwind theme with custom colors:
  ```javascript
  // tailwind.config.js
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#F5F5DC',
          surface: '#FFE4E1',
          primary: '#87CEEB',
          secondary: '#FFB6C1',
          tertiary: '#98FB98',
          text: '#2F4F4F',
          'text-secondary': '#696969',
        },
        dark: {
          bg: '#1A1A2E',
          surface: '#16213E',
          primary: '#0F4C75',
          secondary: '#E94560',
          tertiary: '#3FC1C9',
          text: '#F5F5F5',
          'text-secondary': '#BBBBBB',
        }
      },
      fontFamily: {
        pixel: ['VT323', 'monospace'],
        retro: ['"Press Start 2P"', 'cursive'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'retro': '4px 4px 0px rgba(0,0,0,1)',
        'retro-lg': '8px 8px 0px rgba(0,0,0,1)',
      }
    }
  }
  ```

- [ ] Create `ThemeProvider.tsx` with Context API:
  ```typescript
  type Theme = 'light' | 'dark'
  - useState for theme
  - useEffect to persist in localStorage
  - Apply theme class to <html> element
  ```

- [ ] Create `ThemeToggle.tsx` component:
  - [ ] Use Lucide icons: `<Sun />` and `<Moon />`
  - [ ] Button with retro shadow styling
  - [ ] Smooth transition between themes

- [ ] Create global CSS variables in `globals.css`:
  ```css
  :root {
    --bg: theme('colors.light.bg');
    --surface: theme('colors.light.surface');
    /* etc. */
  }

  .dark {
    --bg: theme('colors.dark.bg');
    --surface: theme('colors.dark.surface');
    /* etc. */
  }
  ```

- [ ] Test theme switching works across all pages

### Phase 1.3: Core Shadcn Components Setup
- [ ] Install and customize Shadcn components:
  - [ ] `npx shadcn-ui@latest add button`
  - [ ] `npx shadcn-ui@latest add card`
  - [ ] `npx shadcn-ui@latest add input`
  - [ ] `npx shadcn-ui@latest add label`
  - [ ] `npx shadcn-ui@latest add dialog`
  - [ ] `npx shadcn-ui@latest add toast`
  - [ ] `npx shadcn-ui@latest add tabs`
  - [ ] `npx shadcn-ui@latest add progress`
  - [ ] `npx shadcn-ui@latest add checkbox`

- [ ] Customize Shadcn components to match retro theme:
  - [ ] Add flat retro shadows to buttons
  - [ ] Add bold borders (3px)
  - [ ] Update border radius to 8px
  - [ ] Apply pixel fonts to headers

### Phase 1.4: Layout Components
- [ ] Create `Header.tsx`:
  - [ ] Logo with pixel font (VT323)
  - [ ] Navigation links (Dashboard, Progress, Habits, Profile)
  - [ ] Theme toggle button
  - [ ] User level/XP display (compact)
  - [ ] Retro styling with flat shadow

- [ ] Create `Sidebar.tsx` (mobile drawer):
  - [ ] Hamburger menu icon (Lucide `<Menu />`)
  - [ ] Same navigation as Header
  - [ ] Slide-in animation

- [ ] Create `MainLayout.tsx`:
  - [ ] Wraps Header + children
  - [ ] Responsive grid layout
  - [ ] Background pattern (optional: subtle pixel grid)

### Phase 1.5: Backend Setup
- [ ] Initialize Node.js + Express + TypeScript project
- [ ] Install dependencies:
  - [ ] `express`, `@types/express`
  - [ ] `pg` (PostgreSQL client)
  - [ ] `bcrypt`, `jsonwebtoken`
  - [ ] `dotenv`, `cors`
  - [ ] `express-validator`

- [ ] Setup PostgreSQL database:
  - [ ] Create database: `chronicle_of_self_dev`
  - [ ] Create `.env` file with DB connection string

- [ ] Create database schema:
  - [ ] `users` table
  - [ ] `archetypes` table
  - [ ] `categories` table
  - [ ] `habits` table
  - [ ] `completions` table
  - [ ] `achievements` table
  - [ ] `user_achievements` table

- [ ] Seed initial data:
  - [ ] Insert 4 archetypes (Warrior, Sage, Monk, Artisan)
  - [ ] Insert 4 categories (Body, Mind, Spirit, Creative)
  - [ ] Insert 10 sample achievements

- [ ] Setup Express server:
  - [ ] Create `/api/auth` routes (register, login)
  - [ ] Create `/api/habits` routes (CRUD)
  - [ ] Create `/api/completions` routes
  - [ ] Create `/api/user` routes (profile, stats)
  - [ ] JWT middleware for protected routes

- [ ] Test API endpoints with Postman/Thunder Client

---

## 📋 Week 2: Authentication & User Flow (Nov 19-25)

### Phase 2.1: Authentication Pages
- [ ] Create `LoginPage.tsx`:
  - [ ] Email input (Shadcn `<Input />`)
  - [ ] Password input
  - [ ] "Login" button with retro shadow
  - [ ] "Don't have an account? Sign up" link
  - [ ] Pixel font header: "WELCOME BACK"

- [ ] Create `RegisterPage.tsx`:
  - [ ] Email, username, password fields
  - [ ] Validation (email format, password strength)
  - [ ] "Create Account" button
  - [ ] Retro card styling with shadows

- [ ] Create `ArchetypeSelectionModal.tsx`:
  - [ ] Show after successful registration
  - [ ] 4 cards: Warrior, Sage, Monk, Artisan
  - [ ] Each card shows:
    - [ ] Archetype icon (Lucide icons)
    - [ ] Name (pixel font)
    - [ ] Description
    - [ ] Bonus category
  - [ ] Selection button
  - [ ] Cannot dismiss without selecting

- [ ] Create `AuthContext.tsx`:
  - [ ] Store JWT token
  - [ ] Store user data (id, username, level, xp, archetype)
  - [ ] Login/logout functions
  - [ ] Protected route wrapper

### Phase 2.2: Dashboard - Empty State
- [ ] Create `DashboardPage.tsx`:
  - [ ] Header: "TODAY'S HABITS" (pixel font)
  - [ ] Empty state illustration/message:
    - [ ] "No habits yet! Create your first habit to start your journey."
    - [ ] Large "+ Create Habit" button (retro styled)
  - [ ] XP progress bar (placeholder, 0/100 XP)
  - [ ] Level display: "Level 1 - Novice Adventurer"

- [ ] Create `XPProgressBar.tsx` component:
  - [ ] Horizontal bar with retro border
  - [ ] Fill color based on theme (accent primary)
  - [ ] Text overlay: "50 / 100 XP"
  - [ ] Pixel font for numbers

- [ ] Create `LevelDisplay.tsx` component:
  - [ ] Shows current level as large number
  - [ ] Shows title below (e.g., "Novice Adventurer")
  - [ ] Retro badge styling

---

## 📋 Week 3: Habit Creation & Completion (Nov 26 - Dec 2)

### Phase 3.1: Habit Creation Flow
- [ ] Create `CreateHabitModal.tsx`:
  - [ ] Trigger: "+ Create Habit" button
  - [ ] Form fields:
    - [ ] **Name** (text input): "e.g., Morning Run"
    - [ ] **Category** (dropdown): Body/Mind/Spirit/Creative
    - [ ] **Difficulty** (radio buttons): Easy/Medium/Hard/Epic
    - [ ] **Schedule** (tabs): Daily / Specific Days
      - [ ] If "Specific Days": checkboxes for M/T/W/T/F/S/S
  - [ ] Show estimated XP based on difficulty:
    - [ ] Easy: 10 XP
    - [ ] Medium: 20 XP
    - [ ] Hard: 30 XP
    - [ ] Epic: 50 XP
  - [ ] Show archetype bonus if category matches
  - [ ] "Create Habit" button (retro styled)
  - [ ] Cancel button

- [ ] Create `HabitCard.tsx` component:
  - [ ] Display habit name (pixel font)
  - [ ] Category icon (Lucide icon based on category)
  - [ ] Difficulty badge (color-coded)
  - [ ] Checkbox for completion (large, retro styled)
  - [ ] Streak counter: "🔥 12 days"
  - [ ] XP display: "+20 XP"
  - [ ] Retro card with flat shadow

- [ ] Create `HabitList.tsx`:
  - [ ] Map through today's habits
  - [ ] Render `<HabitCard />` for each
  - [ ] Group by category (optional)
  - [ ] Show completed habits with checkmark

### Phase 3.2: Habit Completion Logic
- [ ] Create `useHabitCompletion.ts` hook:
  - [ ] `completeHabit(habitId)` function
  - [ ] Call backend API: `POST /api/completions`
  - [ ] Handle response:
    - [ ] XP earned
    - [ ] Level up data (if applicable)
    - [ ] Streak update
    - [ ] Achievement unlocks
  - [ ] Update local state (Context or Zustand)

- [ ] Create `XPNotification.tsx` component:
  - [ ] Toast notification (Shadcn `<Toast />`)
  - [ ] Display: "+25 XP earned!"
  - [ ] Auto-dismiss after 2 seconds
  - [ ] Retro styling with pixel font

- [ ] Create `LevelUpModal.tsx`:
  - [ ] Trigger when level up occurs
  - [ ] Full-screen overlay with confetti/animation
  - [ ] Display:
    - [ ] "LEVEL UP!" (large pixel font)
    - [ ] New level number
    - [ ] New title (e.g., "Steady Wanderer")
  - [ ] "Continue" button to dismiss
  - [ ] Retro themed with glowing effects

- [ ] Create `StreakCounter.tsx`:
  - [ ] Fire emoji + number
  - [ ] Updates in real-time
  - [ ] Highlight when new longest streak

### Phase 3.3: Backend - Completion Logic
- [ ] Create `POST /api/completions/:habitId` endpoint:
  - [ ] Insert completion record
  - [ ] Calculate XP earned:
    - [ ] Get habit.base_xp
    - [ ] Check archetype bonus (1.25x if match)
    - [ ] Return earned XP
  - [ ] Update user.total_xp
  - [ ] Check level up:
    - [ ] Formula: `xp_required = 100 * (level^1.5)`
    - [ ] If `total_xp >= xp_required`: increment level
    - [ ] Update user.title based on level range
  - [ ] Update habit streaks:
    - [ ] Check last completion date
    - [ ] If yesterday: increment streak
    - [ ] If today: maintain streak
    - [ ] If older: reset to 1
    - [ ] Update longest_streak if current exceeds it
  - [ ] Check achievements:
    - [ ] Query achievement conditions
    - [ ] Insert into user_achievements if unlocked
  - [ ] Return response JSON with all updates

---

## 📋 Week 4: Progress Visualization (Dec 3-9)

### Phase 4.1: Progress Page Layout
- [ ] Create `ProgressPage.tsx`:
  - [ ] Header: "YOUR PROGRESS" (pixel font)
  - [ ] Grid layout:
    - [ ] Top: Calendar Heatmap (full width)
    - [ ] Middle: Streak Stats (left) + Completion Chart (right)
    - [ ] Bottom: Achievements Grid

### Phase 4.2: Calendar Heatmap
- [ ] Install library: `react-calendar-heatmap` or build custom
- [ ] Create `CalendarHeatmap.tsx`:
  - [ ] Display last 90 days
  - [ ] Color intensity based on completion count:
    - [ ] 0 completions: light gray
    - [ ] 1-2: light accent
    - [ ] 3-5: medium accent
    - [ ] 6+: dark accent
  - [ ] Hover tooltip: "Nov 12: 5 habits completed"
  - [ ] Retro border and styling
  - [ ] Match theme colors (light/dark mode)

- [ ] Backend: Create `GET /api/progress/heatmap` endpoint:
  - [ ] Query completions for last 90 days
  - [ ] Group by date, count per day
  - [ ] Return JSON: `{ "2025-11-12": 5, ... }`

### Phase 4.3: Streak Stats
- [ ] Create `StreakStatsCard.tsx`:
  - [ ] Display each active habit's streak
  - [ ] Show current streak and longest streak
  - [ ] Highlight habits with longest streaks
  - [ ] Fire emoji for visual emphasis
  - [ ] Retro card styling

- [ ] Backend: Create `GET /api/progress/streaks` endpoint:
  - [ ] Query all active habits for user
  - [ ] Return current_streak and longest_streak

### Phase 4.4: Completion Rate Chart
- [ ] Install chart library: `recharts` (React-friendly)
- [ ] Create `CompletionRateChart.tsx`:
  - [ ] Line chart showing last 30 days
  - [ ] Y-axis: Completion percentage (0-100%)
  - [ ] X-axis: Dates
  - [ ] Color: accent primary
  - [ ] Retro grid lines (dashed)
  - [ ] Pixel font for labels

- [ ] Backend: Create `GET /api/progress/completion-rate` endpoint:
  - [ ] Calculate daily completion rate for last 30 days
  - [ ] Formula: `(completed_habits / total_scheduled_habits) * 100`
  - [ ] Return array: `[{ date: "2025-11-12", rate: 75 }, ...]`

### Phase 4.5: Achievements Grid
- [ ] Create `AchievementCard.tsx`:
  - [ ] Show achievement icon (emoji or Lucide icon)
  - [ ] Show name (pixel font)
  - [ ] Show description (small mono font)
  - [ ] Locked state: grayscale + lock icon
  - [ ] Unlocked state: color + glow effect
  - [ ] Hover tooltip with unlock date

- [ ] Create `AchievementsGrid.tsx`:
  - [ ] Grid layout (3-4 columns on desktop)
  - [ ] Map through achievements
  - [ ] Show locked and unlocked achievements
  - [ ] Sort: unlocked first, then locked

- [ ] Backend: Create `GET /api/achievements` endpoint:
  - [ ] Query all achievements
  - [ ] Join with user_achievements to check unlock status
  - [ ] Return array with `is_unlocked` and `unlocked_at`

---

## 📋 Week 5: Habits Management & Achievements System (Dec 10-16)

### Phase 5.1: Habits Management Page
- [ ] Create `HabitsPage.tsx`:
  - [ ] Header: "ALL HABITS" (pixel font)
  - [ ] List all user's habits (active + inactive)
  - [ ] Each habit shows:
    - [ ] Name, category icon, difficulty
    - [ ] Schedule (Daily / Specific days)
    - [ ] Current streak / longest streak
    - [ ] Edit and Delete buttons
  - [ ] "+ Create Habit" button at top

- [ ] Create `EditHabitModal.tsx`:
  - [ ] Pre-populate form with existing habit data
  - [ ] Allow editing:
    - [ ] Name, category, difficulty, schedule
  - [ ] "Save Changes" button
  - [ ] "Cancel" button

- [ ] Create `DeleteHabitConfirmation.tsx`:
  - [ ] Warning dialog: "Are you sure? This will delete all completion history."
  - [ ] "Delete Permanently" button (danger styling)
  - [ ] "Cancel" button

- [ ] Backend: Create habit management endpoints:
  - [ ] `PUT /api/habits/:id` (update habit)
  - [ ] `DELETE /api/habits/:id` (soft delete: set is_active = false)
  - [ ] `GET /api/habits/all` (get all habits for user)

### Phase 5.2: Achievement System
- [ ] Define achievement conditions in database:
  - [ ] "First Step": Complete any habit once
  - [ ] "Week Warrior": Complete 7-day streak on any habit
  - [ ] "Perfectionist": Complete all habits in a day
  - [ ] "Level 5": Reach level 5
  - [ ] "Level 10": Reach level 10
  - [ ] "Century Club": Complete 100 total habits
  - [ ] "Body Builder": Complete 50 Body category habits
  - [ ] "Mind Master": Complete 50 Mind category habits
  - [ ] "Spirit Seeker": Complete 50 Spirit category habits
  - [ ] "Creative Soul": Complete 50 Creative category habits

- [ ] Create `checkAchievements()` function in backend:
  - [ ] Called after every habit completion
  - [ ] Query conditions for all achievements
  - [ ] Check user's stats against conditions
  - [ ] Insert into `user_achievements` if newly unlocked
  - [ ] Return array of newly unlocked achievements

- [ ] Create `AchievementUnlockToast.tsx`:
  - [ ] Toast notification with achievement icon
  - [ ] Display: "🏆 Achievement Unlocked: Week Warrior!"
  - [ ] Auto-dismiss after 3 seconds
  - [ ] Retro styling with glow effect

### Phase 5.3: Profile Page
- [ ] Create `ProfilePage.tsx`:
  - [ ] Header: "YOUR PROFILE" (pixel font)
  - [ ] User stats card:
    - [ ] Username
    - [ ] Archetype (with icon and description)
    - [ ] Current level + title
    - [ ] Total XP
    - [ ] Join date
  - [ ] Stats breakdown:
    - [ ] Total habits created
    - [ ] Total completions
    - [ ] Current longest streak
    - [ ] Achievements unlocked count
  - [ ] Settings section:
    - [ ] Theme toggle (Light/Dark)
    - [ ] "Log Out" button
    - [ ] (Future: Change password, delete account)

- [ ] Create `UserStatsCard.tsx`:
  - [ ] Large display of key stats
  - [ ] Retro card with flat shadow
  - [ ] Pixel font for numbers

- [ ] Backend: Create `GET /api/user/profile` endpoint:
  - [ ] Return user data + aggregated stats
  - [ ] Total habits, completions, achievements count

---

## 📋 Week 6: Polish, Testing & Deployment (Dec 17-23)

### Phase 6.1: UI Polish
- [ ] Add loading states:
  - [ ] Skeleton loaders for cards (Shadcn `<Skeleton />`)
  - [ ] Loading spinners for API calls
  - [ ] Retro styled spinners (pixelated if possible)

- [ ] Add error states:
  - [ ] Error messages for API failures
  - [ ] Toast notifications for errors
  - [ ] Retro error modal with pixel font

- [ ] Add animations:
  - [ ] Smooth transitions for theme switching
  - [ ] Fade-in for page loads
  - [ ] Bounce animation for XP notifications
  - [ ] Confetti or particles for level-ups

- [ ] Add empty states:
  - [ ] No habits: "Create your first habit!"
  - [ ] No achievements unlocked: "Complete habits to unlock badges!"
  - [ ] No completions: "Start your journey today!"

- [ ] Responsive design:
  - [ ] Test on mobile (375px width)
  - [ ] Test on tablet (768px width)
  - [ ] Test on desktop (1920px width)
  - [ ] Adjust layouts for each breakpoint
  - [ ] Ensure header and navigation work on mobile

### Phase 6.2: Testing
- [ ] Manual testing:
  - [ ] Test full user flow: Register → Select Archetype → Create Habit → Complete → Level Up
  - [ ] Test streak logic: complete habit daily, skip a day, verify reset
  - [ ] Test archetype bonus: complete matching category habit, verify 1.25x XP
  - [ ] Test achievement unlocks: trigger each achievement condition
  - [ ] Test theme switching: verify all components update correctly
  - [ ] Test on different browsers: Chrome, Firefox, Safari, Edge

- [ ] Unit testing (optional but recommended):
  - [ ] Test XP calculation logic
  - [ ] Test level-up thresholds
  - [ ] Test streak calculation
  - [ ] Use Vitest or Jest

- [ ] End-to-end testing (optional):
  - [ ] Use Playwright or Cypress
  - [ ] Test critical user flows

### Phase 6.3: Performance Optimization
- [ ] Frontend optimization:
  - [ ] Code splitting with React.lazy()
  - [ ] Optimize images (compress, use WebP)
  - [ ] Minimize bundle size (check with `vite build --analyze`)
  - [ ] Add service worker for PWA (optional)

- [ ] Backend optimization:
  - [ ] Add database indexes:
    - [ ] Index on `users.email`
    - [ ] Index on `habits.user_id`
    - [ ] Index on `completions.user_id` and `completions.completed_at`
  - [ ] Add query caching (optional: Redis)
  - [ ] Add rate limiting (express-rate-limit)

### Phase 6.4: Deployment
- [ ] Frontend deployment:
  - [ ] Create production build: `npm run build`
  - [ ] Deploy to Vercel:
    - [ ] Connect GitHub repository
    - [ ] Set environment variables (API URL)
    - [ ] Deploy
  - [ ] Test production site

- [ ] Backend deployment:
  - [ ] Setup PostgreSQL database on Railway/Heroku/Render
  - [ ] Setup environment variables:
    - [ ] DATABASE_URL
    - [ ] JWT_SECRET
    - [ ] PORT
  - [ ] Deploy backend to Railway/Heroku/Render
  - [ ] Run database migrations
  - [ ] Seed initial data (archetypes, categories, achievements)
  - [ ] Test API endpoints in production

- [ ] Connect frontend to production backend:
  - [ ] Update API_BASE_URL in frontend
  - [ ] Test full flow in production

### Phase 6.5: Documentation
- [ ] Create README.md:
  - [ ] Project description
  - [ ] Features list
  - [ ] Tech stack
  - [ ] Setup instructions (local development)
  - [ ] Deployment instructions
  - [ ] Screenshots

- [ ] Create user guide (optional):
  - [ ] How to create habits
  - [ ] How XP and leveling works
  - [ ] How streaks work
  - [ ] Archetype bonuses explanation

- [ ] Code documentation:
  - [ ] Add JSDoc comments to complex functions
  - [ ] Document API endpoints (Postman collection or Swagger)

---

## 🎯 Critical Success Criteria

### Must-Have Features (MVP)
- ✅ User registration + archetype selection
- ✅ Create/edit/delete habits
- ✅ Complete habits and earn XP
- ✅ Level-up system with titles
- ✅ Streak tracking
- ✅ Archetype bonuses (25% XP for matching category)
- ✅ Calendar heatmap (90 days)
- ✅ Basic achievements (10 badges minimum)
- ✅ Light/Dark mode toggle
- ✅ Fully responsive design
- ✅ Retro flat design aesthetic

### Performance Targets
- ⚡ Page load time < 2 seconds
- ⚡ API response time < 500ms
- ⚡ Lighthouse score > 90 (Performance, Accessibility, Best Practices)

### Design Quality
- 🎨 Consistent retro flat aesthetic across all pages
- 🎨 Smooth theme transitions (light ↔ dark)
- 🎨 Pixel fonts used for headers and key UI elements
- 🎨 Flat retro shadows on all interactive elements
- 🎨 Color palette strictly adhered to (no random colors)

---

## 🚫 Out of Scope (For Now)
- ❌ Item drops & inventory system
- ❌ Shop & currency
- ❌ Quest system
- ❌ Social features (guilds, leaderboards)
- ❌ AI insights / Weekly Chronicle
- ❌ Password reset via email
- ❌ Profile picture upload
- ❌ Habit reminders/notifications
- ❌ Data export (CSV/JSON)
- ❌ Multi-language support

---

## 📝 Notes
- **Theme First Approach**: Theme system MUST be implemented before building any components
- **Shadcn Customization**: All Shadcn components need to be restyled to match retro aesthetic
- **Consistent Design**: Every component must use the same shadow style, border width, and color palette
- **Mobile-First**: Build for mobile first, then scale up to desktop
- **Performance**: Keep bundle size small, lazy load routes, optimize images

---

## 🎮 Tech Stack Summary
- **Frontend**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Icons**: Lucide React
- **Fonts**: VT323, Press Start 2P, IBM Plex Mono
- **State**: Context API (or Zustand if needed)
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL 14+
- **Auth**: JWT tokens + bcrypt
- **Charts**: Recharts (for completion rate chart)
- **Heatmap**: react-calendar-heatmap (or custom)
- **Deployment**: Vercel (Frontend) + Railway/Render (Backend)

---

**Last Updated**: November 14, 2025
**Current Phase**: Week 1 - Setup & Theme System
**Target Completion**: December 23, 2025
