import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import MessageList from '../components/MessageList';
import { SearchState, SearchResult } from '../types/search.types';
import { Message } from '../types/message.types';
import { Box, Typography, ThemeProvider, createTheme, Container, IconButton, Avatar } from '@mui/material';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#343541',
      paper: '#343541',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255,255,255,0.1)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#343541',
          color: '#FFFFFF',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#343541',
        },
      },
    },
  },
});

/**
 * SearchPage Component
 * Main page component that handles search functionality and displays results
 */
const SearchPage: React.FC = () => {
  // Initialize search state
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    results: [],
    isLoading: false,
    error: null,
  });

  // State for messages
  const [messages, setMessages] = useState<Message[]>([]);

  /**
   * Handles the search operation
   * @param query - The search query string
   */
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      return;
    }

    setSearchState(prev => ({ ...prev, isLoading: true, error: null }));

    // Add user message to conversation
    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      role: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // TODO: Replace with actual API call
      // This is a mock implementation
      const response = "How can I assist you today?";

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add AI response to conversation
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);

      setSearchState(prev => ({
        ...prev,
        query,
        isLoading: false,
      }));
    } catch (error) {
      setSearchState(prev => ({
        ...prev,
        error: 'Failed to fetch response. Please try again.',
        isLoading: false,
      }));
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          height: '100%',
          bgcolor: '#343541',
          color: 'text.primary',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Profile icon in top right */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16, 
            zIndex: 10
          }}
        >
          <IconButton 
            sx={{ 
              bgcolor: 'rgba(52, 53, 65, 0.7)',
              '&:hover': {
                bgcolor: 'rgba(52, 53, 65, 0.9)',
              },
              p: 0.5
            }}
          >
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36, 
                bgcolor: '#5a5a72',
                fontSize: '0.95rem',
                fontWeight: 'bold'
              }}
            >
              U
            </Avatar>
          </IconButton>
        </Box>

        {/* Main content area */}
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            pt: messages.length ? 2 : 15,
            bgcolor: '#343541',
            width: '100%',
            overflowY: 'auto',
            px: { xs: 0, sm: 2, md: 4 }, // Responsive padding based on screen size
          }}
        >
          {/* Welcome text - shown only when no messages */}
          {messages.length === 0 && !searchState.isLoading && (
            <Typography 
              variant="h4" 
              component="h1" 
              align="center" 
              sx={{ 
                mb: 4,
                fontWeight: 500,
                color: 'text.primary',
                px: 2, // Add padding to welcome text
              }}
            >
              What can I help with?
            </Typography>
          )}

          {/* Container for the message list */}
          <Container 
            maxWidth="lg" 
            disableGutters 
            sx={{ 
              flex: 1, 
              display: 'flex',
              flexDirection: 'column',
              px: { xs: 0, sm: 1, md: 2 }, // Responsive padding
            }}
          >
            <MessageList messages={messages} />
          </Container>
        </Box>

        {/* Search input area */}
        <SearchInput
          onSearch={handleSearch}
          placeholder="Ask anything"
        />
      </Box>
    </ThemeProvider>
  );
};

export default SearchPage; 