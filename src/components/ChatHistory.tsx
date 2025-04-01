import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText } from '@mui/material';

interface Message {
  sender: string;
  text: string;
}

const ChatHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'User', text: 'Hello GPT!' },
    { sender: 'GPT', text: 'Hi! How can I help you?' }
  ]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer}>
        {isOpen ? 'Hide Chat History' : 'Show Chat History'}
      </Button>

      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
        <div style={{ width: 300, padding: 20 }}>
          <h3>Chat History</h3>
          <List>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${message.sender}: ${message.text}`} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default ChatHistory;
