import { Navigate, Route, Routes } from 'react-router-dom';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDataPage } from '../pages/ProductDataPage';
import { UsersPage } from '../pages/UsersPage';
import { CreateProductPage } from '../pages/CreateProductPage';

export const Menuroutes = () => {
  return (
    <>
      <Routes>
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductDataPage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/products/create' element={<CreateProductPage />} />

        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </>
    
  )
}