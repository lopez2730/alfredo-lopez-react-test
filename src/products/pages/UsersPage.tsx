import { useContext, useState } from 'react';
import { AuthContext } from '../../auth';
import styles from './UsersPage.module.scss';
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const UsersPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { user, setInitialData } = useContext(AuthContext);

  const passwordValidation =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,12}$/;

  const schema = yup.object().shape({
    name: yup.string().required('Escribe tu nombre'),
    lastName: yup.string().required('Escribe tu apellido'),
    email: yup
      .string()
      .email('Correo Electronico no valido')
      .required('Correo Electronico no valido'),
    password: yup
      .string()
      .matches(passwordValidation, 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial')
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .max(12, 'La contraseña no debe tener más de 12 caracteres')
      .required('Contraseña requerida'),
    // confirmPassword: yup
    //   .string()
    //   .oneOf([yup.ref('password')], 'La contraseña no coincide')
    //   .required('Es necesario confirmar la contraseña'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onsubmit = (data: any) => {
    console.log('🚀 ~ onSubmit ~ data:', data);

  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>{user?.name}</h1>
      <h1 className={styles.h1}>{user?.password}</h1>

      <TextField
        {...register('email')}
        sx={{ marginTop: 5 }}
        error={Boolean(errors.email)}
        label={'Email'}
        id="email"
        variant="outlined"
      />
      {errors.email && <Alert severity="error">{errors.email.message}</Alert>}

      <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          error={Boolean(errors.password)}
          {...register('password')}
          sx={{ marginTop: 5 }}
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
      </FormControl>
      {errors.password && (
        <Stack sx={{ width: 300, marginTop: 1 }} spacing={2}>
          <Alert severity="error">{errors.password.message}</Alert>
        </Stack>
      )}

      {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
        <OutlinedInput
          error={Boolean(errors.confirmPassword)}
          {...register('confirmPassword')}
          sx={{ marginTop: 5 }}
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
      </FormControl>
      {errors.confirmPassword && (
        <Stack sx={{ width: 300, marginTop: 1 }} spacing={2}>
          <Alert severity="error">{errors.confirmPassword.message}</Alert>
        </Stack>
      )} */}

      <Button onClick={handleSubmit(onsubmit)} className={styles.loginButton}>
        Change Account
      </Button>
    </div>
  );
};
