import { createContext } from 'react';

export interface User {
  password: string;
  name: string;
}

export interface AuthState {
  logged: boolean;
  user?: User; 
}

export interface LoginData {
  email: string;
  password: string;
}

interface AuthContextProps extends AuthState {
  login: (data: LoginData) => void;
  logout: () => void;
  initialData: {name: string, password: string}
  setInitialData: React.Dispatch<React.SetStateAction<{
    name: string;
    password: string;
  }>>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);