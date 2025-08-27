import styled from "styled-components";
import { motion } from "framer-motion";

const OrderCardContainer = styled(motion.div)`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1rem;
  margin: 0.25rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  max-width: 380px;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f1f5f9;
`;

const OrderId = styled.div`
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 500;
`;

const OrderStatus = styled.div<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;

  ${(props) => {
    switch (props.status.toLowerCase()) {
      case "pending":
        return `
          background: #fef3c7;
          color: #d97706;
        `;
      case "processing":
        return `
          background: #dbeafe;
          color: #2563eb;
        `;
      case "shipped":
        return `
          background: #d1fae5;
          color: #059669;
        `;
      case "delivered":
        return `
          background: #dcfce7;
          color: #16a34a;
        `;
      case "cancelled":
        return `
          background: #fee2e2;
          color: #dc2626;
        `;
      default:
        return `
          background: #f1f5f9;
          color: #64748b;
        `;
    }
  }}
`;

const OrderTotal = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.75rem;
`;

const OrderItems = styled.div`
  margin-bottom: 0.75rem;
`;

const OrderItemsTitle = styled.h4`
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.4rem 0;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f8fafc;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
`;

const ItemQuantityPrice = styled.div`
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const OrderDate = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const ActionButton = styled(motion.button)<{
  variant?: "primary" | "danger" | "secondary";
}>`
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  ${(props) => {
    switch (props.variant) {
      case "danger":
        return `
          background: #ef4444;
          color: white;
          &:hover {
            background: #dc2626;
          }
        `;
      case "secondary":
        return `
          background: #f1f5f9;
          color: #64748b;
          border: 1px solid #e2e8f0;
          &:hover {
            background: #e2e8f0;
          }
        `;
      default:
        return `
          background: #2563eb;
          color: white;
          &:hover {
            background: #1d4ed8;
          }
        `;
    }
  }}
`;

const ConfirmationMessage = styled.div`
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #92400e;
  font-size: 0.9rem;
`;

interface OrderItem {
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
}

interface OrderData {
  orderId: string;
  status: string;
  total: number;
  items: OrderItem[];
  createdAt: string;
  itemsCount?: number;
  action?: string;
}

interface OrderCardProps {
  data: OrderData;
  messageType: "order_display" | "order_confirmation";
  message?: string;
  onAction?: (action: string, orderId: string) => void;
}

export function OrderCard({
  data,
  messageType,
  message,
  onAction,
}: OrderCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAction = (action: string) => {
    onAction?.(action, data.orderId);
  };

  return (
    <OrderCardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {messageType === "order_confirmation" && message && (
        <ConfirmationMessage>{message}</ConfirmationMessage>
      )}

      <OrderHeader>
        <OrderId>Order #{data.orderId.slice(-8)}</OrderId>
        <OrderStatus status={data.status}>{data.status}</OrderStatus>
      </OrderHeader>

      <OrderTotal>${data.total?.toFixed(2) ?? "0.00"}</OrderTotal>

      {data.createdAt && (
        <OrderDate>Placed on {formatDate(data.createdAt)}</OrderDate>
      )}

      {data.items && data.items.length > 0 && (
        <OrderItems>
          <OrderItemsTitle>Items ({data.items.length})</OrderItemsTitle>
          {data.items.slice(0, 3).map((item, index) => (
            <OrderItem key={index}>
              <ItemDetails>
                <ItemName>{item.productName}</ItemName>
                <ItemQuantityPrice>
                  Qty: {item.quantity} × ${(item.price || item.product?.price || 0).toFixed(2)}
                </ItemQuantityPrice>
              </ItemDetails>
            </OrderItem>
          ))}
          {data.items.length > 3 && (
            <div
              style={{
                fontSize: "0.8rem",
                color: "#6b7280",
                marginTop: "0.5rem",
              }}
            >
              +{data.items.length - 3} more items
            </div>
          )}
        </OrderItems>
      )}

      {messageType === "order_display" &&
        data.status !== "cancelled" &&
        data.status !== "delivered" && (
          <ActionButtons>
            <ActionButton
              variant="danger"
              onClick={() => handleAction("cancel")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel Order
            </ActionButton>
            <ActionButton
              variant="secondary"
              onClick={() => handleAction("track")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Track Order
            </ActionButton>
          </ActionButtons>
        )}

      {messageType === "order_confirmation" && data.action === "cancel" && (
        <ActionButtons>
          <ActionButton
            variant="danger"
            onClick={() => handleAction("confirm_cancel")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Yes, Cancel Order
          </ActionButton>
          <ActionButton
            variant="secondary"
            onClick={() => handleAction("keep_order")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Keep Order
          </ActionButton>
        </ActionButtons>
      )}
    </OrderCardContainer>
  );
}
