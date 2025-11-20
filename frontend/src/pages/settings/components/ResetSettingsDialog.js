import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';

const ResetSettingsDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          border: '3px solid black',
          boxShadow: '8px 8px 0px rgba(0,0,0,1)'
        }
      }}
    >
      <DialogTitle sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem' }}>
        RESET SETTINGS?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontFamily: '"IBM Plex Mono", monospace' }}>
          Are you sure you want to reset all settings to their default values? This will not affect your habits, progress, or achievements.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: 'text.primary'
          }}
        >
          CANCEL
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace'
          }}
        >
          RESET
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetSettingsDialog;
