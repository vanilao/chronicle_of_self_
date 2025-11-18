import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import {
  Add,
  EmojiEvents,
  FlashOn,
  GpsFixed,
  Star,
  CheckCircle,
  LocalFireDepartment,
  WorkspacePremium,
  TrendingUp
} from '@mui/icons-material';
import { useHabits } from '../../contexts/HabitsContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTimeTravel } from '../../contexts/TimeTravelContext';
import HabitCard from '../../components/habits/HabitCard';
import CreateHabitModal from '../../components/habits/CreateHabitModal';
import HabitFilters from '../../components/habits/HabitFilters';
import { getRecentAchievements } from '../../utils/achievements';
import { getTotalXPForLevel } from '../../utils/levelingSystem';

const DashboardPage = () => {
  const { habits, isLoading, getHabitStreak } = useHabits();
  const { user } = useAuth();
  const { currentDate, currentDateString } = useTimeTravel();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const todayIso = currentDateString;

  // Icon mapping for achievements
  const iconMap = {
    Star,
    CheckCircle,
    LocalFireDepartment,
    EmojiEvents,
    WorkspacePremium,
    FlashOn,
    TrendingUp
  };

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

  const getTodayStats = () => {
    const completedToday = habits.filter(h => h.completionHistory?.[todayIso]).length;
    const totalHabits = habits.length;
    const xpEarnedToday = habits
      .filter(h => h.completionHistory?.[todayIso])
      .reduce((sum, h) => sum + h.xpReward, 0);

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
        {user && (
          <Box sx={{ mb: 4 }} className="space-y-4">
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: { xs: '2.5rem', md: '3rem' },
                  color: 'text.primary',
                  mb: 1
                }}
              >
                WELCOME BACK, {user.username?.toUpperCase() || 'ADVENTURER'}
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  color: 'text.secondary'
                }}
              >
                Level {user.level ?? 0} • {user.title ?? 'Explorer'} • {user.archetype ?? 'Unassigned'}
              </Typography>
            </Box>

            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.875rem',
                      color: 'text.secondary'
                    }}
                  >
                    LEVEL PROGRESS
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.875rem',
                      color: 'text.primary'
                    }}
                  >
                    {user.currentXP ?? 0} / {user.nextLevelXP ?? 100} XP
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(100, Math.round(((user.currentXP ?? 0) / (user.nextLevelXP || 1)) * 100))}
                  sx={{
                    height: 16,
                    borderRadius: 2,
                    border: '3px solid black',
                    bgcolor: 'background.default',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'secondary.main'
                    }
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    textAlign: 'right',
                    mt: 1
                  }}
                >
                  {Math.min(100, Math.round(((user.currentXP ?? 0) / (user.nextLevelXP || 1)) * 100))}% to next level
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* Stats Grid */}
        {habits.length > 0 && (
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ bgcolor: 'primary.main' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <GpsFixed sx={{ fontSize: 24, color: 'text.primary' }} />
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: 'text.primary'
                      }}
                    >
                      TODAY'S PROGRESS
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: 'VT323, monospace',
                      fontSize: '2.5rem',
                      color: 'text.primary'
                    }}
                  >
                    {stats.completedToday}/{stats.totalHabits}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.75rem',
                      color: 'text.primary',
                      opacity: 0.8
                    }}
                  >
                    Habits Completed
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ bgcolor: 'secondary.main' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <FlashOn sx={{ fontSize: 24, color: 'text.primary' }} />
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: 'text.primary'
                      }}
                    >
                      XP EARNED
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: 'VT323, monospace',
                      fontSize: '2.5rem',
                      color: 'text.primary'
                    }}
                  >
                    {stats.xpEarnedToday}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.75rem',
                      color: 'text.primary',
                      opacity: 0.8
                    }}
                  >
                    Experience Points
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ bgcolor: 'tertiary.main' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <EmojiEvents sx={{ fontSize: 24, color: 'text.primary' }} />
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: 'text.primary'
                      }}
                    >
                      COMPLETION RATE
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: 'VT323, monospace',
                      fontSize: '2.5rem',
                      color: 'text.primary'
                    }}
                  >
                    {stats.totalHabits > 0 ? Math.round((stats.completedToday / stats.totalHabits) * 100) : 0}%
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.75rem',
                      color: 'text.primary',
                      opacity: 0.8
                    }}
                  >
                    Daily Success
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

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
              onClick={() => setIsModalOpen(true)}
              variant="contained"
              color="secondary"
              startIcon={<Add />}
            >
              NEW HABIT
            </Button>
          </Box>

          {/* Today's Habits */}
          {todaysHabits.length === 0 ? (
            <Card>
              <CardContent sx={{ p: 6, textAlign: 'center' }} className="space-y-6">
                <Box
                  sx={{
                    display: 'inline-block',
                    bgcolor: 'primary.main',
                    p: 3,
                    borderRadius: '50%',
                    border: '3px solid black',
                    boxShadow: '4px 4px 0px rgba(0,0,0,1)'
                  }}
                >
                  <GpsFixed sx={{ fontSize: 64, color: 'text.primary' }} />
                </Box>

                <Box className="space-y-2">
                  <Typography
                    variant="h3"
                    sx={{
                      fontFamily: 'VT323, monospace',
                      fontSize: '1.5rem',
                      color: 'text.primary'
                    }}
                  >
                    NO HABITS YET
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      color: 'text.secondary',
                      maxWidth: 400,
                      mx: 'auto'
                    }}
                  >
                    Start your adventure by creating your first habit. Transform your daily routine into epic quests!
                  </Typography>
                </Box>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<Add />}
                  sx={{ px: 4, py: 2 }}
                >
                  CREATE YOUR FIRST HABIT
                </Button>

                {/* Quick Tips */}
                <Grid container spacing={2} sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        bgcolor: 'background.default',
                        p: 2,
                        borderRadius: 2,
                        border: '2px solid black'
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '0.875rem',
                          color: 'text.primary',
                          mb: 0.5
                        }}
                      >
                        TIP 1
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: '0.75rem',
                          color: 'text.secondary'
                        }}
                      >
                        Start small with 1-2 habits
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        bgcolor: 'background.default',
                        p: 2,
                        borderRadius: 2,
                        border: '2px solid black'
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '0.875rem',
                          color: 'text.primary',
                          mb: 0.5
                        }}
                      >
                        TIP 2
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: '0.75rem',
                          color: 'text.secondary'
                        }}
                      >
                        Choose your archetype bonus
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                      sx={{
                        bgcolor: 'background.default',
                        p: 2,
                        borderRadius: 2,
                        border: '2px solid black'
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'VT323, monospace',
                          fontSize: '0.875rem',
                          color: 'text.primary',
                          mb: 0.5
                        }}
                      >
                        TIP 3
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: '0.75rem',
                          color: 'text.secondary'
                        }}
                      >
                        Complete daily for streaks
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ) : (
            <Box className="space-y-4">
              {todaysHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onEdit={(selectedHabit) => {
                    setHabitToEdit(selectedHabit);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Recent Achievements */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'VT323, monospace',
              fontSize: '1.875rem',
              color: 'text.primary',
              mb: 3
            }}
          >
            RECENT ACHIEVEMENTS
          </Typography>
          {recentAchievements.length > 0 ? (
            <Grid container spacing={2}>
              {recentAchievements.map((achievement) => {
                const IconComponent = iconMap[achievement.icon] || EmojiEvents;
                return (
                  <Grid size={{ xs: 12, sm: 4 }} key={achievement.id}>
                    <Card sx={{ bgcolor: 'secondary.main' }}>
                      <CardContent sx={{ p: 3, textAlign: 'center' }}>
                        <IconComponent sx={{ fontSize: 32, color: 'text.primary', mb: 1 }} />
                        <Typography
                          sx={{
                            fontFamily: 'VT323, monospace',
                            fontSize: '1.125rem',
                            color: 'text.primary',
                            mb: 0.5
                          }}
                        >
                          {achievement.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.75rem',
                            color: 'text.primary',
                            opacity: 0.8
                          }}
                        >
                          {achievement.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Card>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <EmojiEvents sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5, mb: 1.5 }} />
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.875rem',
                    color: 'text.secondary'
                  }}
                >
                  Complete habits to unlock achievements!
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
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
