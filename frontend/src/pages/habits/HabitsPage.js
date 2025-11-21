import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useHabits } from '../../contexts/HabitsContext';
import { usePersistedFilters } from '../../hooks/usePersistedFilters';
import { usePersistedSort } from '../../hooks/usePersistedSort';
import HabitFilters from '../../components/habits/filters/HabitFilters';
import HabitCard from '../../components/habits/ui/HabitCard';
import CreateHabitModal from '../../components/habits/CreateHabitModal';
import TodayStats from '../../components/habits/stats/TodayStats';
import HabitsEmptyState from '../../components/habits/ui/HabitsEmptyState';

const HabitsPage = () => {
  const { habits, isLoading } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState(null);
  
  // Use persisted filters and sort
  const { filters, rawFilters, updateFilter, clearFilters, hasActiveFilters } = usePersistedFilters('habits');
  const { sortConfig, updateSort, getSortedHabits } = usePersistedSort('habits');

  // Get current date string for today's stats
  const getCurrentDateString = () => {
    return new Date().toISOString().split('T')[0];
  };
  
  const currentDateString = getCurrentDateString();

  // Advanced filtering logic
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

      {/* Habit Filters */}
      {habits.length > 0 && (
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
      )}

      {/* Habits List */}
      {sortedAndFilteredHabits.length > 0 ? (
        <Box className="space-y-4">
          {sortedAndFilteredHabits.map((habit) => (
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
                color: 'text.secondary',
                mb: 2
              }}
            >
              {hasActiveFilters
                ? 'No habits match your current filters.'
                : 'No habits in this category yet.'}
            </Typography>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                variant="outlined"
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  border: '3px solid black',
                  borderRadius: '8px',
                  boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                  '&:hover': {
                    boxShadow: '2px 2px 0px rgba(0,0,0,1)',
                  }
                }}
              >
                Clear Filters
              </Button>
            )}
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
