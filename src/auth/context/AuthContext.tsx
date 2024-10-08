import { createContext } from 'react';

export interface User {
  id: string;
  name: string;
}

export interface AuthState {
  logged: boolean;
  user?: User; 
}

interface AuthContextProps extends AuthState {
  login: (name: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);