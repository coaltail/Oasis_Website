import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Box,
  Button,
  Typography
} from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { CartItem, clearCart } from "../state/reduxCart";
import HoverButton from "./StyledButtonWithHover";
const ShoppingCart = () => {
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  console.log("Cart items: ", cartItems);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleToggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <IconButton color="inherit" onClick={handleToggleDrawer} sx={{ mr: 1 }}>
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon sx={{
            color: 'white',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'none',
              color: '#64748b',
              transition: '0.3s ease-out',
            },
          }} />
        </Badge>
      </IconButton>
      <Drawer
        sx={{
          width: 450,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 450,
            right: 0,
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        anchor="right"
        open={open}
        onClose={handleToggleDrawer}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "64px",
            paddingRight: "16px",
            flexDirection: 'row'

          }}
        >

          <IconButton
            sx={{ position: "absolute", top: 1, right: 1 }}
            onClick={handleToggleDrawer}
          >
            <CloseIcon />
          </IconButton>
          <HoverButton onClick={() => dispatch(clearCart())}>Clear cart Items</HoverButton>

        </Box>
        <List>
          {cartItems.map((item: CartItem) => (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItem key={item.product._id} sx={{ pl: 2, pr: 2 }}>
                <ListItemIcon>
                  <Box sx={{ width: 128, height: 128 }}>
                    <Box component="img"
                      alt={item.product.productName}
                      src={`../src/assets/productPhotos/${item.product.image}`}
                      sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mr: 6 }}
                    />
                  </Box>
                </ListItemIcon>
                <ListItemText sx={{ ml: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column' }} primary={item.product.productName} secondary={`$${item.product.price}`} />
                {item.quantity > 0 && <ListItemText sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}><Typography>{item.quantity}</Typography></ListItemText>}
              </ListItem>
            </Box>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default ShoppingCart;
