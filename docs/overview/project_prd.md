# Product Requirements Document (PRD)

## Chronicle of Self: MVP Foundation

**Simplified Gamified Habit Tracker**

---

## 📋 Document Information

| Field            | Value                                  |
| ---------------- | -------------------------------------- |
| **Product Name** | Chronicle of Self - MVP                |
| **Version**      | 0.1 (MVP Implementation)               |
| **Date**         | November 20, 2025                      |
| **Status**       | MVP Implemented + Design Specification |
| **Purpose**      | Academic Project + Portfolio Piece     |

---

## 🎯 Executive Summary

### What is this MVP?

Chronicle of Self MVP is a **simplified gamified habit tracker** that proves the core concept: _"Can tracking habits feel like an adventure while providing real behavioral insights?"_

This MVP focuses on:

- ✅ **Core habit tracking** - Create, complete, track habits
- ✅ **Simple gamification** - XP, levels, archetypes
- ✅ **Visual progress** - Calendar heatmap, streaks, charts
- ✅ **Basic achievements** - Unlock badges for milestones

This MVP explicitly REMOVES:

- ❌ Item drops & inventory system
- ❌ Shop & currency
- ❌ Quest system
- ❌ Party/social features
- ❌ AI integration
- ❌ Weekly Chronicle reports

### Why This Scope?

**Academic Requirements:** Complete a functional web application with comprehensive documentation within 6 weeks.

**Technical Validation:** Prove the core loop (create habit → complete → earn XP → level up) is satisfying before adding complexity.

**Portfolio Value:** A polished, functional foundation is better than an incomplete feature-rich mess.

### Current MVP Implementation Snapshot (Nov 2025)

**Implemented Features (v0.1):**

- ✅ **Public experience & onboarding**
  - Landing page with marketing sections, public navbar, and footer.
  - Email/password login and registration flows (front-end via `AuthContext`).
  - Archetype selection step with 4 archetypes and saved choice.
- ✅ **Core habit system**
  - Create, edit, and delete habits with name, category, difficulty, and schedule (daily or specific days).
  - Daily completion tracking with per-habit history and 7-day view on each habit card.
  - XP rewards per habit, including archetype–category bonus.
- ✅ **Dashboard & habits management**
  - Dashboard with level bar, XP progress, daily stats, and recent achievements.
  - Habits page with category filters (All / Body / Mind / Spirit / Creative) and daily completion stats.
- ✅ **Progress & achievements**
  - Progress page with calendar heatmap, streak stats, and completion-rate visualizations.
  - Leveling system with levels, titles, and XP-based progression.
  - Basic achievement logic and recent-achievement display.
- ✅ **UI, theming, and UX**
  - Retro-inspired design using Material UI (MUI) components and custom styling.
  - Light/dark theme toggle that persists across sessions.
  - Separate public and authenticated navbars; responsive layout for mobile/desktop.

### Deferred Features / Nice-to-Haves

The following ideas remain **out of the v0.1 build** and are treated as **future work** (see later roadmap sections):

- Item drops, inventory, and cosmetic customization.
- In-app shop and virtual currency.
- Quest/challenge system.
- Social features (guilds, parties, leaderboards, collaborative habits).
- Advanced analytics and AI-driven "Weekly Chronicle" insights.

---

## 👥 Target Users

### Primary User Persona: **The Struggling Self-Improver**

**Demographics:**

- Age: 18-35 years old
- Education: College students or young professionals
- Tech-savvy: Comfortable with web apps
- Location: Urban/suburban, English-speaking

**Psychographics:**

- Tries habit trackers but abandons them
- Enjoys games and RPG mechanics
- Values personal growth but struggles with consistency
- Wants structure but hates feeling punished for mistakes

**Pain Points:**

- Traditional habit trackers feel like chores
- Loses motivation after breaking streaks
- Doesn't understand _why_ habits succeed or fail
- Wants something that respects their intelligence (not childish)

**Goals:**

- Build consistent daily routines
- See progress over time
- Feel accomplished, not guilty
- Track multiple habit types (physical, mental, creative, spiritual)

---

### Secondary User Persona: **The Nostalgic Gamer**

**Demographics:**

- Age: 25-40 years old
- Gaming background: Played RPGs growing up
- Career: Working professionals
- Busy schedule, limited time

