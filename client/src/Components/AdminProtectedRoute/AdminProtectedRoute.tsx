import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useAuth } from "../../hooks/useAuth";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.user);
  const { checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const userData = await checkAuth();
      if (!userData) {
        navigate("/login", { replace: true });
        return;
      }
      
      if (userData.role !== "admin") {
        navigate("/", { replace: true });
      }
    };
    if (!isAuthenticated && !isLoading) {
      verifyAuth();
    } else if (isAuthenticated && user) {
      if (user.role !== "admin") {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, user, checkAuth, navigate]);

  // Show loading while checking authentication
  if (isLoading || (!isAuthenticated && !user)) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // If not authenticated or not admin, don't render children
  if (!isAuthenticated || !user || user.role !== "admin") {
    return null;
  }

  // If authenticated and admin, render the protected content
  return <>{children}</>;
}

export default AdminProtectedRoute;

