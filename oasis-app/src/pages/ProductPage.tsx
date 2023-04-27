import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import macbook from '../assets/macbook-front.jpg';
import api from '../utils/axios';
const ProductPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductData[]>([]);
    interface ProductData {
        _id: string;
        name: string;
        price: number;
        image: string;
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get<ProductData[]>(
                    "/products"
                );
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);
    return (
        <Container>
            <Box display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh">
                {products.map((product) => (
                    <Product key={product._id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        onClick={() => navigate(`/products/${product._id}`)}
                    />

                ))}

            </Box>


        </Container>
    )
}

export default ProductPage