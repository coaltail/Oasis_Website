import { FormEvent } from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Avatar, CssBaseline, Container, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LockIcon from '@mui/icons-material/Lock';
import Copyright from '../components/Copyright';
const RegisterPage = () => {

    interface ErrorMessage {
        errorMessage: string
    }
    interface RegisterData {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        shippingAddress: string,
        billingAddress: string,
        phone: string,
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
    const [error, setError] = useState<ErrorMessage | null>();

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
            const response = await axios.post("http://localhost:5050/auth/register", formData);
            console.log(response);
            navigate("/home");
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            setError({ errorMessage });
        }
    }
    return (

        <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column' }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mt: 2, mb: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>{error.errorMessage}</Alert>
                )}
                <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="shippingAddress"
                                required
                                fullWidth
                                id="shippingAddress"
                                label="Shipping Address"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="billingAddress"
                                required
                                fullWidth
                                id="billingAddress"
                                label="Billing Address"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="phone"
                                required
                                type='phone'
                                fullWidth
                                id="phone"
                                label="Phone"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    )
}

export default RegisterPage