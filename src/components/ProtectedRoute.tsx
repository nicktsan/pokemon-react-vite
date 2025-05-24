import { Navigate, Outlet } from "react-router";
import { useAuth } from "src/hooks/useAuth";

type ProtectedRouteProps = {
  redirectPath?: string;
};

const ProtectedRoute = ({ redirectPath = "/" }: ProtectedRouteProps) => {
  const { accessToken, loading } = useAuth();

  if (loading) {
    // Show a loading indicator or nothing until auth loads
    return <h1>Loading...</h1>;
  }

  if (!accessToken) {
    console.log("Access token not found, redirecting");
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;