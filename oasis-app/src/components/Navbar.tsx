import { AppBar, CssBaseline, Typography, Toolbar, IconButton, List, ListItem, ListItemButton, ListItemText, Divider, Stack, Link as MuiLink, Button } from '@mui/material';
import Box from '@mui/material/Box/Box';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { AuthState } from '../state/redux';
import { setLogout } from '../state/redux';
import { useDispatch } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
    const user = useSelector((state: { auth: AuthState }) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(setLogout());
        navigate("/");

    };
    return (
        <>
            <CssBaseline />
            <AppBar sx={{ bgcolor: '#212121' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <EngineeringRoundedIcon />
                        </IconButton>
                        <Typography variant='h5' sx={{ display: 'inline-block', verticalAlign: 'middle' }}>
                            <MuiLink
                                component={Link}
                                to='/'
                                sx={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Oasis
                            </MuiLink>
                        </Typography>
                    </Box>
                    <Stack direction='row' spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography>
                            <MuiLink
                                component={Link}
                                to='/products'
                                sx={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
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
                                        to='/register'
                                        sx={{
                                            color: '#fff',
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
                                        to='/login'
                                        sx={{
                                            color: '#fff',
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

                        ) :
                            (
                                <Typography>
                                    <Button variant='contained' onClick={handleLogout}
                                    >Logout</Button>
                                </Typography>
                            )}
                        <Button sx={{ color: 'white', padding: '1rem' }}>

                            <ShoppingCartIcon>

                            </ShoppingCartIcon>
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar