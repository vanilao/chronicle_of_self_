# Profile Email & Password Management – Improvement Plan

## 1. Goal & Scope

- **Goal** Allow users to change their **account email** and **password** from the Profile page, while keeping consistency with the current localStorage-based auth model and preparing for a future backend.
- **Scope (current phase)**
  - Frontend-only implementation using existing `AuthContext`, `LoginPage`, and localStorage.
  - Email change and password change flows triggered from `/profile`.
  - Basic security and validation suitable for a local prototype (not production-grade).
- **Out of scope (for now)**
  - Real backend API for auth.
  - Real password hashing and secure storage.
  - Third-party login providers.

---

## 2. Current State (As Implemented)

### 2.1 Auth & storage model

- **AuthContext (`contexts/AuthContext.js`)**

  - Stores a `user` object in `localStorage` under the global key `'user'`.
  - Provides `login(userData)`, `logout()`, `register(userData)`, `updateUser(updates)`.
  - Normalizes level/XP/title and avatar fields.

- **User identity & user-scoped data**

  - `getCurrentUserId()` returns `user.email` from `'user'` in localStorage.
  - `user.email` is used as the **unique user ID** to build keys like `user_<email>_habits`, `user_<email>_userSettings`, etc.
  - `clearUserData(userId)` deletes user-specific keys for habits, completions, achievements, settings, etc.

- **Login flow (`LoginPage.js`)**

  - Reads `localStorage.getItem('user')`.
  - Checks:
    - `userData.email === formData.email`.
    - `userData.password === formData.password` (or allows login if `!userData.password`, for legacy cases).
  - On match, calls `login(userData)` and navigates to `/dashboard`.

- **Register flow (`RegisterPage.js`)**
  - Validates password + confirm password.
  - Ensures no existing user with the same email (by checking `'user'` in localStorage).
  - Uses `emailService` utilities (`sendVerificationEmail`, `generateVerificationCode`, `storeVerificationCode`) to send a verification email and store a pending user.
  - Creates a `newUser` object including:
    - `username`, `email`, `password` (plaintext, for demo only).
    - Level/XP/title.
    - `archetype`, `archetypeCategory` (initially `null`).
    - `emailVerified: false`.
  - Stores `pendingUser` in localStorage and navigates to `/verify-email`.

### 2.2 Profile page (`ProfilePage.js`)

- Shows:
  - Avatar (uploaded image or initial), username, archetype chip.
  - **Email as read-only** with a lock icon and tooltip explaining it's the account identifier.
  - Character stats (level, XP, achievements, streaks, habits, total XP).
- Currently supports editing:
  - **Username** (with validation) only.
  - No direct way to change **email** or **password**.

### 2.3 Security & limitations

- Password is stored in **plaintext** in localStorage as `user.password` (explicitly noted as demo-only).
- Email is used as both **login credential** and **primary key** for user-specific data.
- Email verification exists for registration, but there is no flow for re-verifying when email changes.

---

## 3. Requirements – Change Email

### 3.1 UX requirements

- **Location** Add an "Account & Security" section/card on the Profile page:

  - Shows current email (same as now) with lock icon.
  - Add a **"Change email"** button or link next to it.

- **Change Email dialog**

  - Triggered by clicking "Change email".
  - Contains fields:
    - `Current password` (required).
    - `New email` (required, type `email`).
    - `Confirm new email` (required, must match).
  - Copy:
    - Short explanation: "Your email is used to sign in and link all your habits and progress.".
    - Note that a verification step may be required and that this is a prototype (if needed).
  - Actions:
    - **Save** (primary button).
    - **Cancel** (secondary text button).

- **Feedback**
  - Show inline validation errors under fields (invalid email, mismatch, wrong password).
  - On success, show a success `Alert` at top of the Profile page (similar to existing success messages).

### 3.2 Behavior & validation

- **Validation**

  - Current password is required and must match `user.password` (if `user.password` exists).
  - New email:
    - Must be a valid email format.
    - Must be different from the current email.
  - Confirm email must match new email.

- **Data changes on success**

  - Update the `user` object in memory and in `localStorage`:
    - `user.email = newEmail`.
    - Optionally reset `emailVerified` to `false` and trigger a verification flow.
  - **Migrate user-scoped data** keyed by the old email (see Section 5.1).
  - Ensure that after change:
    - Login using the **new** email works.
    - All habits, settings, achievements, and XP remain visible.

- **Email verification (optional in this phase)**
  - For now (local prototype), we can:
    - Either **skip re-verification** and just update the email.
    - Or reuse the existing verification utilities:
      - Generate a code for the new email.
      - Store a `pendingEmailChange` entry (e.g. `{ oldEmail, newEmail, code }`).
      - Only finalize the email change after the code is confirmed on a `/verify-email-change` screen.
  - The doc should treat verification as a **future enhancement**, but the UX copy can hint at it.

---

## 4. Requirements – Change Password

### 4.1 UX requirements

- **Location**

  - In the same "Account & Security" area on the Profile page.
  - Add a **"Change password"** button.

