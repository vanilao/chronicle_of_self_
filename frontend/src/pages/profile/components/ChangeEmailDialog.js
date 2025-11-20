import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
  InputAdornment
} from '@mui/material';
import { Lock, Email } from '@mui/icons-material';

const ChangeEmailDialog = ({
  open,
  onClose,
  emailForm,
  setEmailForm,
  emailFormError,
  onSubmit
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          border: '3px solid black',
          boxShadow: '8px 8px 0px rgba(0,0,0,1)'
        }
      }}
    >
      <DialogTitle sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem' }}>
        CHANGE EMAIL
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.75rem',
            color: 'text.secondary',
            mb: 3
          }}
        >
          Your email is used to sign in and link all your habits and progress.
          After changing, you'll need to use your new email to sign in.
        </Typography>

        {emailFormError && (
          <Alert severity="error" sx={{ mb: 2, fontFamily: '"IBM Plex Mono", monospace' }}>
            {emailFormError}
          </Alert>
        )}

        <TextField
          fullWidth
          type="password"
          label="CURRENT PASSWORD"
          value={emailForm.currentPassword}
          onChange={(e) => setEmailForm({ ...emailForm, currentPassword: e.target.value })}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            )
          }}
          InputLabelProps={{
            sx: { fontWeight: 700, fontSize: '0.875rem' }
          }}
        />

        <TextField
          fullWidth
          type="email"
          label="NEW EMAIL"
          value={emailForm.newEmail}
          onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            )
          }}
          InputLabelProps={{
            sx: { fontWeight: 700, fontSize: '0.875rem' }
          }}
        />

        <TextField
          fullWidth
          type="email"
          label="CONFIRM NEW EMAIL"
          value={emailForm.confirmNewEmail}
          onChange={(e) => setEmailForm({ ...emailForm, confirmNewEmail: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            )
          }}
          InputLabelProps={{
            sx: { fontWeight: 700, fontSize: '0.875rem' }
          }}
        />
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
          onClick={onSubmit}
          variant="contained"
          color="secondary"
          sx={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          SAVE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeEmailDialog;
