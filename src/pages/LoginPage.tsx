import { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Link, Container, Avatar, CssBaseline, Alert } from '@mui/material';
import { loginUser } from '../services/authFunctions';
import { palette } from '@mui/system';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state/redux';
import LockIcon from '@mui/icons-material/Lock';
import { useLocation } from 'react-router-dom';
import Copyright from '../components/Copyright';
const LoginPage = () => {
    interface ErrorMessage {
        errorMessage: string
    }
    const initialFormData = {
        email: "",
        password: ""
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    const message = location?.state
    const [formData, updateFormData] = useState(initialFormData)
    const [error, setError] = useState<ErrorMessage | null>(null);
    useEffect(() => {
        if (message) {
            setError({ errorMessage: message });
        }
    }, [message]);
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
            const response = await loginUser(formData).then(data => {
                dispatch(
                    setLogin({
                        user: data.user,
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken,
                    })
                )
            });
            console.log(response);
            navigate("/products");
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
                    Sign in
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mt: 2, mb: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>{error.errorMessage}</Alert>
                )}
                <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    )
}

export default LoginPage