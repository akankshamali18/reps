import React from 'react';
import SearchPage from './pages/SearchPage';
import { CssBaseline, Box } from '@mui/material';
import './App.css';
import './DarkMode.css';

/**
 * Main App Component
 * Root component that renders the application with global styling
 */
const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Box 
        sx={{ 
          width: '100%', 
          height: '100vh', 
          bgcolor: '#343541',
          overflow: 'hidden'
        }}
      >
        <SearchPage />
      </Box>
    </>
  );
};

export default App;