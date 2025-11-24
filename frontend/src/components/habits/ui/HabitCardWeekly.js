import React from 'react';
import { Box, Grid, Typography, Chip } from '@mui/material';
import { Check } from 'lucide-react';
import { getCompletionCount } from '../../../utils/habitHelpers';

const HabitCardWeekly = ({ 
  last5Days, 
  isDayCompleted, 
  isToday, 
  handleToggleDay, 
  completedToday, 
  loading,
  habit,
  getTodayCompletionCount
}) => {
  // Helper function to get completion count for a specific day
  const getDayCompletionCount = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return getCompletionCount(habit.completionHistory, dateStr);
  };

  const targetCompletions = habit.targetCompletions || 1;

  // Custom circular progress component
  const CircularProgressIndicator = ({ completed, total, size = 20 }) => {
    const strokeWidth = 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const segmentLength = circumference / total;

    return (
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle with segments */}
        {Array.from({ length: total }).map((_, index) => (
          <circle
            key={`bg-${index}`}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
            strokeDashoffset={-index * segmentLength}
            strokeLinecap="butt"
          />
        ))}
        {/* Progress segments */}
        {Array.from({ length: completed }).map((_, index) => (
          <circle
            key={`progress-${index}`}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
            strokeDashoffset={-index * segmentLength}
            strokeLinecap="butt"
          />
        ))}
      </svg>
    );
  };

  return (
    <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.1)', pt: 1, mt: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.625rem',
            fontWeight: 700,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: 0.5
          }}
        >
          Recent Activity
        </Typography>
        {completedToday && (
          <Chip
            label="✓ Done"
            size="small"
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              height: 20,
              bgcolor: 'success.main',
              color: 'white',
              borderRadius: 0.5,
              fontSize: '0.625rem'
            }}
          />
        )}
      </Box>

      <Grid container spacing={1}>
        {last5Days.map((date, index) => {
          const completed = isDayCompleted(date);
          const today = isToday(date);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 3);
          const dayNum = date.getDate();
          const dayCompletionCount = getDayCompletionCount(date);

          return (
            <Grid size={{ xs: 12 / 5 }} key={index}>
              <Box
                onClick={() => !loading && handleToggleDay(date)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && today && !loading) {
                    e.preventDefault();
                    handleToggleDay(date);
                  }
                }}
                role="button"
                tabIndex={today ? 0 : -1}
                aria-label={`Toggle habit completion for ${dayName}, ${dayNum}${completed ? ' (completed)' : ''}`}
                aria-pressed={completed}
                aria-disabled={!today || loading}
                sx={{
                  p: 1,
                  borderRadius: 0.5,
                  border: today ? '1px solid #9e9e9e' : '1px solid rgba(0,0,0,0.2)',
                  bgcolor: completed ? 'secondary.main' : 'background.paper',
                  opacity: completed ? 1 : today ? 1 : 0.5,
                  cursor: today && !loading ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                  minHeight: today ? '64px' : '56px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.5,
                  position: 'relative',
                  boxShadow: today ? '3px 3px 0px rgba(0,0,0,1)' : 'none',
                  '&:hover': today && !loading ? {
                    transform: 'translateY(-1px)',
                    boxShadow: '2px 2px 0px rgba(0,0,0,1)'
                  } : {}
                }}
              >
                {loading && today && (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 0.5,
                    zIndex: 2
                  }}>
                    <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.5rem' }}>
                      ...
                    </Typography>
                  </Box>
                )}
                
                {/* Day indicator */}
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    color: completed ? 'white' : today ? '#9e9e9e' : 'text.secondary',
                    textTransform: 'uppercase',
                    letterSpacing: 0.25
                  }}
                >
                  {dayName}
                </Typography>

                {/* Completion indicator */}
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: completed ? '2px solid white' : '1px solid rgba(0,0,0,0.3)',
                    bgcolor: completed ? 'transparent' : 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: completed ? 'white' : 'text.secondary'
                  }}
                >
                  {completed ? (
                    <Check size={12} />
                  ) : targetCompletions > 1 ? (
                    <CircularProgressIndicator 
                      completed={dayCompletionCount} 
                      total={targetCompletions} 
                      size={16} 
                    />
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.5rem',
                        fontWeight: 700
                      }}
                    >
                      {dayNum}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HabitCardWeekly;
