# Chronicle of Self

A retro-inspired gamified habit tracker that helps you level up your life through daily habits, XP rewards, and achievement unlocks.

## 🎮 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/chronicle-of-self.git
cd chronicle-of-self

# Install dependencies
cd frontend
npm install

# Start the development server
npm start
```

Open http://localhost:3000 to view the application.

## ✨ Features

### Core Functionality

- **Habit Management**: Create, edit, and delete daily habits with categories (Body, Mind, Spirit, Creative)
- **XP & Leveling System**: Earn XP for completed habits and level up with retro titles
- **Streak Tracking**: Monitor current and longest streaks for motivation
- **Archetype Selection**: Choose your class (Warrior, Sage, Monk, Artisan) for XP bonuses
- **Progress Visualization**: Calendar heatmap, completion charts, and achievement tracking

### User Experience

- **Retro Flat Design**: Bold borders, flat shadows, and pixel fonts for a nostalgic feel
- **Light/Dark Theme**: Toggle between themes with persistent preference
- **Responsive Layout**: Works seamlessly on mobile, tablet, and desktop
- **Offline First**: All data stored locally in your browser (localStorage)

### Pages

- **Landing**: Marketing page with feature overview
- **Dashboard**: Today's habits, XP progress, and recent achievements
- **Habits**: Manage all habits with category filters
- **Progress**: Visual analytics and achievement showcase
- **Profile**: User stats, settings, and preferences

## 🛠 Tech Stack

- **Frontend**: React 18 + Create React App
- **UI Framework**: Material UI (MUI) with custom retro styling
- **State Management**: React Context API
- **Routing**: React Router DOM v6
- **Storage**: localStorage (MVP), planned PostgreSQL backend
- **Fonts**: VT323 (headers), IBM Plex Mono (body)
- **Icons**: Material UI Icons

## 🎨 Design System

### Color Palette

- **Light Mode**: Beige/cream background with sky blue accents
- **Dark Mode**: Navy background with cyan/pink accents
- **Bold Borders**: 3px black borders for retro aesthetic
- **Flat Shadows**: 4px 4px 0px black offset shadows

### Typography

- **Headers**: VT323 (pixel font)
- **Body**: IBM Plex Mono (monospace)
- **Special**: Press Start 2P (rare accent elements)

## 📁 Project Structure

```
chronicle-of-self/
├── frontend/                 # React application
│   ├── public/              # Static assets (images, manifest)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React Context providers
│   │   ├── pages/           # Page components
│   │   └── App.js           # Main app component
│   └── package.json
├── docs/                    # Documentation
│   ├── overview/           # Project vision and PRD
│   ├── styles/             # Design system and style guide
│   ├── planning/           # Roadmap and TODOs
│   ├── status/             # Current progress tracking
│   └── archive/            # Outdated documents
└── README.md
```

## 🚀 Current Status

**Version**: v0.1 (MVP Complete)  
**Last Updated**: November 20, 2025  
**Status**: ✅ Fully functional frontend MVP

### Completed Features

- ✅ User authentication (email/password)
- ✅ Archetype selection with XP bonuses
- ✅ Habit CRUD operations
- ✅ Daily completion tracking
- ✅ XP and leveling system
- ✅ Streak calculation
- ✅ Progress visualizations
- ✅ Achievement system
- ✅ Theme switching
- ✅ Responsive design

### Next Milestones

- 🔄 Code cleanup and lint fixes
- 🔄 Performance optimization
- 🔄 Accessibility improvements
- 📋 Backend migration (Phase 2)
- 📋 Enhanced profile settings
- 📋 Sound effects implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing retro design system
- Use Material UI components with custom styling
- Maintain responsive design principles
- Test in both light and dark themes
- Keep accessibility in mind (WCAG AA compliance)

## 📚 Documentation

- **[Product Requirements](docs/overview/project_prd.md)** - Detailed feature specifications
- **[Style Guide](docs/styles/style-guide.md)** - Design tokens and color palettes
- **[TODO List](docs/planning/TODOLIST.md)** - Current development roadmap
- **[Project Status](docs/status/PROJECT_STATUS.md)** - Progress tracking

## 🐛 Known Issues

- Lint warnings for unused imports (in progress)
- No backend persistence (using localStorage)
- No email verification for password reset
- Limited to single device per user

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔮 Future Roadmap

- **Phase 2**: Enhanced features (profile settings, habit analytics)
- **Phase 3**: Gamification expansion (items, shop, quests)
- **Phase 4**: Social features (guilds, leaderboards)
- **Phase 5**: Platform migration (backend, mobile app)

---

Made with ❤️ for habit enthusiasts and retro gaming fans
