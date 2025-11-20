# Chronicle of Self - Workflow Documentation
## เอกสารการทำงานของระบบ

**ชื่อโครงการ:** Chronicle of Self - Gamified Habit Tracker
**สมาชิกในกลุ่ม:** [ใส่ชื่อสมาชิกที่นี่]

---

## 1. Wireframe Overview / ภาพรวมการทำงานของระบบ

```
┌─────────────────────────────────────────────────────┐
│                    Landing Page (/)                  │
│  - Hero Section                                      │
│  - Features Showcase                                 │
│  - CTA: Login / Register                            │
└──────────────┬──────────────────────┬────────────────┘
               │                      │
       ┌───────▼──────┐      ┌───────▼──────┐
       │  /login      │      │  /register   │
       │              │      │              │
       └──────┬───────┘      └──────┬───────┘
              │                     │
              └──────────┬──────────┘
                         │
              ┌──────────▼───────────┐
              │ /select-archetype    │
              │ (Choose Character)   │
              └──────────┬───────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
    │/dashboard│    │/habits  │    │/progress│
    └─────────┘    └─────────┘    └─────────┘
```

---

## 2. รายละเอียดหน้าแต่ละหน้า / Page Details

### 2.1 Public Pages (สำหรับผู้ใช้ทั่วไป)

#### หน้าที่ 1: Landing Page
**Route:** `/`

**คำอธิบาย:**
หน้าแรกของระบบที่แสดงข้อมูลเกี่ยวกับแอปพลิเคชัน เพื่อดึงดูดผู้ใช้ใหม่และให้ผู้ใช้เข้าสู่ระบบหรือสมัครสมาชิก

**Components:**
1. **Navbar Component**
   - Logo: "CHRONICLE"
   - Navigation Links: "Features", "How It Works", "Pricing"
   - Action Buttons: "Login", "Sign Up"
   - Theme Toggle (Light/Dark Mode)

2. **Hero Section**
   - Heading: "LEVEL UP YOUR LIFE"
   - Subheading: คำอธิบายแอปพลิเคชัน
   - CTA Buttons: "Start Your Journey" (→ /register), "Learn More"
   - Hero Image: เกม pixel art style

3. **Features Section** (แสดงเป็น Grid Cards)
   - Card 1: "Gamified Habits" - แสดง icon และคำอธิบาย
   - Card 2: "XP & Leveling" - แสดง icon และคำอธิบาย
   - Card 3: "Track Progress" - แสดง icon และคำอธิบาย
   - Card 4: "Build Streaks" - แสดง icon และคำอธิบาง

4. **How It Works Section**
   - Step 1: Create Account → Choose Archetype
   - Step 2: Add Habits → Earn XP
   - Step 3: Level Up → Track Progress

5. **Footer Component**
   - Copyright text
   - Links: Privacy, Terms, Contact

---

#### หน้าที่ 2: Login Page
**Route:** `/login`

**คำอธิบาย:**
หน้าสำหรับผู้ใช้ที่มีบัญชีอยู่แล้วเข้าสู่ระบบ

**Components:**
1. **Login Form Card**
   - Form Fields:
     - Email Input (with Mail icon)
     - Password Input (with Lock icon)
   - "Forgot password?" Link
   - Submit Button: "SIGN IN" (with Zap icon)

2. **Divider** ("OR" text)

3. **Sign Up Link**
   - Text: "New adventurer?"
   - Link: "Create an account" → /register

4. **Back to Home Link**
   - "← Back to home" → /

**การทำงาน:**
- รับ email และ password
- ตรวจสอบข้อมูล (ปัจจุบันใช้ mock data)
- สร้าง mock user พร้อม level, XP, archetype
- นำทางไปยัง /dashboard

---

#### หน้าที่ 3: Register Page
**Route:** `/register`

**คำอธิบาย:**
หน้าสำหรับผู้ใช้ใหม่สมัครสมาชิก

**Components:**
1. **Registration Form Card**
   - Form Fields:
     - Username Input (with User icon)
     - Email Input (with Mail icon)
     - Password Input (with Lock icon)
     - Confirm Password Input (with Lock icon)
   - Submit Button: "CREATE ACCOUNT"

