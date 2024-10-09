import { Route, Routes } from 'react-router-dom';
import { ProductsPage } from '../pages/ProductsPage';

export const Menuroutes = () => {
  return (
    <>
      <Routes>
        <Route path='/products' element={<ProductsPage />} />
      </Routes>
    </>
    
  )
}