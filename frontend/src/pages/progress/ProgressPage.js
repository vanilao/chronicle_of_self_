import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress
} from '@mui/material';
import {
  EmojiEvents,
  TrendingUp,
  LocalFireDepartment,
  GpsFixed,
  CalendarMonth,
  WorkspacePremium,
  FlashOn,
  Star
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useHabits } from '../../contexts/HabitsContext';
import { useTimeTravel } from '../../contexts/TimeTravelContext';
import { getXPProgressPercentage, getLevelTier, getTotalXPForLevel } from '../../utils/levelingSystem';
import HeatmapCalendar from '../../components/progress/HeatmapCalendar';

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

  const xpProgress = getXPProgressPercentage(user.currentXP, user.nextLevelXP);
  const levelTier = getLevelTier(user.level);

  // Achievement component for reuse
  const Achievement = ({ unlocked, icon: Icon, title, description, progress }) => (
    <Card sx={{ bgcolor: unlocked ? 'secondary.main' : 'background.default', opacity: unlocked ? 1 : 0.5 }}>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Icon sx={{ fontSize: 32, color: unlocked ? 'text.primary' : 'text.secondary' }} />
          <Box>
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: '0.875rem', color: 'text.primary' }}>
              {title}
            </Typography>
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
              {description}
            </Typography>
          </Box>
        </Box>
        {!unlocked && progress && (
          <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.primary', opacity: 0.6 }}>
            {progress}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

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
      <Card sx={{ background: 'linear-gradient(to bottom right, #FFB3D9, #B4F8C8)', mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ bgcolor: 'background.default', p: 3, borderRadius: 2, border: '3px solid black', boxShadow: '4px 4px 0px rgba(0,0,0,1)' }}>
                  <EmojiEvents sx={{ fontSize: 64, color: 'primary.main' }} />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 1 }}>
                    <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '3.75rem', color: 'text.primary' }}>
                      {user.level}
                    </Typography>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.primary', opacity: 0.6 }}>
                      {levelTier}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: '1.125rem', color: 'text.primary', mb: 0.5 }}>
                    {user.title}
                  </Typography>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
                    {user.archetype} • {user.archetypeCategory}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', fontWeight: 700, color: 'text.primary' }}>
                    XP PROGRESS
                  </Typography>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
                    {user.currentXP} / {user.nextLevelXP}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={xpProgress}
                  sx={{ height: 32, borderRadius: 2, border: '3px solid black', bgcolor: 'background.default', mb: 1, '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' } }}
                />
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
                  {Math.round(xpProgress)}% to next level
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Key Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ bgcolor: 'primary.main' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <FlashOn sx={{ fontSize: 24, color: 'text.primary' }} />
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                  TOTAL XP
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
                {stats.totalXPEarned}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ bgcolor: 'secondary.main' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <LocalFireDepartment sx={{ fontSize: 24, color: 'text.primary' }} />
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                  LONGEST STREAK
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
                {stats.longestStreak}
              </Typography>
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
                days in a row
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ bgcolor: 'tertiary.main' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <GpsFixed sx={{ fontSize: 24, color: 'text.primary' }} />
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                  COMPLETIONS
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
                {stats.totalCompletions}
              </Typography>
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.primary', opacity: 0.6 }}>
                all time
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card sx={{ border: '3px solid', borderColor: 'primary.main' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                <TrendingUp sx={{ fontSize: 24, color: 'primary.main' }} />
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                  AVG. RATE
                </Typography>
              </Box>
              <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '2.5rem', color: 'text.primary' }}>
                {Math.round(stats.completionRate)}%
              </Typography>
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                last 30 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Last 7 Days Chart */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <CalendarMonth sx={{ fontSize: 24, color: 'text.primary' }} />
            <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem', color: 'text.primary' }}>
              LAST 7 DAYS
            </Typography>
          </Box>

          <Grid container spacing={1}>
            {stats.last7Days.map((day, index) => (
              <Grid size={{ xs: 12 / 7 }} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary', mb: 1 }}>
                    {day.dayName}
                  </Typography>
                  <Box sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 2, border: '3px solid black', boxShadow: '4px 4px 0px rgba(0,0,0,1)', mb: 1 }}>
                    <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem', color: 'text.primary' }}>
                      {day.completedCount}
                    </Typography>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
                      / {day.totalHabits}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'primary.main', fontWeight: 700 }}>
                    +{day.xpEarned} XP
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

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
            <Star sx={{ fontSize: 24, color: 'text.primary' }} />
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
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <WorkspacePremium sx={{ fontSize: 24, color: 'text.primary' }} />
            <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem', color: 'text.primary' }}>
              ACHIEVEMENTS
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement unlocked={stats.totalHabits >= 1} icon={Star} title="FIRST STEPS" description="Create your first habit" />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement unlocked={user.level >= 5} icon={EmojiEvents} title="RISING HERO" description="Reach level 5" progress={user.level < 5 ? `Level ${user.level} / 5` : undefined} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement unlocked={user.level >= 10} icon={EmojiEvents} title="VETERAN" description="Reach level 10" progress={user.level < 10 ? `Level ${user.level} / 10` : undefined} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement unlocked={stats.longestStreak >= 7} icon={LocalFireDepartment} title="WEEK WARRIOR" description="7-day streak" progress={stats.longestStreak < 7 ? `${stats.longestStreak} / 7 days` : undefined} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement unlocked={stats.longestStreak >= 30} icon={LocalFireDepartment} title="MONTH MASTER" description="30-day streak" progress={stats.longestStreak < 30 ? `${stats.longestStreak} / 30 days` : undefined} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement unlocked={stats.longestStreak >= 100} icon={LocalFireDepartment} title="CENTURION" description="100-day streak" progress={stats.longestStreak < 100 ? `${stats.longestStreak} / 100 days` : undefined} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement unlocked={stats.totalCompletions >= 10} icon={GpsFixed} title="GETTING STARTED" description="10 completions" progress={stats.totalCompletions < 10 ? `${stats.totalCompletions} / 10` : undefined} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement unlocked={stats.totalCompletions >= 50} icon={GpsFixed} title="DEDICATED" description="50 completions" progress={stats.totalCompletions < 50 ? `${stats.totalCompletions} / 50` : undefined} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement unlocked={stats.totalCompletions >= 100} icon={GpsFixed} title="COMMITTED" description="100 completions" progress={stats.totalCompletions < 100 ? `${stats.totalCompletions} / 100` : undefined} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement unlocked={stats.completionRate >= 100} icon={Star} title="PERFECTIONIST" description="100% avg rate (30d)" progress={stats.completionRate < 100 ? `${Math.round(stats.completionRate)}% / 100%` : undefined} />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement
                unlocked={stats.categoryBreakdown.Body > 0 && stats.categoryBreakdown.Mind > 0 && stats.categoryBreakdown.Spirit > 0 && stats.categoryBreakdown.Creative > 0}
                icon={Star}
                title="WELL ROUNDED"
                description="Habit in each category"
                progress={`${Object.values(stats.categoryBreakdown).filter(c => c > 0).length} / 4 categories`}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Achievement unlocked={stats.totalHabits >= 10} icon={Star} title="HABIT COLLECTOR" description="Create 10 habits" progress={stats.totalHabits < 10 ? `${stats.totalHabits} / 10 habits` : undefined} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProgressPage;