2. **Divider** ("OR" text)

3. **Login Link**
   - Text: "Already have an account?"
   - Link: "Sign in" → /login

4. **Back to Home Link**
   - "← Back to home" → /

**การทำงาน:**
- รับข้อมูล username, email, password
- ตรวจสอบความถูกต้อง (password matching)
- นำทางไปยัง /select-archetype เพื่อเลือก character type

---

#### หน้าที่ 4: Archetype Selection Page
**Route:** `/select-archetype`

**คำอธิบาย:**
หน้าสำหรับผู้ใช้ใหม่เลือก Archetype (ประเภทตัวละคร) ซึ่งจะมีผลต่อ bonus XP ที่ได้รับจาก habit แต่ละประเภท

**Components:**
1. **Header Section**
   - Title: "CHOOSE YOUR PATH"
   - Description: คำอธิบายเกี่ยวกับ archetype และผลของการเลือก

2. **Archetype Cards Grid** (4 cards)

   **Card 1: WARRIOR (Body Category)**
   - Icon: Sword
   - Title: "WARRIOR"
   - Category: "Body"
   - Description: "Master physical challenges and build strength"
   - Bonus: "+25% XP for Body habits"
   - Button: "SELECT WARRIOR"

   **Card 2: SCHOLAR (Mind Category)**
   - Icon: BookOpen
   - Title: "SCHOLAR"
   - Category: "Mind"
   - Description: "Excel in learning and mental growth"
   - Bonus: "+25% XP for Mind habits"
   - Button: "SELECT SCHOLAR"

   **Card 3: MYSTIC (Spirit Category)**
   - Icon: Heart
   - Title: "MYSTIC"
   - Category: "Spirit"
   - Description: "Find balance and inner peace"
   - Bonus: "+25% XP for Spirit habits"
   - Button: "SELECT MYSTIC"

   **Card 4: ARTIST (Creative Category)**
   - Icon: Palette
   - Title: "ARTIST"
   - Category: "Creative"
   - Description: "Unleash creativity and expression"
   - Bonus: "+25% XP for Creative habits"
   - Button: "SELECT ARTIST"

**การทำงาน:**
- แสดง archetype ทั้ง 4 แบบ
- ผู้ใช้เลือก 1 archetype
- บันทึกข้อมูล archetype เข้า user profile
- นำทางไปยัง /dashboard

---

### 2.2 Protected Pages (สำหรับผู้ใช้ที่ Login แล้ว)

#### หน้าที่ 5: Dashboard Page
**Route:** `/dashboard`

**คำอธิบาย:**
หน้าแรกหลังจาก login สำหรับแสดงภาพรวมของผู้ใช้ รวมถึง level, XP, habits วันนี้ และ quick actions

**Components:**
1. **UserNavbar Component**
   - Logo + "CHRONICLE"
   - Navigation Links: "Dashboard", "Habits", "Progress"
   - Time Travel Controls (สำหรับ testing):
     - Current Date Display
     - Buttons: "-1D", "Today", "+1D"
   - User Dropdown:
     - Avatar icon
     - Username + Level display
     - XP Progress Bar
     - Dropdown Menu:
       - User Stats (Level, XP, Title)
       - "Profile" link
       - "Settings" link
       - "Theme Toggle" (Light/Dark)
       - "Log Out" button

2. **Welcome Hero Section**
   - Greeting: "WELCOME BACK, [Username]!"
   - Character Icon (based on archetype)
   - Quick Stats Display:
     - Current Level (large)
     - Title name
     - Archetype badge

3. **XP Progress Card**
   - Current XP / Next Level XP
   - Visual Progress Bar
   - Percentage display
   - XP needed to level up

4. **Today's Habits Section**
   - Title: "TODAY'S QUESTS"
   - Habit Cards (compact view):
     - Habit name + icon
     - Category color coding
     - Checkbox to complete
     - XP reward display
   - "View All Habits" button → /habits

5. **Quick Stats Grid** (3 cards)
   - Card 1: "Current Streak"
     - Icon: Flame
     - Number of days
   - Card 2: "Habits Completed"
     - Icon: Target
     - X/Y format
   - Card 3: "XP This Week"
     - Icon: Zap
     - Total XP number

