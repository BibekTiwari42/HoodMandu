import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          py: 8,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 120,
            height: 120,
            bgcolor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          <ShoppingBag sx={{ fontSize: 60, color: 'grey.400' }} />
        </Box>

        {/* Text */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Bebas Neue", sans-serif',
            mb: 2,
          }}
        >
          Your Cart is Empty
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
            maxWidth: 400,
          }}
        >
          Looks like you haven't added anything to your cart yet. 
          Discover our collection and find your perfect streetwear pieces.
        </Typography>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            sx={{ px: 4, py: 1.5 }}
          >
            Browse Products
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/')}
            sx={{ px: 4, py: 1.5 }}
          >
            Back to Home
          </Button>
        </Box>

        {/* Features */}
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 3, sm: 6 },
            mt: 8,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'grey.200',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Free Shipping
            </Typography>
            <Typography variant="body2" color="text.secondary">
              On orders over $100
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Easy Returns
            </Typography>
            <Typography variant="body2" color="text.secondary">
              30-day return policy
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Secure Checkout
            </Typography>
            <Typography variant="body2" color="text.secondary">
              100% protected payments
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EmptyCart;