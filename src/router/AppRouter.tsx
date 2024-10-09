import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Menuroutes } from '../products/routes/Menuroutes';

export const AppRouter = () => {
  return (
    <Routes>
      
      <Route 
        path="Login/*" 
        element={
          <PublicRoute>
            <Routes>
            <Route path="/*" element={<LoginPage />} />
            </Routes>
          </PublicRoute>
        }
      />

      <Route 
        path='/*' 
        element= {
          <PrivateRoute>
            <Menuroutes />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}