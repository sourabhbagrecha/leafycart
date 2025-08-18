import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { lazy, Suspense } from "react";
import { CartProvider } from "./context/CartProvider";
import Header from "./components/Header";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Categories = lazy(() => import("./pages/Categories"));
const Help = lazy(() => import("./pages/Help"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const Orders = lazy(() => import("./pages/Orders"));

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

export default function App() {
  return (
    <CartProvider>
      <Router basename="/leafycart">
        <AppWrapper>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <MainContent>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/help" element={<Help />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </MainContent>
          </Suspense>
        </AppWrapper>
      </Router>
    </CartProvider>
  );
}
