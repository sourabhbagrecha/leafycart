import { CartProvider } from "./context/CartProvider";
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter as Router } from "react-router-dom";
import MainApp from "./MainApp";

// Lazy load pages

export default function App() {
  return (
    <CartProvider>
      <Router basename="/leafycart">
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </Router>
    </CartProvider>
  );
}
