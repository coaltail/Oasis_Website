import { CartItem } from '@/state/reduxCart';
import HoverButton from '../components/StyledButtonWithHover';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {
    const cartItems = useSelector((state: any) => state.cart.cartItems);

    return (
        <Box
            sx={{
                backgroundColor: '#f8f8f8',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#ffffff',
                    padding: '24px',
                    borderRadius: '8px',
                    width: '400px',
                    textAlign: 'center',
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.15)',
                }}
            >
                <Typography variant="h5" component="h2" sx={{ marginBottom: '24px' }}>
                    Checkout
                </Typography>

                {cartItems.length === 0 ? (
                    <Typography variant="body1" sx={{ marginBottom: '24px' }}>
                        Your cart is empty.
                    </Typography>
                ) : (
                    <List sx={{ width: '100%' }}>
                        <ListItem
                            disableGutters
                            sx={{
                                backgroundColor: '#f5f5f5',
                                borderRadius: '4px',
                                marginBottom: '8px',
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontWeight: 'bold',
                                padding: '12px',
                            }}
                        >
                            <ListItemText primary="Quantity" sx={{ flex: '1', textAlign: 'right' }} />
                        </ListItem>
                        {cartItems.map((item: CartItem) => (
                            <ListItem
                                key={item.product._id}
                                disableGutters
                                sx={{
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px',
                                    marginBottom: '8px',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px',
                                }}
                            >
                                <ListItemIcon sx={{ width: '100px', height: '100%' }}>
                                    <img
                                        src={`../src/assets/productPhotos/${item.product.image}`}
                                        alt={item.product.productName}
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={item.product.productName} secondary={`$${item.product.price}`} sx={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} />
                                <ListItemText primary={item.quantity.toString()} sx={{ flex: '1', textAlign: 'right' }} />
                            </ListItem>
                        ))}
                    </List>
                )}

                {/* Your checkout form goes here */}
                <Box sx={{ marginTop: '24px' }}>
                    <HoverButton variant="contained" color="primary">
                        Place Order
                    </HoverButton>
                </Box>
            </Box>
        </Box>

    );
};

export default CheckoutPage;