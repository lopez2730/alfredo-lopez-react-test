import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'
export const LoginPage = () => {

  const { login } = useContext( AuthContext )

  const navigate = useNavigate();

  const onLogin = () => {
    login('alfredo')
    navigate('/products', {
      replace: true
    })
  }

  return (
    <div className={styles.loggin}>
      <h1 className={styles.h1}> loggin </h1>

      <button onClick={onLogin} className={styles.loginButton} >Login</button>
    </div>
  )
}