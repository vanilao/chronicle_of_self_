import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Pagination
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useHabits } from '../../contexts/HabitsContext';
import { usePersistedFilters } from '../../hooks/usePersistedFilters';
import { usePersistedSort } from '../../hooks/usePersistedSort';
import { getCompletionCount } from '../../utils/habitHelpers';
import HabitFilters from '../../components/habits/filters/HabitFilters';
import HabitCard from '../../components/habits/ui/HabitCard';
import CreateHabitModal from '../../components/habits/CreateHabitModal';
import TodayStats from '../../components/habits/stats/TodayStats';
import HabitsEmptyState from '../../components/habits/ui/HabitsEmptyState';

const HabitsPage = () => {
  const { habits, isLoading } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Pagination settings
  const HABITS_PER_PAGE = 6;
  
  
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

  // Pagination logic
  const paginatedHabits = useMemo(() => {
    const startIndex = (currentPage - 1) * HABITS_PER_PAGE;
    const endIndex = startIndex + HABITS_PER_PAGE;
    return sortedAndFilteredHabits.slice(startIndex, endIndex);
  }, [sortedAndFilteredHabits, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedAndFilteredHabits.length / HABITS_PER_PAGE);
  }, [sortedAndFilteredHabits.length]);

  // Reset to page 1 when filters change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Reset page when filters or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortConfig]);

  // Calculate today's stats using helper
  const getTodayStats = () => {
    let completedToday = 0;
    let xpEarnedToday = 0;

    habits.forEach(habit => {
      const completionCount = getCompletionCount(habit.completionHistory, currentDateString);
      const targetCompletions = habit.targetCompletions || 1;

      if (completionCount >= targetCompletions) {
        completedToday++;
        xpEarnedToday += habit.xpReward || 0;
      }
    });

    const totalHabits = habits.length;

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
            onClick={() => {
              console.log('Button clicked!');
              setIsModalOpen(true);
            }}
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            sx={{ 
              flexShrink: 0,
              position: 'relative',
              zIndex: 1
            }}
          >
            NEW HABIT
          </Button>
        </Box>
      )}

      {/* Habits List */}
      {sortedAndFilteredHabits.length > 0 ? (
        <>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2, 
            justifyContent: 'center',
            maxWidth: '1200px', 
            mx: 'auto', 
            width: '100%' 
          }}>
            {paginatedHabits.map((habit) => (
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
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 4,
            mb: 2
          }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.04)'
                  }
                },
                '& .Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }
              }}
            />
          </Box>
        )}
      </>
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
