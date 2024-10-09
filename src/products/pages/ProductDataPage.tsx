import { Card, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useProductsStore } from '../../store/products';
import styles from './ProductDataPage.module.scss';



export const ProductDataPage = () => {
  const { id } = useParams();
  const products = useProductsStore(state => state.products)
  const productId = id && parseInt(id, 10) 

  const dataProduct = products.filter(p => p.id === productId);
  console.log("🚀 ~ ProductDataPage ~ dataProduct:", dataProduct)


  return (
    <div className={styles.container}>
      <Card sx={{ maxWidth: 345 }}>
        <div>
          <CardMedia
            component="img"
            sx={{ width: 200 }}
            image={dataProduct[0].image}
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {dataProduct[0].title}
            {' '}
            ${dataProduct[0].price}
          </Typography>
          <Rating readOnly name="half-rating" defaultValue={dataProduct[0].rating.rate} precision={0.5} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {dataProduct[0].description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}