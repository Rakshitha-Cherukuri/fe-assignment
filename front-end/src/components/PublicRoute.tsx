import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/tasks" replace />;
  }

  return <>{children}</>;
};