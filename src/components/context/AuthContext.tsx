import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export interface AuthContextType {
  auth: AuthType;
  login: (user: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthType {
  isLoggedIn: boolean;
  username: string;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || '/';

  const [auth, setAuth] = useState<AuthType>({
    isLoggedIn: false,
    username: '',
  });

  const login = (username: string) => {
    setAuth({ isLoggedIn: true, username });
    navigate(redirectPath, { replace: true });
  };
  const logout = () => {
    setAuth({ isLoggedIn: false, username: '' });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return (useContext(AuthContext) as AuthContextType) ?? {};
};
