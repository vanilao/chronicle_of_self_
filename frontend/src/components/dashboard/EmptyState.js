import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { Add, GpsFixed } from '@mui/icons-material';

const EmptyState = ({ onCreateHabit }) => {
  return (
    <Card>
      <CardContent sx={{ p: 6, textAlign: 'center' }} className="space-y-6">
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: 'primary.main',
            p: 3,
            borderRadius: '50%',
            border: '3px solid black',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)'
          }}
        >
          <GpsFixed sx={{ fontSize: 64, color: 'text.primary' }} />
        </Box>

        <Box className="space-y-2">
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'VT323, monospace',
              fontSize: '1.5rem',
              color: 'text.primary'
            }}
          >
            NO HABITS YET
          </Typography>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              color: 'text.secondary',
              maxWidth: 400,
              mx: 'auto'
            }}
          >
            Start your adventure by creating your first habit. Transform your daily routine into epic quests!
          </Typography>
        </Box>

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

        {/* Quick Tips */}
        <Grid container spacing={2} sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 2,
                border: '2px solid black'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  mb: 0.5
                }}
              >
                TIP 1
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary'
                }}
              >
                Start small with 1-2 habits
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 2,
                border: '2px solid black'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  mb: 0.5
                }}
              >
                TIP 2
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary'
                }}
              >
                Choose your archetype bonus
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 2,
                border: '2px solid black'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'VT323, monospace',
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  mb: 0.5
                }}
              >
                TIP 3
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary'
                }}
              >
                Complete daily for streaks
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
