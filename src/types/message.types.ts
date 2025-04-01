/**
 * Message role type
 */
export type MessageRole = 'user' | 'assistant';

/**
 * Message interface
 */
export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

/**
 * UserMessageProps interface
 */
export interface UserMessageProps {
  content: string;
  timestamp?: Date;
}

/**
 * GPTMessageProps interface
 */
export interface GPTMessageProps {
  content: string;
  timestamp?: Date;
} 