- **Change Password dialog**

  - Triggered by clicking "Change password".
  - Contains fields:
    - `Current password` (required, type `password`).
    - `New password` (required, type `password`).
    - `Confirm new password` (required, must match new password).
  - Integrate the existing **password strength indicator** logic from `RegisterPage` using `calculatePasswordStrength`.
  - Actions:
    - **Save**.
    - **Cancel`**.

- **Feedback**
  - Inline errors (wrong current password, weak password, mismatch).
  - Success `Alert` when the password is changed.

### 4.2 Behavior & validation

- **Validation rules**

  - Current password must match `user.password` (if present).
  - New password must:
    - Meet the strength requirements from `calculatePasswordStrength` (e.g., length, upper/lowercase, number, special char).
    - Be different from the current password.
  - Confirm password must match the new password.

- **Data changes on success**

  - Update `user.password` in memory and in `localStorage.user`.
  - Keep all other user fields and user-scoped data unchanged.

- **Security notes (for prototype)**
  - Changing password in this phase still means storing it in plaintext in localStorage.
  - The UI should include a small note in the docs or comments indicating this is solely for demo purposes.

---

## 5. Technical Implementation Plan

### 5.1 Introduce user data migration for email change

- **Problem**

  - User-scoped data keys are based on `user.email` via `getUserStorageKey(userId, key)`.
  - Changing email without migrating data would:
    - Make existing habits, completions, settings, achievements invisible.
    - Leave old keys orphaned in localStorage.

- **Solution** Add a helper like `migrateUserData(oldEmail, newEmail)` in `userStorage.js`:

  - For each key in the list used by `clearUserData`:
    - `habits`
    - `habitCompletions`
    - `userSettings`
    - `achievements`
    - `timeTravelOffsetDays`
  - Steps per key:
    - Build old key: `user_${oldEmail}_${key}`.
    - Build new key: `user_${newEmail}_${key}`.
    - Read the value from the old key.
    - If present, write it to the new key.
    - Remove the old key.

- **ChangeEmail flow integration**
  - Inside the change-email handler (Profile page or a helper in AuthContext):
    - Validate inputs.
    - Capture `const oldEmail = user.email`.
    - Update `user.email` in memory.
    - Call `migrateUserData(oldEmail, newEmail)`.
    - Persist the updated user via `updateUser({ email: newEmail })` or a dedicated `changeEmail` function.

### 5.2 Extend AuthContext with dedicated methods

- Add explicit methods for clarity and future backend swap:

  - `changeEmail({ currentPassword, newEmail })`.
  - `changePassword({ currentPassword, newPassword })`.

- These methods should:
  - Perform all validation and state updates.
  - Return success flags and error messages so the Profile page can show appropriate feedback.
  - Encapsulate localStorage interactions instead of duplicating logic in the page component.

### 5.3 Profile page UI and state

- **Add local state for dialogs**

  - `isChangeEmailOpen`, `isChangePasswordOpen`.
  - Form state for each dialog:
    - For email: `currentPassword`, `newEmail`, `confirmNewEmail`.
    - For password: `currentPassword`, `newPassword`, `confirmNewPassword`.

- **Dialogs**

  - Use MUI `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`.
  - Reuse existing typography and button styles to match the retro aesthetic.

- **Calling AuthContext methods**
  - On submit of each dialog, call corresponding `changeEmail`/`changePassword`.
  - Interpret the returned result to display `Alert` messages and close dialogs on success.

### 5.4 Interaction with login & register

- **LoginPage**

  - Continues to read from `localStorage.user` and compare `email` + `password`.
  - After an email or password change, `localStorage.user` will contain the updated values, so no change is required here as long as data is migrated correctly.

- **RegisterPage**
  - No change needed for now.
  - In a later backend-backed version:
    - Both register and profile edit flows should use the same backend endpoints and validation rules.

### 5.5 Future backend integration

When you introduce a real backend, you can keep the Profile UI almost identical and adjust only the implementation layer:

- Move `changeEmail` and `changePassword` into API calls:
  - `POST /account/change-email` (requires current password + new email).
  - `POST /account/change-password` (requires current password + new password).
- Server responsibilities:
  - Verify current password against a **hashed** value.
  - Enforce email uniqueness and email verification.
  - Avoid using email as a primary key; use an internal user ID instead.
  - Issue new auth tokens if necessary.
- Client responsibilities:
  - Call these endpoints.
  - Update the local `user` object with the returned data.
  - Handle error and success messages.

---

## 6. Risks & Considerations

- **Email as user ID**

  - Even with migration, using email as the primary key is fragile.
  - Long-term fix: introduce a stable `userId` field generated at registration and use that for user-specific keys.

- **Plaintext passwords in localStorage**

  - This is acceptable only for a local prototype.
  - Must be clearly documented and removed in any production or shared build.

- **Error handling**
  - LocalStorage may fail (quota, privacy settings); flows should:
    - Catch errors when writing.
    - Show a non-blocking error `Alert` if persistence fails.

---

## 7. Task Checklist

- **Design & UX**

  - [ ] Design "Account & Security" section on Profile page.
  - [ ] Design Change Email and Change Password dialogs (fields, copy, buttons).

- **Core logic**

  - [ ] Implement `migrateUserData(oldEmail, newEmail)` helper in `userStorage.js`.
  - [ ] Add `changeEmail` and `changePassword` methods in `AuthContext`.
  - [ ] Wire Profile page dialogs to these methods.

- **Validation & feedback**

  - [ ] Reuse `calculatePasswordStrength` for new password validation.
  - [ ] Add client-side validation for new email and confirmations.
  - [ ] Add clear success/error alerts for both flows.

- **Future-proofing**
  - [ ] Document how these flows will map to backend APIs later.
  - [ ] Plan migration away from using email as the primary user ID.
