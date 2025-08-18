import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/PageWrapper";
import data from "../data/db.json";

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  shippingDetails: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
}

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const OrderId = styled.span`
  font-size: 0.875rem;
  color: #718096;
`;

const OrderStatus = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${({ status }) => {
    switch (status) {
      case "delivered":
        return "#C6F6D5";
      case "processing":
        return "#FEF3C7";
      case "shipped":
        return "#DBEAFE";
      default:
        return "#E2E8F0";
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case "delivered":
        return "#2F855A";
      case "processing":
        return "#92400E";
      case "shipped":
        return "#1E40AF";
      default:
        return "#4A5568";
    }
  }};
`;

const OrderDetails = styled.div`
  margin-top: 1rem;
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

const ShippingInfo = styled.div`
  background: #f7fafc;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = data.orders;
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <PageWrapper title="Orders">Loading...</PageWrapper>;
  }

  if (orders.length === 0) {
    return (
      <PageWrapper title="Orders">
        <p>No orders found.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Orders">
      <OrdersContainer>
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OrderHeader>
              <OrderId>Order #{order.id}</OrderId>
              <OrderStatus status={order.status}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </OrderStatus>
            </OrderHeader>

            <OrderDetails>
              <OrderItems>
                {order.items.map((item, index) => (
                  <OrderItem key={index}>
                    <span>
                      {item.quantity}x Product #{item.productId}
                    </span>
                    <span>${(item.quantity * item.price).toFixed(2)}</span>
                  </OrderItem>
                ))}
              </OrderItems>

              {order.shippingDetails && (
                <ShippingInfo>
                  <h4>Shipping Details</h4>
                  <p>
                    {order.shippingDetails.firstName}{" "}
                    {order.shippingDetails.lastName}
                    <br />
                    {order.shippingDetails.address}
                    <br />
                    {order.shippingDetails.city},{" "}
                    {order.shippingDetails.postalCode}
                    <br />
                    {order.shippingDetails.country}
                  </p>
                </ShippingInfo>
              )}

              <Total>
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </Total>
            </OrderDetails>
          </OrderCard>
        ))}
      </OrdersContainer>
    </PageWrapper>
  );
}
