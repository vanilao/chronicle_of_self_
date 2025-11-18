import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import {
  Add,
  EmojiEvents,
  GpsFixed,
  FlashOn
} from '@mui/icons-material';
import { useHabits } from '../../contexts/HabitsContext';
import { useTimeTravel } from '../../contexts/TimeTravelContext';
import CreateHabitModal from '../../components/habits/CreateHabitModal';
import HabitCard from '../../components/habits/HabitCard';

const HabitsPage = () => {
  const { habits, isLoading } = useHabits();
  const { currentDateString } = useTimeTravel();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Body', 'Mind', 'Spirit', 'Creative'];

  // Filter habits by category
  const filteredHabits = filterCategory === 'All'
    ? habits
    : habits.filter(h => h.category === filterCategory);

  // Calculate today's stats
  const getTodayStats = () => {
    const completedToday = habits.filter(h => h.completionHistory?.[currentDateString]).length;
    const totalHabits = habits.length;
    const xpEarnedToday = habits
      .filter(h => h.completionHistory?.[currentDateString])
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
    <Box className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' }, justifyContent: 'space-between', gap: 2, mb: 4 }}>
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'VT323, monospace',
              fontSize: '3rem',
              color: 'text.primary',
              mb: 1
            }}
          >
            MY HABITS
          </Typography>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              color: 'text.secondary'
            }}
          >
            Track your daily quests and build your legacy
          </Typography>
        </Box>

        <Button
          onClick={() => setIsModalOpen(true)}
          variant="contained"
          color="secondary"
          startIcon={<Add />}
        >
          NEW HABIT
        </Button>
      </Box>

      {/* Today's Stats */}
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

      {/* Category Filter */}
      {habits.length > 0 && (
        <ToggleButtonGroup
          value={filterCategory}
          exclusive
          onChange={(e, value) => value && setFilterCategory(value)}
          sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}
        >
          {categories.map((category) => (
            <ToggleButton
              key={category}
              value={category}
              sx={{
                px: 2,
                py: 1,
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 700,
                fontSize: '0.875rem',
                border: '3px solid black',
                borderRadius: '8px !important',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                bgcolor: filterCategory === category ? 'text.primary' : 'background.default',
                color: filterCategory === category ? 'background.default' : 'text.primary',
                '&.Mui-selected': {
                  bgcolor: 'text.primary',
                  color: 'background.default',
                  '&:hover': {
                    bgcolor: 'text.primary'
                  }
                }
              }}
            >
              {category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}

      {/* Habits List */}
      {filteredHabits.length > 0 ? (
        <Box className="space-y-4">
          {filteredHabits.map((habit) => (
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
      ) : habits.length > 0 ? (
        <Card>
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                color: 'text.secondary'
              }}
            >
              No habits in this category yet.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        /* Empty State */
        <Card>
          <CardContent sx={{ p: 6, textAlign: 'center' }} className="space-y-6">
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: 'primary.main',
                p: 2,
                borderRadius: 2,
                border: '3px solid black',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)'
              }}
            >
              <EmojiEvents sx={{ fontSize: 64, color: 'text.primary' }} />
            </Box>

            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: '1.875rem',
                  color: 'text.primary',
                  mb: 2
                }}
              >
                NO HABITS YET
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  color: 'text.secondary',
                  maxWidth: 400,
                  mx: 'auto',
                  mb: 3
                }}
              >
                Start your journey by creating your first habit. Build consistency, earn XP, and level up your life!
              </Typography>

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
            </Box>

            {/* Tips */}
            <Grid container spacing={2} sx={{ pt: 4 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    bgcolor: 'background.default',
                    p: 2,
                    borderRadius: 2,
                    border: '3px solid black',
                    boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                    textAlign: 'left'
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: 'text.primary',
                      mb: 1
                    }}
                  >
                    TIP #1
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.75rem',
                      color: 'text.secondary'
                    }}
                  >
                    Start small! Pick one habit you can do daily in under 5 minutes.
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    bgcolor: 'background.default',
                    p: 2,
                    borderRadius: 2,
                    border: '3px solid black',
                    boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                    textAlign: 'left'
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: 'text.primary',
                      mb: 1
                    }}
                  >
                    TIP #2
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.75rem',
                      color: 'text.secondary'
                    }}
                  >
                    Choose a category that matches your archetype for bonus XP!
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    bgcolor: 'background.default',
                    p: 2,
                    borderRadius: 2,
                    border: '3px solid black',
                    boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                    textAlign: 'left'
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: 'text.primary',
                      mb: 1
                    }}
                  >
                    TIP #3
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.75rem',
                      color: 'text.secondary'
                    }}
                  >
                    Consistency is key! Even a 1-day streak is progress.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Create Habit Modal */}
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

export default HabitsPage;