**Psychographics:**

- Appreciates retro aesthetics (90s/2000s nostalgia)
- Wants productivity tools that don't feel boring
- Likes seeing numbers go up (XP, levels)
- Values efficiency and minimalism

**Pain Points:**

- Habit trackers are too serious or too cutesy
- Wants gamification that feels mature
- Needs quick interactions (< 30 seconds to check in)

**Goals:**

- Quick daily habit logging
- See satisfying visual progress
- Feel a sense of achievement
- Low-friction experience

---

## 🎮 User Interactions

### User Journey Map

```
┌─────────────────────────────────────────────────────────────┐
│                    USER JOURNEY - MVP                        │
└─────────────────────────────────────────────────────────────┘

1. DISCOVERY & ONBOARDING (First Visit)
   ↓
   [Landing Page] → User sees value proposition
   ↓
   [Sign Up] → User creates account with email/password
   ↓
   [Archetype Selection] → User picks class (Warrior/Sage/Monk/Artisan)
   ↓
   [Welcome Modal] → Brief explanation of how the app works
   ↓
   [Empty Dashboard] → Prompted to create first habit

2. HABIT CREATION (First Action)
   ↓
   [Create Habit Modal]
   - Enter habit name (e.g., "Morning Run")
   - Select category: Body / Mind / Spirit / Creative
   - Set difficulty: Easy / Medium / Hard / Epic
   - Set schedule: Daily or Specific Days (M/T/W/T/F/S/S)
   ↓
   [Dashboard] → Habit appears in today's list

3. DAILY ROUTINE (Core Loop)
   ↓
   [User Opens App] → Sees today's habits
   ↓
   [Complete Habit] → Click checkbox
   ↓
   [XP Notification] → "Morning Run complete! +12 XP"
   ↓
   [Level Bar Updates] → Visual progress toward next level
   ↓
   [Streak Counter Updates] → Streak increments
   ↓
   [Achievement Unlock?] → If milestone reached, badge appears

4. PROGRESS REVIEW (Weekly Check-in)
   ↓
   [Navigate to Progress Page]
   ↓
   [View Calendar Heatmap] → See completion patterns
   ↓
   [View Streak Stats] → Current streak, longest streak
   ↓
   [View Completion Chart] → 30-day completion rate
   ↓
   [View Achievements] → See unlocked badges
   ↓
   [Feel Accomplished] → Visual satisfaction

5. LEVEL UP EVENT (Every few days)
   ↓
   [Complete Habit] → XP reaches threshold
   ↓
   [Level Up Animation] → "LEVEL UP! You are now Level 5"
   ↓
   [New Title Unlocked?] → "Steady Wanderer" (Levels 6-10)
   ↓
   [Return to Dashboard] → Continue daily routine
```

---

## 🔄 How Users Will Use the App

### Interaction Pattern 1: **Morning Check-In** (Most Common)

```
Duration: 30 seconds - 1 minute

1. Open app on phone/desktop
2. See today's habits listed
3. Complete habits one by one (checkboxes)
4. Watch XP notifications appear
5. Check streak counter
6. Close app
```

**Frequency:** Daily (ideally morning or evening routine)

---

### Interaction Pattern 2: **Creating New Habits** (Weekly)

```
Duration: 1-2 minutes per habit

1. Click "New Habit" button
2. Fill in habit details:
   - Name: "Read for 30 minutes"
   - Category: Mind (from dropdown)
   - Difficulty: Medium
   - Schedule: Daily
3. Save habit
4. See it appear in today's list (if scheduled for today)
```

**Frequency:** 1-2 times per week (as users refine their routine)

---

### Interaction Pattern 3: **Progress Review** (Weekly)

```
Duration: 2-3 minutes

1. Navigate to Progress page
2. View calendar heatmap:
   - See which days had completions (color intensity)
   - Identify patterns (strong weekdays, weak weekends)
3. Check streak stats:
   - Current streak: 12 days
   - Longest streak: 18 days
4. View completion chart:
   - 30-day rolling average
5. Scroll through achievements:
   - See newly unlocked badges
6. Feel motivated to continue
```

**Frequency:** Once per week (usually Sunday evening reflection)

---

### Interaction Pattern 4: **Editing/Managing Habits** (Bi-weekly)