6. **Recent Achievements Section**
   - Title: "RECENT ACHIEVEMENTS"
   - Achievement badges (unlocked achievements)
   - "View All Progress" button → /progress

**การทำงาน:**
- แสดงข้อมูล user จาก AuthContext
- แสดง habits วันนี้จาก HabitsContext
- คำนวณ stats แบบ real-time
- อนุญาตให้ complete habits ได้โดยตรง
- แสดง level-up notification เมื่อ level up

---

#### หน้าที่ 6: Habits Page
**Route:** `/habits`

**คำอธิบาย:**
หน้าหลักสำหรับจัดการ habits ทั้งหมด สร้าง habit ใหม่ แก้ไข ลบ และติ๊กถูกเพื่อ complete habits แต่ละวัน

**Components:**
1. **Header Section**
   - Title: "MY HABITS"
   - Description: "Track your daily quests and build your legacy"
   - "NEW HABIT" button → เปิด CreateHabitModal

2. **Today's Stats Grid** (3 cards)
   - Card 1: "TODAY'S PROGRESS"
     - Icon: Target
     - Format: X/Y habits completed
   - Card 2: "XP EARNED"
     - Icon: Zap
     - Today's XP total
   - Card 3: "COMPLETION RATE"
     - Icon: Trophy
     - Percentage

3. **Category Filter Buttons**
   - Buttons: "All", "Body", "Mind", "Spirit", "Creative"
   - Active state highlighting
   - Filter habits by category

4. **Habits List** (แสดงเป็น cards)

   **Each Habit Card Contains:**
   - Header:
     - Category Icon (Sword/BookOpen/Heart/Palette) with color coding
     - Habit Name
     - Category badge
     - Edit button (Edit3 icon)
     - Delete button (Trash2 icon)

   - Stats Row:
     - Flame icon + Streak count ("X day streak")
     - Difficulty badge ("Easy"/"Medium"/"Hard")
     - XP reward ("+X XP")

   - 7-Day Weekly View (horizontal):
     - Last 7 days displayed
     - Each day shows:
       - Day name (Mon, Tue, Wed, etc.)
       - Date number
       - Completion status (✓ or empty)
     - Only TODAY is clickable/checkable
     - Past days are read-only

   - Completion Badge (if completed today):
     - "✓ DONE TODAY" badge

5. **Empty State** (ถ้าไม่มี habits)
   - Trophy icon
   - Title: "NO HABITS YET"
   - Description + CTA
   - "CREATE YOUR FIRST HABIT" button
   - Tips Cards (3 cards with advice)

6. **CreateHabitModal Component** (Modal popup)

   **Modal Content:**
   - Title: "CREATE NEW HABIT" or "EDIT HABIT"

   - Form Fields:

     **1. Habit Name Input**
     - Label: "HABIT NAME"
     - Placeholder: "e.g., Morning Workout, Read 30 minutes..."

     **2. Category Selection** (4 buttons)
     - Body (Sword icon) - Green
     - Mind (BookOpen icon) - Blue
     - Spirit (Heart icon) - Purple
     - Creative (Palette icon) - Yellow

     **3. Difficulty Selection** (3 buttons)
     - Easy: +10 XP
     - Medium: +25 XP
     - Hard: +50 XP

     **4. Frequency Selection**
     - Daily / Weekly (toggle)

   - XP Preview Card:
     - Shows base XP from difficulty
     - Shows archetype bonus (+25% if category matches)
     - Shows final XP reward
     - Example: "Base: 25 XP + Bonus: +6 XP = Total: 31 XP"

   - Action Buttons:
     - "CANCEL" button
     - "CREATE HABIT" or "SAVE CHANGES" button

**การทำงาน:**
1. แสดง habits ทั้งหมดจาก HabitsContext
2. Filter habits ตาม category
3. คำนวณ today's stats
4. Toggle habit completion:
   - เฉพาะวันนี้เท่านั้นที่คลิกได้
   - เมื่อคลิก → เรียก toggleHabitCompletion()
   - Award/remove XP automatically
   - แสดง XPToast notification
   - อัพเดท user XP และ level (ถ้า level up → แสดง LevelUpNotification)
