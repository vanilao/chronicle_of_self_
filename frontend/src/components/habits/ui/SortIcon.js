import React from 'react';
import { Box } from '@mui/material';

const SortIcon = ({ icon: Icon, label }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Icon size={16} />
    <span>{label}</span>
  </Box>
);

export default SortIcon;