```
Duration: 1-2 minutes

1. Go to Habits page (list of all habits)
2. Click "Edit" on a habit
3. Modify details:
   - Change schedule (e.g., daily → weekdays only)
   - Adjust difficulty
   - Update description
4. Save changes
5. Or: Delete habit if no longer relevant
```

**Frequency:** Every 2 weeks (as routines change)

---

## ⚙️ System Processes

### Process 1: User Registration & Onboarding

```
┌────────────────────────────────────────────────────────┐
│              REGISTRATION FLOW                          │
└────────────────────────────────────────────────────────┘

USER ACTION                    SYSTEM RESPONSE
─────────────────────────────────────────────────────────
1. Submit registration form
   (email, password, username)
                               → Validate email format
                               → Check email not already registered
                               → Hash password (bcrypt)
                               → Create user record in DB
                               → Generate JWT token
                               → Return token to frontend

2. Select archetype
   (Warrior/Sage/Monk/Artisan)
                               → Update user.archetype_id
                               → Initialize user stats:
                                  - level = 1
                                  - xp = 0
                                  - title = "Novice Adventurer"
                               → Store in database

3. View welcome modal
                               → Show 3-step tutorial:
                                  1. "Create habits"
                                  2. "Complete daily"
                                  3. "Level up!"
                               → Mark onboarding_complete = true

4. Redirected to dashboard
                               → Fetch user data
                               → Display empty state
                               → Show "Create your first habit" prompt
```

---

### Process 2: Habit Creation

```
┌────────────────────────────────────────────────────────┐
│              HABIT CREATION FLOW                        │
└────────────────────────────────────────────────────────┘

USER ACTION                    SYSTEM RESPONSE
─────────────────────────────────────────────────────────
1. Click "New Habit" button
                               → Open habit creation modal
                               → Load form with:
                                  - Name field (text input)
                                  - Category dropdown
                                  - Difficulty selector
                                  - Schedule picker

2. Fill in habit details:
   - Name: "Morning Run"
   - Category: Body
   - Difficulty: Medium
   - Schedule: Daily
                               → Validate required fields
                               → Calculate base XP:
                                  Easy = 10 XP
                                  Medium = 20 XP
                                  Hard = 30 XP
                                  Epic = 50 XP

3. Click "Create Habit"
                               → Insert habit into database:
                                  INSERT INTO habits (
                                    user_id,
                                    name,
                                    category_id,
                                    difficulty,
                                    base_xp,
                                    schedule_type,
                                    is_active
                                  ) VALUES (...)

                               → Return habit object
                               → Close modal
                               → Refresh dashboard
                               → Show success toast:
                                  "Habit created successfully!"
```

---

### Process 3: Habit Completion (CORE LOOP)

