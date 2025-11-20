import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Button,
  Divider
} from '@mui/material';
import { Delete, Logout } from '@mui/icons-material';

const AccountActionsCard = ({ onLogout, onDeleteAccount }) => {
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
          ACCOUNT & SECURITY
        </Typography>

        <Button
          variant="contained"
          startIcon={<Logout />}
          onClick={onLogout}
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            py: 1.5,
            bgcolor: 'background.paper',
            color: 'text.primary',
            '&:hover': { bgcolor: 'background.paper' }
          }}
        >
          LOG OUT
        </Button>

        <Divider />

        <Button
          variant="contained"
          startIcon={<Delete />}
          onClick={onDeleteAccount}
          fullWidth
          sx={{
            justifyContent: 'flex-start',
            py: 1.5,
            bgcolor: '#ef4444',
            color: 'white',
            '&:hover': { bgcolor: '#dc2626' }
          }}
        >
          DELETE ACCOUNT
        </Button>

        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.75rem',
            color: 'text.secondary'
          }}
        >
          Permanently delete your account and all associated data. This action cannot be undone.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AccountActionsCard;
