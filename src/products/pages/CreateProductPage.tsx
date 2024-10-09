import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, TextField } from '@mui/material';
import styles from './CreateProductPage.module.scss';
import { useProductsStore } from '../../store/products';
import { api } from '../../services/config';
import { CardsForm } from '../components/CardsForm';


export const CreateProductPage = () => {
  const addProduct = useProductsStore((state) => state.addProduct);
  const products = useProductsStore(state => state.products);
  console.log("🚀 ~ CreateProductPage ~ products:", products)



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
      isNew: true,
    };
    // setNewProducts([ newProduct, ...newProducts ])
    addProduct(newProduct);
    reset()
    try {
      await api.post(`products`,{newProduct})
    } catch (err) {
      console.log('err', err)
    }

  }



  return (
    <div className={styles.cont}>
      <div className={styles.cardsContainer}>
        {products.map(p => (
          p.isNew &&
          <div className={styles.cardContainer} key={p.price}>
           <CardsForm data={p} />
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