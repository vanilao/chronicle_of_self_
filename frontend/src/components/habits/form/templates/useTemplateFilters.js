import { useMemo } from 'react';

export const useTemplateFilters = (
  templates,
  searchTerm,
  selectedCategory,
  selectedDifficulty,
  selectedFrequency,
  sortBy,
  sortOrder
) => {
  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = templates.filter(template => {
      const matchesSearch = searchTerm === '' || 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || template.difficulty === selectedDifficulty;
      const matchesFrequency = selectedFrequency === 'All' || template.frequency === selectedFrequency;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesFrequency;
    });

    // Sort the filtered templates
    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          aValue = difficultyOrder[a.difficulty];
          bValue = difficultyOrder[b.difficulty];
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'frequency':
          aValue = a.frequency;
          bValue = b.frequency;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  }, [templates, searchTerm, selectedCategory, selectedDifficulty, selectedFrequency, sortBy, sortOrder]);

  return filteredAndSortedTemplates;
};
