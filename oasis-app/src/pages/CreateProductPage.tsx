import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Typography, FormControl, Grid, Button } from '@mui/material';
import api from '../utils/axios';
const CreateProductPage = () => {
    interface FormData {
        productName: string,
        description: string,
        image: File | null,
        price: string,
        quantityInStock: number
    }
    const initialFormData = {
        productName: "",
        description: "",
        image: null,
        price: "",
        quantityInStock: 0
    }
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };
    const handleFormSubmit = async (e) => {
        await api.post("/products/create", formData);
    }

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.role != 'admin') {
            navigate("/");
        }
    }, [])

    return (
        <Box sx={{ mt: 8, pt: 4 }} component='form' onSubmit={handleFormSubmit}>
            <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" align="center" sx={{ pb: 4 }}>
                    Create a New Product
                </Typography>
                <FormControl>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="productName"
                                label="Product Name"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button type='submit' variant='contained' sx={{ m: 1 }}>Create Product</Button>
                </FormControl>
            </Container>
        </Box>
    )
}

export default CreateProductPage