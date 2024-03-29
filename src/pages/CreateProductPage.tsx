import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Typography, FormControl, Grid, Button } from '@mui/material';
import api from '../utils/axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AuthState } from '../state/redux';
const CreateProductPage = () => {
    interface FormData {
        productName: string,
        description: string,
        image: File | undefined,
        price: number | undefined,
        quantityInStock: number | undefined
    }
    const initialFormData = {
        productName: "",
        description: "",
        image: undefined,
        price: undefined,
        quantityInStock: undefined
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
    console.log(formData);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log(file)
            setFormData({
                ...formData,
                image: file
            });

        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.post("/products/create", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            console.log(response);
            navigate("/products");
        }
        catch (err) {
            console.log(err);
        }
    }

    const user = useSelector((state: AuthState) => state.user) || null;

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user])

    return (
        <form onSubmit={handleFormSubmit}>
            <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" align="center" sx={{ pb: 4 }}>
                    Create a New Product
                </Typography>
                <FormControl sx={{ mt: 4 }}>
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
                                multiline
                                rows={4}
                                id="description"
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="price"
                                label="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="quantityInStock"
                                label="Quantity In Stock"
                                name="quantityInStock"
                                value={formData.quantityInStock}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <label htmlFor="image">
                            <input
                                style={{ display: 'none' }}
                                id="image"
                                name="image"
                                type="file"
                                onChange={handleImageChange}
                            />

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1">
                                        {formData.image ? formData.image.name : 'Upload photo'}
                                    </Typography>
                                </Box>
                                <Button variant="contained" component="span" sx={{ ml: 2 }}>
                                    <CloudUploadIcon sx={{ mr: 1 }} />
                                    Upload
                                </Button>
                            </Box>
                        </label>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button type='submit' variant='contained' sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 600 }}>
                            Create Product
                        </Button>
                    </Box>
                </FormControl>
            </Container>
        </form>
    )
}

export default CreateProductPage