import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch
} from '@mui/material';
import { DarkMode } from '@mui/icons-material';

const AppearanceCard = ({ theme, toggleTheme }) => {
  return (
    <Card>
      <CardContent sx={{ p: 4 }} className="space-y-4">
        <Typography
          sx={{
            fontFamily: 'VT323, monospace',
            fontSize: '1.25rem',
            color: 'text.primary'
          }}
        >
          APPEARANCE
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor: 'background.default',
            p: 2,
            borderRadius: 2,
            border: '2px solid black'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DarkMode sx={{ color: 'text.secondary' }} />
            <Box>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                Dark Mode
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary'
                }}
              >
                Toggle dark/light theme
              </Typography>
            </Box>
          </Box>
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            color="primary"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AppearanceCard;
