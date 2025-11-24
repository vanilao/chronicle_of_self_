import React from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import { Calendar } from 'lucide-react';
import { getCategoryConfig } from '../../../config/categories';
import { IconRenderer } from '../icons';
import HabitCardActions from './HabitCardActions';
import StreakBadge from './components/badges/StreakBadge';

const HabitCardHeader = ({ habit, onEdit, onDelete, loading, streak }) => {
  // Get category configuration
  const categoryConfig = getCategoryConfig(habit.category);
  const CategoryIcon = categoryConfig.icon;
  
  // Determine which icon to use
  const useCustomIcon = habit.customIcon && habit.useCustomIcon;
  const iconName = useCustomIcon ? habit.customIcon : null;
  const iconColor = useCustomIcon ? (habit.iconColor || '#666666') : '#666666';

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return { color: '#4caf50' };
      case 'Medium': return { color: '#ff9800' };
      case 'Hard': return { color: '#f44336' };
      default: return { color: '#666666' };
    }
  };

  const getScheduleInfo = () => {
    const schedule = [];
    schedule.push(`Frequency: ${habit.frequencyType}`);
    
    if (habit.frequencyType === 'Weekly' && habit.selectedDays && habit.selectedDays.length > 0) {
      schedule.push(`Days: ${habit.selectedDays.join(', ')}`);
    }
    
    // Show Time of Day if available
    if (habit.timeOfDay) {
      const timeOfDayLabels = {
        morning: 'Morning (6AM-12PM)',
        afternoon: 'Afternoon (12PM-6PM)', 
        evening: 'Evening (6PM-12AM)',
        night: 'Night (12AM-6AM)'
      };
      schedule.push(`Time: ${timeOfDayLabels[habit.timeOfDay] || habit.timeOfDay}`);
    }
    
    // Always show notification time if available
    if (habit.notificationTime) {
      schedule.push(`Reminder: ${habit.notificationTime}`);
    }
    
    if (habit.targetCompletions > 1) {
      schedule.push(`Target: ${habit.targetCompletions}x per day`);
    }
    
    return schedule.join(' | ');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
      {/* Left: Icon + Info */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            border: `2px solid #e0e0e0`,
            boxShadow: '3px 3px 0px rgba(0,0,0,1)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(1px)',
              boxShadow: '2px 2px 0px rgba(0,0,0,1)'
            }
          }}
        >
          {useCustomIcon ? (
            <IconRenderer 
              iconName={iconName} 
              size={28} 
              color={iconColor}
            />
          ) : (
            <CategoryIcon 
              sx={{ 
                fontSize: 28, 
                color: iconColor,
                transition: 'all 0.2s ease-in-out'
              }} 
            />
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Tooltip
            title={
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {habit.name}
                </Typography>
                {habit.description && (
                  <Typography variant="body2" sx={{ mb: 1, fontStyle: 'italic' }}>
                    {habit.description}
                  </Typography>
                )}
                <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
                  {getScheduleInfo()}
                </Typography>
              </Box>
            }
            arrow
            placement="top"
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'text.primary',
                mb: 0.5,
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                cursor: 'help',
                '&:hover': {
                  color: '#666666'
                }
              }}
            >
              {habit.name}
            </Typography>
          </Tooltip>

          {/* Description */}
          {habit.description && (
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                color: 'text.secondary',
                fontSize: '0.75rem',
                mb: 1,
                lineHeight: 1.3,
                fontStyle: 'italic',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {habit.description}
            </Typography>
          )}

          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 0.75, mb: 1 }}>
            {/* Category Badge */}
            <Chip
              label={habit.category}
              size="small"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.625rem',
                height: 20,
                bgcolor: categoryConfig.bgColor,
                color: categoryConfig.color,
                border: `1px solid ${categoryConfig.borderColor}`,
                borderRadius: 1,
                fontWeight: 600,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: categoryConfig.hoverBg,
                  transform: 'scale(1.05)'
                }
              }}
            />

            {/* Difficulty Badge */}
            <Chip
              label={habit.difficulty}
              size="small"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.625rem',
                height: 20,
                bgcolor: 'transparent',
                color: getDifficultyColor(habit.difficulty).color,
                border: `1px solid ${getDifficultyColor(habit.difficulty).color}`,
                borderRadius: 1
              }}
            />

            {/* XP Badge */}
            <Chip
              label={`+${habit.xpReward} XP`}
              size="small"
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.625rem',
                height: 20,
                bgcolor: 'primary.main',
                color: 'text.primary',
                border: '1px solid black',
                borderRadius: 1
              }}
            />

            {/* Schedule Info Tooltip */}
            <Tooltip
              title={
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Schedule & Timing
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>Frequency:</strong> {habit.frequencyType}
                  </Typography>
                  {habit.frequencyType === 'Weekly' && habit.selectedDays && habit.selectedDays.length > 0 && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Days:</strong> {habit.selectedDays.join(', ')}
                    </Typography>
                  )}
                  {habit.timeOfDay && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Time of Day:</strong> {habit.timeOfDay.charAt(0).toUpperCase() + habit.timeOfDay.slice(1)}
                    </Typography>
                  )}
                  {habit.notificationTime && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Reminder:</strong> {habit.notificationTime}
                    </Typography>
                  )}
                  {habit.targetCompletions > 1 && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Target:</strong> {habit.targetCompletions}x per day
                    </Typography>
                  )}
                  {!habit.notificationTime && (
                    <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.7 }}>
                      No reminders set
                    </Typography>
                  )}
                </Box>
              }
              arrow
              placement="top"
            >
              <Chip
                label="Schedule"
                size="small"
                icon={<Calendar size={14} />}
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.625rem',
                  height: 20,
                  bgcolor: 'white',
                  color: 'black',
                  border: '1px solid black',
                  borderRadius: 1,
                  cursor: 'help',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    transform: 'scale(1.05)'
                  }
                }}
              />
            </Tooltip>

            {/* Streak Badge */}
            <StreakBadge streak={streak} />
          </Box>
        </Box>
      </Box>

      {/* Right: Action Buttons */}
      <HabitCardActions 
        habit={habit}
        onEdit={onEdit}
        onDelete={onDelete}
        loading={loading}
      />
    </Box>
  );
};

export default HabitCardHeader;
