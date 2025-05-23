import { createContext, useContext } from "react";

export interface LoginData {
    username: string;
    password: string;
}
interface AuthContextType {
  accessToken: string;
  loginAction: (data: LoginData) => Promise<void>;
  logOut: () => void;
}
export const AuthContext = createContext<AuthContextType>({
    accessToken: "",
    loginAction: async () => {},
    logOut: () => {},
});
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
