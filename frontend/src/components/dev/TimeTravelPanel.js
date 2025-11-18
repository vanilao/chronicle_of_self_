import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Tooltip,
  Collapse
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Refresh,
  Schedule,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { useTimeTravel } from '../../contexts/TimeTravelContext';

const TimeTravelPanel = () => {
  const { currentDate, currentDateString, advanceDay, rewindDay, resetToToday } = useTimeTravel();
  const [isExpanded, setIsExpanded] = useState(true);

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const isToday = currentDateString === todayString;

  const formatDisplayDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        border: '3px solid black',
        boxShadow: '6px 6px 0px rgba(0,0,0,1)',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper'
      }}
    >
      {/* Header - Always visible */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1.5,
          bgcolor: 'primary.main',
          cursor: 'pointer',
          borderBottom: isExpanded ? '2px solid black' : 'none'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Schedule sx={{ fontSize: 20, color: 'text.primary' }} />
          <Typography
            sx={{
              fontFamily: 'VT323, monospace',
              fontSize: '1rem',
              color: 'text.primary'
            }}
          >
            TIME TRAVEL
          </Typography>
        </Box>
        {isExpanded ? (
          <ExpandMore sx={{ fontSize: 20, color: 'text.primary' }} />
        ) : (
          <ExpandLess sx={{ fontSize: 20, color: 'text.primary' }} />
        )}
      </Box>

      {/* Expandable content */}
      <Collapse in={isExpanded}>
        <Box sx={{ p: 2 }}>
          {/* Current Date Display */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.625rem',
                color: 'text.secondary',
                textTransform: 'uppercase',
                mb: 0.5
              }}
            >
              Current Date
            </Typography>
            <Typography
              sx={{
                fontFamily: 'VT323, monospace',
                fontSize: '1.25rem',
                color: isToday ? 'text.primary' : 'secondary.main'
              }}
            >
              {formatDisplayDate(currentDate)}
            </Typography>
            {!isToday && (
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.625rem',
                  color: 'secondary.main',
                  mt: 0.5
                }}
              >
                (Time Shifted)
              </Typography>
            )}
          </Box>

          {/* Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Tooltip title="Previous Day" arrow>
              <IconButton
                onClick={rewindDay}
                size="small"
                sx={{
                  bgcolor: 'background.default',
                  border: '2px solid black',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'primary.main'
                  }
                }}
              >
                <ChevronLeft sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Reset to Today" arrow>
              <IconButton
                onClick={resetToToday}
                size="small"
                disabled={isToday}
                sx={{
                  bgcolor: isToday ? 'background.default' : 'tertiary.main',
                  border: '2px solid black',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'tertiary.main'
                  },
                  '&:disabled': {
                    opacity: 0.5
                  }
                }}
              >
                <Refresh sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Next Day" arrow>
              <IconButton
                onClick={advanceDay}
                size="small"
                sx={{
                  bgcolor: 'background.default',
                  border: '2px solid black',
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: 'primary.main'
                  }
                }}
              >
                <ChevronRight sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Help text */}
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.5rem',
              color: 'text.secondary',
              textAlign: 'center',
              mt: 1.5,
              opacity: 0.7
            }}
          >
            Use to test habits on different dates
          </Typography>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default TimeTravelPanel;
