import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const queryClient = useQueryClient();

  const verifyPasswordMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await apiRequest("POST", "/api/admin/verify", { password });
      return response.json();
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setClickCount(0);
    },
  });

  const statsQuery = useQuery({
    queryKey: ["/api/admin/stats"],
    enabled: isAuthenticated,
  });

  const handleFooterIconClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setShowLoginModal(true);
        return 0;
      }
      return newCount;
    });

    // Reset click count after 3 seconds of inactivity
    setTimeout(() => {
      setClickCount(0);
    }, 3000);
  };

  const handleLogin = (password: string) => {
    verifyPasswordMutation.mutate(password);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLoginModal(false);
    setClickCount(0);
    queryClient.clear();
  };

  return {
    isAuthenticated,
    showLoginModal,
    clickCount,
    stats: statsQuery.data,
    isLoading: verifyPasswordMutation.isPending,
    error: verifyPasswordMutation.error,
    handleFooterIconClick,
    handleLogin,
    handleLogout,
    setShowLoginModal,
  };
}