import React, { useState } from 'react';
import ChatHistory from './ChatHistory';
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


const SearchInput: React.FC<SearchProps> = ({ onSearch, placeholder = 'Ask anything', className = '' }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  
  const handleSearch = async (value: string) => {
    if (!value.trim()) return;
    
    setIsTyping(true);
    try {
      await onSearch(value);
      setInputValue(''); 
    } finally {
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
        pb: { xs: 2, sm: 4 },
        bgcolor: '#212121',
        borderTop: '1px solid',
        borderColor: 'rgba(255,255,255,0.1)',
        zIndex: 1000,
      }}
      className={className}
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
            bgcolor: '#303030',
            boxShadow: '0 0 15px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.2s ease',
            '&:hover': {
              boxShadow: '0 0 15px rgba(0,0,0,0.2)',
            },
          }}
          elevation={3}
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Add new chat button */}
          <IconButton 
            sx={{ 
              mr: 1, 
              color: 'rgba(255,255,255,0.6)',
              '&:hover': { 
                color: 'rgba(255,255,255,0.9)',
                bgcolor: 'rgba(255,255,255,0.08)'
              }
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>

          {/* Main input field */}
          <InputBase
            sx={{ 
              ml: 1, 
              flex: 1,
              color: 'white',
              fontSize: '1rem',
              lineHeight: '1.5',
              '& .MuiInputBase-input': {
                padding: '8px 0',
              }
            }}
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            disabled={isTyping}
          />

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 1, ml: 1, alignItems: 'center' }}>
            {/* Search button */}
            <Button 
              variant="text" 
              sx={{ 
                minWidth: 'auto', 
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'none',
                transition: 'all 0.2s ease',
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.9)'
                },
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
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'none',
                transition: 'all 0.2s ease',
                '&:hover': { 
                  bgcolor: 'rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.9)'
                },
                p: '6px 10px',
              }}
              startIcon={<TipsAndUpdatesIcon fontSize="small" />}
            >
              Reason
            </Button>

            {/* More options button */}
            <IconButton 
              sx={{ 
                color: 'rgba(255,255,255,0.6)',
                '&:hover': { 
                  color: 'rgba(255,255,255,0.9)',
                  bgcolor: 'rgba(255,255,255,0.08)'
                }
              }}
            >
              <MoreHorizIcon fontSize="small" />
            </IconButton>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5, bgcolor: 'rgba(255,255,255,0.2)' }} />

            {/* Voice input button - only shown when input is empty */}
            {!inputValue && (
              <IconButton 
                sx={{ 
                  bgcolor: '#5a5a72', 
                  color: 'white',
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    bgcolor: '#6e6e8c',
                    transform: 'scale(1.05)'
                  } 
                }}
                onClick={() => console.log('Voice input')}
              >
                <MicIcon fontSize="small" />
              </IconButton>
            )}

            
            {inputValue && (
              <IconButton 
                sx={{ 
                  bgcolor: '#5a5a72', 
                  color: 'white',
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    bgcolor: '#6e6e8c',
                    transform: 'scale(1.05)'
                  } 
                }}
                onClick={() => handleSearch(inputValue)}
                disabled={isTyping}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </IconButton>
            )}
          </Box>
        </Paper>

        
        <Box sx={{ textAlign: 'center', mt: 1, fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
          ChatGPT can make mistakes. Check important info.
        </Box>
      </Box>
    </Box>
  );
};

export default SearchInput; 