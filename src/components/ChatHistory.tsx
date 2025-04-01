import React, { useState } from 'react';
import { Button } from '@mui/material';

const ChatHistory = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer}>
        {isOpen ? 'Hide Chat History' : 'Show Chat History'}
      </Button>
    </div>
  );
};

export default ChatHistory;
