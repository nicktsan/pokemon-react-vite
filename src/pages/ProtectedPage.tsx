import { useAuth } from "src/hooks/useAuth";

function ProtectedPage() {
  const auth = useAuth();
  return <h1>This is a protected page. You can only see this if you log in. {auth.accessToken}</h1>;
};

export default ProtectedPage;