import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextInterface {
  isAuthenticated: boolean;
  login(): void;
  logout(): void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = (props: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {};

  const logout = () => {};

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context == null) throw new Error("Using context outside of its Provider");

  return context;
};

export default useAuthContext;
