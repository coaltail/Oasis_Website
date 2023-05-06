import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ProductData, addItem } from '../state/reduxCart';
import api from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
const ProductPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductData[]>([]);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get<ProductData[]>(
                    "/products"
                );
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product: ProductData) => {
        dispatch(addItem({ product: product, _id: product._id }));
    };
    return (
        <Grid container
            spacing={4}
            justifyContent="center"
            sx={{
                paddingLeft: "40px",
                paddingRight: "40px",
                mt: 12
            }}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <Product
                        name={product.productName}
                        price={product.price}
                        image={`./src/assets/productPhotos/${product.image}`}
                        onClick={() => handleAddToCart(product)}
                        onNavigate={() => navigate(`products/${product._id}`)}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductPage