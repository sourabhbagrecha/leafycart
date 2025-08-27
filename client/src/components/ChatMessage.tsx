import styled from "styled-components";
import { motion } from "framer-motion";

const MessageContainer = styled(motion.div)<{ isUser: boolean }>`
  background: ${props => 
    props.isUser 
      ? 'linear-gradient(135deg, #2c5282, #3182ce)' 
      : '#f8fafc'};
  color: ${props => props.isUser ? 'white' : '#374151'};
  border: ${props => props.isUser ? 'none' : '1px solid #e2e8f0'};
  border-radius: ${props => props.isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  line-height: 1.4;
  max-width: 70%;
  word-wrap: break-word;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin-left: ${props => props.isUser ? 'auto' : '0'};
  margin-right: ${props => props.isUser ? '0' : 'auto'};
  box-shadow: none;
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