import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Breadcrumbs,
  Link,
  Divider,
  Toolbar,
} from '@mui/material';
import { NavigateNext, DeleteOutline } from '@mui/icons-material';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import { selectCartItems, clearCart } from '../store/slices/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Page Header */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          color: 'white',
          py: { xs: 2, md: 3 },
        }}
      >
        <Container maxWidth="xl">
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: 'grey.500' }} />}
            sx={{ mb: 2 }}
          >
            <Link href="/" color="grey.400" underline="hover">
              Home
            </Link>
            <Typography color="white">Cart</Typography>
          </Breadcrumbs>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontFamily: '"Bebas Neue", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            Shopping Cart
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* Cart Items */}
          <Grid item xs={12} lg={8}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h6">
                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} in Cart
              </Typography>
              <Button
                startIcon={<DeleteOutline />}
                onClick={handleClearCart}
                color="error"
                sx={{ textTransform: 'none' }}
              >
                Clear Cart
              </Button>
            </Box>

            <Divider />

            {/* Cart Items List */}
            <Box>
              {cartItems.map((item) => (
                <CartItem key={item.itemKey} item={item} />
              ))}
            </Box>

            {/* Continue Shopping Link */}
            <Box sx={{ mt: 2 }}>
              <Link
                href="/products"
                underline="hover"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                ← Continue Shopping
              </Link>
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} lg={4}>
            <CartSummary />
          </Grid>
        </Grid>
      </Container>

      {/* Trust Features */}
      <Box sx={{ py: 3, bgcolor: 'grey.50' }}>
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent="center">
            {[
              { title: 'Secure Checkout', desc: '256-bit SSL encryption' },
              { title: 'Free Returns', desc: '30-day return policy' },
              { title: 'Fast Shipping', desc: '2-5 business days' },
              { title: '24/7 Support', desc: 'Here to help anytime' },
            ].map((feature, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default CartPage;