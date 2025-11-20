import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button
} from '@mui/material';
import { Security, Email, Key, Info } from '@mui/icons-material';

const AccountSecurityCard = ({ user, onChangeEmail, onChangePassword }) => {
  return (
    <Card>
      <CardContent sx={{ p: 4 }} className="space-y-4">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Security sx={{ fontSize: 20, color: 'text.primary' }} />
          <Typography
            sx={{
              fontFamily: 'VT323, monospace',
              fontSize: '1.25rem',
              color: 'text.primary'
            }}
          >
            ACCOUNT & SECURITY
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 2,
                border: '2px solid black'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.secondary'
                  }}
                >
                  EMAIL ADDRESS
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  mb: 1.5,
                  wordBreak: 'break-all'
                }}
              >
                {user?.email || 'No email set'}
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={onChangeEmail}
                fullWidth
                sx={{
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'background.paper' }
                }}
              >
                CHANGE EMAIL
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                bgcolor: 'background.default',
                p: 2,
                borderRadius: 2,
                border: '2px solid black'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Key sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography
                  sx={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '0.75rem',
                    color: 'text.secondary'
                  }}
                >
                  PASSWORD
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.875rem',
                  color: 'text.primary',
                  mb: 1.5
                }}
              >
                ••••••••
              </Typography>
              <Button
                variant="contained"
                size="small"
                onClick={onChangePassword}
                fullWidth
                sx={{
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'background.paper' }
                }}
              >
                CHANGE PASSWORD
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Typography
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.7rem',
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <Info sx={{ fontSize: 12 }} />
          Your email is used to sign in and link all your habits and progress.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AccountSecurityCard;
