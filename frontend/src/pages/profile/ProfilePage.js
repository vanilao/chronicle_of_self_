import React, { useState, useMemo, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  TextField,
  LinearProgress,
  Chip,
  Divider,
  Alert,
  Tooltip
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  EmojiEvents,
  LocalFireDepartment,
  Star,
  FitnessCenter,
  MenuBook,
  Favorite,
  Palette,
  Lock,
  Info,
  Bolt
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useHabits } from '../../contexts/HabitsContext';
import { getXPForNextLevel, getTotalXPForLevel } from '../../utils/levelingSystem';
import { calculatePasswordStrength } from '../../utils/passwordStrength';
import {
  ChangeEmailDialog,
  ChangePasswordDialog,
  AccountSecurityCard,
  AvatarGalleryCard
} from './components';

const ProfileLayout = () => {
  const { user, updateUser, changeEmail, changePassword } = useAuth();
  const { habits, getHabitStreak } = useHabits();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user?.username || ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  // Dialog states
  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Change email form state
  const [emailForm, setEmailForm] = useState({
    currentPassword: '',
    newEmail: '',
    confirmNewEmail: ''
  });
  const [emailFormError, setEmailFormError] = useState('');

  // Change password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [passwordFormError, setPasswordFormError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload an image file');
      setTimeout(() => setErrorMessage(''), 3000);
      event.target.value = '';
      return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrorMessage('Image must be smaller than 2MB');
      setTimeout(() => setErrorMessage(''), 3000);
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        updateUser({ avatarType: 'uploaded', avatarUrl: result });
        setSuccessMessage('Profile picture updated!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const handleRemoveAvatar = () => {
    if (!user?.avatarUrl && user?.avatarType !== 'uploaded') return;
    updateUser({ avatarType: 'initial', avatarUrl: null, selectedAvatarId: null });
    setSuccessMessage('Profile picture removed');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const stats = useMemo(() => {
    let totalCompleted = 0;
    let longestStreak = 0;
    let activeHabits = 0;

    habits.forEach(habit => {
      if (!habit.archived) activeHabits++;
      if (habit.completionHistory) {
        totalCompleted += Object.values(habit.completionHistory).filter(Boolean).length;
      }
      const streak = getHabitStreak(habit.id);
      if (streak > longestStreak) longestStreak = streak;
    });

    return { totalCompleted, longestStreak, activeHabits, totalHabits: habits.length };
  }, [habits, getHabitStreak]);

  const archetypeIcons = {
    warrior: FitnessCenter, sage: MenuBook, monk: Favorite, artisan: Palette
  };

  const archetypeColors = {
    warrior: 'secondary.main', sage: 'primary.main', monk: 'tertiary.main', artisan: 'background.paper'
  };

  const archetypeDescriptions = {
    warrior: 'Gains bonus XP for fitness and physical habits',
    sage: 'Gains bonus XP for learning and knowledge habits',
    monk: 'Gains bonus XP for mindfulness and spiritual habits',
    artisan: 'Gains bonus XP for creative and artistic habits'
  };

  const ArchetypeIcon = archetypeIcons[user?.archetype?.toLowerCase()] || Star;
  const hasUploadedAvatar = user?.avatarType === 'uploaded' && user?.avatarUrl;

  const validateUsername = (username) => {
    if (!username || username.trim().length === 0) return 'Username cannot be empty';
    if (username.trim().length < 2) return 'Username must be at least 2 characters';
    if (username.trim().length > 30) return 'Username must be 30 characters or less';
    if (!/^[a-zA-Z0-9_\- ]+$/.test(username)) {
      return 'Username can only contain letters, numbers, spaces, underscores, and hyphens';
    }
    return null;
  };

  const handleSave = () => {
    const validationError = validateUsername(editedUser.username);
    if (validationError) {
      setErrorMessage(validationError);
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    updateUser({ username: editedUser.username.trim() });
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCancel = () => {
    setEditedUser({ username: user?.username || '' });
    setIsEditing(false);
    setErrorMessage('');
  };

  // Email dialog handlers
  const handleOpenChangeEmail = () => {
    setEmailForm({ currentPassword: '', newEmail: '', confirmNewEmail: '' });
    setEmailFormError('');
    setIsChangeEmailOpen(true);
  };

  const handleCloseChangeEmail = () => {
    setIsChangeEmailOpen(false);
    setEmailFormError('');
  };

  const handleSubmitChangeEmail = () => {
    if (!emailForm.currentPassword) {
      setEmailFormError('Please enter your current password');
      return;
    }
    if (!emailForm.newEmail) {
      setEmailFormError('Please enter a new email address');
      return;
    }
    if (emailForm.newEmail !== emailForm.confirmNewEmail) {
      setEmailFormError('Email addresses do not match');
      return;
    }

    const result = changeEmail({
      currentPassword: emailForm.currentPassword,
      newEmail: emailForm.newEmail
    });

    if (result.success) {
      setIsChangeEmailOpen(false);
      setSuccessMessage('Email changed successfully! Please use your new email to sign in.');
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      setEmailFormError(result.error);
    }
  };

  // Password dialog handlers
  const handleOpenChangePassword = () => {
    setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    setPasswordFormError('');
    setIsChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false);
    setPasswordFormError('');
  };

  const handleSubmitChangePassword = () => {
    if (!passwordForm.currentPassword) {
      setPasswordFormError('Please enter your current password');
      return;
    }
    if (!passwordForm.newPassword) {
      setPasswordFormError('Please enter a new password');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordFormError('Passwords do not match');
      return;
    }

    const strength = calculatePasswordStrength(passwordForm.newPassword);
    if (strength.score < 3) {
      setPasswordFormError('Password is too weak. Please include uppercase, lowercase, numbers, and special characters.');
      return;
    }

    const result = changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    });

    if (result.success) {
      setIsChangePasswordOpen(false);
      setSuccessMessage('Password changed successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setPasswordFormError(result.error);
    }
  };

  const currentXP = user?.currentXP || 0;
  const level = user?.level || 1;
  const xpForNextLevel = getXPForNextLevel(level);
  const xpProgress = xpForNextLevel > 0 ? (currentXP / xpForNextLevel) * 100 : 0;
  const totalXP = getTotalXPForLevel(level) + currentXP;

  return (
    <Box className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'VT323, monospace',
          fontSize: { xs: '2.5rem', md: '3rem' },
          color: 'text.primary',
          mb: 6
        }}
      >
        PROFILE
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 4, fontFamily: '"IBM Plex Mono", monospace' }}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 4, fontFamily: '"IBM Plex Mono", monospace' }}>
          {errorMessage}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Profile Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 4, flexGrow: 1 }} className="space-y-4">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  src={hasUploadedAvatar ? user.avatarUrl : undefined}
                  alt={user?.username || 'Profile avatar'}
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: hasUploadedAvatar
                      ? 'background.paper'
                      : archetypeColors[user?.archetype?.toLowerCase()] || 'primary.main',
                    border: '3px solid black',
                    boxShadow: '4px 4px 0px rgba(0,0,0,1)',
                    fontFamily: 'VT323, monospace',
                    fontSize: '2rem'
                  }}
                >
                  {!hasUploadedAvatar && (user?.username?.charAt(0).toUpperCase() || 'U')}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      value={editedUser.username}
                      onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                      size="small"
                      sx={{ mb: 1 }}
                      placeholder="Enter username"
                      inputProps={{ maxLength: 30 }}
                    />
                  ) : (
                    <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem', color: 'text.primary' }}>
                      {user?.username || 'Adventurer'}
                    </Typography>
                  )}
                  <Tooltip title={archetypeDescriptions[user?.archetype?.toLowerCase()] || 'No archetype selected'} arrow>
                    <Chip
                      icon={<ArchetypeIcon sx={{ fontSize: 16 }} />}
                      label={user?.archetype || 'No Class'}
                      size="small"
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '0.75rem',
                        bgcolor: archetypeColors[user?.archetype?.toLowerCase()] || 'background.paper',
                        border: '2px solid black',
                        cursor: 'help'
                      }}
                    />
                  </Tooltip>
                </Box>
              </Box>

              <Divider />

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary' }}>
                    ACCOUNT EMAIL
                  </Typography>
                  <Tooltip title="Email is your account identifier and cannot be changed" arrow>
                    <Lock sx={{ fontSize: 12, color: 'text.secondary' }} />
                  </Tooltip>
                </Box>
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', color: 'text.primary' }}>
                  {user?.email || 'No email set'}
                </Typography>
              </Box>

              {user?.title && (
                <Box>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>
                    TITLE
                  </Typography>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', color: 'primary.main', fontWeight: 700 }}>
                    {user.title}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 1, pt: 2 }}>
                <Button variant="contained" color="secondary" onClick={handleAvatarClick} sx={{ flex: 1 }}>
                  CHANGE AVATAR
                </Button>
                <Button
                  variant="contained"
                  onClick={handleRemoveAvatar}
                  disabled={!hasUploadedAvatar}
                  sx={{ flex: 1, bgcolor: 'background.paper', color: 'text.primary', '&:hover': { bgcolor: 'background.paper' } }}
                >
                  REMOVE PHOTO
                </Button>
              </Box>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarFileChange} />

              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Info sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.7rem', color: 'text.secondary' }}>
                  Avatar gallery & unlockable avatars coming soon.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                {isEditing ? (
                  <>
                    <Button variant="contained" color="secondary" startIcon={<Save />} onClick={handleSave} sx={{ flex: 1 }}>
                      SAVE
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      sx={{ flex: 1, bgcolor: 'background.paper', color: 'text.primary', '&:hover': { bgcolor: 'background.paper' } }}
                    >
                      CANCEL
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" color="primary" startIcon={<Edit />} onClick={() => setIsEditing(true)} fullWidth>
                    EDIT PROFILE
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 4, flexGrow: 1 }} className="space-y-4">
              <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.25rem', color: 'text.primary' }}>
                CHARACTER STATS
              </Typography>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.primary' }}>
                    Level {level}
                  </Typography>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.875rem', color: 'text.secondary' }}>
                    {currentXP} / {xpForNextLevel} XP
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={xpProgress}
                  sx={{
                    height: 12, borderRadius: 2, border: '2px solid black', bgcolor: 'background.default',
                    '& .MuiLinearProgress-bar': { bgcolor: 'primary.main' }
                  }}
                />
              </Box>

              <Divider />

              <Grid container spacing={2}>
                {[
                  { icon: EmojiEvents, value: user?.achievements?.length || 0, label: 'ACHIEVEMENTS', color: 'primary.main' },
                  { icon: LocalFireDepartment, value: stats.longestStreak, label: 'BEST STREAK', color: '#f97316' },
                  { icon: Star, value: stats.totalCompleted, label: 'COMPLETED', color: 'secondary.main' },
                  { icon: Bolt, value: totalXP, label: 'TOTAL XP', color: 'primary.main' }
                ].map((stat, i) => (
                  <Grid size={6} key={i}>
                    <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 2, border: '2px solid black', textAlign: 'center' }}>
                      <stat.icon sx={{ fontSize: 24, color: stat.color, mb: 1 }} />
                      <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.5rem', color: 'text.primary' }}>
                        {stat.value}
                      </Typography>
                      <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.25rem', color: 'text.primary' }}>
                    {stats.activeHabits}
                  </Typography>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
                    ACTIVE HABITS
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography sx={{ fontFamily: 'VT323, monospace', fontSize: '1.25rem', color: 'text.primary' }}>
                    {stats.totalHabits}
                  </Typography>
                  <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '0.625rem', color: 'text.secondary' }}>
                    TOTAL HABITS
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <AccountSecurityCard user={user} onChangeEmail={handleOpenChangeEmail} onChangePassword={handleOpenChangePassword} />
        </Grid>

        <Grid size={12}>
          <AvatarGalleryCard level={level} />
        </Grid>
      </Grid>

      <ChangeEmailDialog
        open={isChangeEmailOpen}
        onClose={handleCloseChangeEmail}
        emailForm={emailForm}
        setEmailForm={setEmailForm}
        emailFormError={emailFormError}
        onSubmit={handleSubmitChangeEmail}
      />

      <ChangePasswordDialog
        open={isChangePasswordOpen}
        onClose={handleCloseChangePassword}
        passwordForm={passwordForm}
        setPasswordForm={setPasswordForm}
        passwordFormError={passwordFormError}
        showCurrentPassword={showCurrentPassword}
        setShowCurrentPassword={setShowCurrentPassword}
        showNewPassword={showNewPassword}
        setShowNewPassword={setShowNewPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        onSubmit={handleSubmitChangePassword}
      />
    </Box>
  );
};

const ProfilePage = () => {
  return <ProfileLayout />;
};

export default ProfilePage;
