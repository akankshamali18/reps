import React, { useState } from 'react';
import { SearchProps } from '../types/search.types';
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Box,
  Button,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MicIcon from '@mui/icons-material/Mic';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

/**
 * SearchInput Component
 * A modern search input with ChatGPT-like design
 */
const SearchInput: React.FC<SearchProps> = ({ onSearch, placeholder = 'Ask anything', className = '' }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Handle search submission
  const handleSearch = async (value: string) => {
    if (!value.trim()) return;
    
    setIsTyping(true);
    try {
      await onSearch(value);
      setInputValue(''); // Clear input after search
    } finally {
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch(inputValue);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        pb: 4,
        bgcolor: '#343541',
        borderTop: 1,
        borderColor: 'divider',
        zIndex: 1000,
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        maxWidth: '48rem', 
        mx: 'auto' 
      }}>
        <Paper
          component="form"
          className="search-input"
          sx={{
            p: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '12px',
            bgcolor: '#40414f',
            boxShadow: '0 0 15px rgba(0,0,0,0.1)',
            '&:hover': {
              boxShadow: '0 0 15px rgba(0,0,0,0.2)',
            },
          }}
          elevation={3}
        >
          {/* Add new chat button */}
          <IconButton sx={{ mr: 1, color: 'text.secondary' }}>
            <AddIcon fontSize="small" />
          </IconButton>

          {/* Main input field */}
          <InputBase
            sx={{ 
              ml: 1, 
              flex: 1,
              color: 'text.primary',
              fontSize: '1rem',
            }}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
          />

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 1, ml: 1, alignItems: 'center' }}>
            {/* Search button */}
            <Button 
              variant="text" 
              sx={{ 
                minWidth: 'auto', 
                borderRadius: '8px',
                color: 'text.secondary',
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                p: '6px 10px',
              }}
              startIcon={<SearchIcon fontSize="small" />}
            >
              Search
            </Button>

            {/* Reason button */}
            <Button 
              variant="text" 
              sx={{ 
                minWidth: 'auto', 
                borderRadius: '8px',
                color: 'text.secondary',
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                p: '6px 10px',
              }}
              startIcon={<TipsAndUpdatesIcon fontSize="small" />}
            >
              Reason
            </Button>

            {/* More options button */}
            <IconButton sx={{ color: 'text.secondary' }}>
              <MoreHorizIcon fontSize="small" />
            </IconButton>

            {/* Voice input button - only shown when input is empty */}
            {!inputValue && (
              <IconButton 
                sx={{ 
                  ml: 1, 
                  bgcolor: '#5a5a72', 
                  color: 'white', 
                  '&:hover': { bgcolor: '#6e6e8c' } 
                }}
                onClick={() => console.log('Voice input')}
              >
                <MicIcon fontSize="small" />
              </IconButton>
            )}

            {/* Send button - only shown when input has text */}
            {inputValue && (
              <IconButton 
                sx={{ 
                  ml: 1, 
                  bgcolor: '#5a5a72', 
                  color: 'white', 
                  '&:hover': { bgcolor: '#6e6e8c' } 
                }}
                onClick={() => handleSearch(inputValue)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconButton>
            )}
          </Box>
        </Paper>

        {/* Footer info text */}
        <Box sx={{ textAlign: 'center', mt: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
          ChatGPT can make mistakes. Check important info.
        </Box>
      </Box>
    </Box>
  );
};

export default SearchInput; 