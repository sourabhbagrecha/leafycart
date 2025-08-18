import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/PageWrapper";

const SuccessContainer = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const SuccessIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: #48bb78;
  border-radius: 50%;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`;

const Message = styled.p`
  color: #4a5568;
  font-size: 1.1rem;
  margin: 1rem 0 2rem;
`;

const BackButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
`;

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageWrapper title="Order Confirmed">
      <SuccessContainer>
        <SuccessIcon
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          ✓
        </SuccessIcon>
        <h2>Thank you for your order!</h2>
        <Message>
          Your order has been confirmed and will be shipped shortly. You'll
          receive an email with your order details.
        </Message>
        <BackButton
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue Shopping
        </BackButton>
      </SuccessContainer>
    </PageWrapper>
  );
}
