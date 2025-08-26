import styled from "styled-components";
import { motion } from "framer-motion";
import { QuickActions } from "./QuickActions";

const Sidebar = styled(motion.aside)`
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
`;

const SidebarContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  flex: 1;

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

interface ConversationSidebarProps {
  conversations: ConversationSummary[];
  currentThreadId: string | null;
  quickActions: QuickAction[];
  features: Feature[];
  onNewChat: () => void;
  onConversationSelect: (threadId: string) => void;
  onQuickAction?: (action: string) => void;
}

export function ConversationSidebar({
  conversations,
  currentThreadId,
  quickActions,
  features,
  onNewChat,
  onConversationSelect,
  onQuickAction
}: ConversationSidebarProps) {
  return (
    <Sidebar
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
    >
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