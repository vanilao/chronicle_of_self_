import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { Add, EmojiEvents } from '@mui/icons-material';

const HabitsEmptyState = ({ onCreateHabit }) => {
  return (
    <Card>
      <CardContent sx={{ p: 6, textAlign: 'center' }} className="space-y-6">
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'primary.main',
            p: 2,
            borderRadius: 2,
            border: '3px solid black',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)'
          }}
        >
          <EmojiEvents sx={{ fontSize: 64, color: 'text.primary' }} />
        </Box>

        <Box>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'VT323, monospace',
              fontSize: '1.875rem',
              color: 'text.primary',
              mb: 2
            }}
          >
            NO HABITS YET
          </Typography>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              color: 'text.secondary',
              maxWidth: 400,
              mx: 'auto',
              mb: 3
            }}
          >
            Start your journey by creating your first habit. Build consistency, earn XP, and level up your life!
          </Typography>

          <Button
            onClick={onCreateHabit}
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Add />}
            sx={{ px: 4, py: 2 }}
          >
            CREATE YOUR FIRST HABIT
          </Button>
        </Box>

        {/* Tips */}
        <Grid container spacing={2} sx={{ pt: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 2,
                border: '3px solid black',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                textAlign: 'left'
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
                TIP #1
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary'
                }}
              >
                Start small! Pick one habit you can do daily in under 5 minutes.
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 2,
                border: '3px solid black',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                textAlign: 'left'
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
                TIP #2
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary'
                }}
              >
                Choose a category that matches your archetype for bonus XP!
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 2,
                border: '3px solid black',
                boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                textAlign: 'left'
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
                TIP #3
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary'
                }}
              >
                Consistency is key! Even a 1-day streak is progress.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HabitsEmptyState;
