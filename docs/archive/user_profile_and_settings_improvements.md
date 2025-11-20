# User Profile & Settings – Improvements & Fixes

## Summary

- **Scope** Improvements and fixes for the `/profile` (ProfilePage) and `/settings` (SettingsPage) experiences.
- **Goal** Make identity, stats, and preferences more coherent, safer, and more obviously useful to the player.
- **Status (Nov 2025)** Frontend-only implementation with localStorage-based persistence and gamified stats; no backend account system yet.

---

## 1. Current Behavior (As Implemented)

### 1.1 Profile Page (`/profile` – `ProfilePage.js`)

- **Identity block**
  - Shows avatar (uploaded image or initial from `user.username`), username, archetype `Chip`.
  - Allows editing of **username** inline when `isEditing` is true.
  - **Email is read-only** – displayed with a lock icon and tooltip explaining it's the account identifier.
  - On save, calls `updateUser(editedUser)` from `AuthContext` and displays a success `Alert`.
  - **Username validation**: 2-30 characters, alphanumeric/spaces/underscores/hyphens only.
- **Avatar upload**
  - Users can upload a custom profile picture via "CHANGE AVATAR" button.
  - Supports image files up to 2MB.
  - Images are stored as base64 data URLs in the user object (`avatarUrl`, `avatarType`).
  - "REMOVE PHOTO" button resets to initial (first letter of username).
  - Validation for file type and size with error messages.
- **Avatar gallery preview** (non-functional mock)
  - Shows 6 placeholder avatars that unlock at levels 5, 10, 15, 20, 25, 30.
  - Displays which avatars are unlocked based on current level.
  - Marked as "COMING SOON" – selection is not yet functional.
- **Stats block – "CHARACTER STATS"**
  - Uses `HabitsContext` to compute:
    - **Total completed habits** (`stats.totalCompleted` from `completionHistory`).
    - **Longest streak** (`getHabitStreak`).
  - Uses leveling utilities to show:
    - Level, current XP, XP required for next level (progress bar).
    - "TOTAL XP" (`getTotalXPForLevel(level) + currentXP`).
- **Gamification**
  - Shows count of achievements (`user.achievements?.length || 0`).
  - Visual style matches the rest of the app (pixel/retro card layout).

### 1.2 Settings Page (`/settings` – `SettingsPage.js`)

- **Persistence model**

  - Uses `SettingsContext` for centralized settings management.
  - Settings are auto-saved to localStorage on every change via the context.
  - Uses `getCurrentUserId()` and `getUserStorageKey(userId, 'userSettings')` to store settings under a **user-specific key**.
  - `DEFAULT_SETTINGS`:
    - `notifications: true`
    - `soundEffects: true`
    - `dailyReminder: true`
    - `reminderTime: '09:00'`
  - Displays "Changes are saved automatically" helper text.

- **Sections**
  - **Appearance**
    - Dark mode toggle wired to `ThemeContext` via `toggleTheme`.
  - **Notifications & Reminders**
    - `notifications` toggle ("In-App Notifications – Show XP gains and level-up alerts").
    - `soundEffects` toggle ("Play sounds on XP gain and level up").
    - `dailyReminder` toggle + `reminderTime` `TextField` (`type="time"`).
    - Info text noting reminders are currently in-app only.
  - **Data & Privacy**
    - `EXPORT DATA` button builds a JSON blob from **user-specific keys**:
      - `localStorage.getItem('user')` (global key).
      - `getUserStorageKey(userId, 'habits')` (user-specific).
      - `getUserStorageKey(userId, 'habitCompletions')` (user-specific).
      - `getUserStorageKey(userId, 'achievements')` (user-specific).
      - `getUserStorageKey(userId, 'userSettings')` (user-specific).
    - `RESET SETTINGS` button to restore defaults with confirmation dialog.
  - **Account & Security**
    - `LOG OUT` button calls `logout()` and navigates to `/login`.
    - `DELETE ACCOUNT` button opens a confirmation `Dialog` with detailed checklist.
      - On confirm, `handleDeleteAccount` calls `logout()` which handles `clearUserData(userId)`.
      - No longer uses `localStorage.clear()` to avoid wiping unrelated data.

