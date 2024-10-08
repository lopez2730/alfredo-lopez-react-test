import { ReactNode, useContext } from 'react';
import { AuthContext } from '../auth';

interface Props {
  children: ReactNode;
}


export const PrivateRoute = ({ children }: Props ) => {

  const { logged } = useContext(AuthContext);

 return (logged)
 ? children
 : <>404 Not Found</>
}