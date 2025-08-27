import styled from "styled-components";
import { motion } from "framer-motion";
import { QuickActions } from "./QuickActions";

const Sidebar = styled(motion.aside)<{ isOpen?: boolean }>`
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  max-height: 100%;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${props => props.isOpen ? '0' : '-100%'};
    height: 100vh;
    width: 80%;
    max-width: 320px;
    z-index: 1000;
    border-radius: 0;
    transition: left 0.3s ease-in-out;
  }
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  flex: 1;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.5rem;
    padding-top: 4rem;
  }

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

const SidebarSection = styled.div``;

const SidebarTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1rem 0;
`;

const NewChatButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, #2c5282, #3182ce);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ConversationHistory = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ConversationItem = styled(motion.div)<{ isActive: boolean }>`
  padding: 0.75rem;
  background: ${props => props.isActive ? '#edf2f7' : '#f7fafc'};
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${props => props.isActive ? '#2c5282' : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    background: #edf2f7;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ConversationTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #2d3748;
  margin-bottom: 0.25rem;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ConversationDate = styled.div`
  font-size: 0.75rem;
  color: #718096;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, #edf2f7, #f7fafc);
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

const FeatureIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #2c5282;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  flex-shrink: 0;
`;

const FeatureText = styled.div`
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
`;

interface ConversationSummary {
  _id: string;
  threadId: string;
  title: string;
  updatedAt: string;
  isActive: boolean;
}

interface QuickAction {
  icon: string;
  text: string;
  action: string;
}

interface Feature {
  icon: string;
  text: string;
}

const CloseButton = styled(motion.button)`
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

interface ConversationSidebarProps {
  conversations: ConversationSummary[];
  currentThreadId: string | null;
  quickActions: QuickAction[];
  features: Feature[];
  onNewChat: () => void;
  onConversationSelect: (threadId: string) => void;
  onQuickAction?: (action: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function ConversationSidebar({
  conversations,
  currentThreadId,
  quickActions,
  features,
  onNewChat,
  onConversationSelect,
  onQuickAction,
  isOpen = true,
  onClose
}: ConversationSidebarProps) {
  return (
    <Sidebar
      isOpen={isOpen}
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
      <CloseButton
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </CloseButton>
      <SidebarContent>
        <SidebarSection>
          <SidebarTitle>Quick Actions</SidebarTitle>
          <QuickActions actions={quickActions} onActionClick={onQuickAction} />
        </SidebarSection>

        <SidebarSection>
          <SidebarTitle>Conversations</SidebarTitle>
          <NewChatButton
            onClick={onNewChat}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ✨ New Chat
          </NewChatButton>
          <ConversationHistory>
            {conversations.map((conversation, index) => (
              <ConversationItem
                key={conversation.threadId}
                isActive={conversation.threadId === currentThreadId}
                onClick={() => onConversationSelect(conversation.threadId)}
                whileHover={{ x: 4 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                <ConversationTitle>{conversation.title}</ConversationTitle>
                <ConversationDate>
                  {new Date(conversation.updatedAt).toLocaleDateString()}
                </ConversationDate>
              </ConversationItem>
            ))}
            {conversations.length === 0 && (
              <div style={{ 
                color: '#a0aec0', 
                fontSize: '0.9rem', 
                textAlign: 'center', 
                padding: '1rem' 
              }}>
                No conversations yet. Start a new chat!
              </div>
            )}
          </ConversationHistory>
        </SidebarSection>

        <SidebarSection>
          <SidebarTitle>AI Capabilities</SidebarTitle>
          <Features>
            {features.map((feature, index) => (
              <FeatureItem key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureText>{feature.text}</FeatureText>
              </FeatureItem>
            ))}
          </Features>
        </SidebarSection>
      </SidebarContent>
    </Sidebar>
  );
}