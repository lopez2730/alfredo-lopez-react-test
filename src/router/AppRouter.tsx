import { Route, Routes } from 'react-router-dom';
import { ProductsPage } from '../products/pages/ProductsPage/ProductsPage';
import { LoginPage } from '../auth/pages/LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <Routes>
      
      <Route path="Login/*" element={
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
      } />


      <Route path='/*' element= {
        <PrivateRoute>
          <ProductsPage />
        </PrivateRoute>
      }/>
    </Routes>
  )
}