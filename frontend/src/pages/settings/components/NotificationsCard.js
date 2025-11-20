import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  TextField,
  Divider,
  FormControlLabel
} from '@mui/material';
import { Notifications, VolumeUp, Info } from '@mui/icons-material';

const NotificationsCard = ({ settings, onSettingChange, onUpdateSetting }) => {
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
          NOTIFICATIONS & REMINDERS
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
            <Notifications sx={{ color: 'text.secondary' }} />
            <Box>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                In-App Notifications
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary'
                }}
              >
                Show XP gains and level-up alerts
              </Typography>
            </Box>
          </Box>
          <Switch
            checked={settings.notifications}
            onChange={() => onSettingChange('notifications')}
            color="primary"
          />
        </Box>

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
            <VolumeUp sx={{ color: 'text.secondary' }} />
            <Box>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                Sound Effects
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: 'text.secondary'
                }}
              >
                Play sounds on XP gain and level up
              </Typography>
            </Box>
          </Box>
          <Switch
            checked={settings.soundEffects}
            onChange={() => onSettingChange('soundEffects')}
            color="primary"
          />
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.dailyReminder}
                onChange={() => onSettingChange('dailyReminder')}
                color="primary"
              />
            }
            label={
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  color: 'text.primary'
                }}
              >
                Daily Reminder
              </Typography>
            }
          />
          <TextField
            type="time"
            value={settings.reminderTime}
            onChange={(e) => onUpdateSetting('reminderTime', e.target.value)}
            size="small"
            disabled={!settings.dailyReminder}
            sx={{ width: 140 }}
          />
        </Box>

        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.75rem',
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <Info sx={{ fontSize: 14 }} />
          Reminders are currently in-app only. Browser notifications coming soon.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;
