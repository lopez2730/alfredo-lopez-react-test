import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Menuroutes } from '../products/routes/Menuroutes';
import { NotFoundPage } from '../auth/pages/NotFoundPage';

export const AppRouter = () => {
  return (
    <Routes>
      
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route 
        path="/*" 
        element={
          <PrivateRoute>
            <Menuroutes />
          </PrivateRoute>
        }
      />

      <Route 
        path="*" 
        element={
          <PrivateRoute>
            <NotFoundPage />
          </PrivateRoute>
        }
      />

      
    </Routes>
  )
}