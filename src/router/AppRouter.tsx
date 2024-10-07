import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages/loginPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="Login/*" element={<LoginPage />} />
    </Routes>
  )
}