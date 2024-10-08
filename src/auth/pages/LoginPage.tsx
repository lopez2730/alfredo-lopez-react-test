import { LoginForm } from '../components/LoginForm';
import styles from './LoginPage.module.scss';


export const LoginPage = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}> Login </h1>
      <LoginForm />
    </div>
  )
}