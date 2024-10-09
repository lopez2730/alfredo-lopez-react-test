import React, { useReducer, ReactNode, useState, useEffect } from 'react';
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
    user: user || { password: '', name: '' }, 
  };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {} as AuthState, init);
  const [initialData, setInitialData] = useState({
    name: 'alfredo@lopez.com',
    password: '1234567890'
  });

  useEffect(() => {
    if (initialData.name && initialData.password) {
      const user: User = { password: initialData.password, name: initialData.name };
      localStorage.setItem('user', JSON.stringify(user)); 
      dispatch({ type: types.login, payload: user }); 
    }
  }, [initialData, dispatch]);

  const login = (data: LoginData) => {
    const user: User = { password: data.password, name: data.email };
    const action = { type: types.login, payload: user };

    localStorage.setItem('user', JSON.stringify(user)); 

    dispatch(action); 
  };

  const logout = () => {
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
