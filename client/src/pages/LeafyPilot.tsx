import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ConversationSidebar } from "../components/ConversationSidebar";
import {
  CustomChat,
  ConnectionContainer,
  ConnectionIndicator,
  ConnectionTooltip,
} from "../components/CustomChat";

interface ConversationSummary {
  _id: string;
  threadId: string;
  title: string;
  updatedAt: string;
  isActive: boolean;
}

// Main container with fixed height to prevent page scrolling
const LeafyPilotContainer = styled.div`
  height: calc(89vh);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui,
    sans-serif;
  overflow: hidden;
`;

// Mobile menu button
const MobileMenuButton = styled(motion.button)`
  display: none;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 1rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

// Mobile overlay
const MobileOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.isOpen ? 1 : 0};
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  transition: opacity 0.3s ease-in-out;
  
  @media (min-width: 769px) {
    display: none;
  }
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
  position: relative;

  @media (max-width: 768px) {
    gap: 0;
    padding: 0;
    margin: 0;
    max-width: 100%;
  }
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
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: #fafbfc;
  flex-shrink: 0; /* Don't shrink the header */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const ChatTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 500;
  color: #374151;
  margin: 0 0 0.25rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ChatSubtitle = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const HeaderIndicator = styled.div`
  margin-top: 0.25rem;
`;

export default function LeafyPilot() {
  const navigate = useNavigate();
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Close sidebar on window resize to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const quickActions = [
    { icon: "", text: "AI Semantic Search", action: "ai-search" },
    { icon: "", text: "Find products by description", action: "search" },
    { icon: "", text: "Compare prices across categories", action: "compare" },
    { icon: "", text: "Show highly rated items", action: "ratings" },
    { icon: "", text: "Track my orders", action: "orders" },
    {
      icon: "",
      text: "Find products based on preferences",
      action: "preferences",
    },
    { icon: "", text: "Gift recommendations", action: "gifts" },
  ];

  const features = [
    { icon: "🛡️", text: "Smart Product Matching" },
    { icon: "📊", text: "Price Trend Analysis" },
    { icon: "🎯", text: "Personalized Recommendations" },
    { icon: "🚚", text: "Delivery Optimization" },
  ];

  const handleQuickAction = (action: string) => {
    if (action === "ai-search") {
      navigate("/search");
    } else if (action === "orders") {
      navigate("/orders");
    } else {
      // TODO: Implement other quick action functionality
      console.log("Quick action clicked:", action);
    }
  };

  const handleConnectionStatusChange = (
    connected: boolean,
    authenticated: boolean
  ) => {
    setIsConnected(connected);
    setIsAuthenticated(authenticated);
  };

  return (
    <LeafyPilotContainer>
      <MobileOverlay
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
      />

      <MainContent>
        <ConversationSidebar
          conversations={conversations}
          currentThreadId={currentThreadId}
          quickActions={quickActions}
          features={features}
          onNewChat={() => {
            setCurrentThreadId(null);
            setIsSidebarOpen(false);
          }}
          onConversationSelect={(threadId) => {
            setCurrentThreadId(threadId);
            setIsSidebarOpen(false);
          }}
          onQuickAction={(action) => {
            handleQuickAction(action);
            setIsSidebarOpen(false);
          }}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <ChatArea
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <ChatHeader>
            <MobileMenuButton
              onClick={() => setIsSidebarOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </MobileMenuButton>
            <HeaderContent>
              <ChatTitle>Your Personal Shopping Assistant</ChatTitle>
              <ChatSubtitle>
                Ask me anything about products, orders, recommendations, or
                shopping help
              </ChatSubtitle>
            </HeaderContent>
            <HeaderIndicator>
              <ConnectionContainer>
                <ConnectionIndicator
                  connected={isConnected && isAuthenticated}
                />
                <ConnectionTooltip connected={isConnected && isAuthenticated}>
                  {!isAuthenticated
                    ? "Authentication required"
                    : isConnected
                    ? "Online"
                    : "Offline"}
                </ConnectionTooltip>
              </ConnectionContainer>
            </HeaderIndicator>
          </ChatHeader>

          <CustomChat
            selectedThreadId={currentThreadId}
            onConversationsUpdate={setConversations}
            onConnectionStatusChange={handleConnectionStatusChange}
          />
        </ChatArea>
      </MainContent>
    </LeafyPilotContainer>
  );
}
