
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Examples from "./pages/Examples";
import AttackVectors from "./pages/AttackVectors";
import NotFound from "./pages/NotFound";
import CLIIntegration from "./pages/CLIIntegration";
import Documentation from "./pages/Documentation";
import MetricsDashboard from "./pages/MetricsDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/attack-vectors" element={<AttackVectors />} />
          <Route path="/cli" element={<CLIIntegration />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/metrics-dashboard" element={<MetricsDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
