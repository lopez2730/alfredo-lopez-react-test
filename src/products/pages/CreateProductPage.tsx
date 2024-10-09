import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import styles from './CreateProductPage.module.scss';
import { useProductsStore } from '../../store/products';
import { useState } from 'react';
import { Products } from '../../types';
import { api } from '../../services/config';


export const CreateProductPage = () => {
  const addProduct = useProductsStore((state) => state.addProduct);
  const deleteTitle = useProductsStore(state => state.deleteProduct)

  const [newProducts, setNewProducts] = useState<Products[]>([])
  console.log("🚀 ~ CreateProductPage ~ newProducts:", newProducts)


  const schema = yup.object().shape({
    title: yup.string().required('title is requiered'),
    price: yup.number().required('La contraseña es requerida'),
    description: yup.string().required('La contraseña es requerida'),
    category: yup.string().required('La contraseña es requerida'),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  
  const onsubmit = async (data: any) => {
    const newProduct = {
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
    };
    setNewProducts([ newProduct, ...newProducts ])
    addProduct(newProduct);
    reset()
    try {
      await api.post(`products`,{newProduct})
    } catch (err) {
      console.log('err', err)
    }

  }

  const deleteProduct = (title: string) => {
    deleteTitle(title)
    setNewProducts(newProducts.filter((product) => product.title !== title));
  }

  return (
    <div className={styles.cont}>
      <div className={styles.cardsContainer}>
        {newProducts.map(p => (
          <div className={styles.cardContainer} key={p.price}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {p.title}
                  {' '}
                  ${p.price}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {p.description}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {p.category}
                </Typography>
              </CardContent>
              <Button sx={{color: 'red'}} onClick={() => deleteProduct(p.title)}>delete</Button>
            </Card>
          </div>
        ))}
      </div>
      <div className={styles.container}>
        <TextField
          {...register('title')}
          sx={{ marginTop: 5 }}
          error={errors.title ? true : false}
          label={'title'}
          id="title"
          variant="outlined"
        />
        {errors.title && (
          <Alert severity="error">{errors.title.message?.toString()}</Alert>
        )}
        <TextField
          {...register('price')}
          sx={{ marginTop: 5 }}
          error={errors.price ? true : false}
          label={'price'}
          id="price"
          type={'number'}
          variant="outlined"
        />
        {errors.price && (
          <Alert severity="error">{errors.price.message?.toString()}</Alert>
        )}

        <TextField
          {...register('description')}
          sx={{ marginTop: 5 }}
          error={errors.description ? true : false}
          label={'description'}
          id="description"
          variant="outlined"
        />
        {errors.description && (
          <Alert severity="error">{errors.description.message?.toString()}</Alert>
        )}
        
        <TextField
          {...register('category')}
          sx={{ marginTop: 5 }}
          error={errors.category ? true : false}
          label={'category'}
          id="category"
          variant="outlined"
        />
        {errors.category && (
          <Alert severity="error">{errors.category.message?.toString()}</Alert>
        )}
        <button onClick={handleSubmit(onsubmit)}
          className={styles.loginButton}
        >
          submit
        </button>
      </div>
    </div>
  )
}