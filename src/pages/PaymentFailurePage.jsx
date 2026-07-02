import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import { Cancel, Replay } from '@mui/icons-material';

const PaymentFailurePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const productId = searchParams.get('pid');

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ bgcolor: 'error.main', color: 'white', py: { xs: 3, md: 4 } }}>
        <Container maxWidth="xl">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: '"Bebas Neue", sans-serif',
            }}
          >
            Payment Failed
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Cancel sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
          
          <Typography variant="h4" sx={{ fontFamily: '"Bebas Neue", sans-serif', mb: 1 }}>
            Payment Unsuccessful
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Your payment could not be processed. This could be due to:
          </Typography>
          
          <Box sx={{ textAlign: 'left', maxWidth: 400, mx: 'auto', mb: 3 }}>
            <Typography variant="body2" color="text.secondary" component="ul" sx={{ pl: 2 }}>
              <li>Insufficient balance in your eSewa wallet</li>
              <li>Payment was cancelled by you</li>
              <li>Transaction timeout</li>
              <li>Technical issues with the payment gateway</li>
            </Typography>
          </Box>
          
          {productId && (
            <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Order Reference
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                #{productId}
              </Typography>
            </Box>
          )}
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Don't worry! Your cart items are still saved. You can try again or choose a different payment method.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<Replay />}
              onClick={() => navigate('/checkout')}
              sx={{ px: 4, py: 1.5 }}
            >
              Try Again
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/cart')}
              sx={{ px: 4, py: 1.5 }}
            >
              Back to Cart
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Need help? Contact us at{' '}
            <Typography
              component="a"
              href="mailto:support@hoodmandu.com"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              support@hoodmandu.com
            </Typography>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentFailurePage;
