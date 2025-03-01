import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Divider,
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';

function About() {
  const features = [
    {
      icon: <StorefrontIcon sx={{ fontSize: 40 }} />,
      title: 'Wide Selection',
      description: 'Browse through our extensive collection of high-quality tech products.',
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40 }} />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly and efficiently to your doorstep.',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Our customer service team is always here to help you.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure Shopping',
      description: 'Shop with confidence with our secure payment system.',
    },
  ];

  return (
    <Container>
      {/* Hero Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 3,
          }}
        >
          About TechShop
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}
        >
          Your trusted destination for premium tech products since 2023. We're committed
          to providing the best shopping experience for our customers.
        </Typography>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                textAlign: 'center',
                backgroundColor: 'transparent',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  backgroundColor: 'primary.light',
                }}
              >
                {feature.icon}
              </Avatar>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 6 }} />

      {/* Mission Statement */}
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: 'auto', fontSize: '1.1rem', lineHeight: 1.8 }}
        >
          At TechShop, we strive to make the latest technology accessible to everyone.
          Our mission is to provide high-quality tech products at competitive prices
          while delivering exceptional customer service. We believe in building lasting
          relationships with our customers and ensuring their complete satisfaction
          with every purchase.
        </Typography>
      </Box>

      {/* Contact Information */}
      <Box
        sx={{
          py: 6,
          textAlign: 'center',
          backgroundColor: 'primary.light',
          borderRadius: 4,
          mt: 6,
          mb: 8,
          color: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Get in Touch
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Email: contact@techshop.com
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Phone: (555) 123-4567
        </Typography>
        <Typography variant="body1">
          Address: 123 Tech Street, Digital City, TC 12345
        </Typography>
      </Box>
    </Container>
  );
}

export default About; 