import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Products from "@/pages/products";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import TrackOrder from "@/pages/track-order";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AdminPanel from "@/components/admin/admin-panel";
import AdminLogin from "@/components/admin/admin-login";
import { useAdmin } from "@/hooks/use-admin";
import NotFound from "@/pages/not-found";
import { ErrorBoundary } from "@/components/ui/error-boundary";

function Router() {
  const SafeComponent = ({ children }) => {
    return (
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    );
  };

  return (
    <Switch>
      <Route path="/" component={() => <SafeComponent><Home /></SafeComponent>} />
      <Route path="/products" component={() => <SafeComponent><Products /></SafeComponent>} />
      <Route path="/about" component={() => <SafeComponent><About /></SafeComponent>} />
      <Route path="/contact" component={() => <SafeComponent><Contact /></SafeComponent>} />
      <Route path="/track-order" component={() => <SafeComponent><TrackOrder /></SafeComponent>} />
      <Route component={() => <SafeComponent><NotFound /></SafeComponent>} />
    </Switch>
  );
}

function AppContent() {
  const { handleFooterIconClick, showLoginModal, handleLogin, setShowLoginModal, isLoading, error, isAuthenticated, handleLogout, stats } = useAdmin();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Router />
      </main>
      <Footer onAdminIconClick={handleFooterIconClick} />

      {showLoginModal && (
        <AdminLogin
          onLogin={handleLogin}
          onClose={() => setShowLoginModal(false)}
          isLoading={isLoading}
          error={error}
        />
      )}

      {isAuthenticated && (
        <AdminPanel
          onClose={handleLogout}
          stats={stats}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;