import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { calculatePasswordStrength } from '../../../utils/passwordStrength';

const ChangePasswordDialog = ({
  open,
  onClose,
  passwordForm,
  setPasswordForm,
  passwordFormError,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
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
        CHANGE PASSWORD
      </DialogTitle>
      <DialogContent>
        {passwordFormError && (
          <Alert severity="error" sx={{ mb: 2, fontFamily: '"IBM Plex Mono", monospace' }}>
            {passwordFormError}
          </Alert>
        )}

        <TextField
          fullWidth
          type={showCurrentPassword ? 'text' : 'password'}
          label="CURRENT PASSWORD"
          value={passwordForm.currentPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
          sx={{ mb: 2, mt: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  edge="end"
                  sx={{ color: 'text.secondary' }}
                >
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          InputLabelProps={{
            sx: { fontWeight: 700, fontSize: '0.875rem' }
          }}
        />

        <TextField
          fullWidth
          type={showNewPassword ? 'text' : 'password'}
          label="NEW PASSWORD"
          value={passwordForm.newPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
          sx={{ mb: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge="end"
                  sx={{ color: 'text.secondary' }}
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          InputLabelProps={{
            sx: { fontWeight: 700, fontSize: '0.875rem' }
          }}
        />

        {/* Password Strength Indicator */}
        {passwordForm.newPassword && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.75rem',
                  color: calculatePasswordStrength(passwordForm.newPassword).color
                }}
              >
                Password strength: {calculatePasswordStrength(passwordForm.newPassword).label}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {[1, 2, 3, 4, 5, 6].map((lvl) => (
                <Box
                  key={lvl}
                  sx={{
                    flex: 1,
                    height: 4,
                    borderRadius: 1,
                    bgcolor: lvl <= calculatePasswordStrength(passwordForm.newPassword).score
                      ? calculatePasswordStrength(passwordForm.newPassword).color
                      : 'grey.300'
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        <TextField
          fullWidth
          type={showConfirmPassword ? 'text' : 'password'}
          label="CONFIRM NEW PASSWORD"
          value={passwordForm.confirmNewPassword}
          onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  sx={{ color: 'text.secondary' }}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
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

export default ChangePasswordDialog;
