import React, { useMemo, useEffect, useRef } from 'react';
import {
  Box,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  IconButton,
  FormControl
} from '@mui/material';
import { Search, Clear, FilterList, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { FileText, Zap, Calendar, BarChart3, Flame } from 'lucide-react';
import { useHabits } from '../../../contexts/HabitsContext';
import CategoryIndicator from '../category/CategoryIndicator';
import CategoryCount from '../category/CategoryCount';
import SortIcon from '../ui/SortIcon';

const HabitFilters = ({ 
  selectedCategory, 
  onCategoryChange, 
  selectedDifficulty,
  onDifficultyChange,
  selectedFrequency,
  onFrequencyChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  compact = false
}) => {
  const { habits } = useHabits();
  const searchInputRef = useRef(null);
  const categorySelectRef = useRef(null);
  const difficultySelectRef = useRef(null);
  const frequencySelectRef = useRef(null);
  const sortSelectRef = useRef(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only handle shortcuts when not typing in an input
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      // Press '/' to focus search
      if (event.key === '/') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      
      // Press 'c' to focus category dropdown
      if (event.key === 'c' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        categorySelectRef.current?.focus();
      }
      
      // Press 'd' to focus difficulty dropdown
      if (event.key === 'd' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        difficultySelectRef.current?.focus();
      }
      
      // Press 'f' to focus frequency dropdown
      if (event.key === 'f' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        frequencySelectRef.current?.focus();
      }
      
      // Press 's' to focus sort dropdown
      if (event.key === 's' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        sortSelectRef.current?.focus();
      }
      
      // Press 'Escape' to clear all filters
      if (event.key === 'Escape') {
        const clearAllFilters = () => {
          onCategoryChange('All');
          onDifficultyChange('All');
          onFrequencyChange('All');
          onSearchChange('');
          onSortChange('name'); // Reset sort to default
          onSortOrderChange('desc'); // Reset sort order to default
        };
        clearAllFilters();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCategoryChange, onDifficultyChange, onFrequencyChange, onSearchChange, onSortChange, onSortOrderChange]);

  // Generate dynamic categories with counts
  const categoriesWithCounts = useMemo(() => {
    const allCategories = ['All', 'Body', 'Mind', 'Spirit', 'Creative'];
    const habitsLength = habits?.length || 0;
    return allCategories.map(cat => ({
      name: cat,
      count: cat === 'All' ? habitsLength : 0
    }));
  }, [habits]);

  // Generate difficulty options with counts
  const difficultiesWithCounts = useMemo(() => {
    const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
    const habitsLength = habits?.length || 0;
    return difficulties.map(diff => ({
      name: diff,
      count: diff === 'All' ? habitsLength : 0
    }));
  }, [habits]);

  // Generate frequency options with counts
  const frequenciesWithCounts = useMemo(() => {
    const frequencies = ['All', 'Daily', 'Specific Days'];
    const habitsLength = habits?.length || 0;
    return frequencies.map(freq => ({
      name: freq,
      count: freq === 'All' ? habitsLength : 0
    }));
  }, [habits]);

  // Check if any filters are active (excluding sort options)
  const hasActiveFilters = Boolean(
    (selectedCategory && selectedCategory !== 'All') || 
    (selectedDifficulty && selectedDifficulty !== 'All') || 
    (selectedFrequency && selectedFrequency !== 'All') || 
    (searchTerm && searchTerm.trim() !== '')
  );

  // Shared MenuItem component to reduce duplication
  const FilterMenuItem = ({ item, onSelect, showIndicator = false }) => (
    <MenuItem
      key={item.name}
      value={item.name}
      onClick={() => onSelect(item.name)}
      sx={{
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          bgcolor: 'grey.100',
          '& .MuiTypography-root': {
            color: 'primary.main',
            fontWeight: 700
          }
        },
        '&.Mui-selected': {
          bgcolor: 'grey.200',
          '&:hover': {
            bgcolor: 'grey.300',
          }
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
        {showIndicator && <CategoryIndicator category={item.name} />}
        <Box sx={{ flex: 1 }}>
          {item.name}
        </Box>
        <CategoryCount count={item.count} category={item.name} />
      </Box>
    </MenuItem>
  );

  const clearAllFilters = () => {
    onCategoryChange('All');
    onDifficultyChange('All');
    onFrequencyChange('All');
    onSearchChange('');
    onSortChange('name');
    onSortOrderChange('desc');
  };

  const containerSx = compact 
    ? { display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }
    : { mb: 3 };

  const formControlSx = compact
    ? { minWidth: 120, '& .MuiOutlinedInput-root': { height: 40 } }
    : { minWidth: 150 };

  return (
    <Box sx={containerSx}>
      {/* Search Bar */}
      <TextField
        inputRef={searchInputRef}
        placeholder="Search habits... (/)"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          endAdornment: searchTerm && (
            <IconButton
              size="small"
              onClick={() => onSearchChange('')}
              sx={{ 
                mr: 1,
                '&:hover': { bgcolor: 'grey.200' }
              }}
            >
              <Clear fontSize="small" />
            </IconButton>
          )
        }}
        size={compact ? "small" : "medium"}
        sx={{
          flex: compact ? 1 : 'initial',
          minWidth: compact ? 200 : 250,
          '& .MuiOutlinedInput-root': {
            fontFamily: '"IBM Plex Mono", monospace',
            border: '3px solid black',
            borderRadius: '8px',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            '&:hover': {
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
            },
            '&.Mui-focused': {
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
              borderColor: 'primary.main',
            }
          }
        }}
      />

      {/* Category Dropdown */}
      <FormControl size={compact ? "small" : "medium"} sx={formControlSx}>
        <InputLabel 
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            color: 'text.primary',
            transform: 'translate(14px, -18px) scale(0.75)',
            '&.Mui-focused': {
              transform: 'translate(14px, -21px) scale(0.75)',
            }
          }}
        >
          Category (c)
        </InputLabel>
        <Select
          inputRef={categorySelectRef}
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          renderValue={(value) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CategoryIndicator category={value} />
              <span>{value}</span>
            </Box>
          )}
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            border: '3px solid black',
            borderRadius: '8px',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            '&:hover': {
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            }
          }}
        >
          {categoriesWithCounts.map((category) => (
            <FilterMenuItem
              key={category.name}
              item={category}
              onSelect={onCategoryChange}
              showIndicator={true}
            />
          ))}
        </Select>
      </FormControl>

      {/* Difficulty Dropdown */}
      <FormControl size={compact ? "small" : "medium"} sx={formControlSx}>
        <InputLabel 
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            color: 'text.primary',
            transform: 'translate(14px, -18px) scale(0.75)',
            '&.Mui-focused': {
              transform: 'translate(14px, -21px) scale(0.75)',
            }
          }}
        >
          Difficulty (d)
        </InputLabel>
        <Select
          inputRef={difficultySelectRef}
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          renderValue={(value) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {value === 'All' ? (
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: 'text.primary'
                  }}
                />
              ) : null}
              <span>{value}</span>
            </Box>
          )}
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            border: '3px solid black',
            borderRadius: '8px',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            '&:hover': {
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            }
          }}
        >
          {difficultiesWithCounts.map((difficulty) => (
            <FilterMenuItem
              key={difficulty.name}
              item={difficulty}
              onSelect={onDifficultyChange}
              showIndicator={false}
            />
          ))}
        </Select>
      </FormControl>

      {/* Frequency Dropdown */}
      <FormControl size={compact ? "small" : "medium"} sx={formControlSx}>
        <InputLabel 
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            color: 'text.primary',
            transform: 'translate(14px, -18px) scale(0.75)',
            '&.Mui-focused': {
              transform: 'translate(14px, -21px) scale(0.75)',
            }
          }}
        >
          Frequency (f)
        </InputLabel>
        <Select
          inputRef={frequencySelectRef}
          value={selectedFrequency}
          onChange={(e) => onFrequencyChange(e.target.value)}
          renderValue={(value) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {value === 'All' ? (
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: 'text.primary'
                  }}
                />
              ) : null}
              <span>{value}</span>
            </Box>
          )}
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            border: '3px solid black',
            borderRadius: '8px',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            '&:hover': {
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            }
          }}
        >
          {frequenciesWithCounts.map((frequency) => (
            <FilterMenuItem
              key={frequency.name}
              item={frequency}
              onSelect={onFrequencyChange}
              showIndicator={false}
            />
          ))}
        </Select>
      </FormControl>

      {/* Sort Dropdown */}
      <FormControl size={compact ? "small" : "medium"} sx={formControlSx}>
        <InputLabel 
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            color: 'text.primary',
            transform: 'translate(14px, -18px) scale(0.75)',
            '&.Mui-focused': {
              transform: 'translate(14px, -21px) scale(0.75)',
            }
          }}
        >
          Sort (s)
        </InputLabel>
        <Select
          inputRef={sortSelectRef}
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontWeight: 700,
            border: '3px solid black',
            borderRadius: '8px',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            '&:hover': {
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            }
          }}
        >
          <MenuItem value="name">
            <SortIcon icon={FileText} label="Name" />
          </MenuItem>
          <MenuItem value="difficulty">
            <SortIcon icon={Zap} label="Difficulty" />
          </MenuItem>
          <MenuItem value="createdDate">
            <SortIcon icon={Calendar} label="Created" />
          </MenuItem>
          <MenuItem value="completionRate">
            <SortIcon icon={BarChart3} label="Completion Rate" />
          </MenuItem>
          <MenuItem value="currentStreak">
            <SortIcon icon={Flame} label="Streak" />
          </MenuItem>
        </Select>
      </FormControl>

      {/* Sort Order Toggle */}
      <IconButton
        onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
        sx={{
          border: '3px solid black',
          borderRadius: '8px',
          boxShadow: '4px 4px 0px rgba(0,0,0,1)',
          '&:hover': {
            boxShadow: '2px 2px 0px rgba(0,0,0,1)',
          },
          height: compact ? 40 : 40,
          width: compact ? 40 : 40,
          bgcolor: sortOrder === 'desc' ? 'primary.main' : 'background.default'
        }}
        title={`Sort order: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
      >
        {sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
      </IconButton>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <IconButton
          onClick={clearAllFilters}
          sx={{
            border: '3px solid black',
            borderRadius: '8px',
            boxShadow: '4px 4px 0px rgba(0,0,0,1)',
            '&:hover': {
              boxShadow: '2px 2px 0px rgba(0,0,0,1)',
            },
            height: compact ? 40 : 40,
            width: compact ? 40 : 40
          }}
        >
          <Clear />
        </IconButton>
      )}

      {/* Active Filter Indicator */}
      {hasActiveFilters && !compact && (
        <Chip
          icon={<FilterList />}
          label="Active Filters"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.75rem',
            height: 32,
            bgcolor: 'secondary.main',
            color: 'text.primary',
            border: '2px solid black',
            fontWeight: 700
          }}
        />
      )}
    </Box>
  );
};

export default HabitFilters;
