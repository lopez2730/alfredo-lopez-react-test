import { useContext, useState } from 'react';
import styles from './UsersPage.module.scss';
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../../auth';
import { useNavigate } from 'react-router-dom';

export const UsersPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {user, setInitialData, logout} = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('El correo electrónico no es válido')
      .required('El correo electrónico es requerido'),
    password: yup
      .string()
      .required('La contraseña es requerida')
      .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula') 
      .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
      .matches(/[0-9]/, 'La contraseña debe contener al menos un número') 
      .matches(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'La contraseña no coincide')
      .required('Es necesario confirmar la contraseña'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { email: string; password: string }) => {
    setInitialData({ 
      name: data.email,
      password: data.password
    })
  };

  const onLogout = () => {
    logout();
    navigate('/login', {
      replace: true
    })
  }
  

  return (
    <div className={styles.container}>
       <h1 className={styles.h1}>{user?.name}</h1>
       <h1 className={styles.h1}>{user?.password}</h1>
      <TextField
        {...register('email')}
        sx={{ marginTop: 5 }}
        error={!!errors.email}
        label={'Mail'}
        id="email"
        variant="outlined"
      />
      {errors.email && (
        <Alert sx={{alignSelf: 'center'}} severity="error">{errors.email.message?.toString()}</Alert>
      )}

      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          {...register('password')}
          sx={{ marginTop: 5 }}
          error={!!errors.password}
          id="password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password && (
          <Stack sx={{ width: 300, marginTop: 1, alignSelf:'center' }} spacing={2}>
            <Alert  severity="error">
              {errors.password.message?.toString()}
            </Alert>
          </Stack>
        )}
      </FormControl>

      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Confirmar contraseña</InputLabel>
        <OutlinedInput
          {...register('confirmPassword')}
          sx={{ marginTop: 5 }}
          error={!!errors.confirmPassword}
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.confirmPassword && (
          <Stack sx={{ width: 300, marginTop: 1,  alignSelf:'center' }} spacing={2}>
            <Alert severity="error">
              {errors.confirmPassword.message?.toString()}
            </Alert>
          </Stack>
        )}
      </FormControl>

      <button onClick={handleSubmit(onSubmit)} className={styles.loginButton} > Login</button>

      <Button onClick={onLogout} className={styles.loginButton}>
      logout
      </Button>

    </div>
  );
};
