import React, { useState, useCallback } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import DeleteConfirmationModal from './components/modals/DeleteConfirmationModal';

const HabitCardActions = ({ habit, onEdit, onDelete, loading }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDeleteClick = useCallback(() => {
    setDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    // Don't close modal immediately - let the DeleteConfirmationModal handle it
    await onDelete();
  }, [onDelete]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteModalOpen(false);
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, ml: 1 }}>
        {onEdit && (
          <Button
            onClick={() => onEdit(habit)}
            size="small"
            startIcon={<Edit sx={{ fontSize: 14 }} />}
            sx={{
              bgcolor: 'background.default',
              color: 'text.primary',
              border: '2px solid black',
              borderRadius: 0.5,
              boxShadow: '3px 3px 0px rgba(0,0,0,1)',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '0.625rem',
              fontWeight: 600,
              minWidth: '60px',
              px: 1,
              py: 0.5,
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'background.default',
                transform: 'translate(1px, 1px)',
                boxShadow: '2px 2px 0px rgba(0,0,0,1)'
              }
            }}
          >
            EDIT
          </Button>
        )}

        <Button
          onClick={handleDeleteClick}
          size="small"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={14} /> : <Delete sx={{ fontSize: 14 }} />}
          sx={{
            bgcolor: '#fee2e2',
            color: '#991b1b',
            border: '2px solid black',
            borderRadius: 0.5,
            boxShadow: '3px 3px 0px rgba(0,0,0,1)',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.625rem',
            fontWeight: 600,
            minWidth: '60px',
            px: 1,
            py: 0.5,
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#fee2e2',
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
          {loading ? 'DELETING...' : 'DELETE'}
        </Button>
      </Box>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        habitName={habit.name}
        loading={loading}
      />
    </>
  );
};

export default React.memo(HabitCardActions);
