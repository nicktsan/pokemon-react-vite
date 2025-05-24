import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { AuthContext, type LoginData } from "../hooks/useAuth";
import API_HOST_URL from "src/env";
import { axiosInstance, refreshToken, setAuthorizationHeader } from "src/axios/AxiosInstance";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const newAccessToken = await refreshToken();  
      setAccessToken(newAccessToken);
      setAuthorizationHeader(newAccessToken);
    })();
  }, []);

  const loginAction = async (data: LoginData) => {
    try {
      const response = await axiosInstance.post(`${API_HOST_URL}/login`, data);
      if (response.data.access_token) {
        setAccessToken(response.data.access_token);
        setAuthorizationHeader(response.data.access_token);
        navigate("/");
        return;
      }
    } catch (err) {
      console.error(err);
      setAccessToken("");
      setAuthorizationHeader("");
    }
  };

  const logOut = async () => {
    try {
      const response = await axiosInstance.post(`${API_HOST_URL}/logout`);
      if (response.status === 200) {
        setAccessToken("");
        setAuthorizationHeader("");
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