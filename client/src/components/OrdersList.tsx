import styled from "styled-components";
import { motion } from "framer-motion";
import { OrderCard } from "./OrderCard";

const OrdersListContainer = styled.div`
  max-width: 100%;
  margin: 0.25rem 0;
`;

const OrdersScrollContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.25rem 0 0.75rem 0;
  
  &::-webkit-scrollbar {
    height: 4px;
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

const OrdersTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
`;

const OrderCardWrapper = styled.div`
  flex-shrink: 0;
  min-width: 300px;
  max-width: 380px;
`;

interface OrderData {
  orderId: string;
  status: string;
  total: number;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price?: number;
    product?: {
      name: string;
      price: number;
      image: string;
      _id: string;
    };
  }>;
  createdAt: string;
  shippingDetails?: any;
}

interface OrdersListProps {
  orders: OrderData[];
  onAction?: (action: string, orderId: string) => void;
}

export function OrdersList({ orders, onAction }: OrdersListProps) {
  if (!orders || orders.length === 0) {
    return null;
  }

  return (
    <OrdersListContainer>
      <OrdersTitle>
        {orders.length === 1 ? "Your Order" : `Your Orders (${orders.length})`}
      </OrdersTitle>
      <OrdersScrollContainer>
        {orders.map((order, index) => (
          <OrderCardWrapper key={order.orderId}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <OrderCard
                data={order}
                messageType="order_display"
                onAction={onAction}
              />
            </motion.div>
          </OrderCardWrapper>
        ))}
      </OrdersScrollContainer>
    </OrdersListContainer>
  );
}