import { useContext } from 'react';
import styles from './ProductsPage.module.scss';
import { AuthContext } from '../../auth/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ProductTable } from '../components/ProductTable';

export const ProductsPage = () => {
  const navigate = useNavigate()
  const {user, logout} = useContext(AuthContext)

  const onLogout = () => {
    logout();
    navigate('/login', {
      replace: true
    })
  }
  
  return (
    <div  className={styles.container}>
      <h1 className={styles.h1}>{user?.name}</h1>
      <div className={styles.buttonsNavigation}>
        <Link className={styles.linkButton} style={{textDecoration: 'none'}} to={'/users'}>users</Link>
        <Link className={styles.linkButton} style={{textDecoration: 'none'}} to={'/products/create'}>create product</Link>
      </div>
      <ProductTable />

      <div className={styles.buttonContainer}>
        <button onClick={onLogout} className={styles.loginButton} >logout</button>
      </div>
    </div>
  )
}