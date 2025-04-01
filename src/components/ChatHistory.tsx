import React, { useState } from 'react';
import { Drawer, Button } from '@mui/material';

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

      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <div style={{ width: 300, padding: 20 }}>Chat History Panel</div>
      </Drawer>
    </div>
  );
};

export default ChatHistory;
