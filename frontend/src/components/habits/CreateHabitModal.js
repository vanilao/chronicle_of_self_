import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import { Zap, Sparkles } from 'lucide-react';
import { useHabits } from '../../contexts/HabitsContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  EssentialDetailsStep,
  PersonalizationStep,
  HabitTemplateSelector
} from './form';
import { DEFAULT_HABIT_VALUES, DIFFICULTY_LEVELS } from '../../constants/habitConstants';
import {
  validateHabitName,
  validateHabitDescription,
  validateTargetCompletions
} from '../../utils/habitHelpers';
import ErrorSnackbar from './ui/components/feedback/ErrorSnackbar';
import CloseModalButton from './ui/components/modals/CloseModalButton';

const defaultFormState = DEFAULT_HABIT_VALUES;

const CreateHabitModal = ({ isOpen, onClose, habitToEdit = null }) => {
  const { addHabit, updateHabit } = useHabits();
  const { user } = useAuth();
  const [formData, setFormData] = useState(defaultFormState);
  const [showTemplates, setShowTemplates] = useState(!habitToEdit); // Show templates for new habits
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = Boolean(habitToEdit);

  // Validation function using helper functions
  const validateForm = () => {
    const errors = {};

    // Name validation using helper
    const nameError = validateHabitName(formData.name);
    if (nameError) {
      errors.name = nameError;
    }

    // Description validation using helper
    const descriptionError = validateHabitDescription(formData.description);
    if (descriptionError) {
      errors.description = descriptionError;
    }

    // Target completions validation using helper
    const targetError = validateTargetCompletions(formData.targetCompletions);
    if (targetError) {
      errors.targetCompletions = targetError;
    }

    // Frequency validation
    if (formData.frequencyType === 'Weekly' && (!formData.selectedDays || formData.selectedDays.length === 0)) {
      errors.frequency = 'Please select at least one day for weekly habits';
    }

    return errors;
  };

  // Smart defaults based on category
  const getSmartDefaults = (category) => {
    const defaults = {
      'Body': { difficulty: 'Medium', targetCompletions: 1 },
      'Mind': { difficulty: 'Easy', targetCompletions: 1 },
      'Spirit': { difficulty: 'Easy', targetCompletions: 1 },
      'Creative': { difficulty: 'Medium', targetCompletions: 1 }
    };
    return defaults[category] || { difficulty: 'Medium', targetCompletions: 1 };
  };

  // Real-time validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Category change with smart defaults
  const handleCategoryChange = (category) => {
    setFormData(prev => {
      const smartDefaults = getSmartDefaults(category);
      return {
        ...prev,
        category,
        ...smartDefaults
      };
    });
    
    // Clear category error
    if (formErrors.category) {
      setFormErrors(prev => ({
        ...prev,
        category: ''
      }));
    }
  };

  const handleTemplateSelect = (templateData) => {
    setFormData(templateData);
    setShowTemplates(false);
  };

  const handleStartFromScratch = () => {
    setShowTemplates(false);
  };

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
        notificationTime: habitToEdit.notificationTime || '08:00',
        targetCompletions: habitToEdit.targetCompletions || 1,
        customIcon: habitToEdit.customIcon || '',
        useCustomIcon: habitToEdit.useCustomIcon || false,
        iconColor: habitToEdit.iconColor || ''
      });
      setShowTemplates(false); // Don't show templates for editing
    } else {
      setFormData(defaultFormState);
      setShowTemplates(true); // Show templates for new habits
    }
  }, [isOpen, habitToEdit]);

  const userArchetypeCategory = user?.archetypeCategory;
  const selectedDifficulty = DIFFICULTY_LEVELS.find(d => d.name === formData.difficulty) || DIFFICULTY_LEVELS[1];
  const baseXp = selectedDifficulty?.xp ?? 0;
  const bonusActive = userArchetypeCategory && formData.category === userArchetypeCategory;
  const bonusMultiplier = bonusActive ? 1.25 : 1;
  const xpReward = Math.round(baseXp * bonusMultiplier);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const payload = {
      ...formData,
      xpReward,
      baseXp,
      bonusMultiplier,
      bonusSource: bonusActive ? `${user?.archetype ?? 'Class'} bonus` : null
    };

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        await updateHabit(habitToEdit.id, payload);
      } else {
        await addHabit(payload);
      }

      // Success - reset form and close
      setFormData(defaultFormState);
      setFormErrors({});
      setError(null);
      onClose();
    } catch (error) {
      console.error('Error saving habit:', error);
      
      // Clear any previous snackbar error
      setError(null);
      
      // Handle different error types
      if (error.message.includes('already exists')) {
        setFormErrors({ name: error.message });
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else if (error.message.includes('permission') || error.message.includes('unauthorized')) {
        setError('Permission denied. Please log in again.');
      } else {
        setError(`Failed to ${isEditMode ? 'update' : 'create'} habit. Please try again.`);
        setFormErrors({ name: 'An unexpected error occurred' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDifficultyChange = (difficulty) => {
    setFormData(prev => ({ ...prev, difficulty }));
    // Clear difficulty error
    if (formErrors.difficulty) {
      setFormErrors(prev => ({
        ...prev,
        difficulty: ''
      }));
    }
  };

  const handleFrequencyTypeChange = (frequencyType) => {
    setFormData(prev => ({
      ...prev,
      frequencyType,
      frequency: frequencyType === 'Daily' ? 'Daily' : 'Weekly'
    }));
    // Clear frequency error
    if (formErrors.frequency) {
      setFormErrors(prev => ({
        ...prev,
        frequency: ''
      }));
    }
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
    const notificationTime = e.target.value;
    const timeOfDay = getTimeFromTime(notificationTime);
    
    // Update notification time
    setFormData(prev => ({
      ...prev,
      notificationTime
    }));
    
    // Auto-update time of day and enable notifications
    setFormData(prev => ({
      ...prev,
      timeOfDay,
      notificationsEnabled: true
    }));
  };

  // Helper function to convert time to time period
  const getTimeFromTime = (time) => {
    if (!time) return 'morning';
    
    const hour = parseInt(time.split(':')[0]);
    
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 24) return 'evening';
    return 'night'; // 0-6
  };

  const handleIconSelect = (iconName) => {
    setFormData(prev => ({
      ...prev,
      customIcon: iconName,
      useCustomIcon: !!iconName
    }));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      sx={{ zIndex: 9999 }}
      PaperProps={{
        sx: {
          borderRadius: 2,
          border: '2px solid black',
          boxShadow: '4px 4px 0px rgba(0,0,0,1)',
          bgcolor: 'background.default',
          overflow: 'visible',
          zIndex: 10000,
          maxWidth: '1000px'
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid black',
          pb: 1.5,
          pt: 2
        }}
      >
        <Typography
          component="span"
          sx={{
            fontFamily: 'VT323, monospace',
            fontSize: '1.5rem',
            color: 'text.primary'
          }}
        >
          {isEditMode ? 'EDIT HABIT' : 'CREATE NEW HABIT'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {showTemplates ? (
            <Button
              onClick={() => setShowTemplates(false)}
              variant="outlined"
              sx={{
                py: 0.75,
                px: 1.5,
                fontSize: '0.875rem',
                fontWeight: 700,
                border: '2px solid #e0e0e0',
                boxShadow: '3px 3px 0px rgba(0,0,0,1)',
                fontFamily: 'VT323, monospace',
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: 'background.paper',
                  borderColor: 'text.secondary',
                  boxShadow: '2px 2px 0px rgba(0,0,0,1)',
                }
              }}
            >
              Start from Scratch
            </Button>
          ) : (
            <>
              <Button
                onClick={() => setShowTemplates(true)}
                variant="outlined"
                sx={{
                  py: 0.75,
                  px: 1.5,
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  border: '2px solid #e0e0e0',
                  boxShadow: '3px 3px 0px rgba(0,0,0,1)',
                  fontFamily: 'VT323, monospace',
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: 'background.paper',
                    borderColor: 'text.secondary',
                    boxShadow: '2px 2px 0px rgba(0,0,0,1)',
                  }
                }}
              >
                Go Back
              </Button>
              <Button
                type="submit"
                form="habit-form"
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                startIcon={
  isSubmitting ? 
    <CircularProgress 
      size={16} 
      thickness={4}
      sx={{
        color: 'inherit'
      }}
    /> : 
    <Zap size={16} />
}
                sx={{
                  py: 0.75,
                  px: 1.5,
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  border: '2px solid black',
                  boxShadow: '3px 3px 0px rgba(0,0,0,1)',
                  fontFamily: 'VT323, monospace',
                  '&:hover': {
                    boxShadow: '2px 2px 0px rgba(0,0,0,1)',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'rgba(0,0,0,0.12)',
                    color: 'rgba(0,0,0,0.26)',
                    borderColor: 'rgba(0,0,0,0.12)',
                    boxShadow: '1px 1px 0px rgba(0,0,0,0.5)',
                    animation: isSubmitting ? 'pulse 1.5s ease-in-out infinite' : 'none',
                    '@keyframes pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.7 },
                      '100%': { opacity: 1 }
                    }
                  }
                }}
              >
                {isSubmitting ? 'SAVING...' : (isEditMode ? 'UPDATE' : 'CREATE')}
              </Button>
            </>
          )}
          <CloseModalButton onClick={onClose} />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 2, pb: 0.5, overflow: 'visible' }}>
        <form id="habit-form" onSubmit={handleSubmit}>
          {showTemplates ? (
            <HabitTemplateSelector
              onTemplateSelect={handleTemplateSelect}
              onClose={handleStartFromScratch}
            />
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pb: 1, mt: 2.5 }}>
              
              {/* Essential Details Section */}
              <Box sx={{
                p: 2,
                border: '2px dashed #e0e0e0',
                borderRadius: 1,
                bgcolor: 'background.paper',
                boxShadow: '1px 1px 0px rgba(0,0,0,0.1)'
              }}>
                <Typography
                  component="span"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: 'text.primary',
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    textTransform: 'uppercase',
                    letterSpacing: 1
                  }}
                >
                  <Zap size={16} />
                  ESSENTIAL DETAILS
                  <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'primary.main' }} />
                </Typography>
                
                <EssentialDetailsStep 
                  formData={formData}
                  formErrors={formErrors}
                  handleChange={handleChange}
                  handleCategoryChange={handleCategoryChange}
                  handleDifficultyChange={handleDifficultyChange}
                  handleFrequencyTypeChange={handleFrequencyTypeChange}
                  toggleDaySelection={toggleDaySelection}
                  handleNotificationTimeChange={handleNotificationTimeChange}
                  userArchetypeCategory={userArchetypeCategory}
                  userArchetype={user?.archetype}
                  onIconSelect={handleIconSelect}
                  disabled={isSubmitting}
                />
              </Box>

              {/* Personalization Section */}
              <Box sx={{
                p: 2,
                border: '2px dashed #e0e0e0',
                borderRadius: 1,
                bgcolor: 'background.paper',
                boxShadow: '1px 1px 0px rgba(0,0,0,0.1)'
              }}>
                <Typography
                  component="span"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: 'text.primary',
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    textTransform: 'uppercase',
                    letterSpacing: 1
                  }}
                >
                  <Sparkles size={16} />
                  PERSONALIZATION
                  <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'secondary.main' }} />
                </Typography>
                
                <PersonalizationStep
                  formData={formData}
                  onIconSelect={(iconName) => {
                    setFormData(prev => ({
                      ...prev,
                      customIcon: iconName,
                      useCustomIcon: true
                    }));
                  }}
                  onIconColorChange={(color) => {
                    setFormData(prev => ({
                      ...prev,
                      iconColor: color
                    }));
                  }}
                  onIconSkip={() => {
                    setFormData(prev => ({
                      ...prev,
                      customIcon: '',
                      useCustomIcon: false,
                      iconColor: '#666666'
                    }));
                  }}
                  handleNotificationToggle={handleNotificationToggle}
                  handleNotificationTimeChange={handleNotificationTimeChange}
                  baseXp={baseXp}
                  bonusMultiplier={bonusMultiplier}
                  xpReward={xpReward}
                  userArchetypeCategory={userArchetypeCategory}
                  userArchetype={user?.archetype}
                />
              </Box>
            </Box>
          )}
        </form>
      </DialogContent>
      
      <ErrorSnackbar error={error} onClose={() => setError(null)} />
    </Dialog>
  );
};

export default CreateHabitModal;
