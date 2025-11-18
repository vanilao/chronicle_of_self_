import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';

const HeatmapCalendar = ({ data, maxValue }) => {
  // Group data by weeks
  const weeks = [];
  let currentWeek = [];

  data.forEach((day, index) => {
    currentWeek.push(day);

    const date = new Date(day.date);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 6 || index === data.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  // Ensure first week starts on Sunday
  if (weeks.length > 0 && weeks[0].length < 7) {
    const firstDate = new Date(weeks[0][0].date);
    const firstDayOfWeek = firstDate.getDay();

    for (let i = 0; i < firstDayOfWeek; i++) {
      weeks[0].unshift(null);
    }
  }

  // Get color intensity based on completion rate
  const getColorIntensity = (completionRate) => {
    if (!completionRate || completionRate === 0) return 'rgba(156, 163, 175, 0.2)';
    if (completionRate < 25) return 'rgba(168, 216, 255, 0.2)';
    if (completionRate < 50) return 'rgba(168, 216, 255, 0.4)';
    if (completionRate < 75) return 'rgba(168, 216, 255, 0.6)';
    if (completionRate < 100) return 'rgba(168, 216, 255, 0.8)';
    return '#A8D8FF';
  };

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Box className="space-y-2">
      {/* Day labels */}
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Box sx={{ width: 24 }} /> {/* Spacer */}
        {dayLabels.map((label, index) => (
          <Box key={index} sx={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Heatmap grid */}
      <Box className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <Box key={weekIndex} sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            {/* Week number */}
            <Box sx={{ width: 24, textAlign: 'right' }}>
              <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
                {weekIndex + 1}
              </Typography>
            </Box>

            {/* Days in week */}
            {week.map((day, dayIndex) => {
              if (!day) {
                return <Box key={`empty-${dayIndex}`} sx={{ width: 24, height: 24 }} />;
              }

              const date = new Date(day.date);
              const dayNum = date.getDate();
              const monthName = date.toLocaleDateString('en-US', { month: 'short' });

              return (
                <Tooltip
                  key={dayIndex}
                  title={
                    <Box sx={{ p: 0.5 }}>
                      <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', fontWeight: 700 }}>
                        {monthName} {dayNum}
                      </Typography>
                      <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem' }}>
                        {day.completedCount}/{day.totalHabits} habits
                      </Typography>
                      <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', fontWeight: 700, color: 'primary.main' }}>
                        {Math.round(day.completionRate)}%
                      </Typography>
                    </Box>
                  }
                  arrow
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      border: '1px solid black',
                      borderRadius: 1,
                      bgcolor: getColorIntensity(day.completionRate),
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.25)',
                        zIndex: 10
                      }
                    }}
                  />
                </Tooltip>
              );
            })}
          </Box>
        ))}
      </Box>

      {/* Legend */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 1 }}>
        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
          Less
        </Typography>
        {[0, 25, 50, 75, 100, 101].map((rate, index) => (
          <Box
            key={index}
            sx={{
              width: 16,
              height: 16,
              border: '1px solid black',
              borderRadius: 1,
              bgcolor: getColorIntensity(rate)
            }}
          />
        ))}
        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
          More
        </Typography>
      </Box>
    </Box>
  );
};

export default HeatmapCalendar;
