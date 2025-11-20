import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Divider
} from '@mui/material';
import { Download, RestartAlt } from '@mui/icons-material';

const DataPrivacyCard = ({ onExportData, onResetSettings }) => {
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
          DATA & PRIVACY
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Download />}
          onClick={onExportData}
          fullWidth
          sx={{ justifyContent: 'flex-start', py: 1.5 }}
        >
          EXPORT DATA
        </Button>

        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.75rem',
            color: 'text.secondary'
          }}
        >
          Download a backup of your profile, habits, completion history, achievements, and settings as a JSON file. All data is stored locally in your browser.
        </Typography>

        <Divider />

        <Button
          variant="contained"
          startIcon={<RestartAlt />}
          onClick={onResetSettings}
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            py: 1.5,
            bgcolor: 'background.paper',
            color: 'text.primary',
            '&:hover': { bgcolor: 'background.paper' }
          }}
        >
          RESET SETTINGS
        </Button>

        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.75rem',
            color: 'text.secondary'
          }}
        >
          Reset all settings to their default values.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DataPrivacyCard;
