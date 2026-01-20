import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useHabits } from '../../contexts/HabitsContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTimeTravel } from '../../contexts/TimeTravelContext';
import { useSoundContext } from '../../contexts/SoundContext';
import SoundManager from '../../utils/soundManager';
import HabitCard from '../../components/habits/HabitCard';
import CreateHabitModal from '../../components/habits/CreateHabitModal';
import HabitFilters from '../../components/habits/HabitFilters';
import WelcomeHeader from '../../components/dashboard/WelcomeHeader';
import StatsGrid from '../../components/dashboard/StatsGrid';
import EmptyState from '../../components/dashboard/EmptyState';
import RecentAchievements from '../../components/dashboard/RecentAchievements';
import { getRecentAchievements } from '../../utils/achievements';
import { calculateXPReward, getTotalXPForLevel } from '../../utils/levelingSystem';

const DashboardPage = () => {
  const { habits, isLoading, getHabitStreak } = useHabits();
  const { user } = useAuth();
  const { currentDate, currentDateString } = useTimeTravel();
  const { playSound } = useSoundContext();
  const soundManager = new SoundManager(playSound);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const handleOpenModal = () => {
    soundManager.playMenuOpen();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    soundManager.playMenuClose();
    setIsModalOpen(false);
    setHabitToEdit(null);
  };

  const handleSilentClose = () => {
    // Close modal without sound for successful submission
    setIsModalOpen(false);
    setHabitToEdit(null);
  };

  const todayIso = currentDateString;


  // Calculate stats for achievements
  const achievementStats = useMemo(() => {
    let totalCompletions = 0;
    let longestStreak = 0;
    let hadPerfectDay = false;
    const categoryBreakdown = { Body: 0, Mind: 0, Spirit: 0, Creative: 0 };

    habits.forEach(habit => {
      if (habit.completionHistory) {
        const completions = Object.values(habit.completionHistory).filter(Boolean).length;
        totalCompletions += completions;
      }

      const streak = getHabitStreak(habit.id);
      if (streak > longestStreak) {
        longestStreak = streak;
      }

      if (habit.category in categoryBreakdown) {
        categoryBreakdown[habit.category]++;
      }
    });

    // Check for perfect days
    if (habits.length > 0) {
      const dates = new Set();
      habits.forEach(h => {
        if (h.completionHistory) {
          Object.keys(h.completionHistory).forEach(d => {
            if (h.completionHistory[d]) dates.add(d);
          });
        }
      });

      dates.forEach(date => {
        const completedOnDate = habits.filter(h => h.completionHistory?.[date]).length;
        if (completedOnDate === habits.length) {
          hadPerfectDay = true;
        }
      });
    }

    return {
      totalHabits: habits.length,
      totalCompletions,
      longestStreak,
      hadPerfectDay,
      categoryBreakdown,
      level: user?.level || 1,
      totalXP: getTotalXPForLevel(user?.level || 1) + (user?.currentXP || 0)
    };
  }, [habits, getHabitStreak, user]);

  // Get recent achievements
  const recentAchievements = useMemo(() => {
    return getRecentAchievements(achievementStats, 3);
  }, [achievementStats]);

  const categories = ['All', 'Body', 'Mind', 'Spirit', 'Creative'];

  const todaysHabits = habits
    .filter(habit => filterCategory === 'All' ? true : habit.category === filterCategory)
    .filter(habit => {
      const frequencyType = habit.frequencyType || 'Daily';
      if (frequencyType !== 'Specific Days') {
        return true;
      }

      const selectedDays = habit.selectedDays || [];
      const weekdayKeys = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const todayKey = weekdayKeys[new Date(currentDate).getDay()];
      return selectedDays.includes(todayKey);
    });

  const getHabitXPReward = (habit) => {
    const baseXP = habit.baseXp ?? habit.xpReward ?? 0;
    const { finalXP } = calculateXPReward(baseXP, habit.category, user?.archetypeCategory);
    return finalXP;
  };

  const getTodayStats = () => {
    const completedToday = habits.filter(h => h.completionHistory?.[todayIso]).length;
    const totalHabits = habits.length;
    const xpEarnedToday = habits
      .filter(h => h.completionHistory?.[todayIso])
      .reduce((sum, h) => sum + getHabitXPReward(h), 0);

    return { completedToday, totalHabits, xpEarnedToday };
  };

  const stats = getTodayStats();

  if (isLoading) {
    return (
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <WelcomeHeader />

        {/* Stats Grid */}
        <StatsGrid stats={stats} />

        {/* Filters */}
        <HabitFilters
          categories={categories}
          selectedCategory={filterCategory}
          onCategoryChange={setFilterCategory}
        />

        {/* Today's Habits Section */}
        <Box className="space-y-6">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'VT323, monospace',
                fontSize: '1.875rem',
                color: 'text.primary'
              }}
            >
              DAILY QUESTS
            </Typography>
            <Button
              onClick={handleOpenModal}
              variant="contained"
              color="secondary"
              startIcon={<Add />}
            >
              NEW HABIT
            </Button>
          </Box>

          {/* Today's Habits */}
          {todaysHabits.length === 0 ? (
            <EmptyState onCreateHabit={handleOpenModal} />
          ) : (
            <Box className="space-y-4">
              {todaysHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onEdit={(selectedHabit) => {
                    soundManager.playButtonClick();
                    setHabitToEdit(selectedHabit);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Recent Achievements */}
        <RecentAchievements achievements={recentAchievements} />
      </Box>
      <CreateHabitModal
        isOpen={isModalOpen}
        habitToEdit={habitToEdit}
        onClose={handleCloseModal}
        onSilentClose={handleSilentClose}
      />
    </Box>
  );
};

export default DashboardPage;