```
┌────────────────────────────────────────────────────────┐
│           HABIT COMPLETION FLOW (CRITICAL)             │
└────────────────────────────────────────────────────────┘

USER ACTION                    SYSTEM RESPONSE
─────────────────────────────────────────────────────────
1. Click checkbox on habit
                               ┌─────────────────────────┐
                               │ BACKEND PROCESSING      │
                               └─────────────────────────┘

                               Step 1: Create Completion Record
                               ─────────────────────────────────
                               → Insert into completions table:
                                  INSERT INTO completions (
                                    habit_id,
                                    user_id,
                                    completed_at
                                  ) VALUES (...)

                               Step 2: Calculate XP
                               ────────────────────
                               → Get habit.base_xp (e.g., 20)
                               → Get user.archetype_id
                               → Get habit.category_id
                               → Check if match:
                                  IF user.archetype.category_id
                                     == habit.category_id
                                  THEN bonus = 1.25
                                  ELSE bonus = 1.0
                               → Calculate:
                                  earned_xp = base_xp × bonus
                                  earned_xp = 20 × 1.25 = 25 XP

                               Step 3: Update User XP
                               ──────────────────────
                               → Add earned_xp to user.total_xp
                               → user.total_xp += 25

                               Step 4: Check Level Up
                               ──────────────────────
                               → Calculate XP needed for next level:
                                  xp_required = 100 × (level^1.5)
                               → Compare user.total_xp vs xp_required

                               IF user.total_xp >= xp_required:
                                 → Increment user.level
                                 → Update user.title (based on level)
                                 → Set leveled_up = true

                               Step 5: Update Streak
                               ─────────────────────
                               → Get last completion date
                               → Check if yesterday or today:
                                  IF yesterday: increment streak
                                  IF today: maintain streak
                                  IF older: reset streak to 1
                               → Update habit.current_streak
                               → Update habit.longest_streak if needed

                               Step 6: Check Achievements
                               ─────────────────────────
                               → Query achievement conditions:
                                  - "First Step": 1 completion
                                  - "Week Warrior": 7-day streak
                                  - "Level 5": Reach level 5
                                  - etc.
                               → If condition met:
                                  INSERT INTO user_achievements
                                  SET newly_unlocked = true

                               Step 7: Return Response
                               ───────────────────────
                               → Return JSON:
                                  {
                                    "success": true,
                                    "xp_earned": 25,
                                    "level_up": {
                                      "leveled_up": true,
                                      "new_level": 5,
                                      "new_title": "Steady Wanderer"
                                    },
                                    "streak": {
                                      "current": 12,
                                      "longest": 18
                                    },
                                    "achievements_unlocked": [
                                      {
                                        "id": 3,
                                        "name": "Level 5",
                                        "icon": "🌟"
                                      }
                                    ]
                                  }

2. View notifications
                               ┌─────────────────────────┐
                               │ FRONTEND PROCESSING     │
                               └─────────────────────────┘

                               → Display XP toast:
                                  "+25 XP earned!"
                                  (2 seconds, auto-dismiss)

                               → IF level_up.leveled_up:
                                  → Show level-up modal:
                                     "LEVEL UP!"
                                     "You are now Level 5"
                                     "Steady Wanderer"
                                     (Manual dismiss)

                               → IF achievements_unlocked:
                                  → Show achievement toast:
                                     "🌟 Level 5 unlocked!"
                                     (3 seconds, auto-dismiss)

                               → Update dashboard:
                                  - Mark habit as completed (checkmark)
                                  - Update XP progress bar
                                  - Update level display
                                  - Update streak counter

                               → Update Progress page (if open):
                                  - Add today to calendar heatmap
                                  - Increment completion counter
```

---

### Process 4: Daily Habit Reset

```
┌────────────────────────────────────────────────────────┐
│          DAILY RESET (Background Job)                   │
└────────────────────────────────────────────────────────┘

SYSTEM CRON JOB                ACTION
─────────────────────────────────────────────────────────
Runs every day at 12:00 AM
                               → Query all habits with:
                                  schedule_type = "daily"

                               → For each habit:
                                  - Set is_completed_today = false
                                  - Check if user completed yesterday:
                                    IF no completion yesterday
                                    THEN reset current_streak = 0

                               → Send push notification (future):
                                  "New day, new habits!
                                   Your streak is at risk."
```

---

### Process 5: Progress Page Data Generation

```
┌────────────────────────────────────────────────────────┐
│         PROGRESS PAGE RENDERING                         │
└────────────────────────────────────────────────────────┘

USER ACTION                    SYSTEM RESPONSE
─────────────────────────────────────────────────────────
1. Navigate to Progress page
                               → Query last 90 days of completions:
                                  SELECT
                                    DATE(completed_at) as date,
                                    COUNT(*) as count
                                  FROM completions
                                  WHERE user_id = ?
                                    AND completed_at >= NOW() - 90 days
                                  GROUP BY DATE(completed_at)

                               → Generate heatmap data:
                                  {
                                    "2025-11-10": 5,  // 5 habits
                                    "2025-11-11": 3,
                                    "2025-11-12": 6,
                                    ...
                                  }

                               → Query streak stats:
                                  SELECT
                                    habit_name,
                                    current_streak,
                                    longest_streak
                                  FROM habits
                                  WHERE user_id = ?
                                    AND is_active = true

                               → Query completion rate (last 30 days):
                                  - Total possible completions
                                  - Actual completions
                                  - Calculate percentage

                               → Query achievements:
                                  SELECT * FROM user_achievements
                                  WHERE user_id = ?
                                  ORDER BY unlocked_at DESC

2. View rendered data
                               → Display calendar heatmap:
                                  - Color intensity = completion count
                                  - Darker = more habits completed

                               → Display streak stats:
                                  - List of habits with streaks
                                  - Highlight longest streaks

                               → Display completion chart:
                                  - Line graph of 30-day rate

                               → Display achievements:
                                  - Grid of unlocked badges
                                  - Grayed-out locked badges
```

