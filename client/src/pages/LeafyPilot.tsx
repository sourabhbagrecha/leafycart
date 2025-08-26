import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { ConversationSidebar } from "../components/ConversationSidebar";
import { CustomChat } from "../components/CustomChat";

interface ConversationSummary {
  _id: string;
  threadId: string;
  title: string;
  updatedAt: string;
  isActive: boolean;
}

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

export default function LeafyPilot() {
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  
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

  const features = [
    { icon: "🛡️", text: "Smart Product Matching" },
    { icon: "📊", text: "Price Trend Analysis" },
    { icon: "🎯", text: "Personalized Recommendations" },
    { icon: "🚚", text: "Delivery Optimization" },
  ];

  const handleQuickAction = (action: string) => {
    // TODO: Implement quick action functionality
    console.log('Quick action clicked:', action);
  };

  return (
    <LeafyPilotContainer>
      <MainContent>
        <ConversationSidebar
          conversations={conversations}
          currentThreadId={currentThreadId}
          quickActions={quickActions}
          features={features}
          onNewChat={() => setCurrentThreadId(null)}
          onConversationSelect={setCurrentThreadId}
          onQuickAction={handleQuickAction}
        />

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

          <CustomChat 
            selectedThreadId={currentThreadId}
            onConversationsUpdate={setConversations}
          />
        </ChatArea>
      </MainContent>
    </LeafyPilotContainer>
  );
}
