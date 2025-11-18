import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Chip,
  Switch,
  FormControlLabel,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import {
  Close,
  FitnessCenter,
  MenuBook,
  SelfImprovement,
  Palette,
  FlashOn
} from '@mui/icons-material';
import { useHabits } from '../../contexts/HabitsContext';
import { useAuth } from '../../contexts/AuthContext';

const defaultFormState = {
  name: '',
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

  const categories = [
    { name: 'Body', icon: FitnessCenter },
    { name: 'Mind', icon: MenuBook },
    { name: 'Spirit', icon: SelfImprovement },
    { name: 'Creative', icon: Palette }
  ];

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

  const weekdayOptions = [
    { key: 'Mon', label: 'Mon' },
    { key: 'Tue', label: 'Tue' },
    { key: 'Wed', label: 'Wed' },
    { key: 'Thu', label: 'Thu' },
    { key: 'Fri', label: 'Fri' },
    { key: 'Sat', label: 'Sat' },
    { key: 'Sun', label: 'Sun' }
  ];

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

            {/* Category Selection */}
            <Box>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  mb: 1.5
                }}
              >
                CATEGORY
              </Typography>
              <Grid container spacing={1.5}>
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = formData.category === cat.name;
                  const hasBonus = userArchetypeCategory && cat.name === userArchetypeCategory;

                  return (
                    <Grid size={{ xs: 6, md: 3 }} key={cat.name}>
                      <Box
                        onClick={() => setFormData({ ...formData, category: cat.name })}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: '3px solid black',
                          boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                          bgcolor: 'primary.main',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                          outline: isSelected ? '4px solid' : 'none',
                          outlineColor: 'text.primary',
                          opacity: isSelected ? 1 : 0.7,
                          '&:hover': {
                            opacity: 1
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                          <Icon sx={{ fontSize: 32, color: 'text.primary' }} />
                          <Typography
                            sx={{
                              fontFamily: '"IBM Plex Mono", monospace',
                              fontSize: '0.875rem',
                              fontWeight: 700,
                              color: 'text.primary'
                            }}
                          >
                            {cat.name}
                          </Typography>
                          {hasBonus && (
                            <Chip
                              label="+25% XP"
                              size="small"
                              sx={{
                                fontFamily: '"IBM Plex Mono", monospace',
                                fontSize: '0.625rem',
                                bgcolor: 'background.default',
                                border: '1px solid black',
                                height: 20
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
              {userArchetypeCategory && (
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    mt: 1
                  }}
                >
                  {bonusActive
                    ? `Matching your ${user?.archetype || 'archetype'}! +25% XP applied.`
                    : `Choose ${userArchetypeCategory} to earn +25% XP with your ${user?.archetype || 'archetype'}.`}
                </Typography>
              )}
            </Box>

            {/* Difficulty Selection */}
            <Box>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  mb: 1.5
                }}
              >
                DIFFICULTY
              </Typography>
              <Grid container spacing={1.5}>
                {difficulties.map((diff) => {
                  const isSelected = formData.difficulty === diff.name;

                  return (
                    <Grid size={{ xs: 4 }} key={diff.name}>
                      <Box
                        onClick={() => setFormData({ ...formData, difficulty: diff.name })}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: '3px solid black',
                          boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                          bgcolor: isSelected ? 'secondary.main' : 'background.default',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                          outline: isSelected ? '4px solid' : 'none',
                          outlineColor: 'text.primary',
                          opacity: isSelected ? 1 : 0.7,
                          '&:hover': {
                            opacity: 1
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            color: 'text.primary',
                            mb: 0.5
                          }}
                        >
                          {diff.name.toUpperCase()}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.75rem',
                            color: 'text.secondary'
                          }}
                        >
                          +{diff.xp} XP
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            {/* XP Preview */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: '3px solid black',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                bgcolor: 'background.default'
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
                XP REWARD
              </Typography>
              <Box className="space-y-1">
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                  Base XP: {baseXp}
                </Typography>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                  Class Bonus: {userArchetypeCategory
                    ? bonusActive ? '+25% (matching archetype)' : 'No bonus applied'
                    : 'Select an archetype to unlock class bonuses'}
                </Typography>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '1rem', fontWeight: 700, color: 'text.primary' }}>
                  Total Reward: +{xpReward} XP
                </Typography>
              </Box>
            </Box>

            {/* Frequency */}
            <Box>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  mb: 1.5
                }}
              >
                FREQUENCY
              </Typography>
              <ToggleButtonGroup
                value={formData.frequencyType}
                exclusive
                onChange={(e, value) => value && setFormData(prev => ({
                  ...prev,
                  frequencyType: value,
                  frequency: value === 'Daily' ? 'Daily' : 'Weekly'
                }))}
                fullWidth
                sx={{ mb: 2 }}
              >
                <ToggleButton
                  value="Daily"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 700,
                    border: '3px solid black',
                    '&.Mui-selected': {
                      bgcolor: 'secondary.main',
                      '&:hover': {
                        bgcolor: 'secondary.main'
                      }
                    }
                  }}
                >
                  DAILY
                </ToggleButton>
                <ToggleButton
                  value="Specific Days"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: 700,
                    border: '3px solid black',
                    '&.Mui-selected': {
                      bgcolor: 'secondary.main',
                      '&:hover': {
                        bgcolor: 'secondary.main'
                      }
                    }
                  }}
                >
                  SPECIFIC DAYS
                </ToggleButton>
              </ToggleButtonGroup>

              {formData.frequencyType === 'Specific Days' && (
                <Box>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary', mb: 1 }}>
                    Select the days you want this habit to run.
                  </Typography>
                  <Grid container spacing={1}>
                    {weekdayOptions.map(day => {
                      const isSelected = formData.selectedDays.includes(day.key);
                      return (
                        <Grid size={{ xs: 3, sm: 12 / 7 }} key={day.key}>
                          <Button
                            onClick={() => toggleDaySelection(day.key)}
                            fullWidth
                            variant={isSelected ? "contained" : "outlined"}
                            sx={{
                              fontFamily: '"IBM Plex Mono", monospace',
                              fontSize: '0.75rem',
                              py: 1,
                              border: '3px solid black',
                              bgcolor: isSelected ? 'primary.main' : 'background.default',
                              color: 'text.primary',
                              '&:hover': {
                                bgcolor: isSelected ? 'primary.main' : 'background.default'
                              }
                            }}
                          >
                            {day.label}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              )}
            </Box>

            {/* Notifications */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: '3px solid black',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                bgcolor: 'background.default'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: '0.875rem', color: 'text.primary' }}>
                    NOTIFICATIONS (COMING SOON)
                  </Typography>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                    Set a reminder time now; push alerts will arrive in a future update.
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      name="notificationsEnabled"
                      checked={formData.notificationsEnabled}
                      onChange={handleChange}
                    />
                  }
                  label=""
                />
              </Box>

              <TextField
                id="notificationTime"
                name="notificationTime"
                type="time"
                label="REMINDER TIME"
                fullWidth
                value={formData.notificationTime}
                onChange={handleChange}
                disabled={!formData.notificationsEnabled}
                InputLabelProps={{
                  sx: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: '0.75rem' }
                }}
              />
            </Box>

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
