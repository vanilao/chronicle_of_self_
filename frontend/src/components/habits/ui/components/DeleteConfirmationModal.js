import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { Delete, Warning } from '@mui/icons-material';
import ErrorSnackbar from './ErrorSnackbar';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  habitName
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteConfirm = useCallback(async () => {
    setIsDeleting(true);
    setError(null);
    try {
      // Execute the delete function (which now includes delay)
      await onConfirm();

      // Close modal after successful deletion
      onClose();
    } catch (error) {
      console.error('Delete error:', error);
      
      // Handle different error types
      if (error.message.includes('network') || error.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else if (error.message.includes('permission') || error.message.includes('unauthorized')) {
        setError('Permission denied. Please log in again.');
      } else {
        setError('Failed to delete habit. Please try again.');
      }
    } finally {
      setIsDeleting(false);
    }
  }, [onConfirm, onClose]);
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={!isDeleting ? onClose : undefined}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            border: '3px solid black',
            boxShadow: '6px 6px 0px rgba(0,0,0,1)',
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1,
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 700,
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Warning sx={{ color: '#f44336', fontSize: 24 }} />
          Delete Habit
        </DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '1rem',
                mb: 2,
                lineHeight: 1.5
              }}
            >
              Are you sure you want to delete <strong>"{habitName}"</strong>?
            </Typography>

            <Alert 
              severity="warning" 
              sx={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '0.875rem',
                border: '2px solid #f44336',
                boxShadow: '2px 2px 0px rgba(0,0,0,1)'
              }}
            >
              <strong>This action cannot be undone!</strong>
              <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
                <li>All habit data will be permanently deleted</li>
                <li>Completion history will be lost</li>
                <li>XP earned from this habit will remain</li>
              </Box>
            </Alert>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button
            onClick={onClose}
            disabled={isDeleting}
            sx={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 600,
              fontSize: '0.875rem',
              border: '2px solid black',
              borderRadius: 1.5,
              boxShadow: '3px 3px 0px rgba(0,0,0,1)',
              px: 2,
              py: 1,
              '&:hover': {
                transform: 'translate(1px, 1px)',
                boxShadow: '2px 2px 0px rgba(0,0,0,1)'
              },
              '&.Mui-disabled': {
                bgcolor: '#f5f5f5',
                color: '#999',
                borderColor: '#ccc'
              }
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDeleteConfirm}
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={16} thickness={4} sx={{ color: 'inherit' }} /> : <Delete />}
            sx={{
              bgcolor: '#fee2e2',
              color: '#991b1b',
              fontFamily: '"IBM Plex Mono", monospace',
              fontWeight: 700,
              fontSize: '0.875rem',
              border: '2px solid #991b1b',
              borderRadius: 1.5,
              boxShadow: '3px 3px 0px rgba(0,0,0,1)',
              px: 2,
              py: 1,
              minWidth: '120px',
              '&:hover': {
                bgcolor: '#fecaca',
                transform: 'translate(1px, 1px)',
                boxShadow: '2px 2px 0px rgba(0,0,0,1)'
              },
              '&.Mui-disabled': {
                bgcolor: '#f5f5f5',
                color: '#999',
                borderColor: '#ccc',
                animation: isDeleting ? 'pulse 1.5s ease-in-out infinite' : 'none',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.7 },
                  '100%': { opacity: 1 }
                }
              }
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete Habit'}
          </Button>
        </DialogActions>
      </Dialog>
      
      <ErrorSnackbar error={error} onClose={() => setError(null)} />
    </>
  );
};

export default React.memo(DeleteConfirmationModal);
