import { Container, Grid, Box, Typography, Rating, IconButton } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/axios';
import { ProductData, addItem, clearCart } from '../state/reduxCart';
import { useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const SingleProductPage = () => {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addItem({ product: productData, quantity: quantity }))
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ProductData>(`/products/${id}`);
        setProductData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
    <Container sx={{ pt: 8 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item xs={12} md={6} sx={{ textAlign: "center", mt: 2, mb: 2 }}>
          <Box component="img"
            sx={{
              height: '100%',
              width: '100%',
              minHeight: 350,
              maxHeight: 600,
              objectFit: 'contain'
            }}
            src={`../src/assets/productPhotos/${productData?.image}`} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          <Box sx={{}}>
            <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'left', mb: 2 }}>
              {productData?.productName}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 400, textAlign: 'left', mb: 4 }}>
              {productData?.description}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 4 }}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} sx={{ color: '#FFB900', fontSize: '24px' }} />
              <Typography variant="h6" sx={{ fontWeight: 400, marginLeft: '8px' }}>(0 reviews)</Typography>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, textAlign: 'left', color: '#1D7273', mb: 4 }}>
              ${productData?.price}.00
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography>Specifications</Typography>
              <Typography>About</Typography>
              <Typography>Reviews</Typography>
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