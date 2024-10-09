import { Button, Card, CardContent, TextField } from '@mui/material';
import { useProductsStore } from '../../store/products';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Product } from '../../types';

interface Props {
  data: Product
}

export const CardsForm = ({data}: Props) => {

  
  const schema = yup.object().shape({
    title: yup.string().required('title is requiered'),
    price: yup.number().required('La contraseña es requerida'),
    description: yup.string().required('La contraseña es requerida'),
    category: yup.string().required('La contraseña es requerida'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  
  const deleteTitle = useProductsStore(state => state.deleteProduct);
  const editProduct = useProductsStore((state) => state.editProduct);


  const deleteProduct = (title: string) => {
    deleteTitle(title)
  }

  const onsubmit = (data: any) => {
    const updatedProduct = {
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      isNew: true,
    };
    editProduct(data.title, updatedProduct);
  }



  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardContent>
      <TextField
        {...register('title')}
        sx={{ marginTop: 5 }}
        error={errors.title ? true : false}
        label={'title'}
        id="title"
        variant="outlined"
        defaultValue={data.title}
      />
      <TextField
        {...register('price')}
        sx={{ marginTop: 5 }}
        error={errors.price ? true : false}
        label={'price'}
        id='price'
        variant='outlined'
        type='number'
        value={data.price}
      />
      <TextField
        {...register('description')}
        sx={{ marginTop: 5 }}
        error={errors.description ? true : false}
        label={'description'}
        id="description"
        variant="outlined"
        value={data.description} 
      />
      <TextField
        {...register('category')}
        sx={{ marginTop: 5 }}
        error={errors.category ? true : false}
        label={'category'}
        id="category"
        variant="outlined"
        value={data.category} 
      />
     
    </CardContent>
    <Button sx={{color: 'red'}} onClick={() => deleteProduct(data.title)}>delete</Button>
    <Button sx={{color: '#f7dd00'}} onClick={handleSubmit(onsubmit)}>edit</Button>
  </Card>
  )
}