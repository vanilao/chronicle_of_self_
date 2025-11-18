import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  TextField,
  LinearProgress,
  Chip,
  Divider,
  Alert
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  EmojiEvents,
  LocalFireDepartment,
  Star,
  FitnessCenter,
  MenuBook,
  Favorite,
  Palette
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useHabits } from '../../contexts/HabitsContext';
import { getXPForNextLevel, getTotalXPForLevel } from '../../utils/levelingSystem';

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { habits, getHabitStreak } = useHabits();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  // Calculate stats from habits
  const stats = useMemo(() => {
    let totalCompleted = 0;
    let longestStreak = 0;

    habits.forEach(habit => {
      // Count total completions
      if (habit.completionHistory) {
        totalCompleted += Object.values(habit.completionHistory).filter(Boolean).length;
      }

      // Find longest streak
      const streak = getHabitStreak(habit.id);
      if (streak > longestStreak) {
        longestStreak = streak;
      }
    });

    return { totalCompleted, longestStreak };
  }, [habits, getHabitStreak]);

  const archetypeIcons = {
    warrior: FitnessCenter,
    sage: MenuBook,
    monk: Favorite,
    artisan: Palette
  };

  const archetypeColors = {
    warrior: 'secondary.main',
    sage: 'primary.main',
    monk: 'tertiary.main',
    artisan: 'background.paper'
  };

  const ArchetypeIcon = archetypeIcons[user?.archetype?.toLowerCase()] || Star;

  const handleSave = () => {
    updateUser(editedUser);
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCancel = () => {
    setEditedUser({
      username: user?.username || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  // Calculate XP progress using proper leveling system
  const currentXP = user?.currentXP || 0;
  const level = user?.level || 1;
  const xpForNextLevel = getXPForNextLevel(level);
  const xpProgress = xpForNextLevel > 0 ? (currentXP / xpForNextLevel) * 100 : 0;
  const totalXP = getTotalXPForLevel(level) + currentXP;

  return (
    <Box className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'VT323, monospace',
          fontSize: { xs: '2.5rem', md: '3rem' },
          color: 'text.primary',
          mb: 6
        }}
      >
        PROFILE
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 4, fontFamily: '"IBM Plex Mono", monospace' }}>
          {successMessage}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 4 }} className="space-y-4">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: archetypeColors[user?.archetype?.toLowerCase()] || 'primary.main',
                    border: '3px solid black',
                    boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                    fontFamily: 'VT323, monospace',
                    fontSize: '2rem'
                  }}
                >
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      value={editedUser.username}
                      onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '1.5rem',
                        color: 'text.primary'
                      }}
                    >
                      {user?.username || 'Adventurer'}
                    </Typography>
                  )}
                  <Chip
                    icon={<ArchetypeIcon sx={{ fontSize: 16 }} />}
                    label={user?.archetype || 'No Class'}
                    size="small"
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.75rem',
                      bgcolor: archetypeColors[user?.archetype?.toLowerCase()] || 'background.paper',
                      border: '2px solid black'
                    }}
                  />
                </Box>
              </Box>

              <Divider />

              {/* Email */}
              <Box>
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.secondary',
                    mb: 0.5
                  }}
                >
                  EMAIL
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    size="small"
                  />
                ) : (
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      color: 'text.primary'
                    }}
                  >
                    {user?.email || 'No email set'}
                  </Typography>
                )}
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                {isEditing ? (
                  <>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<Save />}
                      onClick={handleSave}
                      sx={{ flex: 1 }}
                    >
                      SAVE
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      sx={{
                        flex: 1,
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        '&:hover': { bgcolor: 'background.paper' }
                      }}
                    >
                      CANCEL
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => setIsEditing(true)}
                    fullWidth
                  >
                    EDIT PROFILE
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent sx={{ p: 4 }} className="space-y-4">
              <Typography
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: '1.25rem',
                  color: 'text.primary'
                }}
              >
                CHARACTER STATS
              </Typography>

              {/* Level & XP */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.875rem',
                      color: 'text.primary'
                    }}
                  >
                    Level {level}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.875rem',
                      color: 'text.secondary'
                    }}
                  >
                    {currentXP} / {xpForNextLevel} XP
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={xpProgress}
                  sx={{
                    height: 12,
                    borderRadius: 2,
                    border: '2px solid black',
                    bgcolor: 'background.default',
                    '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' }
                  }}
                />
              </Box>

              <Divider />

              {/* Quick Stats */}
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Box
                    sx={{
                      bgcolor: 'background.default',
                      p: 2,
                      borderRadius: 2,
                      border: '2px solid black',
                      textAlign: 'center'
                    }}
                  >
                    <EmojiEvents sx={{ fontSize: 24, color: 'primary.main', mb: 1 }} />
                    <Typography
                      sx={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '1.5rem',
                        color: 'text.primary'
                      }}
                    >
                      {user?.achievements?.length || 0}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.625rem',
                        color: 'text.secondary'
                      }}
                    >
                      ACHIEVEMENTS
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box
                    sx={{
                      bgcolor: 'background.default',
                      p: 2,
                      borderRadius: 2,
                      border: '2px solid black',
                      textAlign: 'center'
                    }}
                  >
                    <LocalFireDepartment sx={{ fontSize: 24, color: '#f97316', mb: 1 }} />
                    <Typography
                      sx={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '1.5rem',
                        color: 'text.primary'
                      }}
                    >
                      {stats.longestStreak}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.625rem',
                        color: 'text.secondary'
                      }}
                    >
                      BEST STREAK
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box
                    sx={{
                      bgcolor: 'background.default',
                      p: 2,
                      borderRadius: 2,
                      border: '2px solid black',
                      textAlign: 'center'
                    }}
                  >
                    <Star sx={{ fontSize: 24, color: 'secondary.main', mb: 1 }} />
                    <Typography
                      sx={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '1.5rem',
                        color: 'text.primary'
                      }}
                    >
                      {stats.totalCompleted}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.625rem',
                        color: 'text.secondary'
                      }}
                    >
                      COMPLETED
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box
                    sx={{
                      bgcolor: 'background.default',
                      p: 2,
                      borderRadius: 2,
                      border: '2px solid black',
                      textAlign: 'center'
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'VT323, monospace',
                        fontSize: '1.5rem',
                        color: 'text.primary',
                        mb: 1
                      }}
                    >
                      {totalXP}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.625rem',
                        color: 'text.secondary'
                      }}
                    >
                      TOTAL XP
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
