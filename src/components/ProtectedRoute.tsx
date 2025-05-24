import { Navigate, Outlet } from "react-router";
import { useAuth } from "src/hooks/useAuth";

type ProtectedRouteProps = {
  redirectPath?: string;
};

const ProtectedRoute = ({ redirectPath = "/" }: ProtectedRouteProps) => {
  const auth = useAuth();

  if (!auth.accessToken) {
    console.log(auth);
    console.log("Access token not found, redirecting");
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;