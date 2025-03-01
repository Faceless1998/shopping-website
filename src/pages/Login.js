import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} style={{ padding: '24px 0' }}>
      {value === index && children}
    </div>
  );
}

function Login() {
  const [activeTab, setActiveTab] = useState(0);
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    storeName: '',
    storeDescription: '',
    phone: '',
    address: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
  };

  const handleModeToggle = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }

    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }
      if (activeTab === 1 && !formData.storeName) {
        setError('Store name is required');
        return false;
      }
      if (!formData.name) {
        setError('Full name is required');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    if (mode === 'login') {
      // In a real app, you would validate the role (user/seller) here
      const success = login(formData.email, formData.password, activeTab === 1 ? 'seller' : 'user');
      if (success) {
        navigate(activeTab === 1 ? '/store-products' : '/products');
      } else {
        setError('Invalid credentials');
      }
    } else {
      // In a real app, you would make an API call to register the user
      const storeInfo = activeTab === 1 ? {
        name: formData.storeName,
        description: formData.storeDescription,
        phone: formData.phone,
        address: formData.address,
      } : null;

      console.log('Registration data:', {
        ...formData,
        role: activeTab === 0 ? 'user' : 'seller',
        storeInfo,
      });

      // For demo purposes, automatically log in after registration
      const success = login(
        formData.email,
        formData.password,
        activeTab === 1 ? 'seller' : 'user',
        storeInfo
      );
      if (success) {
        navigate(activeTab === 1 ? '/store-products' : '/products');
      }
    }
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: mode === 'register' ? 2 : 3 }}
        />

        {mode === 'register' && (
          <>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />

            {activeTab === 1 && (
              <>
                <TextField
                  fullWidth
                  label="Store Name"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Store Description"
                  name="storeDescription"
                  value={formData.storeDescription}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  margin="normal"
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  label="Business Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />
              </>
            )}
          </>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
            textTransform: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            mb: 2,
            background: (theme) => 
              `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
            '&:hover': {
              background: (theme) =>
                `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
            },
          }}
        >
          {mode === 'login' ? 'Sign In' : 'Register'}
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={handleModeToggle}
          sx={{ 
            textTransform: 'none',
            borderRadius: 2,
            py: 1,
          }}
        >
          {mode === 'login'
            ? "Don't have an account? Register"
            : 'Already have an account? Sign In'}
        </Button>
      </form>
    );
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4,
            }}
          >
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </Typography>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ 
              mb: 3,
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px',
              },
            }}
          >
            <Tab
              icon={<PersonIcon />}
              label="User"
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                minHeight: 64,
                '&.Mui-selected': {
                  fontWeight: 'bold',
                },
              }}
            />
            <Tab
              icon={<StorefrontIcon />}
              label="Seller"
              sx={{
                textTransform: 'none',
                fontSize: '1rem',
                minHeight: 64,
                '&.Mui-selected': {
                  fontWeight: 'bold',
                },
              }}
            />
          </Tabs>
          <Divider sx={{ mb: 3 }} />

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                borderRadius: 2,
              }}
            >
              {error}
            </Alert>
          )}

          <TabPanel value={activeTab} index={0}>
            {renderForm()}
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            {renderForm()}
          </TabPanel>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login; 