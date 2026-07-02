import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  InputBase,
  Collapse,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ShoppingBag as ShoppingBagIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { selectCartTotalQuantity } from '../../store/slices/cartSlice';
import { setSearchQuery } from '../../store/slices/productsSlice';
import { selectIsAuthenticated, selectUser, logout } from '../../store/slices/authSlice';
import { showSnackbar } from '../../store/slices/uiSlice';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showSnackbar({ message: 'Logged out successfully', severity: 'success' }));
    handleUserMenuClose();
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchValue('');
      dispatch(setSearchQuery(''));
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchValue));
    if (location.pathname !== '/products') {
      window.location.href = '/products';
    }
  };

  const drawer = (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: 'background.dark',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Logo variant="light" />
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>
      <List sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', px: 4 }}>
        {NAV_LINKS.map((link) => (
          <ListItem key={link.path} disablePadding sx={{ mb: 2 }}>
            <ListItemButton
              component={Link}
              to={link.path}
              onClick={handleDrawerToggle}
              sx={{
                py: 2,
                '&:hover': {
                  bgcolor: 'rgba(0, 102, 255, 0.1)',
                },
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  sx: {
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '3rem',
                    letterSpacing: '0.05em',
                    color: location.pathname === link.path ? 'primary.main' : 'white',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Auth Links in Mobile */}
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 2 }} />
        {isAuthenticated ? (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleLogout();
                handleDrawerToggle();
              }}
              sx={{
                py: 2,
                '&:hover': {
                  bgcolor: 'rgba(0, 102, 255, 0.1)',
                },
              }}
            >
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  sx: {
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '2rem',
                    letterSpacing: '0.05em',
                    color: 'grey.400',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  navigate('/login');
                  handleDrawerToggle();
                }}
                sx={{
                  py: 2,
                  '&:hover': {
                    bgcolor: 'rgba(0, 102, 255, 0.1)',
                  },
                }}
              >
                <ListItemText
                  primary="Login"
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '2rem',
                      letterSpacing: '0.05em',
                      color: 'primary.main',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate('/signup');
                  handleDrawerToggle();
                }}
                sx={{
                  py: 2,
                  '&:hover': {
                    bgcolor: 'rgba(0, 102, 255, 0.1)',
                  },
                }}
              >
                <ListItemText
                  primary="Sign Up"
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: '2rem',
                      letterSpacing: '0.05em',
                      color: 'grey.400',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              justifyContent: 'space-between', 
              minHeight: { xs: 56, md: 64 },
              height: { xs: 56, md: 64 },
            }}
          >
              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open menu"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  display: { md: 'none' },
                  color: 'text.primary',
                }}
              >
                <MenuIcon sx={{ fontSize: 28 }} />
              </IconButton>

              {/* Logo */}
              <Box
                component={Link}
                to="/"
                sx={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Logo />
              </Box>

              {/* Desktop Navigation */}
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  gap: 4,
                  alignItems: 'center',
                }}
              >
                {NAV_LINKS.map((link) => (
                  <Box
                    key={link.path}
                    component={Link}
                    to={link.path}
                    sx={{
                      textDecoration: 'none',
                      color: location.pathname === link.path ? 'primary.main' : 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      position: 'relative',
                      py: 1,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: location.pathname === link.path ? '100%' : '0%',
                        height: '2px',
                        bgcolor: 'primary.main',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {link.label}
                  </Box>
                ))}
              </Box>

              {/* Right Actions */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={handleSearchToggle}
                  sx={{ color: 'text.primary' }}
                >
                  {searchOpen ? <CloseIcon /> : <SearchIcon />}
                </IconButton>

                {/* User Menu */}
                {isAuthenticated ? (
                  <>
                    <IconButton
                      onClick={handleUserMenuOpen}
                      sx={{ color: 'text.primary' }}
                    >
                      <PersonIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleUserMenuClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      PaperProps={{
                        sx: { minWidth: 180, mt: 1 },
                      }}
                    >
                      <Box sx={{ px: 2, py: 1 }}>
                        <Typography variant="subtitle2">
                          {user?.firstName || 'User'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {user?.email}
                        </Typography>
                      </Box>
                      <Divider />
                      <MenuItem onClick={handleLogout}>
                        <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    onClick={() => navigate('/login')}
                    variant="text"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      display: { xs: 'none', sm: 'inline-flex' },
                    }}
                  >
                    Login
                  </Button>
                )}

                <IconButton
                  component={Link}
                  to="/cart"
                  sx={{ color: 'text.primary' }}
                >
                  <Badge
                    badgeContent={cartQuantity}
                    sx={{
                      '& .MuiBadge-badge': {
                        bgcolor: 'primary.main',
                        color: 'white',
                      },
                    }}
                  >
                    <ShoppingBagIcon />
                  </Badge>
                </IconButton>
              </Box>
            </Toolbar>

            {/* Search Bar */}
            <Collapse in={searchOpen}>
              <Box
                component="form"
                onSubmit={handleSearchSubmit}
                sx={{
                  py: 2,
                  borderTop: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <InputBase
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  autoFocus
                  fullWidth
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    '& input': {
                      p: 0,
                    },
                  }}
                />
              </Box>
            </Collapse>
          </Container>
        </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;