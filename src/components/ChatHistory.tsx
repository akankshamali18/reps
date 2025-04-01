import React, { useState } from 'react';
import { Drawer, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

// Define message structure
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

  // Toggle the drawer visibility
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer}>
        {isOpen ? 'Hide Chat History' : 'Show Chat History'}
      </Button>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            backgroundColor: '#1f1f1f', // Dark background similar to ChatGPT
            color: '#ffffff',            // White text color for readability
            border: 'none',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Same font family as ChatGPT
            padding: 2,
          },
        }}
        variant="persistent"
      >
        <div>
          <Typography variant="h6" sx={{ padding: '16px', color: 'white' }}>
            Chat History
          </Typography>
          <List>
            {messages.map((message, index) => (
              <ListItem key={index} sx={{ padding: '8px 16px' }}>
                <ListItemText
                  primary={`${message.sender}: ${message.text}`}
                  primaryTypographyProps={{
                    style: { fontFamily: 'Roboto', color: '#e0e0e0' }, // Match font and color
                  }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default ChatHistory;
