
import { useReducer } from 'react';
import {AuthContext} from './AuthContext';
import { authReducer } from './Authreducer';
import { types } from '../types/types';

interface Props {
  children: any
}

const initialState = {
  logged: false
}

export const AuthProvider = ({children}: Props) => {

  const [authState, dispatch] = useReducer(authReducer, initialState);

  const login = (name = '') => {
    const action = {
      type: types.login,
      payload: {
        id: 'ABC',
        payload: name
      }
    }
    dispatch(action)
  }

  return (
    <AuthContext.Provider value={{
      authState,
      login: login
      }}>
      {children}
    </AuthContext.Provider>
  )
}