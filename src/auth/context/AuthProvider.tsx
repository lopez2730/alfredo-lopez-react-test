import React, { useReducer, ReactNode, useState } from 'react';
import { AuthContext, LoginData } from './AuthContext';
import { types } from '../types/types';
import { authReducer } from './Authreducer';

interface User {
  password: string;
  name: string;
}

interface AuthState {
  logged: boolean;
  user: User;
}

interface AuthProviderProps {
  children: ReactNode;
}

const init = (): AuthState => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return {
    logged: !!user,
    user: user,
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {} as AuthState, init);
  const [initialData, setInitialData] = useState({
    name: 'alfredo@lopez.com',
    password: '1234567890'
  })

  const login = (data: LoginData) => {
    const user: User = { password: data.password, name: data.email };
    const action = { type: types.login, payload: user };

    localStorage.setItem('user', JSON.stringify(user));

    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('products');
    const action = { type: types.logout };
    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      initialData,
      setInitialData,
    }}>
      {children}
    </AuthContext.Provider>
  );
};