import { Box, AppBar, Typography, Toolbar,  Stack, Link as MuiLink, Button } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { setLogout } from '../state/redux';
import { useDispatch } from 'react-redux';

import ShoppingCart from './ShoppingCart';

import { clearCart } from '../state/reduxCart';
import { BeachAccess } from '@mui/icons-material';
const Navbar = () => {
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(setLogout());
        dispatch(clearCart());
        navigate("/");

    };
    return (
        <AppBar position="static" sx={{ bgcolor: '#3E8C6F' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BeachAccess />
                    <Typography variant="h5" sx={{ flexGrow: 1, color: 'white', ml: 2 }}>
                        <MuiLink
                            component={Link}
                            to="/"
                            sx={{
                                color: 'white',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'none',
                                    color: '#5AB5A5',
                                    transition: '0.3s ease-out',
                                },
                            }}
                        >
                            Oasis
                        </MuiLink>
                    </Typography>
                </Box>
                <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>
                        <MuiLink
                            component={Link}
                            to="/products"
                            sx={{
                                color: 'white',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'none',
                                    color: '#5AB5A5',
                                    transition: '0.3s ease-out',
                                },
                            }}
                        >
                            Products
                        </MuiLink>
                    </Typography>
                    {!user ? (
                        <>
                            <Typography>
                                <MuiLink
                                    component={Link}
                                    to="/register"
                                    sx={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Register
                                </MuiLink>
                            </Typography>
                            <Typography>
                                <MuiLink
                                    component={Link}
                                    to="/login"
                                    sx={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Login
                                </MuiLink>
                            </Typography>
                        </>
                    ) : (
                        <Typography>
                            <Button variant="contained" onClick={handleLogout} sx={{
                                bgcolor: '#fff',
                                color: '#3E8C6F',
                                '&:hover': {
                                    bgcolor: '#3E8C6F',
                                    color: '#fff',
                                },
                            }}>
                                Logout
                            </Button>
                        </Typography>
                    )}
                    <ShoppingCart />
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar