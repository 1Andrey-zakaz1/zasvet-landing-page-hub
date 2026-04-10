
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactFormProvider } from "@/hooks/use-contact-form";
import NotFound from "./pages/NotFound";
import CatalogPage from "./pages/CatalogPage";
import OwnersPage from "./pages/OwnersPage";
import EnergeticsPage from "./pages/EnergeticsPage";
import BuyersPage from "./pages/BuyersPage";
import DesignersPage from "./pages/DesignersPage";
import InstallersPage from "./pages/InstallersPage";
import AuditPage from "./pages/AuditPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContactFormProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BuyersPage />} />
            <Route path="/owners" element={<OwnersPage />} />
            <Route path="/energetics" element={<EnergeticsPage />} />
            <Route path="/buyers" element={<BuyersPage />} />
            <Route path="/designers" element={<DesignersPage />} />
            <Route path="/installers" element={<InstallersPage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContactFormProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
