import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter as Router } from "react-router-dom";
import MainApp from "./MainApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/leafycart">
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}
