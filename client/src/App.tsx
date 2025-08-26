import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter as Router } from "react-router-dom";
import MainApp from "./MainApp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CopilotKit } from "@copilotkit/react-core";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/">
        <AuthProvider>
          <CopilotKit
            publicApiKey="ck_pub_31ba98f4c58b269213bc893e3bb737f1"
            runtimeUrl="http://localhost:3000/api/agent/chat"
          >
            <MainApp />
          </CopilotKit>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}
