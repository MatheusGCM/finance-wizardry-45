import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Se estiver carregando, pode mostrar um spinner ou tela de carregamento
  if (loading) {
    return (
      <div className="min-h-screen bg-finance-dark flex items-center justify-center">
        <div className="animate-pulse-subtle">
          <div className="w-12 h-12 border-4 border-finance-income border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza as rotas filhas
  return <Outlet />;
}; 