### 1.3 Settings Context (`SettingsContext.js`)

- **Centralized settings management**
  - Provides `settings`, `updateSetting`, `updateSettings`, `resetSettings`, `reloadSettings`.
  - Auto-saves to localStorage when settings change.
  - Other components (XPToast, LevelUpNotification) read settings to respect user preferences.
  - `notifications` setting controls visibility of XP toasts and level-up notifications.

### 1.4 Related Infrastructure

- **AuthContext (`AuthContext.js`)**

  - Persists `user` in `localStorage` under the **global** key `'user'`.
  - Uses `updateUser(updates)` to merge updates into current user and renormalize level/XP.
  - Uses `awardXP`, level normalization, and title calculation based on leveling utilities.

- **HabitsContext (`HabitsContext.js`)**

  - Loads and saves habits via **user-specific** keys built with `getUserStorageKey(userId, 'habits')`.
  - Uses `getCurrentUserId()` which returns `user.email` from `'user'` in localStorage.

- **User storage utilities (`userStorage.js`)**
  - `getUserStorageKey(userId, key)` → `user_${userId}_${key}`.
  - `clearUserData(userId)` removes:
    - `habits`, `habitCompletions`, `userSettings`, `achievements`, `timeTravelOffsetDays` (all via user-specific keys).
  - `getCurrentUserId()` returns `user.email` from the stored `user` object.

---

## 2. Key Issues & Risks

### 2.1 Email Is the User ID but Is Editable in Profile

- **Observed**

  - `getCurrentUserId()` uses `user.email` as the unique ID for all user-specific storage keys.
  - `ProfilePage` lets the player freely edit `email` and calls `updateUser({ email })`.
  - Habits, settings, achievements, etc. are stored under keys derived from the **old** email.

- **Risks**

  - Changing email effectively changes the user ID without migrating data:
    - Habits and history appear to "disappear" because new keys (for the new email) contain no data.
    - Old user-specific keys remain in localStorage as **orphaned data**.
  - Any future multi-user or backend integration will have a fragile coupling between email and identity.

- **Recommended direction**
  - **Short term (no backend yet)**
    - Option A: Treat email as **account identifier** and make it **read-only** in the profile UI (display only).
    - Option B: Allow editing but:
      - On email change, **migrate user-specific data**:
        - For each key in `['habits', 'habitCompletions', 'userSettings', 'achievements', 'timeTravelOffsetDays']`:
          - Read old `user_${oldEmail}_${key}`.
          - Write into new `user_${newEmail}_${key}`.
          - Remove the old key.
      - Consider keeping a one-time warning that email change may affect stored data.
  - **Long term (with backend)**
    - Use a **backend-generated user ID** (e.g., UUID) as the stable identifier.
    - Treat email as a **verifiable contact detail**, not the primary key.

### 2.2 Settings Flags Are Not Wired Into Behavior

- **Observed**

  - `notifications`, `soundEffects`, `dailyReminder`, and `reminderTime` are only read/written inside `SettingsPage`.
  - Other parts of the app (e.g., XP toast, level-up notifications, habit completion flows) do not read `userSettings`.

- **Consequences**

  - Players may toggle settings without seeing any tangible effect.
  - Harder to reason about how preferences influence the experience.

- **Recommended direction**
  - Create a **Settings context/hook** that exposes `userSettings` to the rest of the app.
  - Use these flags to conditionally:
    - Show/hide XP toast and level-up notifications (`soundEffects`, future `visualEffects` flag).
    - Show in-app reminder banners or call future notification APIs (`dailyReminder`, `reminderTime`).
    - Gate any future browser notifications / mobile push integration (`notifications`).

### 2.3 Data Export & Delete Account Inconsistencies

- **Export**

  - `handleExportData` reads `habits` from the **global** `'habits'` key.
  - `HabitsContext` actually stores habits at a **user-specific** key (`user_${userId}_habits`).
  - Result: Exported data may be **empty or stale** for real users.

