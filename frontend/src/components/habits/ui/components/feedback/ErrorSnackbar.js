import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ErrorSnackbar = ({ error, onClose }) => {
  return (
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '0.875rem',
          border: '2px solid black',
          boxShadow: '4px 4px 0px rgba(0,0,0,1)'
        }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
