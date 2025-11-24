import React, { useState } from 'react';
import { Box } from '@mui/material';
import HabitFilters from '../filters/HabitFilters';
import {
  habitTemplates,
  communityTemplates,
  TemplateTabs,
  TemplateGrid,
  TemplateFooter
} from './templates';
import { useTemplateFilters } from './templates/useTemplateFilters';
import { useTemplateSelection } from './templates/useTemplateSelection';

const HabitTemplateSelector = ({ onTemplateSelect, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedFrequency, setSelectedFrequency] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Reset all filters when switching tabs
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedFrequency('All');
    setSearchTerm('');
    setSortBy('name');
    setSortOrder('asc');
  };

  const getCurrentTemplates = () => {
    return activeTab === 0 ? habitTemplates : communityTemplates;
  };

  const currentTemplates = getCurrentTemplates();
  
  // Use custom hook for filtering and sorting
  const filteredAndSortedTemplates = useTemplateFilters(
    currentTemplates,
    searchTerm,
    selectedCategory,
    selectedDifficulty,
    selectedFrequency,
    sortBy,
    sortOrder
  );

  // Use custom hook for template selection
  const { handleTemplateSelect: handleSelect } = useTemplateSelection(onTemplateSelect, onClose);

  return (
    <Box sx={{ maxHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header with Tabs */}
      <Box sx={{ mb: 2 }}>
        <TemplateTabs 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
        
        {/* Advanced Filters */}
        <HabitFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedFrequency={selectedFrequency}
          onFrequencyChange={setSelectedFrequency}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          compact={true}
        />
      </Box>

      {/* Templates Grid */}
      <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
        <TemplateGrid 
          templates={filteredAndSortedTemplates}
          onTemplateSelect={(template) => handleSelect(template, activeTab)}
        />
      </Box>

      {/* Footer */}
      <TemplateFooter 
        templateCount={filteredAndSortedTemplates.length}
        activeTab={activeTab}
      />
    </Box>
  );
};

export default HabitTemplateSelector;