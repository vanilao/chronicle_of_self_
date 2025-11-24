import React from 'react';
import { Box } from '@mui/material';
import {
  FormFields,
  CategoryDifficultySelectors,
  ScheduleTiming
} from './essential-details';
import { useXPCalculation } from './essential-details/useXPCalculation';
import { useScheduleHandlers } from './essential-details/useScheduleHandlers';

const EssentialDetailsStep = ({
  formData,
  formErrors,
  handleChange,
  userArchetypeCategory,
  userArchetype,
  onIconSelect,
  handleNotificationTimeChange
}) => {
  // Use custom hooks
  const { getDifficultyXP } = useXPCalculation(userArchetypeCategory);
  const {
    weekDays,
    handleScheduleFrequencyChange,
    handleTimeOfDayChange,
    handleDayToggle
  } = useScheduleHandlers(formData, handleChange);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {/* Name and Description Fields */}
      <FormFields 
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        onIconSelect={onIconSelect}
      />

      {/* Category and Difficulty Selectors */}
      <CategoryDifficultySelectors
        formData={formData}
        handleChange={handleChange}
        userArchetypeCategory={userArchetypeCategory}
        getDifficultyXP={getDifficultyXP}
      />

      {/* Schedule and Timing Section */}
      <ScheduleTiming
        formData={formData}
        handleChange={handleChange}
        handleScheduleFrequencyChange={handleScheduleFrequencyChange}
        handleTimeOfDayChange={handleTimeOfDayChange}
        handleDayToggle={handleDayToggle}
        weekDays={weekDays}
      />
    </Box>
  );
};

export default EssentialDetailsStep;
