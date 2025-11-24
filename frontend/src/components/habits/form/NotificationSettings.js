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
        p: 1.5,
        borderRadius: 1,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        bgcolor: 'background.paper',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box>
          <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: '0.75rem', color: 'text.primary' }}>
            NOTIFICATIONS (COMING SOON)
          </Typography>
          <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
            Set reminder time; alerts in future update.
          </Typography>
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={onNotificationToggle}
              size="small"
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
        size="small"
        InputLabelProps={{
          sx: { fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: '0.75rem' }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.875rem',
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
              borderWidth: '1px'
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.87)',
              borderWidth: '1px'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              borderWidth: '1px'
            }
          }
        }}
      />
    </Box>
  );
};

export default NotificationSettings;
