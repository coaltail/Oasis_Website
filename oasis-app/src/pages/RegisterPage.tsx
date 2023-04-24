import React, { FormEvent } from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { loginUser, FormData, RegisterData } from '../services/authFunctions';
import { palette } from '@mui/system';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from 'axios';


const RegisterPage = () => {

    interface ErrorMessage {
        config: string,
        data: {
            message: string
        },
        headers: string
    }

    const initialFormData: RegisterData = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        shippingAddress: "",
        billingAddress: "",
        phone: ""
    }


    const navigate = useNavigate();
    const [formData, updateFormData] = useState(initialFormData)
    const [error, setError] = useState<ErrorMessage | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        updateFormData({
            ...formData,
            [e.target.name]: value
        });
    };


    const handleFormSubmit = async (e: FormEvent) => {
        console.log(formData);
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5050/auth/register", formData );
            console.log(response);
            navigate("/home");
        } catch (error: any) {
            if (error.response) {
                setError({
                    config: error.config,
                    data: {
                        message: error.response.data.message,
                    },
                    headers: error.response.headers,
                });
            } else if (error.message) {
                setError({
                    config: error.config,
                    data: {
                        message: error.message,
                    },
                    headers: error.headers,
                });
            }
        }
    }
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >

            <Box
                sx={{
                    boxShadow: 3,
                    width: 400,
                    height: 650,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                <Typography component="h1" variant="h4" sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                }}>
                    <b>Sign in</b>
                </Typography>
                {error &&
                    <Box sx={{
                        bgcolor: 'error.main',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 4,
                        p: 2,
                        mt: 2,
                        boxShadow: 3,
                        width: '85%',
                    }}>
                        <ErrorIcon sx={{ color: '#fff', mr: 2 }} />
                        <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>
                            {error.data.message}
                        </Typography></Box>}

                <Box component="form"
                    onSubmit={handleFormSubmit}
                    sx={{
                        height: 650,
                        width: 400,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Box sx={{ width: '85%' }}>
                        <TextField
                            required
                            label="First Name"
                            name='firstName'
                            id='fname'
                            sx={
                                { mb: 2, width: "100%" }
                            }
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            label="Last Name"
                            name='lastName'
                            id='lname'
                            sx={
                                { mb: 2, width: "100%" }
                            }
                            onChange={handleChange}
                        />


                        <TextField
                            required
                            label="E-mail"
                            name='email'
                            id='email'
                            sx={
                                { mb: 2, width: "100%" }
                            }
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            type='password'
                            name='password'
                            id='password'
                            label="Password"
                            sx={
                                { mb: 2, width: "100%" }
                            }
                            onChange={handleChange}

                        />
                        <TextField
                            required
                            label="Shipping Address"
                            name='shippingAddress'
                            id='shippingAddress'
                            sx={
                                { mb: 2, width: "100%" }
                            }
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            label="Billing Address"
                            name='billingAddress'
                            id='billingAddress'
                            sx={
                                { mb: 2, width: "100%" }
                            }
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            label="Phone"
                            name='phone'
                            id='phone'
                            sx={
                                { mb: 2, width: "100%" }
                            }
                            onChange={handleChange}
                        />
                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <Grid item xs={12}>
                                <Button variant='contained' sx={{ width: '100%' }} type='submit'>Sign up</Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default RegisterPage