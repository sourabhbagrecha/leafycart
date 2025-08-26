import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { ChatMessage } from "./ChatMessage";

const ChatMessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
`;

const ChatInputContainer = styled.div`
  flex-shrink: 0;
  padding: 1.5rem;
  border-top: 1px solid #e2e8f0;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
`;

const ChatInput = styled.textarea`
  flex: 1;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  color: #2d3748;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  resize: none;
  min-height: 44px;
  max-height: 120px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    border-color: #2c5282;
    box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1);
    outline: none;
  }
`;

const ChatButton = styled(motion.button)`
  background: linear-gradient(135deg, #2c5282, #3182ce);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
  height: fit-content;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #718096;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const WelcomeIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 0.5rem;
`;

const WelcomeText = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #4a5568;
  margin: 0 0 0.5rem 0;
`;

const WelcomeSubtext = styled.p`
  font-size: 1rem;
  color: #718096;
  max-width: 400px;
  line-height: 1.5;
  margin: 0;
`;

const ErrorBanner = styled(motion.div)`
  background: #fed7d7;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 1.5rem 0 1.5rem;
  color: #c53030;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ConnectionStatus = styled.div<{ connected: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${props => props.connected ? '#38a169' : '#e53e3e'};
  margin-bottom: 0.5rem;
`;

const StatusDot = styled.div<{ connected: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.connected ? '#38a169' : '#e53e3e'};
`;

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ConversationSummary {
  _id: string;
  threadId: string;
  title: string;
  updatedAt: string;
  isActive: boolean;
}

interface CustomChatProps {
  selectedThreadId: string | null;
  onConversationsUpdate: (conversations: ConversationSummary[]) => void;
}

export function CustomChat({ selectedThreadId, onConversationsUpdate }: CustomChatProps) {
  const { token, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isAuthenticated && token) {
      loadConversations();
    }
  }, [isAuthenticated, token]);

  useEffect(() => {
    if (selectedThreadId) {
      loadConversation(selectedThreadId);
    } else {
      startNewConversation();
    }
  }, [selectedThreadId]);

  const loadConversations = async () => {
    if (!token) return;
    
    setLoadingConversations(true);
    try {
      const response = await fetch('http://localhost:3000/api/conversations', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setConversations(data);
        onConversationsUpdate(data);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoadingConversations(false);
    }
  };

  const loadConversation = async (selectedThreadId: string) => {
    if (!token) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/conversations/${selectedThreadId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const conversation = await response.json();
        setThreadId(selectedThreadId);
        
        const uiMessages: Message[] = conversation.messages.map((msg: any) => ({
          id: msg.id,
          text: msg.content,
          isUser: msg.role === 'user',
          timestamp: new Date(msg.timestamp)
        }));
        
        setMessages(uiMessages);
        setError(null);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
      setError('Failed to load conversation');
    }
  };

  const startNewConversation = () => {
    setThreadId(null);
    setMessages([]);
    setError(null);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !isAuthenticated || !token) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (!threadId) {
        response = await fetch('http://localhost:3000/api/agent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ message: currentInput }),
        });
      } else {
        response = await fetch(`http://localhost:3000/api/agent/${threadId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ message: currentInput }),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setError(null);
      setIsConnected(true);
      
      if (data.threadId && !threadId) {
        setThreadId(data.threadId);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'No response received',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      await loadConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      setIsConnected(false);
      setError('Failed to connect to the AI assistant. Please check if the server is running.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error connecting to the server. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {error && (
        <ErrorBanner
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          ⚠️ {error}
        </ErrorBanner>
      )}
      
      <ChatMessagesContainer>
        {messages.length === 0 ? (
          <WelcomeMessage>
            <WelcomeIcon>🛍️</WelcomeIcon>
            <WelcomeText>Welcome to LeafyPilot!</WelcomeText>
            <WelcomeSubtext>
              I'm your personal shopping assistant. Ask me about products, 
              compare prices, get recommendations, or anything else you need help with.
            </WelcomeSubtext>
          </WelcomeMessage>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              text={message.text}
              isUser={message.isUser}
            />
          ))
        )}
        {isLoading && (
          <ChatMessage
            text=""
            isUser={false}
            isLoading={true}
          />
        )}
        <div ref={messagesEndRef} />
      </ChatMessagesContainer>
      
      <ChatInputContainer>
        <ConnectionStatus connected={isConnected && isAuthenticated}>
          <StatusDot connected={isConnected && isAuthenticated} />
          {!isAuthenticated 
            ? 'Authentication required' 
            : isConnected 
              ? 'Connected to AI assistant' 
              : 'Disconnected - Server may be offline'}
        </ConnectionStatus>
        <InputRow>
          <ChatInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isAuthenticated ? "Ask me anything about products, shopping, or recommendations..." : "Please log in to use the AI assistant"}
            disabled={isLoading || !isConnected || !isAuthenticated}
          />
          <ChatButton
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading || !isConnected || !isAuthenticated}
            whileHover={{ scale: (isConnected && isAuthenticated) ? 1.02 : 1 }}
            whileTap={{ scale: (isConnected && isAuthenticated) ? 0.98 : 1 }}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </ChatButton>
        </InputRow>
      </ChatInputContainer>
    </>
  );
}