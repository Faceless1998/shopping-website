import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    storeInfo: {
      name: '',
      description: '',
      phone: '',
      address: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('store.')) {
      const storeField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        storeInfo: {
          ...prev.storeInfo,
          [storeField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.role === 'seller' && 
        (!formData.storeInfo.name || !formData.storeInfo.phone || !formData.storeInfo.address)) {
      setError('Store information is required for sellers');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    try {
      setLoading(true);
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        storeInfo: formData.role === 'seller' ? formData.storeInfo : undefined,
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
            </Select>
          </FormControl>

          {formData.role === 'seller' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Store Information
              </Typography>
              
              <TextField
                fullWidth
                label="Store Name"
                name="store.name"
                value={formData.storeInfo.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Store Description"
                name="store.description"
                value={formData.storeInfo.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
              />
              
              <TextField
                fullWidth
                label="Phone Number"
                name="store.phone"
                value={formData.storeInfo.phone}
                onChange={handleChange}
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Store Address"
                name="store.address"
                value={formData.storeInfo.address}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>

          <Button
            variant="text"
            fullWidth
            onClick={() => navigate('/login')}
            sx={{ mt: 1 }}
          >
            Already have an account? Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
} 