import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { TutorialProvider } from "@/components/tutorial/TutorialProvider";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Roasts from "./pages/Roasts";
import Debates from "./pages/Debates";
import DebateRoom from "./pages/DebateRoom";
import Leaderboard from "./pages/Leaderboard";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import Live from "./pages/Live";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <AuthProvider>
        <TutorialProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/roasts" element={<Roasts />} />
                  <Route path="/debates" element={<Debates />} />
                  <Route path="/debates/:id" element={<DebateRoom />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/live" element={<Live />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/profile/:username" element={<Profile />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </TutorialProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