5. Create/Edit/Delete habits ผ่าน modal

---

#### หน้าที่ 7: Progress Page
**Route:** `/progress`

**คำอธิบาย:**
หน้าสำหรับแสดงความก้าวหน้าของผู้ใช้ รวมถึง level, XP, streaks, completion rate, heatmap และ achievements

**Components:**

1. **Header Section**
   - Title: "MY PROGRESS"
   - Description: "Track your journey and celebrate your achievements"

2. **Level Overview Card** (gradient background)

   **Left Side:**
   - Trophy icon (large)
   - Level number (huge, pixel font)
   - Level tier (Beginner/Intermediate/Advanced/etc.)
   - User title ("Novice Adventurer", etc.)
   - Archetype info (WARRIOR • Body)

   **Right Side:**
   - "XP PROGRESS" label
   - Current XP / Next Level XP
   - Large progress bar
   - Percentage to next level

3. **Key Stats Grid** (4 cards)

   **Card 1: TOTAL XP**
   - Icon: Zap
   - Large number display

   **Card 2: LONGEST STREAK**
   - Icon: Flame
   - Days count
   - "days in a row" subtitle

   **Card 3: COMPLETIONS**
   - Icon: Target
   - Total completions count
   - "all time" subtitle

   **Card 4: AVG. RATE**
   - Icon: TrendingUp
   - Percentage
   - "last 30 days" subtitle

4. **Last 7 Days Chart Section**
   - Title: "LAST 7 DAYS"
   - Icon: Calendar

   **7 Day Cards (horizontal layout):**
   - Each day shows:
     - Day name (Mon, Tue, etc.)
     - Completion count (X/Y habits)
     - XP earned that day

5. **30-Day Heatmap Section**
   - Title: "30-DAY HEATMAP"
   - Icon: Calendar

   **HeatmapCalendar Component:**
   - Grid layout (weeks × days)
   - Day labels: S M T W T F S
   - Week numbers (1, 2, 3, 4...)
   - Each cell:
     - Color intensity based on completion rate:
       - Gray: 0% (no habits)
       - Light: 1-24%
       - Medium: 25-49%
       - Medium-Dark: 50-74%
       - Dark: 75-99%
       - Darkest: 100%
     - Hover tooltip showing:
       - Date (Month Day)
       - X/Y habits completed
       - Completion percentage
   - Legend: "Less" → "More"

6. **Habit Categories Section**
   - Title: "HABIT CATEGORIES"
   - Icon: Star

   **4 Category Cards:**
   - Card per category: Body, Mind, Spirit, Creative
   - Each shows:
     - Category name
     - Number of habits
     - Percentage of total
     - "+25% XP" badge (if matches user archetype)

7. **Achievements Section**
   - Title: "ACHIEVEMENTS"
   - Icon: Award

   **Achievement Cards Grid** (12 achievements):

   **Achievement 1: FIRST STEPS**
   - Requirement: Create your first habit
   - Icon: Star
   - State: Unlocked if totalHabits >= 1

   **Achievement 2: RISING HERO**
   - Requirement: Reach level 5
   - Icon: Trophy
   - Progress: Level X / 5

   **Achievement 3: VETERAN**
   - Requirement: Reach level 10
   - Icon: Trophy
   - Progress: Level X / 10

   **Achievement 4: WEEK WARRIOR**
   - Requirement: 7-day streak
   - Icon: Flame
   - Progress: X / 7 days

   **Achievement 5: MONTH MASTER**
   - Requirement: 30-day streak
   - Icon: Flame
   - Progress: X / 30 days

   **Achievement 6: CENTURION**
   - Requirement: 100-day streak
   - Icon: Flame
   - Progress: X / 100 days

   **Achievement 7: GETTING STARTED**
   - Requirement: 10 completions
   - Icon: Target
   - Progress: X / 10

   **Achievement 8: DEDICATED**
   - Requirement: 50 completions
   - Icon: Target
   - Progress: X / 50

   **Achievement 9: COMMITTED**
   - Requirement: 100 completions
   - Icon: Target
   - Progress: X / 100

   **Achievement 10: PERFECTIONIST**
   - Requirement: 100% avg completion rate (30 days)
   - Icon: Star
   - Progress: X% / 100%

   **Achievement 11: WELL ROUNDED**
   - Requirement: At least 1 habit in each category
   - Icon: Star
   - Progress: X / 4 categories

   **Achievement 12: HABIT COLLECTOR**
   - Requirement: Create 10 habits
   - Icon: Star
   - Progress: X / 10 habits

   **Achievement Card States:**
   - **Unlocked:** Colored background (light-secondary/dark-secondary), colored icon
   - **Locked:** White/dark background with 50% opacity, gray icon, progress indicator

