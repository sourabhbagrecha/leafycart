import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";
import { ChatMessage } from "./ChatMessage";
import { OrderCard } from "./OrderCard";
import { OrdersList } from "./OrdersList";

const ChatMessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
`;

const ChatInputContainer = styled.div`
  flex-shrink: 0;
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
`;

const ChatInput = styled.textarea`
  flex: 1;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  color: #374151;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  resize: none;
  min-height: 40px;
  max-height: 100px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px; /* Prevent zoom on iOS */
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #2c5282;
    box-shadow: 0 0 0 2px rgba(44, 82, 130, 0.1);
    outline: none;
  }
`;

const ChatButton = styled(motion.button)`
  background: linear-gradient(135deg, #2c5282, #3182ce);
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
  height: fit-content;
  cursor: pointer;
  min-width: 70px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 2rem 1.5rem;
  color: #718096;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
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

const ConnectionIndicator = styled.div<{ connected: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.connected ? '#10b981' : '#ef4444'};
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: inherit;
    animation: ${props => props.connected ? 'pulse-green' : 'pulse-red'} 2s infinite;
    opacity: 0.6;
  }
  
  @keyframes pulse-green {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.4);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0.6;
    }
  }
  
  @keyframes pulse-red {
    0% {
      transform: scale(1);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.4);
      opacity: 0.2;
    }
    100% {
      transform: scale(1);
      opacity: 0.6;
    }
  }
`;

const ConnectionTooltip = styled.div<{ connected: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #374151;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  margin-top: 0.5rem;
  z-index: 1000;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-bottom-color: #374151;
  }
`;

const ConnectionContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  &:hover ${ConnectionTooltip} {
    opacity: 1;
  }
