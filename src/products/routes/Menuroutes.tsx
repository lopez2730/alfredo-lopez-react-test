import { Route, Routes } from 'react-router-dom';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDataPage } from '../pages/ProductDataPage';

export const Menuroutes = () => {
  return (
    <>
      <Routes>
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductDataPage />} />
      </Routes>
    </>
    
  )
}