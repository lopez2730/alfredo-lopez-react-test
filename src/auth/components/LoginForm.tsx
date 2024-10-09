import { useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useProductsStore } from '../../store/products';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';
import { Alert, Button, Collapse, IconButton, TextField } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


export const LoginForm = () => {
  const { login, initialData } = useContext( AuthContext );
  const fetchProducts = useProductsStore(state => state.fetchProducts);

  const [error, setError] = useState(false);
  const [errorUser, setErrorUser] = useState(false)
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es requerido'),
    password: yup.string().required('La contraseña es requerida'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onsubmit = (data: {email: string, password: string}) => {
    if (data.email === initialData.name) {
      if( data.password === initialData.password) {
        login(data)
        fetchProducts(30)
        navigate('/products', {
          replace: true
        })
      }
    }  else {
        setErrorUser(true)
      }
  }

  return (
    <div className={styles.container} >
      {errorUser && <Alert severity="error">Usuario y/o contraseña no coinciden</Alert>}

      <TextField
        {...register('email')}
        sx={{ marginTop: 5 }}
        error={errors.email ? true : false}
        label={'Mail'}
        id="email"
        variant="outlined"
      />
      {errors.email && (
        <Alert severity="error">{errors.email.message?.toString()}</Alert>
      )}

      <TextField
        {...register('password')}
        sx={{ marginTop: 5 }}
        error={errors.password ? true : false}
        id="password"
        label={'Contraseña'}
        type={'password'}
        variant="outlined"
      />
      <div style={{ marginTop: 5 }}>
        {error && (
          <Collapse in={error}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              correo o contraseña no coinciden
            </Alert>
          </Collapse>
        )}
      </div>

      <Button onClick={handleSubmit(onsubmit)}
      className={styles.loginButton}
      >
        Login
      </Button>

    </div>
  )
}