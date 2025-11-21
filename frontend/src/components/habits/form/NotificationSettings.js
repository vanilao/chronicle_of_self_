import React from 'react';
import { Typography, TextField, Box, FormControlLabel, Switch } from '@mui/material';

const NotificationSettings = ({ 
  notificationsEnabled, 
  notificationTime, 
  onNotificationToggle,
  onTimeChange 
}) => {
  return (
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
              checked={notificationsEnabled}
              onChange={onNotificationToggle}
            />
          }
          label=""
        />
      </Box>

      <TextField
        type="time"
        label="REMINDER TIME"
        fullWidth
        value={notificationTime}
        onChange={onTimeChange}
        disabled={!notificationsEnabled}
        InputLabelProps={{
          sx: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: '0.75rem' }
        }}
      />
    </Box>
  );
};

export default NotificationSettings;
