import { types } from '../types/types';
import { AuthState } from './AuthContext';

interface Action {
  type: string;
  payload?: any;
}

export const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.payload,
      };

    case types.logout:
      return {
        logged: false,
      };

    default:
      return state;
  }
};