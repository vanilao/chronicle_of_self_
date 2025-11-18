import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../../components/landing/HeroSection';
import HowItWorksSection from '../../components/landing/HowItWorksSection';
import ArchetypesSection from '../../components/landing/ArchetypesSection';
import CTASection from '../../components/landing/CTASection';

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <HeroSection />
      <HowItWorksSection />
      <ArchetypesSection />
      <CTASection />
    </Box>
  );
};

export default LandingPage;
