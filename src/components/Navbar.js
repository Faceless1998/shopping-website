import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Tooltip,
  Fade,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
  Store as StoreIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  ShoppingBag as ProductsIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';

function Navbar() {
  const { cart } = useCart();
  const { user, logout, isAuthenticated, isSeller } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const cartItemsCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Products', path: '/products', icon: <ProductsIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
  ];

  if (isSeller) {
    menuItems.push({ text: 'My Store', path: '/my-store', icon: <StoreIcon /> });
  }

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
    >
      <List sx={{ width: 250 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider />
        {isAuthenticated ? (
          <>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={RouterLink} to="/login">
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar 
      position="sticky" 
      sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography 
          variant="h5" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            textDecoration: 'none', 
            color: 'primary.main',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <StoreIcon /> TechShop
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAuthenticated && !isSeller && (
            <Tooltip title="Cart" arrow TransitionComponent={Fade}>
              <IconButton 
                component={RouterLink} 
                to="/cart" 
                sx={{ 
                  color: isCurrentPath('/cart') ? 'primary.main' : 'text.primary',
                }}
              >
                <Badge 
                  badgeContent={cartItemsCount} 
                  color="secondary"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '0.8rem',
                      height: '20px',
                      minWidth: '20px',
                    },
                  }}
                >
                  <CartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          )}

          {isAuthenticated ? (
            <>
              <Tooltip title="Account" arrow TransitionComponent={Fade}>
                <IconButton onClick={handleMenu}>
                  <Avatar 
                    sx={{ 
                      width: 35, 
                      height: 35, 
                      bgcolor: 'primary.main',
                      fontSize: '1rem',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
                sx={{
                  '& .MuiPaper-root': {
                    borderRadius: 2,
                    minWidth: 180,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <MenuItem sx={{ py: 1 }}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={user?.name}
                    secondary={isSeller ? 'Seller Account' : 'User Account'}
                  />
                </MenuItem>
                {isSeller && (
                  <MenuItem 
                    component={RouterLink}
                    to="/add-product"
                    onClick={handleClose}
                    sx={{ py: 1 }}
                  >
                    <ListItemIcon>
                      <AddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Add Product" />
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
      {renderMobileMenu()}
    </AppBar>
  );
}

export default Navbar; 