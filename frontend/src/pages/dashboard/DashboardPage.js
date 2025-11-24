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
import { usePersistedFilters } from '../../hooks/usePersistedFilters';
import { usePersistedSort } from '../../hooks/usePersistedSort';
import HabitFilters from '../../components/habits/filters/HabitFilters';
import HabitCard from '../../components/habits/ui/HabitCard';
import CreateHabitModal from '../../components/habits/CreateHabitModal';
import WelcomeHeader from '../../components/dashboard/WelcomeHeader';
import StatsGrid from '../../components/dashboard/StatsGrid';
import EmptyState from '../../components/dashboard/EmptyState';
import RecentAchievements from '../../components/dashboard/RecentAchievements';
import { getRecentAchievements } from '../../utils/achievements';
import { calculateXPReward, getTotalXPForLevel } from '../../utils/levelingSystem';

const DashboardPage = () => {
  const { habits, isLoading, getHabitStreak } = useHabits();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState(null);
  
  // Use persisted filters and sort
  const { filters, rawFilters, updateFilter } = usePersistedFilters('dashboard');
  const { sortConfig, updateSort, getSortedHabits } = usePersistedSort('dashboard');

  // Get current date string for today's stats
  const getCurrentDateString = () => {
    return new Date().toISOString().split('T')[0];
  };
  
  const currentDateString = getCurrentDateString();
  const currentDate = new Date();
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
            const dayCompletions = h.completionHistory[d];
            const completionCount = Array.isArray(dayCompletions) ? dayCompletions.length : (dayCompletions ? 1 : 0);
            const targetCompletions = h.targetCompletions || 1;
            if (completionCount >= targetCompletions) dates.add(d);
          });
        }
      });

      dates.forEach(date => {
        let allCompleted = true;
        habits.forEach(h => {
          const dayCompletions = h.completionHistory?.[date];
          const completionCount = Array.isArray(dayCompletions) ? dayCompletions.length : (dayCompletions ? 1 : 0);
          const targetCompletions = h.targetCompletions || 1;
          if (completionCount < targetCompletions) {
            allCompleted = false;
          }
        });
        
        if (allCompleted) {
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

  // Advanced filtering logic for dashboard
  const filteredHabits = useMemo(() => {
    return habits.filter(habit => {
      // Category filter
      if (filters.category !== 'All' && habit.category !== filters.category) {
        return false;
      }
      
      // Difficulty filter
      if (filters.difficulty !== 'All' && habit.difficulty !== filters.difficulty) {
        return false;
      }
      
      // Frequency filter
      if (filters.frequency !== 'All') {
        const habitFrequency = habit.frequencyType || 'Daily';
        if (habitFrequency !== filters.frequency) {
          return false;
        }
      }
      
      // Search filter (uses debounced value)
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return habit.name.toLowerCase().includes(searchLower) ||
               habit.category.toLowerCase().includes(searchLower) ||
               habit.difficulty?.toLowerCase().includes(searchLower);
      }
      
      return true;
    });
  }, [habits, filters]);

  // Apply sorting to filtered habits
  const sortedAndFilteredHabits = useMemo(() => {
    return getSortedHabits(filteredHabits);
  }, [filteredHabits, getSortedHabits]);

  const todaysHabits = sortedAndFilteredHabits
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3 }}>
          <HabitFilters
            selectedCategory={rawFilters.category}
            onCategoryChange={(value) => updateFilter('category', value)}
            selectedDifficulty={rawFilters.difficulty}
            onDifficultyChange={(value) => updateFilter('difficulty', value)}
            selectedFrequency={rawFilters.frequency}
            onFrequencyChange={(value) => updateFilter('frequency', value)}
            searchTerm={rawFilters.searchTerm}
            onSearchChange={(value) => updateFilter('searchTerm', value)}
            sortBy={sortConfig.sortBy}
            onSortChange={updateSort}
            sortOrder={sortConfig.sortOrder}
            onSortOrderChange={(order) => updateSort(sortConfig.sortBy)}
            compact={true}
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            sx={{ flexShrink: 0 }}
          >
            NEW HABIT
          </Button>
        </Box>

        {/* Today's Habits Section */}
        <Box className="space-y-6">
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

          {/* Today's Habits */}
          {todaysHabits.length === 0 ? (
            <EmptyState onCreateHabit={() => setIsModalOpen(true)} />
          ) : (
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2, 
              justifyContent: 'center',
              maxWidth: '1200px', 
              mx: 'auto', 
              width: '100%' 
            }}>
              {todaysHabits.map((habit) => (
                <Box 
                  key={habit.id}
                  sx={{ 
                    flex: '0 0 calc(50% - 8px)', // 50% width minus gap
                    minWidth: '280px',
                    maxWidth: '580px'
                  }}
                >
                  <HabitCard
                    habit={habit}
                    onEdit={(selectedHabit) => {
                      setHabitToEdit(selectedHabit);
                      setIsModalOpen(true);
                    }}
                  />
                </Box>
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
        onClose={() => {
          setIsModalOpen(false);
          setHabitToEdit(null);
        }}
      />
    </Box>
  );
};

export default DashboardPage;
