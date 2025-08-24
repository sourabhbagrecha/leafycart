import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { lazy } from "react";
const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Help = lazy(() => import("./pages/Help"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const Orders = lazy(() => import("./pages/Orders"));
import Header from "./components/Header";
import { useAuth } from "./hooks/useAuth";

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

export default function MainApp() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Logging In...</div>;
  }
  return (
    <AppWrapper>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/help" element={<Help />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </MainContent>
    </AppWrapper>
  );
}
