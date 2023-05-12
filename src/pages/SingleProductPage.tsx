import { Container, Grid, Box, Typography, Rating, IconButton, Skeleton } from '@mui/material'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/axios';
import { ProductData, updateQuantityInCart } from '../state/reduxCart';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NotFound from './NotFound';
const commonStyles = {
  fontWeight: '600',
  mr: 4,
  mb: '-4px',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    color: '#3E8C6F',
  },
};
const SingleProductPage = () => {

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(0);
  const [selected, setSelected] = useState('specifications');
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleAddToCart = () => {
    dispatch(updateQuantityInCart({ product: productData, quantity: quantity }))
  }

  const fetchData = async () => {
    try {
      const response = await api.get<ProductData>(`/products/${id}`);
      setProductData(response.data);
      setLoading(false);
      console.log(response.data)

    } catch (error: any) {
      console.error(error);
      setLoading(false);
      if (error.response && error.response.status === 404) {
        return; // do nothing, let the component render the 404 page
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
    return (
      <div>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </div>
    );
  }
  if (!productData) {
    return <NotFound />;
  }

  return (
    <Container sx={{ pt: 8 }}>
      <Grid sx={{ display: 'flex' }} container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item xs={12} md={6} sx={{ textAlign: "center", mt: 2, mb: 2, minHeight: 550, height: '100%' }}>
          <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Box component="img"
              sx={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
              src={`../src/assets/productPhotos/${productData?.image}`} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: '100%', minHeight: 550, overflow: 'auto' }}>
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', height: '100%', overflowY: 'auto', padding: '16px' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'left', mb: 2 }}>
              {productData?.productName}
            </Typography>

            <Rating name="half-rating" defaultValue={2.5} precision={0.5} sx={{ color: '#3E8C6F', fontSize: '24px' }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 4 }}>

              <Typography variant="h6" sx={{ fontWeight: 400, marginLeft: '8px' }}>(0 reviews)</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'left', color: '#1D7273', mb: 4 }}>
              ${productData?.price}.00
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography
                sx={{
                  ...commonStyles,
                  color: selected === 'specifications' ? '#3E8C6F' : 'black',
                  textDecoration: selected === 'specifications' ? 'underline' : 'none',
                }}
                onClick={() => setSelected('specifications')}
              >
                Specifications
              </Typography>
              <Typography
                sx={{ ...commonStyles, color: selected === 'reviews' ? '#3E8C6F' : 'black' }}
                onClick={() => setSelected('about')}
              >
                About
              </Typography>
              <Typography
                sx={{ ...commonStyles, color: selected === 'reviews' ? '#3E8C6F' : 'black' }}
                onClick={() => setSelected('reviews')}
              >
                Reviews
              </Typography>
            </Box>
            <Box>
              {selected === 'specifications' && (
                <Box>
                  <Typography sx={{ mt: 2, mb: 2 }} paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum esse repellendus voluptate error odit quibusdam molestiae eveniet perferendis, culpa magni.</Typography>
                </Box>
              )}
              {selected === 'about' && (
                <Box>
                  <Typography sx={{ mt: 2, mb: 2 }}>{productData?.description}</Typography>
                </Box>
              )}
              {selected === 'reviews' && (
                <Box>
                  <Typography sx={{ mt: 2, mb: 2 }}>{reviews > 0 ? reviews : 'No reviews yet..'}</Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 2 }}>Quantity:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', borderRadius: '5px', border: '1px solid #ccc' }}>
                <IconButton onClick={() => quantity > 0 ? setQuantity((prev) => prev - 1) : 0} sx={{ p: 0 }}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600, px: 2 }}>{quantity}</Typography>
                <IconButton onClick={() => setQuantity((prev) => prev + 1)} sx={{ p: 0 }}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
              <Box onClick={handleAddToCart} component="button" sx={{ borderRadius: '6px', backgroundColor: '#3E8C6F', cursor: 'pointer', color: 'white', border: 'none', py: 2, px: 4, mr: 2 }}>Add to Cart</Box>
              <Box component="button" sx={{ borderRadius: '6px', backgroundColor: '#F1F1F1', cursor: 'pointer', color: '#3E8C6F', border: 'none', py: 2, px: 4 }}>Add to Wishlist</Box>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SingleProductPage