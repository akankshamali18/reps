import React from 'react';
import { Box } from '@mui/material';
import UserMessage from './UserMessage';
import GPTMessage from './GPTMessage';
import { Message } from '../types/message.types';

interface MessageListProps {
  messages: Message[];
}

/**
 * MessageList Component
 * Displays a list of messages in the conversation
 */
const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <Box 
      sx={{ 
        pb: 16, 
        width: '100%',
        px: 2, // Add horizontal padding to the entire chat space
        maxWidth: '1200px', // Limit maximum width for better readability on large screens
        mx: 'auto', // Center the chat container
      }}
    >
      {messages.map((message) => (
        <React.Fragment key={message.id}>
          {message.role === 'user' ? (
            <UserMessage 
              content={message.content} 
              timestamp={message.timestamp} 
            />
          ) : (
            <GPTMessage 
              content={message.content} 
              timestamp={message.timestamp} 
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default MessageList; 