---

## 🎨 Design System (Brief Overview)

### Visual Theme

**Flat Retro-Futuristic**

- Pastel backgrounds (lavender, mint, peach)
- Neon accents (cyan, pink, yellow)
- Monospace fonts (IBM Plex Mono)
- Pixel-style shadows (4px solid black)
- Rounded corners (border-radius: 12px)

### Key Screens

1. **Dashboard** - List of today's habits
2. **Progress** - Calendar heatmap + stats
3. **Habits** - Manage all habits
4. **Profile** - User stats, archetype, settings

---

## 🚀 Technical Stack

### Current MVP Implementation

| Layer                 | Technology                                                 |
| --------------------- | ---------------------------------------------------------- |
| **Frontend**          | React 18 (Create React App), JavaScript                    |
| **UI / Styling**      | Material UI (MUI) + retro-inspired custom styles           |
| **Routing**           | React Router DOM v6                                        |
| **State Management**  | React Context (Theme, Auth, Habits, Time Travel, Settings) |
| **Persistence (MVP)** | localStorage + in-memory client state                      |

### Planned Backend Stack (Post-MVP)

- Node.js + Express REST API
- PostgreSQL relational database
- JWT-based authentication
- Production hosting (e.g., Vercel for frontend, Railway or similar for backend)

---

## 📊 Success Metrics (MVP)

### Engagement Metrics

- **Daily Active Users:** 70%+ return next day
- **Average Session Time:** 2-3 minutes
- **Habit Completion Rate:** 60%+ of scheduled habits completed

### Satisfaction Metrics

- **User Satisfaction:** 4+ / 5 stars (survey)
- **Retention:** 50%+ still active after 30 days

### Technical Metrics

- **Page Load Time:** < 2 seconds
- **API Response Time:** < 500ms
- **Uptime:** 99%+ availability

---

## ✂️ What's Left Behind (For Future Phases)

### Phase 2: Items & Collection

- Item drops on habit completion
- Inventory system
- Rarity tiers (Common, Rare, Epic, Legendary)
- Cosmetic customization

### Phase 3: Shop & Economy

- In-game currency (Gold)
- Shop with purchasable items
- Cosmetic themes and customization

### Phase 4: Quests & Challenges

- Daily quests (e.g., "Complete 5 habits today")
- Weekly challenges
- Special event quests

### Phase 5: Social Features

- Guilds / parties
- Leaderboards
- Friend system
- Collaborative habits

### Phase 6: Advanced Analytics

- Weekly Chronicle (AI-generated insights)
- Trend analysis
- Habit correlations
- Predictive recommendations

### Phase 7: Premium Features

- AI coaching
- Advanced themes
- Data export
- Integrations (fitness trackers, calendars)

---

## 📅 Development Timeline (6 Weeks)

### Week 1: Setup & Authentication

- [ ] Setup React + TypeScript + Tailwind
- [ ] Setup Node.js + Express + PostgreSQL
- [ ] User registration & login
- [ ] JWT authentication
- [ ] Basic routing

### Week 2: Core Habit System

- [ ] Create habit (name, category, difficulty, schedule)
- [ ] Dashboard: List today's habits
- [ ] Complete habit button
- [ ] XP calculation logic
- [ ] Level-up system

### Week 3: Progression & Streaks

- [ ] Streak tracking
- [ ] Level-up animation
- [ ] Archetype selection on signup
- [ ] Archetype bonus calculation
- [ ] User profile page

### Week 4: Progress Visualization

- [ ] Calendar heatmap component
- [ ] Streak stats display
- [ ] Completion rate chart
- [ ] Progress page layout

### Week 5: Achievements & Polish

- [ ] Achievement system (5-10 badges)
- [ ] Achievement unlock notifications
- [ ] Habit editing/deletion
- [ ] Responsive design
- [ ] UI polish

### Week 6: Testing & Deployment

- [ ] End-to-end testing
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] Deploy to production
- [ ] User testing with 5 people

---

## 🎯 Core User Stories (MVP Only)

### User Story 1: Registration

