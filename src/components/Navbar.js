import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ShopIcon from '@mui/icons-material/Shop';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddIcon from '@mui/icons-material/Add';

function Navbar() {
  const { cart } = useCart();
  const { user, logout, isAuthenticated, isSeller } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleUserMenuClose();
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { title: 'Home', path: '/', icon: <HomeIcon />, auth: false },
    { title: 'About', path: '/about', icon: <InfoIcon />, auth: false },
    ...(isSeller ? [
      { title: 'My Store', path: '/store-products', icon: <StorefrontIcon />, auth: true },
    ] : [
      { title: 'Products', path: '/products', icon: <ShopIcon />, auth: true },
    ]),
  ];

  const renderNavItems = (mobile = false) => {
    return navItems.map((item) => {
      if (item.auth && !isAuthenticated) return null;
      
      if (mobile) {
        return (
          <ListItem
            button
            key={item.path}
            component={Link}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            selected={isCurrentPath(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        );
      }

      return (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          sx={{
            color: isCurrentPath(item.path) ? 'primary.main' : 'text.primary',
            fontWeight: isCurrentPath(item.path) ? 'bold' : 'normal',
            position: 'relative',
            '&::after': isCurrentPath(item.path) ? {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '3px',
              backgroundColor: 'primary.main',
              borderRadius: '2px',
            } : {},
          }}
        >
          {item.title}
        </Button>
      );
    });
  };

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
          component={Link} 
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
          <ShopIcon /> TechShop
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {renderNavItems()}
          </Box>
        )}

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAuthenticated && !isSeller && (
            <Tooltip title="Cart" arrow TransitionComponent={Fade}>
              <IconButton 
                component={Link} 
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
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          )}

          {isAuthenticated ? (
            <>
              <Tooltip title="Account" arrow TransitionComponent={Fade}>
                <IconButton onClick={handleUserMenuClick}>
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
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
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
                    component={Link}
                    to="/add-product"
                    onClick={handleUserMenuClose}
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
              component={Link}
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
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
              >
                <Box
                  sx={{
                    width: 250,
                    pt: 2,
                  }}
                >
                  <List>
                    {renderNavItems(true)}
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 