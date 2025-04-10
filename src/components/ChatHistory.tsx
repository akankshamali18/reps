import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';
import { Chat as ChatIcon, Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { Message } from '../types/message.types';

interface ChatHistoryProps {
  messages: Message[];
  onChatSelected: (selectedMessages: Message[]) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, onChatSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

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

  // Group messages by date
  const groupedMessages = messages.reduce((acc, message) => {
    const date = message.timestamp.toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {} as { [key: string]: Message[] });

  return (
    <div>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'absolute',
          top: 32,
          left: 16,
          zIndex: 1300,
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '16px' }}>
            <IconButton sx={{ color: 'white', marginRight: 1 }} onClick={handleSearchIconClick}>
              <SearchIcon />
            </IconButton>
            <IconButton sx={{ color: 'white' }}>
              <AddIcon />
            </IconButton>
          </div>
        </div>

        <Typography variant="h6" sx={{ padding: '8px 16px', color: 'white', fontWeight: 'bold' }}>
          ChatGPT
        </Typography>

        {isSearchActive && (
          <TextField
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search chats..."
            sx={{
              marginBottom: '16px',
              backgroundColor: '#343541',
            }}
          />
        )}

        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <React.Fragment key={date}>
            <Typography variant="subtitle1" sx={{ padding: '8px 16px', color: 'white', fontWeight: 'bold' }}>
              {date}
            </Typography>
            <List>
              {dateMessages
                .filter((message) => 
                  message.content.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((message) => (
                  <ListItem 
                    key={message.id} 
                    sx={{ padding: '8px 16px' }}
                    onClick={() => onChatSelected([message])}
                  >
                    <ListItemText
                      primary={message.content.substring(0, 50) + '...'}
                      primaryTypographyProps={{
                        style: { fontFamily: 'Roboto', color: '#e0e0e0' },
                      }}
                    />
                  </ListItem>
                ))}
            </List>
          </React.Fragment>
        ))}
      </Drawer>
    </div>
  );
};

export default ChatHistory;
