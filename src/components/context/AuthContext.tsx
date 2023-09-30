import Cookies from 'js-cookie';
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

export interface AuthContextType {
  auth: AuthType;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthType {
  isLoggedIn: boolean;
  token: string | undefined;
}

const initAuth = () => {
  const token = Cookies.get('token');
  if (token) {
    return {
      isLoggedIn: true,
      token: Cookies.get('token'),
    };
  } else {
    return {
      isLoggedIn: false,
      token: '',
    };
  }
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState<AuthType>(initAuth());

  const login = (token: string) => {
    setAuth({ isLoggedIn: true, token });
    Cookies.set('token', token);
    navigate('/', { replace: true });
  };
  const logout = () => {
    setAuth({ isLoggedIn: false, token: '' });
    Cookies.remove('token');
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
