import React, { useState, useMemo, useCallback } from 'react';
import {
  Card,
  CardContent
} from '@mui/material';
import { useHabits } from '../../../contexts/HabitsContext';
import { useTimeTravel } from '../../../contexts/TimeTravelContext';
import { getCompletionCount, isHabitCompletedForDate, getLastNDays } from '../../../utils/habitHelpers';

// Import extracted components
import HabitCardHeader from './HabitCardHeader';
import HabitCardWeekly from './HabitCardWeekly';
import ErrorSnackbar from './components/feedback/ErrorSnackbar';

const HabitCard = ({ habit, onEdit }) => {
  const { toggleHabitCompletion, deleteHabit, getHabitStreak } = useHabits();
  const { currentDate, currentDateString } = useTimeTravel();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);

  const streak = getHabitStreak(habit.id);
  
  // Get current date string for today's stats
  const todayStr = currentDateString;
  
  // Get target completions (default to 1 if not set)
  const targetCompletions = habit.targetCompletions || 1;

  // Memoize expensive calculations
  const todayCompletionCount = useMemo(() => {
    return getCompletionCount(habit.completionHistory, todayStr);
  }, [habit.completionHistory, todayStr]);

  const last5Days = useMemo(() => {
    return getLastNDays(5, new Date(currentDate));
  }, [currentDate]);

  // Memoize event handlers
  const handleToggleDay = useCallback(async (date) => {
    const dateStr = date.toISOString().split('T')[0];
    // Only allow toggling today
    if (dateStr === todayStr) {
      setLoading(true);
      setError(null);
      try {
        await toggleHabitCompletion(habit.id, dateStr);
      } catch (err) {
        // Handle different error types
        if (err.message.includes('network') || err.message.includes('fetch')) {
          setError('Network error. Please check your connection and try again.');
        } else if (err.message.includes('permission') || err.message.includes('unauthorized')) {
          setError('Permission denied. Please log in again.');
        } else {
          setError('Failed to update habit completion. Please try again.');
        }
        console.error('Habit toggle error:', err);
      } finally {
        setLoading(false);
      }
    }
  }, [todayStr, toggleHabitCompletion, habit.id]);

  const handleDelete = useCallback(async () => {
    setDeleteLoading(true);
    setError(null);
    try {
      await deleteHabit(habit.id);
    } catch (err) {
      // Handle different error types
      if (err.message.includes('network') || err.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else if (err.message.includes('permission') || err.message.includes('unauthorized')) {
        setError('Permission denied. Please log in again.');
      } else {
        setError('Failed to delete habit. Please try again.');
      }
      console.error('Habit delete error:', err);
    } finally {
      setDeleteLoading(false);
    }
  }, [deleteHabit, habit.id]);

  // Memoize helper functions
  const isDayCompleted = useCallback((date) => {
    const dateStr = date.toISOString().split('T')[0];
    return isHabitCompletedForDate(habit.completionHistory, dateStr, targetCompletions);
  }, [habit.completionHistory, targetCompletions]);

  const isToday = useCallback((date) => {
    const dateStr = date.toISOString().split('T')[0];
    return dateStr === todayStr;
  }, [todayStr]);

  const completedToday = isDayCompleted(new Date(currentDate));

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardContent sx={{ p: 2.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header Section with Actions */}
        <HabitCardHeader 
          habit={habit} 
          onEdit={onEdit}
          onDelete={handleDelete}
          loading={deleteLoading}
          streak={streak}
        />

        {/* Weekly Progress Grid */}
        <HabitCardWeekly 
          last5Days={last5Days}
          isDayCompleted={isDayCompleted}
          isToday={isToday}
          handleToggleDay={handleToggleDay}
          completedToday={completedToday}
          loading={loading}
          habit={habit}
          getTodayCompletionCount={todayCompletionCount}
        />
      </CardContent>
      
      {/* Error Snackbar */}
      <ErrorSnackbar error={error} onClose={() => setError(null)} />
    </Card>
  );
};

export default HabitCard;
