
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
import Tarefas from "./pages/Tarefas";
import ProdutividadeCondutores from "./pages/ProdutividadeCondutores";
import Projetos from "./pages/Projetos";
import PerdidosAchados from "./pages/PerdidosAchados";
import Relatorios from "./pages/Relatorios";
import RecursosHumanos from "./pages/RecursosHumanos";
import Cancelamentos from "./pages/Cancelamentos";
import Despesas from "./pages/Despesas";
import Faturacao from "./pages/Faturacao";
import ComentariosReclamacoes from "./pages/ComentariosReclamacoes";
import Comportamentos from "./pages/Comportamentos";
import ConfirmacaoCaixa from "./pages/ConfirmacaoCaixa";
import Entregas from "./pages/Entregas";
import AcessosAlteracoes from "./pages/AcessosAlteracoes";
import Marketing from "./pages/Marketing";
import FormacaoApoio from "./pages/FormacaoApoio";
import MapaOcupacao from "./pages/MapaOcupacao";
import ReservasExternas from "./pages/ReservasExternas";
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
            <Route path="/tarefas" element={<Tarefas />} />
            <Route path="/produtividade-condutores" element={<ProdutividadeCondutores />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/recolhas" element={<Recolhas />} />
            <Route path="/bi-interno" element={<BiInterno />} />
            <Route path="/perdidos-achados" element={<PerdidosAchados />} />
            <Route path="/relatorios" element={<Relatorios />} />
            <Route path="/recursos-humanos" element={<RecursosHumanos />} />
            <Route path="/cancelamentos" element={<Cancelamentos />} />
            <Route path="/despesas" element={<Despesas />} />
            <Route path="/faturacao" element={<Faturacao />} />
            <Route path="/comentarios-reclamacoes" element={<ComentariosReclamacoes />} />
            <Route path="/auditorias-internas" element={<AuditoriasInternas />} />
            <Route path="/comportamentos" element={<Comportamentos />} />
            <Route path="/confirmacao-caixa" element={<ConfirmacaoCaixa />} />
            <Route path="/entregas" element={<Entregas />} />
            <Route path="/acessos-alteracoes" element={<AcessosAlteracoes />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/formacao-apoio" element={<FormacaoApoio />} />
            <Route path="/mapa-ocupacao" element={<MapaOcupacao />} />
            <Route path="/reservas-externas" element={<ReservasExternas />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