**As a new user,**  
**I want to create an account and choose my archetype,**  
**So that I can start tracking my habits with a personalized experience.**

**Acceptance Criteria:**

- User can register with email and password
- User must choose 1 of 4 archetypes
- User sees confirmation and is logged in
- User is redirected to empty dashboard

---

### User Story 2: Create Habit

**As a user,**  
**I want to create a new habit with a name, category, and schedule,**  
**So that I can track specific behaviors I want to build.**

**Acceptance Criteria:**

- User can enter habit name (required)
- User can select category from dropdown (Body/Mind/Spirit/Creative)
- User can set difficulty (Easy/Medium/Hard/Epic)
- User can set schedule (Daily or specific days)
- Habit appears in dashboard immediately after creation

---

### User Story 3: Complete Habit

**As a user,**  
**I want to mark a habit as complete and earn XP,**  
**So that I feel rewarded for my progress.**

**Acceptance Criteria:**

- User can click checkbox to complete habit
- User sees XP notification (e.g., "+12 XP")
- XP progress bar updates
- Streak counter increments
- If archetype matches category, bonus XP is applied

---

### User Story 4: Level Up

**As a user,**  
**I want to level up when I earn enough XP,**  
**So that I feel a sense of progression and accomplishment.**

**Acceptance Criteria:**

- When XP threshold reached, level-up modal appears
- Modal shows new level and title
- User can dismiss modal
- Dashboard shows updated level
- XP bar resets to show progress toward next level

---

### User Story 5: View Progress

**As a user,**  
**I want to see my completion history in a calendar heatmap,**  
**So that I can visualize my consistency over time.**

**Acceptance Criteria:**

- Progress page shows calendar heatmap (last 90 days)
- Heatmap uses color intensity for completion density
- User can see current streak and longest streak
- User can see completion rate (last 30 days)
- User can see unlocked achievements

---

### User Story 6: Unlock Achievements

**As a user,**  
**I want to unlock badges when I reach milestones,**  
**So that I feel recognized for my consistency.**

**Acceptance Criteria:**

- Achievements unlock automatically when conditions met
- User sees achievement notification
- Achievement appears in Progress page
- Locked achievements are visible but grayed out

---

## 🔒 Out of Scope (MVP)

### Not Included in MVP (Current Build):

❌ Backend email-based password reset (UI only, no real emails yet)  
❌ Profile picture upload  
❌ Custom habit colors/icons beyond the current retro theme  
❌ Habit notes or journal-style entries  
❌ Habit reminders/notifications (email, push, mobile)  
❌ Data export (CSV/JSON)  
❌ Multi-language/i18n support  
❌ Habit templates and habit sharing  
❌ Public API for third-party integrations

These align with the **Phase 2+ roadmap** and are intentionally deferred to keep the MVP focused.

---

## 🎓 Academic Requirements Met

### Specification Document ✅

- Comprehensive PRD with user stories
- Technical architecture documented
- Design system specified
- Use cases and flows defined

### Functional Application ✅

- User authentication
- CRUD operations (habits)
- Data persistence (PostgreSQL)
- Responsive UI (Tailwind CSS)

### Portfolio Value ✅

- Modern tech stack (React, TypeScript, Node.js)
- Polished UI design
- Deployed and accessible online
- GitHub repository with README

---

## 📝 Appendix: Archetype Descriptions

### Warrior (Body Focus)

**Philosophy:** Strength through physical discipline  
**XP Bonus:** +25% for Body category habits  
**Example Habits:** Exercise, sports, physical challenges  
**Personality:** Action-oriented, competitive, resilient

### Sage (Mind Focus)

**Philosophy:** Wisdom through mental cultivation  
**XP Bonus:** +25% for Mind category habits  
**Example Habits:** Reading, learning, problem-solving  
**Personality:** Analytical, curious, strategic

### Monk (Spirit Focus)

**Philosophy:** Peace through inner balance  
**XP Bonus:** +25% for Spirit category habits  
**Example Habits:** Meditation, reflection, mindfulness  
**Personality:** Calm, introspective, patient

### Artisan (Creative Focus)

**Philosophy:** Expression through creative work  
**XP Bonus:** +25% for Creative category habits  
**Example Habits:** Art, music, writing, crafting  
**Personality:** Imaginative, expressive, innovative
