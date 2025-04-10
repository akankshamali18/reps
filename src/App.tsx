import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import { Box } from '@mui/material';
import './App.css';
import './DarkMode.css';

const App: React.FC = () => {
  return (
    <Router>
      <Box 
        sx={{ 
          width: '100%', 
          height: '100vh', 
          bgcolor: '#343541',
          overflow: 'hidden'
        }}
      >
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
