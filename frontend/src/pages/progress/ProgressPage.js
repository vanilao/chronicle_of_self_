import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useHabits } from '../../contexts/HabitsContext';
import { useTimeTravel } from '../../contexts/TimeTravelContext';
import { getTotalXPForLevel } from '../../utils/levelingSystem';
import HeatmapCalendar from '../../components/progress/HeatmapCalendar';
import LevelOverview from '../../components/progress/LevelOverview';
import KeyStatsGrid from '../../components/progress/KeyStatsGrid';
import Last7DaysChart from '../../components/progress/Last7DaysChart';
import AchievementsGrid from '../../components/progress/AchievementsGrid';

const ProgressPage = () => {
  const { user } = useAuth();
  const { habits, getHabitStreak } = useHabits();
  const { currentDate } = useTimeTravel();

  // Calculate comprehensive stats
  const stats = useMemo(() => {
    if (!user || habits.length === 0) {
      return {
        totalHabits: 0,
        totalXPEarned: 0,
        longestStreak: 0,
        currentStreaks: 0,
        totalCompletions: 0,
        completionRate: 0,
        categoryBreakdown: {},
        last7Days: [],
        last30Days: []
      };
    }

    const totalHabits = habits.length;
    // Calculate total XP earned across all levels
    const totalXPEarned = getTotalXPForLevel(user.level || 1) + (user.currentXP || 0);

    let longestStreak = 0;
    let currentStreaksCount = 0;
    let totalCompletions = 0;
    const categoryBreakdown = {
      Body: 0,
      Mind: 0,
      Spirit: 0,
      Creative: 0
    };

    habits.forEach(habit => {
      // Use getHabitStreak to properly calculate streak
      const streak = getHabitStreak(habit.id);
      if (streak > longestStreak) {
        longestStreak = streak;
      }
      if (streak > 0) {
        currentStreaksCount++;
      }

      if (habit.category in categoryBreakdown) {
        categoryBreakdown[habit.category]++;
      }

      if (habit.completionHistory) {
        totalCompletions += Object.values(habit.completionHistory).filter(Boolean).length;
      }
    });

    const last7Days = [];
    // Use currentDate from TimeTravel context for proper date sync
    const today = new Date(currentDate);
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const completedCount = habits.filter(h => h.completionHistory?.[dateStr]).length;
      const xpEarned = habits
        .filter(h => h.completionHistory?.[dateStr])
        .reduce((sum, h) => sum + (h.xpReward || 0), 0);

      last7Days.push({
        date: dateStr,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
        completedCount,
        totalHabits,
        xpEarned,
        completionRate: totalHabits > 0 ? (completedCount / totalHabits) * 100 : 0
      });
    }

    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const completedCount = habits.filter(h => h.completionHistory?.[dateStr]).length;

      last30Days.push({
        date: dateStr,
        completedCount,
        totalHabits,
        completionRate: totalHabits > 0 ? (completedCount / totalHabits) * 100 : 0
      });
    }

    const totalDaysWithData = last30Days.filter(d => d.totalHabits > 0).length;
    const avgCompletionRate = totalDaysWithData > 0
      ? last30Days.reduce((sum, d) => sum + d.completionRate, 0) / totalDaysWithData
      : 0;

    return {
      totalHabits,
      totalXPEarned,
      longestStreak,
      currentStreaksCount,
      totalCompletions,
      completionRate: avgCompletionRate,
      categoryBreakdown,
      last7Days,
      last30Days
    };
  }, [user, habits, getHabitStreak, currentDate]);

  if (!user) {
    return (
      <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', color: 'text.primary' }}>
          Please log in to view your progress.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ fontFamily: 'VT323, monospace', fontSize: '3rem', color: 'text.primary', mb: 1 }}>
          MY PROGRESS
        </Typography>
        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', color: 'text.secondary' }}>
          Track your journey and celebrate your achievements
        </Typography>
      </Box>

      {/* Level Overview */}
      <LevelOverview />

      {/* Key Stats Grid */}
      <KeyStatsGrid stats={stats} />

      {/* Last 7 Days Chart */}
      <Last7DaysChart data={stats.last7Days} />

      {/* 30-Day Heatmap */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <CalendarMonth sx={{ fontSize: 24, color: 'text.primary' }} />
            <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem', color: 'text.primary' }}>
              30-DAY HEATMAP
            </Typography>
          </Box>

          {stats.last30Days.length > 0 ? (
            <HeatmapCalendar data={stats.last30Days} maxValue={stats.totalHabits} />
          ) : (
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.secondary', textAlign: 'center', py: 4 }}>
              No habit data yet. Start completing habits to see your progress!
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <CalendarMonth sx={{ fontSize: 24, color: 'text.primary' }} />
            <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem', color: 'text.primary' }}>
              HABIT CATEGORIES
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {Object.entries(stats.categoryBreakdown).map(([category, count]) => (
              <Grid size={{ xs: 6, md: 3 }} key={category}>
                <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 2, border: '3px solid black', boxShadow: '4px 4px 0px rgba(0,0,0,1)', textAlign: 'center' }}>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary', mb: 1 }}>
                    {category.toUpperCase()}
                  </Typography>
                  <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.875rem', color: 'text.primary' }}>
                    {count}
                  </Typography>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
                    {stats.totalHabits > 0 ? Math.round((count / stats.totalHabits) * 100) : 0}%
                  </Typography>
                  {user.archetypeCategory === category && (
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'primary.main', fontWeight: 700, mt: 1 }}>
                      +25% XP
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <AchievementsGrid stats={stats} user={user} />
    </Box>
  );
};

export default ProgressPage;