**การทำงาน:**
1. คำนวณ comprehensive stats จาก user และ habits data
2. สร้าง last 7 days และ last 30 days data
3. แสดง heatmap ด้วย color intensity
4. ตรวจสอบ achievements และแสดง progress
5. Real-time updates เมื่อข้อมูล habits เปลี่ยน

---

## 3. Global Components / คอมโพเนนต์ที่ใช้ร่วมกัน

### 3.1 LevelUpNotification Component
**ตำแหน่ง:** Top-right corner (fixed)

**แสดงเมื่อ:** User level up

**เนื้อหา:**
- Trophy icon (animated pulse)
- "LEVEL UP!" title (pixel font)
- "+X Levels!" (ถ้า level up มากกว่า 1 level)
- New level number (large display)
- New title name
- "Amazing Progress!" message
- Dismiss button (X)

**Animation:** Bounce effect, auto-dismiss หลัง 5 วินาที

---

### 3.2 XPToast Component
**ตำแหน่ง:** Bottom-right corner (fixed)

**แสดงเมื่อ:** User complete หรือ uncomplete habit

**เนื้อหา:**
- Trending icon (Up for gain, Down for loss)
- XP amount: "+X XP" or "-X XP"
- Habit name
- XP progress bar (current/next level)
- Dismiss button (X)

**สี:**
- Positive XP: Light secondary/dark secondary background
- Negative XP: Red background

**Animation:** Slide up, auto-dismiss หลัง 3 วินาที

---

### 3.3 Footer Component
**ตำแหน่ง:** Bottom of page

**เนื้อหา:**
- Copyright text: "© 2024 Chronicle of Self. All rights reserved."
- Built with pixel font

---

## 4. Workflow การทำงานหลัก / Main User Flows

### 4.1 Workflow: สมัครสมาชิกและเริ่มต้นใช้งาน

```
1. เข้า Landing Page (/)
   ↓
2. คลิก "Start Your Journey" หรือ "Sign Up"
   ↓
3. กรอกข้อมูล Register Form (/register)
   - Username
   - Email
   - Password
   - Confirm Password
   ↓
4. คลิก "CREATE ACCOUNT"
   ↓
5. ไปยังหน้า Archetype Selection (/select-archetype)
   ↓
6. เลือก Archetype (WARRIOR/SCHOLAR/MYSTIC/ARTIST)
   ↓
7. บันทึกข้อมูล user พร้อม archetype
   ↓
8. Redirect ไปยัง Dashboard (/dashboard)
   ↓
9. ผู้ใช้เห็น welcome message และ empty state
   ↓
10. พร้อมเริ่มสร้าง habit แรก
```

---

### 4.2 Workflow: สร้าง Habit ใหม่

```
1. อยู่ที่ Habits Page (/habits) หรือ Dashboard
   ↓
2. คลิกปุ่ม "NEW HABIT" หรือ "CREATE YOUR FIRST HABIT"
   ↓
3. CreateHabitModal เปิดขึ้น
   ↓
4. กรอกข้อมูล Habit:
   ├─ Habit Name (required)
   ├─ เลือก Category (Body/Mind/Spirit/Creative)
   ├─ เลือก Difficulty (Easy/Medium/Hard)
   └─ เลือก Frequency (Daily/Weekly)
   ↓
5. ระบบคำนวณ XP reward:
   - Base XP ตาม difficulty
   - ถ้า category ตรงกับ archetype → +25% bonus
   - แสดง XP Preview
   ↓
6. คลิก "CREATE HABIT"
   ↓
7. บันทึกข้อมูลลง HabitsContext และ localStorage
   ↓
8. Modal ปิด, Habit Card ใหม่ปรากฏในรายการ
   ↓
9. พร้อมให้ complete ได้ทันที
```