- **Delete account**

  - `handleDeleteAccount` performs:
    - `localStorage.clear()` → clears **all** keys for the origin, including anything unrelated to this app.
    - Then calls `logout()`, which already runs `clearUserData(userId)` and removes the `'user'` key.
  - This is both over-aggressive (wipes unrelated keys) and redundant.

- **Recommended fixes**
  - **Export**
    - Use `getCurrentUserId()` and `getUserStorageKey(userId, 'habits')` and `getUserStorageKey(userId, 'userSettings')` when building the export payload.
    - Optionally include `achievements`, `habitCompletions`, and `timeTravelOffsetDays` to make the export a full snapshot.
  - **Delete account**
    - Remove `localStorage.clear()`.
    - Rely on `logout()` + `clearUserData(userId)` to remove all user-specific data.
    - Explicitly remove the `'user'` key if needed (if not already done in `logout`).

### 2.4 Redundant Save Pattern in Settings

- **Observed**

  - An effect auto-saves settings on every state change.
  - A `SAVE SETTINGS` button also triggers an explicit save and shows a success message.

- **Issues**

  - UX confusion: Are settings auto-saved or only saved on button click?
  - Implementation complexity: Two code paths for logically the same side effect.

- **Recommended direction**
  - Choose a single clear behavior:
    - **Option A: Auto-save only**
      - Keep the `useEffect` that persists on every change.
      - Remove the `SAVE SETTINGS` button **or** repurpose it as a "Reset to defaults" / "Revert" control.
      - Add helper copy like "Changes are saved automatically" under the section title.
    - **Option B: Explicit save only**
      - Remove the auto-save effect for `settings`.
      - Only persist when `SAVE SETTINGS` is clicked.
      - This pairs well with a "Cancel" or "Reset" action.

### 2.5 Missing Validation & Error Handling

- **Profile**

  - Email updates have no validation (format, emptiness) or confirmation.
  - Username has no constraints (min/max length, allowed characters).

- **Settings**

  - `reminderTime` allows any string that the browser accepts as `type="time"`, but there is no higher-level validation or constraints.
  - No handling of localStorage read/parse errors beyond a silent `catch {}` when loading settings.

- **Recommended improvements**
  - Add client-side validation and error display for:
    - Email format and non-empty requirement.
    - Username length and allowed characters.
  - Wrap localStorage operations in try/catch with at least a **fallback UX**, e.g.:
    - Show an `Alert` if settings cannot be saved (quota exceeded, private mode restrictions).
    - Reset to defaults with a clear explanation if stored settings are corrupted.

---

## 3. UX Improvement Ideas

### 3.1 Profile Page

- **Identity section**

  - Clarify separation between **display identity** (username, avatar, archetype) and **account identity** (email).
  - Make email read-only (short-term) and visually mark it as the account contact.
  - Add an "Edit avatar" affordance (e.g., choose between preset pixel avatars or archetype-linked color schemes).

- **Archetype & progression**

  - Show a short description tooltip for the current archetype and how it affects XP bonuses.
  - Allow viewing (or later changing) archetype via a dedicated flow rather than inline.

- **Stats & history**

  - Extend the stats section with:
    - "Habits created", "Active habits", "Days played".
    - A mini timeline (e.g., last 7 days completions) or sparkline.
  - Link from stats cards to the relevant page (e.g., clicking "BEST STREAK" opens `/habits` filtered view).

- **Achievements**
  - Replace the lone count with a compact **achievements list** or a modal:
    - Show the most recent achievements and their criteria.
    - Indicate upcoming achievements for motivation.

### 3.2 Settings Page

- **Information architecture**

  - Keep the retro card style but refine sections:
    - **Appearance** Theme, future font-size or accessibility toggles.
    - **Notifications & Reminders** In-app notifications, XP toasts, daily reminder time.
    - **Data & Privacy** Export data, (later) import data, explain what is stored locally.
    - **Account & Security** Logout, delete account, (future) change password / email.

