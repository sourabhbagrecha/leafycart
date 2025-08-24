import styled from "styled-components";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/PageWrapper";
import { useAxios } from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import type { CartItem, Order } from "../types";

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

const ProductPreviews = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ProductPreviewImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const PreviewImageContainer = styled.div`
  position: relative;
`;

const QuantityBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-bottom-left-radius: 4px;
  padding: 0.1rem 0.3rem;
  font-size: 0.7rem;
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
  const axiosClient = useAxios();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, status } = await axiosClient.get("/api/order");
      if (status !== 200) throw new Error("Failed to fetch orders");
      return data;
    },
  });

  if (error) {
    return (
      <PageWrapper title="Orders">
        Error fetching orders: {error.message}
      </PageWrapper>
    );
  }

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
        {orders.map((order: Order) => (
          <OrderCard
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OrderHeader>
              <OrderId>Order #{order._id}</OrderId>
              <OrderStatus status={order.status}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </OrderStatus>
            </OrderHeader>

            <ProductPreviews>
              {order.items.slice(0, 4).map((item: CartItem) => (
                <Link
                  key={item.product._id}
                  to={`/product/${item.product._id}`}
                >
                  <PreviewImageContainer>
                    <ProductPreviewImage
                      src={item.product.image}
                      alt={item.product.name}
                    />
                    <QuantityBadge>{item.quantity}</QuantityBadge>
                  </PreviewImageContainer>
                </Link>
              ))}
            </ProductPreviews>

            <OrderDetails>
              <OrderItems>
                {order.items.map((item: CartItem) => (
                  <OrderItem key={item.product._id}>
                    <span>
                      {item.quantity}x {item.product.name}
                    </span>
                    <span>
                      ${(item.quantity * item.product.price).toFixed(2)}
                    </span>
                  </OrderItem>
                ))}
              </OrderItems>

              {order.shippingAddress && (
                <ShippingInfo>
                  <h4>Shipping Address</h4>
                  <p>
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                    <br />
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}
                    <br />
                    {order.shippingAddress.country}
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