---

### 4.3 Workflow: Complete Habit และรับ XP

```
1. อยู่ที่ Habits Page หรือ Dashboard
   ↓
2. เห็น Habit Card ของวันนี้
   ↓
3. คลิก checkbox ของ TODAY
   ↓
4. toggleHabitCompletion() ถูกเรียก
   ↓
5. ระบบทำงาน:
   ├─ บันทึก completion ลง habit.completionHistory[today] = true
   ├─ คำนวณ XP reward (base + archetype bonus)
   ├─ เรียก awardXP() จาก AuthContext
   │  ↓
   │  ├─ เพิ่ม XP ให้ user
   │  ├─ ตรวจสอบว่า level up หรือไม่
   │  │  ├─ ถ้า level up:
   │  │  │  ├─ เพิ่ม level
   │  │  │  ├─ ลด XP ที่เกิน
   │  │  │  ├─ อัพเดท title
   │  │  │  └─ แสดง LevelUpNotification
   │  │  └─ ถ้าไม่ level up: เพิ่ม XP ปกติ
   │  └─ บันทึกลง localStorage
   └─ แสดง XPToast (+X XP, habit name)
   ↓
6. UI อัพเดท:
   ├─ Habit Card แสดง ✓ DONE TODAY badge
   ├─ XP progress bar อัพเดท
   ├─ Stats อัพเดท (completion count, XP earned)
   └─ Streak อาจเพิ่มขึ้น
   ↓
7. ผู้ใช้เห็น visual feedback ทันที
```

---

### 4.4 Workflow: Uncomplete Habit (ยกเลิก)

```
1. อยู่ที่ Habits Page
   ↓
2. เห็น Habit ที่ complete แล้ว (มี ✓)
   ↓
3. คลิก checkbox อีกครั้งเพื่อยกเลิก
   ↓
4. toggleHabitCompletion() ถูกเรียก
   ↓
5. ระบบทำงาน:
   ├─ เปลี่ยน habit.completionHistory[today] = false
   ├─ คำนวณ XP ที่ต้องหัก (-XP reward)
   ├─ เรียก awardXP() ด้วย negative XP
   │  ↓
   │  ├─ ลด XP จาก user
   │  ├─ ถ้า XP ติดลบ:
   │  │  ├─ Level down (ลด level)
   │  │  ├─ เพิ่ม XP จาก level ก่อนหน้า
   │  │  └─ ป้องกันไม่ให้ XP ติดลบที่ level 1
   │  └─ บันทึกลง localStorage
   └─ แสดง XPToast (-X XP, habit name) สีแดง
   ↓
6. UI อัพเดท:
   ├─ เอา ✓ badge ออก
   ├─ XP progress bar ลดลง
   └─ Stats อัพเดท
```

---

### 4.5 Workflow: ดูความก้าวหน้าใน Progress Page

```
1. คลิก "Progress" ใน navbar
   ↓
2. ไปยัง Progress Page (/progress)
   ↓
3. ระบบคำนวณ stats:
   ├─ รวม XP ทั้งหมด
   ├─ หา longest streak จาก habits ทั้งหมด
   ├─ นับ total completions
   ├─ คำนวณ avg completion rate (30 วัน)
   ├─ สร้างข้อมูล last 7 days
   ├─ สร้างข้อมูล last 30 days สำหรับ heatmap
   └─ ตรวจสอบ achievements ทั้งหมด
   ↓
4. แสดงผล:
   ├─ Level Overview (level, title, XP progress)
   ├─ Key Stats (Total XP, Longest Streak, Completions, Avg Rate)
   ├─ Last 7 Days Chart (daily completion และ XP)
   ├─ 30-Day Heatmap (color-coded calendar)
   ├─ Category Breakdown (จำนวน habits แต่ละ category)
   └─ Achievements Grid (12 achievements พร้อม progress)
   ↓
5. ผู้ใช้สามารถ:
   ├─ ดู heatmap hover tooltip
   ├─ เห็น achievements ที่ unlock แล้ว
   ├─ เห็น progress ของ achievements ที่ยัง lock
   └─ track ความก้าวหน้าตลอดเวลา
```