- **Notification & reminder UX**

  - Add helper text to explain current limitations:
    - If no real push notifications exist yet, clarify that reminders are currently in-app only.
  - Eventually add a "Test notification" button to confirm configuration.
  - Surface the selected `reminderTime` in the dashboard once reminder logic is implemented.

- **Audio & feedback**

  - Add a "Play sample sound" action next to `Sound Effects` to preview what enabling it does.
  - Wire `soundEffects` into XP/level-up flows so turning it off mutes sound-related feedback.

- **Data & privacy copy**

  - Expand the copy near `EXPORT DATA` to mention what is and is not included.
  - For `DELETE ACCOUNT`, add a short checklist-style warning:
    - All habits, streaks, achievements, and settings will be deleted.
    - This cannot be undone.

- **Mobile & responsiveness**
  - Verify both pages on small screens:
    - Ensure long labels wrap nicely inside cards.
    - Make primary actions visible without scrolling too far.

---

## 4. Technical Implementation Notes

### 4.1 Stabilize Identity & Email Editing

- **Step 1** Decide on policy:
  - If email should be stable for now → make it read-only in the profile UI and add a note.
  - If email must be editable → implement full migration of user-specific keys on change.
- **Step 2** Adjust `ProfilePage`:
  - For read-only email: remove it from `editedUser`, or ignore email changes in `handleSave`.
  - For migration: add a function that, after `updateUser`, renames storage keys from old to new email.

### 4.2 Centralize Settings Access

- Add a `SettingsContext` or extend an existing context:

  - Load `userSettings` via `getUserStorageKey(userId, 'userSettings')` on login.
  - Expose `settings` and `updateSettings` hook.
  - Update `SettingsPage` to use this context instead of its own `useState` + `useEffect` combo.

- In consumers (XP toast, level-up notifications, sound effects):
  - Read `settings.soundEffects` and `settings.notifications` to decide when to play sounds or show banners.

### 4.3 Fix Export & Delete Logic

- **Export**

  - Use `getCurrentUserId()` and `getUserStorageKey` for all user-specific payload data.
  - Include:
    - `user` (from global `'user'`).
    - User-scoped `habits`, `habitCompletions`, `userSettings`, `achievements`, `timeTravelOffsetDays`.

- **Delete account**
  - Remove `localStorage.clear()` from `SettingsPage`.
  - Confirm that `logout()` already:
    - Calls `clearUserData(userId)`.
    - Removes the `'user'` key.

### 4.4 Simplify Save Semantics in Settings

- If choosing auto-save:

  - Remove the explicit `SAVE SETTINGS` write logic.
  - Keep the button purely as a visual affordance that maybe just shows a "Settings are up to date" toast, or repurpose for "Reset".

- If choosing explicit save:
  - Remove the auto-save `useEffect` that persists on every change.
  - Keep changes in component state until save is clicked.

### 4.5 Validation & Error Handling

- Add lightweight validation utilities for profile fields:
  - `isValidEmail`, `isValidUsername`.
- Show inline errors on invalid input and block saving.
- Handle localStorage failures by:
  - Catching exceptions around `setItem`.
  - Showing a non-blocking `Alert` when persistence fails.

---

## 5. Suggested Task Checklist

- **Identity & storage**

  - [ ] Decide on email-edit policy and implement either read-only or migration.
  - [ ] Audit all usages of `getCurrentUserId()` and ensure they align with the chosen identity model.

- **Settings behavior**

  - [ ] Create a dedicated settings context/hook.
  - [ ] Wire `notifications`, `soundEffects`, and `dailyReminder` into real behaviors.
  - [ ] Decide on auto-save vs. explicit save and simplify accordingly.

- **Data lifecycle**

  - [ ] Fix `EXPORT DATA` to use user-specific keys and include all relevant entities.
  - [ ] Refactor `DELETE ACCOUNT` to avoid `localStorage.clear()` and rely on `clearUserData`.

- **UX polish**
  - [ ] Improve profile layout (identity, archetype, stats, achievements).
  - [ ] Improve settings copy and grouping (Appearance, Notifications & Reminders, Data & Privacy, Account & Security).
  - [ ] Add validation and error messages for profile and settings forms.
