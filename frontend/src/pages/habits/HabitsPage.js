import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useHabits } from '../../contexts/HabitsContext';
import { useTimeTravel } from '../../contexts/TimeTravelContext';
import CreateHabitModal from '../../components/habits/CreateHabitModal';
import HabitCard from '../../components/habits/HabitCard';
import TodayStats from '../../components/habits/TodayStats';
import CategoryFilter from '../../components/habits/CategoryFilter';
import HabitsEmptyState from '../../components/habits/HabitsEmptyState';

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
      <Box sx={{ mb: 4 }}>
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
      </Box>

      {/* Today's Stats */}
      <TodayStats stats={stats} />

      {/* Category Filter */}
      {habits.length > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3 }}>
          <CategoryFilter
            categories={categories}
            selectedCategory={filterCategory}
            onCategoryChange={setFilterCategory}
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
        <HabitsEmptyState onCreateHabit={() => setIsModalOpen(true)} />
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
