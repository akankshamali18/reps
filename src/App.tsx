import React from 'react';
import SearchPage from './pages/SearchPage';
import ChatHistory from './components/ChatHistory';
import { CssBaseline, Box } from '@mui/material';
import './App.css';
import './DarkMode.css';


const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Box 
        sx={{ 
          width: '100%', 
          height: '100vh', 
          bgcolor: '#333333',
          overflow: 'hidden'
        }}
      >
        <ChatHistory /> 
        <SearchPage />
      </Box>
    </>
  );
};

export default App;
