import React, { FormEvent } from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { loginUser, FormData } from '../services/authFunctions';
import { palette } from '@mui/system';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';


const LoginPage = () => {
    interface ErrorMessage {
        config: string,
        data: {
            message: string
        },
        headers: string
    }
    const initialFormData: FormData = {
        email: "",
        password: ""
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
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            navigate("/products");
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
                    height: 400,
                    boxShadow: 3,
                    width: 400,
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
                        height: 500,
                        width: 400,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Box sx={{ width: '85%' }}>


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
                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>
                            <Grid item xs={6}>
                                <Button variant='contained' sx={{ width: '100%' }} type='submit'>Login</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant='contained' sx={{ width: '100%' }}>Sign up</Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default LoginPage