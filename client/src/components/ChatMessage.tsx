import styled from "styled-components";
import { motion } from "framer-motion";

const MessageContainer = styled(motion.div)<{ isUser: boolean }>`
  background: ${props => 
    props.isUser 
      ? 'linear-gradient(135deg, #2c5282, #3182ce)' 
      : 'white'};
  color: ${props => props.isUser ? 'white' : '#2d3748'};
  border: 1px solid ${props => props.isUser ? '#2c5282' : '#cbd5e0'};
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  word-wrap: break-word;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin-left: ${props => props.isUser ? 'auto' : '0'};
  margin-right: ${props => props.isUser ? '0' : 'auto'};
`;

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  isLoading?: boolean;
}

export function ChatMessage({ text, isUser, isLoading = false }: ChatMessageProps) {
  return (
    <MessageContainer
      isUser={isUser}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading ? 'Thinking...' : text}
    </MessageContainer>
  );
}