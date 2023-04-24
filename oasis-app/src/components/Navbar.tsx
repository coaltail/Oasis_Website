import { AppBar, CssBaseline, Typography, Toolbar, IconButton, List, ListItem, ListItemButton, ListItemText, Divider, Stack, Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box/Box';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import { Link } from 'react-router-dom'

const Navbar = () => {
    const isLoggedIn = true;
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
                    <Stack direction='row' spacing={2}>
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
                        {isLoggedIn && (
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
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar