import React from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab
} from '@mui/material';
import { FlashOn } from '@mui/icons-material';

const TemplateTabs = ({ activeTab, onTabChange }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontWeight: 700,
          fontSize: '1.25rem',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <FlashOn sx={{ fontSize: 20 }} />
        {activeTab === 0 ? 'Quick Start Templates' : 'Community Templates'}
      </Typography>
      
      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        sx={{
          mb: 2,
          '& .MuiTab-root': {
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 600,
            fontSize: '0.875rem',
            textTransform: 'none',
            minHeight: 32,
            px: 2,
            color: 'text.primary',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' }
          },
          '& .Mui-selected': {
            color: 'primary.main',
            fontWeight: 700
          },
          '& .MuiTabs-indicator': {
            height: 3,
            bgcolor: 'primary.main'
          }
        }}
      >
        <Tab label="Quick Start" />
        <Tab label="Community" />
      </Tabs>
    </Box>
  );
};

export default TemplateTabs;
