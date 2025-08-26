import styled from "styled-components";
import { motion } from "framer-motion";
import { CopilotChat } from "@copilotkit/react-ui";

// Main container with fixed height to prevent page scrolling
const LeafyPilotContainer = styled.div`
  height: calc(88vh);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui,
    sans-serif;
  overflow: hidden;
`;

// Main content area
const MainContent = styled.div`
  flex: 1;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  gap: 2rem;
  padding: 2rem;
  overflow: hidden;
  min-height: 0; /* Allow flex children to shrink */
`;

// Sidebar with suggestions and features
const Sidebar = styled(motion.aside)`
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0; /* Don't shrink the sidebar */
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

  /* Custom scrollbar styling */
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

const QuickActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const QuickActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #4a5568;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ActionIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #2c5282, #3182ce);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const RecentChats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RecentChatItem = styled(motion.div)`
  padding: 0.75rem;
  background: #f7fafc;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #718096;
  cursor: pointer;
  border-left: 3px solid transparent;

  &:hover {
    background: #edf2f7;
    border-left-color: #2c5282;
    color: #4a5568;
  }
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

// Chat area
const ChatArea = styled(motion.main)`
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Allow flex children to shrink */
  max-height: 100%;
`;

const ChatHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #f7fafc, #edf2f7);
  flex-shrink: 0; /* Don't shrink the header */
`;

const ChatTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
`;

const ChatSubtitle = styled.p`
  font-size: 0.95rem;
  color: #718096;
  margin: 0;
`;

const CopilotWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0; /* Allow flex children to shrink */

  /* Professional styling for CopilotKit */
  .copilot-kit-chat {
    height: 100%;
    background: transparent;
    border: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui,
      sans-serif;
    display: flex;
    flex-direction: column;
  }

  .copilot-kit-chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .copilot-kit-chat-message {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    color: #2d3748;
    padding: 1.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    max-width: 80%;
    word-wrap: break-word;

    &.user {
      background: linear-gradient(135deg, #2c5282, #3182ce);
      color: white;
      border-color: #2c5282;
      align-self: flex-end;
      margin-left: auto;
    }

    &.assistant {
      background: white;
      border-color: #cbd5e0;
      align-self: flex-start;
      margin-right: auto;
    }
  }

  .copilot-kit-chat-input-container {
    flex-shrink: 0;
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
    background: #f9fafb;
    display: flex;
    gap: 1rem;
    align-items: flex-end;
  }

  .copilot-kit-chat-input {
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

    &::placeholder {
      color: #a0aec0;
    }

    &:focus {
      border-color: #2c5282;
      box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1);
      outline: none;
    }
  }

  .copilot-kit-chat-button {
    background: linear-gradient(135deg, #2c5282, #3182ce);
    border: none;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    transition: all 0.2s ease;
    flex-shrink: 0;
    height: fit-content;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(44, 82, 130, 0.3);
    }

    &:active {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      transform: none;
      cursor: not-allowed;
    }
  }
`;

export default function LeafyPilot() {
  const quickActions = [
    { icon: "🔍", text: "Find products by description", action: "search" },
    { icon: "💰", text: "Compare prices across categories", action: "compare" },
    { icon: "⭐", text: "Show highly rated items", action: "ratings" },
    { icon: "📦", text: "Track my orders", action: "orders" },
    {
      icon: "❤️",
      text: "Find products based on preferences",
      action: "preferences",
    },
    { icon: "🎁", text: "Gift recommendations", action: "gifts" },
  ];

  const recentChats = [
    "Help me find wireless headphones under $100",
    "What are the best eco-friendly products?",
    "Show me products similar to my last order",
    "Find deals on home office equipment",
  ];

  const features = [
    { icon: "🛡️", text: "Smart Product Matching" },
    { icon: "📊", text: "Price Trend Analysis" },
    { icon: "🎯", text: "Personalized Recommendations" },
    { icon: "🚚", text: "Delivery Optimization" },
  ];

  return (
    <LeafyPilotContainer>
      {/* Main Content */}
      <MainContent>
        {/* Sidebar */}
        <Sidebar
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <SidebarContent>
            <SidebarSection>
              <SidebarTitle>Quick Actions</SidebarTitle>
              <QuickActions>
                {quickActions.map((action, index) => (
                  <QuickActionButton
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  >
                    <ActionIcon>{action.icon}</ActionIcon>
                    <span>{action.text}</span>
                  </QuickActionButton>
                ))}
              </QuickActions>
            </SidebarSection>

            <SidebarSection>
              <SidebarTitle>Recent Conversations</SidebarTitle>
              <RecentChats>
                {recentChats.map((chat, index) => (
                  <RecentChatItem
                    key={index}
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    {chat}
                  </RecentChatItem>
                ))}
              </RecentChats>
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

        {/* Chat Area */}
        <ChatArea
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <ChatHeader>
            <ChatTitle>Your Personal Shopping Assistant</ChatTitle>
            <ChatSubtitle>
              Ask me anything about products, orders, recommendations, or
              shopping help
            </ChatSubtitle>
          </ChatHeader>

          <CopilotWrapper>
            <CopilotChat />
          </CopilotWrapper>
        </ChatArea>
      </MainContent>
    </LeafyPilotContainer>
  );
}
