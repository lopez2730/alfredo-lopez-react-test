import React, { useReducer, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { types } from '../types/types';
import { authReducer } from './Authreducer';

interface User {
  id: string;
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

  const login = (name: string = '') => {
    const user: User = { id: 'ABC', name };
    const action = { type: types.login, payload: user };

    localStorage.setItem('user', JSON.stringify(user));

    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem('user');
    const action = { type: types.logout };
    dispatch(action);
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};