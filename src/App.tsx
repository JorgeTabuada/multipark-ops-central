
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Caixa from "./pages/Caixa";
import Auth from "./pages/Auth";
import Reservas from "./pages/Reservas";
import Recolhas from "./pages/Recolhas";
import AuditoriasInternas from "./pages/AuditoriasInternas";
import BiInterno from "./pages/BiInterno";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/caixa" element={<Caixa />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/recolhas" element={<Recolhas />} />
            <Route path="/auditorias-internas" element={<AuditoriasInternas />} />
            <Route path="/bi-interno" element={<BiInterno />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
