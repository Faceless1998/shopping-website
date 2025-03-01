import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (!cart.items || cart.items.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cart.items.map((item) => (
          <ListItem
            key={item.product._id}
            sx={{
              border: '1px solid #eee',
              mb: 2,
              borderRadius: 1,
            }}
          >
            <Box
              component="img"
              src={item.product.image ? `https://market-server-inky.vercel.app${item.product.image}` : 'https://via.placeholder.com/300'}
              alt={item.product.name}
              sx={{ width: 100, height: 100, mr: 2, objectFit: 'cover' }}
            />
            <ListItemText
              primary={item.product.name}
              secondary={`$${item.product.price.toFixed(2)}`}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
              <TextField
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > 0) {
                    updateQuantity(item.product._id, value);
                  }
                }}
                inputProps={{ min: 1 }}
                sx={{ width: 80 }}
              />
              <Typography>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeFromCart(item.product._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 4,
        }}
      >
        <Typography variant="h5">
          Total: ${getCartTotal().toFixed(2)}
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Checkout
        </Button>
      </Box>
    </Container>
  );
}

export default Cart; 