`;

export { ConnectionContainer, ConnectionIndicator, ConnectionTooltip };

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  structuredData?: {
    type: 'order_display' | 'order_confirmation' | 'orders_list' | 'text';
    data?: any;
    message?: string;
  };
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
  onConnectionStatusChange?: (isConnected: boolean, isAuthenticated: boolean) => void;
}

export function CustomChat({ selectedThreadId, onConversationsUpdate, onConnectionStatusChange }: CustomChatProps) {
  const { isAuthenticated } = useAuth();
  const axiosClient = useAxios();
  const queryClient = useQueryClient();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Query to load all conversations
  const {
    data: conversations = [],
    error: conversationsError,
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const response = await axiosClient.get('/api/conversations');
      return response.data as ConversationSummary[];
    },
    enabled: isAuthenticated,
    staleTime: 30000, // 30 seconds
  });

  // Mutation to load a specific conversation
  const loadConversationMutation = useMutation({
    mutationFn: async (threadId: string) => {
      const response = await axiosClient.get(`/api/conversations/${threadId}`);
      return response.data;
    },
    onSuccess: (conversation) => {
      setThreadId(conversation.threadId);
      
      const uiMessages: Message[] = conversation.messages.map((msg: any) => {
        
        // Try to reconstruct structured data from text content
        let structuredData = msg.structuredData || msg.structured_data || msg.metadata;
        
        if (!structuredData && !msg.isUser && msg.content) {
          // Check if this looks like an orders list response
          if (msg.content.includes('Here are your last') && msg.content.includes('orders:') && msg.content.includes('Order ID:')) {
            // Parse order data from text - more comprehensive regex to capture items
            const orderMatches = [...msg.content.matchAll(/(\d+)\) Order ID: ([a-f0-9]+)[\s\S]*?Date: ([\d-T:.Z]+)[\s\S]*?Status: (\w+)[\s\S]*?Total: \$?([\d.]+)[\s\S]*?Items:([\s\S]*?)(?=(?:\d+\) Order ID:)|$)/g)];
            
            if (orderMatches && orderMatches.length > 0) {
              const orders = orderMatches.map((match) => {
                const [, orderNum, orderId, date, status, total, itemsText] = match;
                
                // Parse items from the items section
                const items: any[] = [];
                if (itemsText) {
                  const itemMatches = [...itemsText.matchAll(/- (.+?) — qty (\d+) — \$?([\d.]+)(?: each)?/g)];
                  itemMatches.forEach((itemMatch) => {
                    const [, name, quantity, price] = itemMatch;
                    items.push({
                      name: name.trim(),
                      quantity: parseInt(quantity),
                      price: parseFloat(price)
                    });
                  });
                }
                
                return {
                  orderId,
                  date,
                  status,
                  total: parseFloat(total),
                  items
                };
              }).filter(Boolean);
              
              if (orders.length > 0) {
                structuredData = {
                  type: 'orders_list' as const,
                  data: { orders },
                  message: 'Here are your orders:'
                };
              }
            }
          }
          // Check if this looks like a single order response
          else if (msg.content.includes('Order ID:') && msg.content.includes('Status:') && msg.content.includes('Total:') && !msg.content.includes('Here are your last')) {
            const orderMatch = msg.content.match(/Order ID: ([a-f0-9]+)[\s\S]*?Date: ([\d-T:.Z]+)[\s\S]*?Status: (\w+)[\s\S]*?Total: \$?([\d.]+)[\s\S]*?Items:([\s\S]*?)(?=Would you like|$)/);
            
            if (orderMatch) {
              const [, orderId, date, status, total, itemsText] = orderMatch;
              
              // Parse items
              const items: any[] = [];
              if (itemsText) {
                const itemMatches = [...itemsText.matchAll(/- (.+?) — qty (\d+) — \$?([\d.]+)(?: each)?/g)];
                itemMatches.forEach((itemMatch) => {
                  const [, name, quantity, price] = itemMatch;
                  items.push({
                    name: name.trim(),
                    quantity: parseInt(quantity),
                    price: parseFloat(price)
                  });
                });
              }
              
              structuredData = {
                type: 'order_display' as const,
                data: {
                  orderId,
                  date,
                  status,
                  total: parseFloat(total),
                  items
                },
                message: msg.content.split('Order ID:')[0].trim()
              };
            }
          }
        }
        
        const mappedMsg = {
          id: msg.id,
          text: msg.content,
          isUser: msg.role === 'user',
          timestamp: new Date(msg.timestamp),
          structuredData
        };
        return mappedMsg;
      });
      
      setMessages(uiMessages);
    },
    onError: (error) => {
      console.error('Error loading conversation:', error);
    }
  });

  // Mutation to send a message
  const sendMessageMutation = useMutation({
    mutationFn: async ({ message, currentThreadId }: { message: string; currentThreadId: string | null }) => {
      if (!currentThreadId) {
        // Start new conversation
        const response = await axiosClient.post('/api/agent', { message });
        return { ...response.data, isNewThread: true };
      } else {
        // Continue existing conversation
        const response = await axiosClient.post(`/api/agent/${currentThreadId}`, { message });
        return { ...response.data, isNewThread: false };
      }
    },
    onSuccess: (data) => {
      // Set thread ID if this is a new conversation
      if (data.isNewThread && data.threadId) {
        setThreadId(data.threadId);
      }

      // Handle structured responses
      let aiMessage: Message;
      
      if (data.response && typeof data.response === 'object' && data.response.type && data.response.type !== 'text') {
        // Structured response (order card, etc.)
        aiMessage = {
          id: (Date.now() + 1).toString(),
          text: data.response.message || 'Order information',
          isUser: false,
          timestamp: new Date(),
          structuredData: {
            type: data.response.type,
            data: data.response.data,
            message: data.response.message
          }
        };
      } else {
        // Regular text response
        aiMessage = {
          id: (Date.now() + 1).toString(),
          text: typeof data.response === 'string' ? data.response : data.response?.message || 'No response received',
          isUser: false,
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, aiMessage]);

      // Invalidate conversations query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error connecting to the server. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update conversations when they change
  useEffect(() => {
    if (conversations) {
      onConversationsUpdate(conversations);
    }
  }, [conversations, onConversationsUpdate]);

  // Handle selected thread changes
  useEffect(() => {
    if (selectedThreadId) {
      loadConversationMutation.mutate(selectedThreadId);
    } else {
      // Start new conversation
      setThreadId(null);
      setMessages([]);
    }
  }, [selectedThreadId]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || sendMessageMutation.isPending || !isAuthenticated) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    // Send message using mutation
    sendMessageMutation.mutate({
      message: currentInput,
      currentThreadId: threadId
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Determine loading and error states
  const isLoading = sendMessageMutation.isPending || loadConversationMutation.isPending;
  const hasError = sendMessageMutation.error || loadConversationMutation.error || conversationsError;
  const isConnected = !hasError;

  // Notify parent about connection status changes
  useEffect(() => {
    onConnectionStatusChange?.(isConnected, isAuthenticated);
  }, [isConnected, isAuthenticated, onConnectionStatusChange]);

  return (
    <>
      {hasError && (
        <ErrorBanner
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          ⚠️ {hasError instanceof Error ? hasError.message : 'An error occurred'}
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
          messages.map((message) => {
            try {
              if (!message.isUser && message.structuredData?.type) {
                // Handle orders list display
                if (message.structuredData.type === 'orders_list') {
                  if (!message.structuredData.data || !message.structuredData.data.orders) {
                    console.error('Invalid orders list data:', message.structuredData.data);
                    return (
                      <ChatMessage
                        key={message.id}
                        text="Error: Invalid orders data received"
                        isUser={false}
                      />
                    );
                  }
                  
                  return (
                    <OrdersList
                      key={message.id}
                      orders={message.structuredData.data.orders}
                      onAction={(action, orderId) => {
                        // Handle order card actions
                        let actionMessage = '';
                        switch (action) {
                          case 'cancel':
                            actionMessage = `Cancel my order ${orderId}`;
                            break;
                          case 'confirm_cancel':
                            actionMessage = 'Yes, cancel my order';
                            break;
                          case 'keep_order':
                            actionMessage = 'No, keep my order';
                            break;
                          case 'track':
                            actionMessage = `Track my order ${orderId}`;
                            break;
                          default:
                            actionMessage = action;
                        }
                        
                        // Add user message and send to agent
                        const userMessage: Message = {
                          id: Date.now().toString(),
                          text: actionMessage,
                          isUser: true,
                          timestamp: new Date()
                        };
                        
                        setMessages(prev => [...prev, userMessage]);
                        
                        // Send action to agent
                        sendMessageMutation.mutate({
                          message: actionMessage,
                          currentThreadId: threadId
                        });
                      }}
                    />
                  );
                }
                
                // Handle single order display
                if (message.structuredData.type === 'order_display' || message.structuredData.type === 'order_confirmation') {
                  // Validate required data exists
                  if (!message.structuredData.data || !message.structuredData.data.orderId) {
                    console.error('Invalid order data:', message.structuredData.data);
                    return (
                      <ChatMessage
                        key={message.id}
                        text="Error: Invalid order data received"
                        isUser={false}
                      />
                    );
                  }
                  
                  return (
                    <OrderCard
                      key={message.id}
                      data={message.structuredData.data}
                      messageType={message.structuredData.type}
                      message={message.structuredData.message}
                      onAction={(action, orderId) => {
                        // Handle order card actions
                        let actionMessage = '';
                        switch (action) {
                          case 'cancel':
                            actionMessage = `Cancel my order ${orderId}`;
                            break;
                          case 'confirm_cancel':
                            actionMessage = 'Yes, cancel my order';
                            break;
                          case 'keep_order':
                            actionMessage = 'No, keep my order';
                            break;
                          case 'track':
                            actionMessage = `Track my order ${orderId}`;
                            break;
                          default:
                            actionMessage = action;
                        }
                        
                        // Add user message and send to agent
                        const userMessage: Message = {
                          id: Date.now().toString(),
                          text: actionMessage,
                          isUser: true,
                          timestamp: new Date()
                        };
                        
                        setMessages(prev => [...prev, userMessage]);
                        
                        // Send action to agent
                        sendMessageMutation.mutate({
                          message: actionMessage,
                          currentThreadId: threadId
                        });
                      }}
                    />
                  );
                }
              }
              
              // Default to regular chat message
              return (
                <ChatMessage
                  key={message.id}
                  text={message.text}
                  isUser={message.isUser}
                />
              );
            } catch (error) {
              console.error('Error rendering message:', error, message);
              return (
                <ChatMessage
                  key={message.id}
                  text="Error rendering message"
                  isUser={false}
                />
              );
            }
          })
        )}
        {sendMessageMutation.isPending && (
          <ChatMessage
            text=""
            isUser={false}
            isLoading={true}
          />
        )}
        <div ref={messagesEndRef} />
      </ChatMessagesContainer>
      
      <ChatInputContainer>
        <InputRow>
          <ChatInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isAuthenticated ? "Ask me anything about products, shopping, or recommendations..." : "Please log in to use the AI assistant"}
            disabled={isLoading || !isAuthenticated}
          />
          <ChatButton
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading || !isAuthenticated}
            whileHover={{ scale: (isConnected && isAuthenticated) ? 1.02 : 1 }}
            whileTap={{ scale: (isConnected && isAuthenticated) ? 0.98 : 1 }}
          >
            {sendMessageMutation.isPending ? 'Sending...' : 'Send'}
          </ChatButton>
        </InputRow>
      </ChatInputContainer>
    </>
  );
}