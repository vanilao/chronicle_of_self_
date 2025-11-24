import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from './useDebounce';

const STORAGE_KEY = 'habit-filters';
const DEFAULT_FILTERS = {
  category: 'All',
  difficulty: 'All',
  frequency: 'All',
  searchTerm: ''
};

export const usePersistedFilters = (page = 'habits') => {
  const storageKey = `${STORAGE_KEY}-${page}`;
  
  const [filters, setFilters] = useState(() => {
    // Load from localStorage on initial render
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? { ...DEFAULT_FILTERS, ...JSON.parse(saved) } : DEFAULT_FILTERS;
    } catch (error) {
      console.warn('Error loading filters from localStorage:', error);
      return DEFAULT_FILTERS;
    }
  });

  // Debounce search term to avoid excessive re-renders
  const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);
  const debouncedFilters = useMemo(() => ({
    ...filters,
    searchTerm: debouncedSearchTerm
  }), [filters, debouncedSearchTerm]);

  // Save to localStorage whenever filters change (but not on every search keystroke)
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(filters));
    } catch (error) {
      console.warn('Error saving filters to localStorage:', error);
    }
  }, [filters, storageKey]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  return {
    filters: debouncedFilters,
    rawFilters: filters, // Include the non-debounced filters for immediate UI updates
    updateFilter,
    clearFilters,
    hasActiveFilters: filters.category !== 'All' || 
                     filters.difficulty !== 'All' || 
                     filters.frequency !== 'All' || 
                     filters.searchTerm !== ''
  };
};
