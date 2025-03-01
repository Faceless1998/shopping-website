import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

function Home() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
          gap: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Shop
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Discover amazing products at great prices
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="primary"
          size="large"
        >
          Shop Now
        </Button>
      </Box>
    </Container>
  );
}

export default Home; 