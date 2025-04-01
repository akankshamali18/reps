import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';
import { Chat as ChatIcon, Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';

interface Message {
  chatLabel: string;
}

const ChatHistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const messages: { [key: string]: Message[] } = {
    Today: [
      { chatLabel: 'How to implement timestamps in React?' },
      { chatLabel: 'Best practices for clean code?' },
      { chatLabel: 'Understanding closures in JavaScript' },
      { chatLabel: 'React vs Vue comparison' },
      { chatLabel: 'Optimizing performance in React apps' },
    ],
    Yesterday: [
      { chatLabel: 'Handling state with Redux' },
      { chatLabel: 'Async vs Await in JavaScript' },
    ],
    'Previous 7 days': [
      { chatLabel: 'Understanding the event loop in Node.js' },
      { chatLabel: 'Setting up MongoDB with Express' },
    ],
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchIconClick = () => {
    setIsSearchActive(!isSearchActive);
    if (!isSearchActive) {
      setSearchQuery('');  
    }
  };

  return (
    <div>
      {}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1300,
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '50%',
          padding: 1,
        }}
      >
        <ChatIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            backgroundColor: '#1f1f1f',
            color: '#ffffff',
            border: 'none',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            padding: 2,
          },
        }}
        variant="persistent"
      >
        <div>
          {}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
            {}
            <IconButton sx={{ color: 'white' }} onClick={toggleDrawer}>
              <ChatIcon />
            </IconButton>

            {}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton sx={{ color: 'white', marginRight: 1 }} onClick={handleSearchIconClick}>
                <SearchIcon />
              </IconButton>
              <IconButton sx={{ color: 'white' }}>
                <AddIcon />
              </IconButton>
            </div>
          </div>

          {}
          <Typography variant="h6" sx={{ padding: '8px 16px', color: 'white', fontWeight: 'bold' }}>
            ChatGPT
          </Typography>

          {}
          {isSearchActive && (
            <TextField
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search chats..."
              sx={{
                marginBottom: '16px',
                backgroundColor: '#333333',
                borderRadius: '4px',
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
            />
          )}

          {}
          <Typography variant="subtitle1" sx={{ padding: '8px 16px', color: 'white', fontWeight: 'bold' }}>
            Today
          </Typography>
          <List>
            {messages.Today.filter((message) => message.chatLabel.toLowerCase().includes(searchQuery.toLowerCase())).map(
              (message, index) => (
                <ListItem key={index} sx={{ padding: '8px 16px' }}>
                  <ListItemText
                    primary={message.chatLabel}
                    primaryTypographyProps={{
                      style: { fontFamily: 'Roboto', color: '#e0e0e0' },
                    }}
                  />
                </ListItem>
              )
            )}
          </List>

          {}
          <Typography variant="subtitle1" sx={{ padding: '8px 16px', color: 'white', fontWeight: 'bold' }}>
            Yesterday
          </Typography>
          <List>
            {messages.Yesterday.filter((message) => message.chatLabel.toLowerCase().includes(searchQuery.toLowerCase())).map(
              (message, index) => (
                <ListItem key={index} sx={{ padding: '8px 16px' }}>
                  <ListItemText
                    primary={message.chatLabel}
                    primaryTypographyProps={{
                      style: { fontFamily: 'Roboto', color: '#e0e0e0' },
                    }}
                  />
                </ListItem>
              )
            )}
          </List>

          {}
          <Typography variant="subtitle1" sx={{ padding: '8px 16px', color: 'white', fontWeight: 'bold' }}>
            Previous 7 days
          </Typography>
          <List>
            {messages['Previous 7 days']
              .filter((message) => message.chatLabel.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((message, index) => (
                <ListItem key={index} sx={{ padding: '8px 16px' }}>
                  <ListItemText
                    primary={message.chatLabel}
                    primaryTypographyProps={{
                      style: { fontFamily: 'Roboto', color: '#e0e0e0' },
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
