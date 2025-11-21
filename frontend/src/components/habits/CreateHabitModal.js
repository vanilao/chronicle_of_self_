import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material';
import {
  Close,
  FlashOn
} from '@mui/icons-material';
import { useHabits } from '../../contexts/HabitsContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  CategorySelector,
  DifficultySelector,
  XPRewardPreview,
  FrequencySelector,
  NotificationSettings
} from './form';

const defaultFormState = {
  name: '',
  description: '',
  category: 'Body',
  difficulty: 'Medium',
  frequencyType: 'Daily',
  frequency: 'Daily',
  selectedDays: [],
  notificationsEnabled: false,
  notificationTime: '08:00'
};

const CreateHabitModal = ({ isOpen, onClose, habitToEdit = null }) => {
  const { addHabit, updateHabit } = useHabits();
  const { user } = useAuth();
  const [formData, setFormData] = useState(defaultFormState);

  const isEditMode = Boolean(habitToEdit);

  useEffect(() => {
    if (!isOpen) return;

    if (habitToEdit) {
      setFormData({
        name: habitToEdit.name || '',
        category: habitToEdit.category || 'Body',
        difficulty: habitToEdit.difficulty || 'Medium',
        frequencyType: habitToEdit.frequencyType || 'Daily',
        frequency: habitToEdit.frequency || 'Daily',
        selectedDays: habitToEdit.selectedDays || [],
        notificationsEnabled: habitToEdit.notificationsEnabled || false,
        notificationTime: habitToEdit.notificationTime || '08:00'
      });
    } else {
      setFormData(defaultFormState);
    }
  }, [isOpen, habitToEdit]);

  const difficulties = [
    { name: 'Easy', xp: 10 },
    { name: 'Medium', xp: 25 },
    { name: 'Hard', xp: 50 }
  ];

  const userArchetypeCategory = user?.archetypeCategory;
  const selectedDifficulty = difficulties.find(d => d.name === formData.difficulty) || difficulties[1];
  const baseXp = selectedDifficulty?.xp ?? 0;
  const bonusActive = userArchetypeCategory && formData.category === userArchetypeCategory;
  const bonusMultiplier = bonusActive ? 1.25 : 1;
  const xpReward = Math.round(baseXp * bonusMultiplier);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      xpReward,
      baseXp,
      bonusMultiplier,
      bonusSource: bonusActive ? `${user?.archetype ?? 'Class'} bonus` : null
    };

    if (isEditMode) {
      updateHabit(habitToEdit.id, payload);
    } else {
      addHabit(payload);
    }

    setFormData(defaultFormState);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const handleDifficultyChange = (difficulty) => {
    setFormData(prev => ({ ...prev, difficulty }));
  };

  const handleFrequencyTypeChange = (frequencyType) => {
    setFormData(prev => ({
      ...prev,
      frequencyType,
      frequency: frequencyType === 'Daily' ? 'Daily' : 'Weekly'
    }));
  };

  const toggleDaySelection = (dayKey) => {
    setFormData(prev => {
      const isSelected = prev.selectedDays.includes(dayKey);
      const selectedDays = isSelected
        ? prev.selectedDays.filter(day => day !== dayKey)
        : [...prev.selectedDays, dayKey];

      return {
        ...prev,
        selectedDays
      };
    });
  };

  const handleNotificationToggle = (e) => {
    setFormData(prev => ({
      ...prev,
      notificationsEnabled: e.target.checked
    }));
  };

  const handleNotificationTimeChange = (e) => {
    setFormData(prev => ({
      ...prev,
      notificationTime: e.target.value
    }));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          border: '3px solid black',
          borderRadius: 2,
          boxShadow: '8px 8px 0px rgba(0,0,0,1)',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '3px solid black',
          pb: 2
        }}
      >
        <Typography
          sx={{
            fontFamily: 'VT323, monospace',
            fontSize: '1.875rem',
            color: 'text.primary'
          }}
        >
          {isEditMode ? 'EDIT HABIT' : 'CREATE NEW HABIT'}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            bgcolor: 'background.default',
            border: '3px solid black',
            borderRadius: 2,
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            '&:hover': {
              bgcolor: 'background.default'
            }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box className="space-y-6">
            {/* Habit Name */}
            <Box>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  mb: 1
                }}
              >
                HABIT NAME
              </Typography>
              <TextField
                id="name"
                name="name"
                required
                fullWidth
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Morning Workout, Read 30 Minutes"
              />
            </Box>

            {/* Description Field */}
            <Box>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  mb: 1
                }}
              >
                DESCRIPTION (OPTIONAL)
              </Typography>
              <TextField
                id="description"
                name="description"
                fullWidth
                multiline
                rows={3}
                value={formData.description || ''}
                onChange={handleChange}
                placeholder="Why is this habit important to you? What's your motivation?"
                inputProps={{
                  maxLength: 200
                }}
                helperText={`${(formData.description || '').length}/200 characters`}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: '"IBM Plex Mono", monospace',
                    '& textarea': {
                      resize: 'none'
                    }
                  }
                }}
              />
            </Box>

            {/* Category Selection */}
            <CategorySelector
              selectedCategory={formData.category}
              onCategoryChange={handleCategoryChange}
              userArchetypeCategory={userArchetypeCategory}
              userArchetype={user?.archetype}
            />

            {/* Difficulty Selection */}
            <DifficultySelector
              selectedDifficulty={formData.difficulty}
              onDifficultyChange={handleDifficultyChange}
            />

            {/* XP Preview */}
            <XPRewardPreview
              baseXp={baseXp}
              bonusMultiplier={bonusMultiplier}
              xpReward={xpReward}
              userArchetypeCategory={userArchetypeCategory}
              selectedCategory={formData.category}
              userArchetype={user?.archetype}
            />

            {/* Frequency */}
            <FrequencySelector
              frequencyType={formData.frequencyType}
              selectedDays={formData.selectedDays}
              onFrequencyTypeChange={handleFrequencyTypeChange}
              onDayToggle={toggleDaySelection}
            />

            {/* Notifications */}
            <NotificationSettings
              notificationsEnabled={formData.notificationsEnabled}
              notificationTime={formData.notificationTime}
              onNotificationToggle={handleNotificationToggle}
              onTimeChange={handleNotificationTimeChange}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              startIcon={<FlashOn />}
              sx={{
                py: 2,
                fontSize: '1.125rem'
              }}
            >
              {isEditMode ? 'UPDATE HABIT' : 'CREATE HABIT'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHabitModal;
