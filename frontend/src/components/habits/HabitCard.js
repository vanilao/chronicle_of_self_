import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Grid
} from '@mui/material';
import {
  FitnessCenter,
  MenuBook,
  SelfImprovement,
  Palette,
  LocalFireDepartment,
  Delete,
  Edit,
  Check
} from '@mui/icons-material';
import { useHabits } from '../../contexts/HabitsContext';
import { useTimeTravel } from '../../contexts/TimeTravelContext';

const HabitCard = ({ habit, onEdit }) => {
  const { toggleHabitCompletion, deleteHabit, getHabitStreak } = useHabits();
  const { currentDate, currentDateString } = useTimeTravel();

  const categoryIcons = {
    Body: FitnessCenter,
    Mind: MenuBook,
    Spirit: SelfImprovement,
    Creative: Palette
  };

  const Icon = categoryIcons[habit.category] || FitnessCenter;
  const streak = getHabitStreak(habit);

  // Get last 7 days for weekly view
  const getLast7Days = () => {
    const days = [];
    const today = new Date(currentDate);

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }

    return days;
  };

  const last7Days = getLast7Days();
  const todayStr = currentDateString;

  const handleToggleDay = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    // Only allow toggling today
    if (dateStr === todayStr) {
      toggleHabitCompletion(habit.id, dateStr);
    }
  };

  const isDayCompleted = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return habit.completionHistory?.[dateStr] || false;
  };

  const isToday = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return dateStr === todayStr;
  };

  const completedToday = isDayCompleted(new Date(currentDate));

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return { bg: '#dcfce7', color: '#166534' };
      case 'Medium': return { bg: '#fef9c3', color: '#854d0e' };
      case 'Hard': return { bg: '#fee2e2', color: '#991b1b' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 2.5 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          {/* Left: Icon + Info */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1 }}>
            <Box
              sx={{
                bgcolor: 'primary.main',
                p: 1.5,
                borderRadius: 2,
                border: '3px solid black',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)'
              }}
            >
              <Icon sx={{ fontSize: 24, color: 'text.primary' }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  color: 'text.primary',
                  mb: 1
                }}
              >
                {habit.name}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
                {/* Category Badge */}
                <Chip
                  label={habit.category}
                  size="small"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    bgcolor: 'background.default',
                    border: '2px solid black',
                    borderRadius: 1
                  }}
                />

                {/* Difficulty Badge */}
                <Chip
                  label={habit.difficulty}
                  size="small"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    bgcolor: getDifficultyColor(habit.difficulty).bg,
                    color: getDifficultyColor(habit.difficulty).color,
                    border: '2px solid black',
                    borderRadius: 1
                  }}
                />

                {/* XP Badge */}
                <Chip
                  label={`+${habit.xpReward} XP`}
                  size="small"
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    bgcolor: 'primary.main',
                    color: 'text.primary',
                    border: '2px solid black',
                    borderRadius: 1
                  }}
                />

                {/* Streak */}
                {streak > 0 && (
                  <Chip
                    icon={<LocalFireDepartment sx={{ fontSize: 12 }} />}
                    label={`${streak} day${streak !== 1 ? 's' : ''}`}
                    size="small"
                    sx={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.75rem',
                      bgcolor: '#ffedd5',
                      color: '#9a3412',
                      border: '2px solid black',
                      borderRadius: 1,
                      '& .MuiChip-icon': {
                        color: '#9a3412'
                      }
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>

          {/* Right: Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, ml: 1 }}>
            {onEdit && (
              <IconButton
                onClick={() => onEdit(habit)}
                size="small"
                sx={{
                  bgcolor: 'background.default',
                  border: '3px solid black',
                  borderRadius: 2,
                  boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                  '&:hover': {
                    bgcolor: 'background.default',
                    transform: 'translate(2px, 2px)',
                    boxShadow: '2px 2px 0px rgba(0,0,0,1)'
                  }
                }}
              >
                <Edit sx={{ fontSize: 16, color: 'text.primary' }} />
              </IconButton>
            )}

            <IconButton
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this habit?')) {
                  deleteHabit(habit.id);
                }
              }}
              size="small"
              sx={{
                bgcolor: '#fee2e2',
                border: '3px solid black',
                borderRadius: 2,
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                '&:hover': {
                  bgcolor: '#fee2e2',
                  transform: 'translate(2px, 2px)',
                  boxShadow: '2px 2px 0px rgba(0,0,0,1)'
                }
              }}
            >
              <Delete sx={{ fontSize: 16, color: '#991b1b' }} />
            </IconButton>
          </Box>
        </Box>

        {/* Weekly Progress Grid */}
        <Box sx={{ borderTop: '2px solid black', pt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              LAST 7 DAYS
            </Typography>
            {completedToday && (
              <Chip
                label="DONE TODAY"
                size="small"
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  bgcolor: 'secondary.main',
                  color: 'text.primary',
                  border: '2px solid black',
                  borderRadius: 1
                }}
              />
            )}
          </Box>

          <Grid container spacing={1}>
            {last7Days.map((date, index) => {
              const completed = isDayCompleted(date);
              const today = isToday(date);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dayNum = date.getDate();

              return (
                <Grid size={{ xs: 12 / 7 }} key={index}>
                  <Box
                    onClick={() => handleToggleDay(date)}
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      border: '3px solid black',
                      boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                      bgcolor: completed ? 'secondary.main' : 'background.default',
                      opacity: completed ? 1 : 0.6,
                      outline: today ? '2px solid' : 'none',
                      outlineColor: 'primary.main',
                      cursor: today ? 'pointer' : 'default',
                      transition: 'all 0.2s',
                      '&:hover': today ? {
                        transform: 'scale(1.05)'
                      } : {}
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                      <Typography
                        sx={{
                          fontFamily: '"IBM Plex Mono", monospace',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: 'text.primary'
                        }}
                      >
                        {dayName}
                      </Typography>
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: 2,
                          border: '2px solid black',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: completed ? 'text.primary' : 'background.default'
                        }}
                      >
                        {completed ? (
                          <Check sx={{ fontSize: 20, color: 'background.default' }} />
                        ) : (
                          <Typography
                            sx={{
                              fontFamily: '"IBM Plex Mono", monospace',
                              fontSize: '0.75rem',
                              color: 'text.secondary'
                            }}
                          >
                            {dayNum}
                          </Typography>
                        )}
                      </Box>
                      {today && (
                        <Typography
                          sx={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            fontSize: '0.625rem',
                            fontWeight: 700,
                            color: 'secondary.main'
                          }}
                        >
                          TODAY
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HabitCard;