---

## 5. Data Structure / โครงสร้างข้อมูล

### 5.1 User Object
```javascript
{
  username: "HeroPlayer",
  email: "hero@example.com",
  level: 1,
  currentXP: 75,
  nextLevelXP: 100,
  title: "Novice Adventurer",
  archetype: "WARRIOR",
  archetypeCategory: "Body"
}
```

### 5.2 Habit Object
```javascript
{
  id: "unique-id",
  name: "Morning Workout",
  category: "Body",        // Body/Mind/Spirit/Creative
  difficulty: "Medium",    // Easy/Medium/Hard
  frequency: "Daily",      // Daily/Weekly
  xpReward: 31,           // Base XP + bonus
  createdAt: "2024-01-01T00:00:00.000Z",
  completionHistory: {
    "2024-01-01": true,
    "2024-01-02": false,
    "2024-01-03": true
  },
  currentStreak: 5
}
```

### 5.3 XP Rewards by Difficulty
- **Easy:** 10 XP base
- **Medium:** 25 XP base
- **Hard:** 50 XP base

**Archetype Bonus:** +25% ถ้า category ตรงกับ archetype category

### 5.4 Leveling Formula
- Level 1→2: 100 XP
- Level 2→3: 150 XP
- Level 3→4: 225 XP
- **Formula:** `100 * (1.5 ^ (level - 1))`

---

## 6. Technologies Used / เทคโนโลยีที่ใช้

### Frontend
- **React 18** - UI Framework
- **React Router DOM v6** - Navigation/Routing
- **Tailwind CSS** - Styling (custom retro theme)
- **Context API** - State Management
  - AuthContext (user authentication, XP, leveling)
  - HabitsContext (habits CRUD, completion, streaks)
  - ThemeContext (light/dark mode)
  - TimeTravelContext (date manipulation for testing)
- **Lucide React** - Icons
- **localStorage** - Data Persistence

### Design System
- **Style:** Flat retro, pixel art aesthetic
- **Fonts:** VT323 (pixel), Press Start 2P, IBM Plex Mono
- **Colors:** Custom palette per category
- **Borders:** 3px solid borders
- **Shadows:** 4px flat shadows (shadow-retro)

---

## 7. Key Features Summary / สรุปฟีเจอร์หลัก

### 1. **Gamification System**
   - Level progression (1-100)
   - XP earning from habits
   - Titles based on level
   - Visual progress tracking

### 2. **Archetype System**
   - 4 archetypes: WARRIOR, SCHOLAR, MYSTIC, ARTIST
   - Category-based XP bonuses (+25%)
   - Encourages focused habit building

### 3. **Habit Management**
   - Create/Edit/Delete habits
   - 4 categories: Body, Mind, Spirit, Creative
   - 3 difficulty levels affecting XP
   - Daily/Weekly frequency

### 4. **Progress Tracking**
   - 7-day horizontal view per habit
   - 30-day heatmap calendar
   - Streak tracking
   - Completion rate analytics

### 5. **Achievement System**
   - 12 different achievements
   - Progress indicators
   - Visual unlocking feedback

### 6. **Visual Feedback**
   - Level-up notifications
   - XP toast messages
   - Real-time XP progress bars
   - Color-coded categories

### 7. **Theme Support**
   - Light mode
   - Dark mode
   - Persistent preference

---

## 8. Future Enhancements / การพัฒนาในอนาคต

1. **Backend Integration**
   - Replace localStorage with real API
   - User authentication with JWT
   - Database storage (PostgreSQL/MongoDB)

2. **Social Features**
   - Friends system
   - Leaderboards
   - Share achievements

3. **Advanced Analytics**
   - Weekly/Monthly reports
   - Habit recommendations
   - Insights and trends

4. **Notifications**
   - Daily reminders
   - Streak warnings
   - Achievement alerts

5. **Customization**
   - Custom habit icons
   - Custom color themes
   - Avatar customization

---

**เอกสารจัดทำโดย:** [ชื่อสมาชิกในกลุ่ม]
**วันที่:** [วันที่จัดทำ]
**Version:** 1.0
