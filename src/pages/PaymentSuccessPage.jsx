import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from '@mui/material';
import { CheckCircle, Error as ErrorIcon } from '@mui/icons-material';
import { parseEsewaCallback, verifyEsewaPayment } from '../api/esewaApi';
import { sendOrderConfirmationEmail } from '../api/emailApi';
import { clearCart, selectCartItems, selectCartTotal } from '../store/slices/cartSlice';
import { selectUser } from '../store/slices/authSlice';
import { showSnackbar } from '../store/slices/uiSlice';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  
  // Get cart items before clearing
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  
  // Get logged-in user data
  const user = useSelector(selectUser);
  
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Parse callback parameters
        const callbackData = parseEsewaCallback(searchParams.toString());
        setPaymentDetails(callbackData);
        
        // Verify the payment
        const result = await verifyEsewaPayment({
          refId: callbackData.refId,
          productId: callbackData.productId,
          totalAmount: parseFloat(callbackData.amount) || 0,
        });
        
        if (result.success) {
          setVerified(true);
          const newOrderNumber = callbackData.productId || `HM${Date.now().toString().slice(-8)}`;
          setOrderNumber(newOrderNumber);
          
          // Get customer info from localStorage (stored during checkout)
          const customerInfo = JSON.parse(localStorage.getItem('checkoutCustomerInfo') || '{}');
          
          // Use logged-in user's email if available, fallback to checkout form email
          const customerEmail = customerInfo.email || user?.email;
          const customerName = `${customerInfo.firstName || user?.firstName || ''} ${customerInfo.lastName || user?.lastName || ''}`.trim();
          
          // Send order confirmation email
          if (customerEmail) {
            try {
              const emailResult = await sendOrderConfirmationEmail({
                customerEmail: customerEmail,
                customerName: customerName || 'Valued Customer',
                orderNumber: newOrderNumber,
                totalAmount: parseFloat(callbackData.amount) || cartTotal || 0,
                items: cartItems.length > 0 ? cartItems : JSON.parse(localStorage.getItem('lastCartItems') || '[]'),
                paymentMethod: 'eSewa',
                shippingAddress: {
                  address: customerInfo.address || '',
                  city: customerInfo.city || '',
                },
              });
              
              if (emailResult.success) {
                setEmailSent(true);
                console.log('Order confirmation email sent successfully!');
              }
            } catch (emailError) {
              console.error('Failed to send email:', emailError);
            }
          }
          
          // Clear the cart
          dispatch(clearCart());
          // Clear stored customer info
          localStorage.removeItem('checkoutCustomerInfo');
          localStorage.removeItem('lastCartItems');
          
          dispatch(
            showSnackbar({
              message: 'Payment successful! Thank you for your order.',
              severity: 'success',
            })
          );
        } else {
          setVerified(false);
          dispatch(
            showSnackbar({
              message: 'Payment verification failed. Please contact support.',
              severity: 'error',
            })
          );
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setVerified(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, dispatch]);

  if (verifying) {
    return (
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif' }}>
            Verifying Payment...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please wait while we confirm your payment
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ bgcolor: verified ? 'success.main' : 'error.main', color: 'white', py: { xs: 3, md: 4 } }}>
        <Container maxWidth="xl">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: '"Bebas Neue", sans-serif',
            }}
          >
            {verified ? 'Payment Successful' : 'Payment Verification Failed'}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          {verified ? (
            <>
              <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
              <Typography variant="h4" sx={{ fontFamily: '"Bebas Neue", sans-serif', mb: 1 }}>
                Thank You For Your Order!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Your payment has been processed successfully.
              </Typography>
              
              <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, mb: 3 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Order Number
                </Typography>
                <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif', color: 'primary.main' }}>
                  #{orderNumber}
                </Typography>
                {paymentDetails?.refId && (
                  <>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
                      eSewa Reference ID
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {paymentDetails.refId}
                    </Typography>
                  </>
                )}
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {emailSent 
                  ? '✓ A confirmation email has been sent to your inbox!' 
                  : "We'll send you an email confirmation with your order details shortly."
                }
              </Typography>
            </>
          ) : (
            <>
              <ErrorIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
              <Typography variant="h4" sx={{ fontFamily: '"Bebas Neue", sans-serif', mb: 1 }}>
                Verification Failed
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We couldn't verify your payment. If money was deducted from your account,
                please contact our support team with your transaction details.
              </Typography>
            </>
          )}
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/products')}
              sx={{ px: 4, py: 1.5 }}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{ px: 4, py: 1.5 }}
            >
              Go Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentSuccessPage;
