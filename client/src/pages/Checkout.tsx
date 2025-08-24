import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/PageWrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Cart, CartItem } from "../types";
import { useAxios } from "../hooks/useAxios";

const CheckoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MockDataButton = styled(motion.button)`
  background: #4a5568;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background: #2d3748;
  }
`;

const FormSection = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderSummary = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;

  h3 {
    margin: 0 0 1rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
  }

  input,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #2c5282;
      box-shadow: 0 0 0 3px rgba(44, 82, 130, 0.1);
    }
  }
`;

const SectionTitle = styled.h3`
  margin: 2rem 0 1rem;
  color: #2d3748;
  font-size: 1.2rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #4a5568;
`;

const Total = styled.div`
  border-top: 2px solid #e2e8f0;
  margin-top: 1rem;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.1rem;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  background: #2c5282;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    country: "",
    postalCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const axiosClient = useAxios();
  const queryClient = useQueryClient();

  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery<Cart, Error>({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data, status } = await axiosClient.get("/api/cart");
      if (status !== 200) throw new Error("Failed to fetch");
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const body = {
        shippingAddress: {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          street: formData.street,
          city: formData.city,
          country: formData.country,
          postalCode: formData.postalCode,
        },
        paymentInfo: {
          cardNumber: formData.cardNumber,
          cardExpiry: formData.cardExpiry,
          cardCvc: formData.cardCvc,
        },
        items: cartData?.items,
        total: cartData?.total,
      };
      console.log({ body });
      const { data, status } = await axiosClient.post("/api/order", body);
      if (status !== 201) throw new Error("Failed to create order");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email street";
    }
    if (formData.firstName.length < 2) {
      newErrors.firstName = "First name is required";
    }
    if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name is required";
    }
    if (formData.street.length < 5) {
      newErrors.street = "Please enter a valid address";
    }
    if (formData.city.length < 2) {
      newErrors.city = "City is required";
    }
    if (formData.country.length < 2) {
      newErrors.country = "Country is required";
    }
    if (formData.postalCode.length < 3) {
      newErrors.postalCode = "Please enter a valid postal code";
    }
    if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }
    if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.cardExpiry = "Please enter expiry in MM/YY format";
    }
    if (formData.cardCvc.length !== 3) {
      newErrors.cardCvc = "Please enter a valid CVC";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log({ formData });
      console.log("Creating order...");
      mutation.mutate(formData, {
        onSuccess: () => {
          navigate("/");
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillMockData = () => {
    setFormData({
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      street: "123 Main Street",
      city: "New York",
      country: "US",
      postalCode: "10001",
      cardNumber: "4242424242424242",
      cardExpiry: "12/25",
      cardCvc: "123",
    });
  };

  if (isLoading) {
    return (
      <PageWrapper title="Checkout">
        <p>Loading cart...</p>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper title="Checkout">
        <p>Error loading cart: {error.message}</p>
      </PageWrapper>
    );
  }

  if (cartData?.items.length === 0) {
    return (
      <PageWrapper title="Checkout">
        <p>Your cart is empty. Please add some items before checking out.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Checkout">
      <CheckoutContainer>
        <FormSection onSubmit={handleSubmit}>
          <MockDataButton
            type="button"
            onClick={fillMockData}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Fill with Mock Data
          </MockDataButton>
          <SectionTitle>Contact Information</SectionTitle>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <SectionTitle>Shipping Information</SectionTitle>
          <FormGroup>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="address">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
            {errors.street && <ErrorMessage>{errors.street}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="country">Country</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
            {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
            />
            {errors.postalCode && (
              <ErrorMessage>{errors.postalCode}</ErrorMessage>
            )}
          </FormGroup>

          <SectionTitle>Payment Information</SectionTitle>
          <FormGroup>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
            {errors.cardNumber && (
              <ErrorMessage>{errors.cardNumber}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="cardExpiry">Expiry (MM/YY)</label>
            <input
              type="text"
              id="cardExpiry"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleInputChange}
              placeholder="MM/YY"
              maxLength={5}
              required
            />
            {errors.cardExpiry && (
              <ErrorMessage>{errors.cardExpiry}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="cardCvc">CVC</label>
            <input
              type="text"
              id="cardCvc"
              name="cardCvc"
              value={formData.cardCvc}
              onChange={handleInputChange}
              maxLength={3}
              required
            />
            {errors.cardCvc && <ErrorMessage>{errors.cardCvc}</ErrorMessage>}
          </FormGroup>
        </FormSection>

        <OrderSummary>
          <h3>Order Summary</h3>
          {cartData?.items.map((item: CartItem) => (
            <OrderItem key={item.product._id}>
              <span>
                {item.quantity}x {item.product.name}
              </span>
              <span>${(item.quantity * item.product.price).toFixed(2)}</span>
            </OrderItem>
          ))}
          <Total>
            <span>Total</span>
            <span>${cartData?.total.toFixed(2)}</span>
          </Total>
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
          >
            {isSubmitting
              ? "Processing..."
              : `Pay $${cartData?.total.toFixed(2)}`}
          </SubmitButton>
        </OrderSummary>
      </CheckoutContainer>
    </PageWrapper>
  );
}
