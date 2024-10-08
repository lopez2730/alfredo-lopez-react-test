import { useContext } from 'react';
import styles from './ProductsPage.module.scss';

import { AuthContext } from '../../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ProductsPage = () => {

  const {user, logout} = useContext(AuthContext)
  console.log("🚀 ~ ProductsPage ~ user:", user)

  const navigate = useNavigate()

  const onLogout = () => {
    logout();
    navigate('/login', {
      replace: true
    })
  }
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <button onClick={onLogout} className={styles.loginButton} >logout</button>

    </div>
  )
}