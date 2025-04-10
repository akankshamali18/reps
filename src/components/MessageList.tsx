import React from 'react';
import { Box } from '@mui/material';
import UserMessage from './UserMessage';
import GPTMessage from './GPTMessage';
import { Message } from '../types/message.types';
import ChatHistory from './ChatHistory';

interface MessageListProps {
  messages: Message[];
}


const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        pb: 16,
        width: '100%',
        px: 8,
        maxWidth: '1200px',
        mx: 'auto',
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