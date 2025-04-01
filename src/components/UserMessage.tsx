import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { UserMessageProps } from '../types/message.types';

/**
 * UserMessage Component
 * Displays user messages on the right side of the conversation
 */
const UserMessage: React.FC<UserMessageProps> = ({ content, timestamp }) => {
  return (
    <Box 
      sx={{ 
        width: '100%',
        py: 4,
        px: 4,
        display: 'flex',
        justifyContent: 'flex-end',
        bgcolor: 'rgba(52, 53, 65, 0.95)',
        borderBottom: '1px solid rgba(32, 33, 35, 0.5)',
      }}
    >
      <Box 
        sx={{ 
          maxWidth: '80%',
          display: 'flex',
          flexDirection: 'row-reverse',
          gap: 1,
          alignItems: 'flex-start',
          pl: 8,
          pr: 3,
        }}
      >
        {/* User Avatar */}
        <Avatar 
          sx={{
            width: 30, 
            height: 30, 
            bgcolor: '#5a5a72',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            flexShrink: 0,
            ml: 0,
          }}
        >
          U
        </Avatar>

        {/* Message Content */}
        <Box 
          sx={{ 
            flex: 1, 
            textAlign: 'left',
            backgroundColor: 'rgba(64, 65, 79, 0.2)',
            borderRadius: '0.75rem 0 0.75rem 0.75rem',
            p: 2,
            mr: 0,
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {content}
          </Typography>
          
          {timestamp && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary', textAlign: 'right' }}>
              {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserMessage; 