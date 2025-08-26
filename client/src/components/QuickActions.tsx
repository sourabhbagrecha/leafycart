import styled from "styled-components";
import { motion } from "framer-motion";

const QuickActionsContainer = styled.div`
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

interface QuickAction {
  icon: string;
  text: string;
  action: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
  onActionClick?: (action: string) => void;
}

export function QuickActions({ actions, onActionClick }: QuickActionsProps) {
  return (
    <QuickActionsContainer>
      {actions.map((action, index) => (
        <QuickActionButton
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
          onClick={() => onActionClick?.(action.action)}
        >
          <ActionIcon>{action.icon}</ActionIcon>
          <span>{action.text}</span>
        </QuickActionButton>
      ))}
    </QuickActionsContainer>
  );
}