import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';

const DeleteAccountDialog = ({ open, onClose, onConfirm }) => {
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
        DELETE ACCOUNT?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontFamily: '"IBM Plex Mono", monospace', mb: 2 }}>
          Are you sure you want to delete your account? This will permanently remove:
        </DialogContentText>
        <Box component="ul" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', pl: 2, m: 0 }}>
          <li>All your habits and completion history</li>
          <li>Your XP, level, and progress</li>
          <li>All achievements earned</li>
          <li>Your settings and preferences</li>
        </Box>
        <DialogContentText sx={{ fontFamily: '"IBM Plex Mono", monospace', mt: 2, fontWeight: 700, color: '#ef4444' }}>
          This action cannot be undone.
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
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            bgcolor: '#ef4444',
            '&:hover': { bgcolor: '#dc2626' }
          }}
        >
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountDialog;
