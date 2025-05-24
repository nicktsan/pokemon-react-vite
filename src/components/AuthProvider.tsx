import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { AuthContext, type LoginData } from "../hooks/useAuth";
import API_HOST_URL from "src/env";
import { refreshToken } from "src/axios/AxiosInstance";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
        setAccessToken(await refreshToken());
    })();
  }, []);

  const loginAction = async (data: LoginData) => {
    try {
      const response = await fetch(`${API_HOST_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const res = await response.json();
      if (res.access_token) {
        setAccessToken(res.access_token);
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
      setAccessToken("");
    }
  };

  const logOut = async () => {
    try {
      const response = await fetch(`${API_HOST_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        setAccessToken("");
        navigate("/");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;