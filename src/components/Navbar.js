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
  Select,
  FormControl,
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
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';

function Navbar() {
  const { cart } = useCart();
  const { user, logout, isAuthenticated, isSeller } = useAuth();
  const { t, i18n } = useTranslation();
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

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { text: t('home'), path: '/', icon: <HomeIcon /> },
    { text: t('products'), path: '/products', icon: <ProductsIcon /> },
  ];

  if (isSeller) {
    menuItems.push({ text: t('myStore'), path: '/my-store', icon: <StoreIcon /> });
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
              <ListItemText primary={t('logout')} />
            </ListItem>
          </>
        ) : (
          <ListItem button component={RouterLink} to="/login">
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary={t('login')} />
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Language Switcher */}
          <FormControl size="small">
            <Select
              value={i18n.language}
              onChange={handleLanguageChange}
              sx={{
                minWidth: 100,
                '& .MuiSelect-select': {
                  py: 1,
                },
              }}
            >
              <MenuItem value="ka">ქართული</MenuItem>
              <MenuItem value="ru">Русский</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>

          {isAuthenticated && !isSeller && (
            <Tooltip title={t('cart')} arrow TransitionComponent={Fade}>
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
              <Tooltip title={t('account')} arrow TransitionComponent={Fade}>
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
                    secondary={isSeller ? t('sellerAccount') : t('userAccount')}
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
                    <ListItemText primary={t('addProduct')} />
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout} sx={{ py: 1 }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={t('logout')} />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              startIcon={<PersonIcon />}
            >
              {t('login')}
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