import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Breadcrumbs,
  Link,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  NavigateNext,
  LocalShipping,
  Payment,
  CheckCircle,
  AccountBalanceWallet,
} from '@mui/icons-material';
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  clearCart,
} from '../store/slices/cartSlice';
import { selectUser, selectIsAuthenticated } from '../store/slices/authSlice';
import { showSnackbar } from '../store/slices/uiSlice';
import { formatCurrency } from '../utils/formatCurrency';
import { checkoutSchema } from '../validation/checkoutSchema';
import { generateEsewaParams, initiateEsewaPayment } from '../api/esewaApi';
import { sendOrderConfirmationEmail } from '../api/emailApi';
import EmptyCart from '../components/cart/EmptyCart';

const steps = ['Shipping', 'Payment', 'Confirmation'];

const paymentMethods = [
  { value: 'cod', label: 'Cash on Delivery', description: 'Pay when you receive' },
  { value: 'esewa', label: 'eSewa', description: 'Pay via eSewa wallet' },
  { value: 'khalti', label: 'Khalti', description: 'Pay via Khalti wallet' },
  { value: 'bank', label: 'Bank Transfer', description: 'Direct bank transfer' },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);
  
  // Get logged-in user data
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirectingToEsewa, setIsRedirectingToEsewa] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Calculate totals
  const shippingCost = subtotal >= 10000 ? 0 : 200;
  const total = subtotal + shippingCost;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    getValues,
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      // Pre-fill with logged-in user data if available
      email: user?.email || '',
      phone: user?.phone || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'Nepal',
      paymentMethod: 'cod',
      notes: '',
    },
  });

  const handleNext = async () => {
    let fieldsToValidate = [];
    
    if (activeStep === 0) {
      fieldsToValidate = ['email', 'phone', 'firstName', 'lastName', 'address', 'city', 'state', 'postalCode', 'country'];
    } else if (activeStep === 1) {
      fieldsToValidate = ['paymentMethod'];
    }

    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Generate order number
    const orderNum = `HM${Date.now().toString().slice(-8)}`;
    
    console.log('Payment method selected:', data.paymentMethod);
    
    // Handle eSewa payment
    if (data.paymentMethod === 'esewa') {
      setIsRedirectingToEsewa(true);
      
      try {
        // Store order data in localStorage for retrieval after payment
        const orderData = {
          orderNumber: orderNum,
          items: cartItems,
          shipping: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
          },
          subtotal,
          shippingCost,
          total,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('pendingOrder', JSON.stringify(orderData));
        
        // Store customer info for email confirmation after payment
        localStorage.setItem('checkoutCustomerInfo', JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          address: data.address,
          city: data.city,
        }));
        
        // Store cart items for email (in case cart gets cleared)
        localStorage.setItem('lastCartItems', JSON.stringify(cartItems));
        
        // Generate eSewa payment parameters
        const esewaParams = generateEsewaParams({
          amount: subtotal,
          taxAmount: 0,
          serviceCharge: 0,
          deliveryCharge: shippingCost,
          productId: orderNum,
        });
        
        dispatch(
          showSnackbar({
            message: 'Redirecting to eSewa payment gateway...',
            severity: 'info',
          })
        );
        
        // Initiate eSewa payment (redirects to eSewa)
        // Use setTimeout to ensure snackbar shows before redirect
        setTimeout(() => {
          initiateEsewaPayment(esewaParams);
        }, 1000);
        
        // Don't set isSubmitting to false - we're redirecting away
        return;
      } catch (error) {
        console.error('eSewa payment error:', error);
        setIsRedirectingToEsewa(false);
        dispatch(
          showSnackbar({
            message: 'Failed to initiate eSewa payment. Please try again.',
            severity: 'error',
          })
        );
        setIsSubmitting(false);
        return;
      }
    }
    
    // Handle Khalti payment (placeholder - would need similar integration)
    if (data.paymentMethod === 'khalti') {
      dispatch(
        showSnackbar({
          message: 'Khalti integration coming soon. Please use eSewa or Cash on Delivery.',
          severity: 'warning',
        })
      );
      setIsSubmitting(false);
      return;
    }
    
    // Handle Bank Transfer
    if (data.paymentMethod === 'bank') {
      dispatch(
        showSnackbar({
          message: 'Bank transfer details will be sent to your email.',
          severity: 'info',
        })
      );
    }
    
    // Handle COD and other payment methods
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setOrderNumber(orderNum);
    setOrderComplete(true);
    setActiveStep(2);
    
    // Send order confirmation email for COD/Bank orders
    const customerEmail = data.email || user?.email;
    if (customerEmail) {
      try {
        await sendOrderConfirmationEmail({
          customerEmail: customerEmail,
          customerName: `${data.firstName || user?.firstName || ''} ${data.lastName || user?.lastName || ''}`.trim(),
          orderNumber: orderNum,
          totalAmount: total,
          items: cartItems,
          paymentMethod: data.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer',
          shippingAddress: {
            address: data.address || '',
            city: data.city || '',
          },
        });
        console.log('Order confirmation email sent successfully!');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't block checkout - just log the error
      }
    }
    
    // Clear cart
    dispatch(clearCart());
    
    dispatch(
      showSnackbar({
        message: 'Order placed successfully!',
        severity: 'success',
      })
    );
    
    setIsSubmitting(false);
  };

  if (cartItems.length === 0 && !orderComplete) {
    return <EmptyCart />;
  }

  // eSewa redirect loading view
  if (isRedirectingToEsewa) {
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
          <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif', mb: 1 }}>
            Redirecting to eSewa
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please wait while we connect you to the payment gateway...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Order confirmation view
  if (orderComplete) {
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: { xs: 3, md: 4 } }}>
          <Container maxWidth="xl">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontFamily: '"Bebas Neue", sans-serif',
              }}
            >
              Order Confirmed
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" sx={{ fontFamily: '"Bebas Neue", sans-serif', mb: 1 }}>
              Thank You For Your Order!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Your order #{orderNumber} has been placed successfully.
              <br />
              We'll send you an email confirmation shortly.
            </Typography>
            
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
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Page Header */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: { xs: 3, md: 4 } }}>
        <Container maxWidth="xl">
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" sx={{ color: 'grey.500' }} />}
            sx={{ mb: 1 }}
          >
            <Link href="/" color="grey.400" underline="hover">
              Home
            </Link>
            <Link href="/cart" color="grey.400" underline="hover">
              Cart
            </Link>
            <Typography color="white">Checkout</Typography>
          </Breadcrumbs>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: '"Bebas Neue", sans-serif',
            }}
          >
            Checkout
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Form Section */}
          <Grid item xs={12} lg={8}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Shipping Information */}
              {activeStep === 0 && (
                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <LocalShipping color="primary" />
                    <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                      Shipping Information
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    {/* Contact Info */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        Contact Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Phone Number"
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                          />
                        )}
                      />
                    </Grid>

                    {/* Shipping Address */}
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                        Shipping Address
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="First Name"
                            fullWidth
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Last Name"
                            fullWidth
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Street Address"
                            fullWidth
                            error={!!errors.address}
                            helperText={errors.address?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="City"
                            fullWidth
                            error={!!errors.city}
                            helperText={errors.city?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="State / Province"
                            fullWidth
                            error={!!errors.state}
                            helperText={errors.state?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="postalCode"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Postal Code"
                            fullWidth
                            error={!!errors.postalCode}
                            helperText={errors.postalCode?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Country"
                            fullWidth
                            error={!!errors.country}
                            helperText={errors.country?.message}
                          />
                        )}
                      />
                    </Grid>

                    {/* Order Notes */}
                    <Grid item xs={12}>
                      <Controller
                        name="notes"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label="Order Notes (Optional)"
                            fullWidth
                            multiline
                            rows={2}
                            placeholder="Any special instructions for delivery..."
                            error={!!errors.notes}
                            helperText={errors.notes?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Step 2: Payment Method */}
              {activeStep === 1 && (
                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Payment color="primary" />
                    <Typography variant="h5" sx={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                      Payment Method
                    </Typography>
                  </Box>

                  <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                      <FormControl error={!!errors.paymentMethod} fullWidth>
                        <RadioGroup {...field}>
                          {paymentMethods.map((method) => (
                            <Paper
                              key={method.value}
                              sx={{
                                p: 1.5,
                                mb: 1.5,
                                border: '2px solid',
                                borderColor: field.value === method.value ? 'primary.main' : 'grey.200',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': {
                                  borderColor: 'primary.main',
                                },
                              }}
                              onClick={() => field.onChange(method.value)}
                            >
                              <FormControlLabel
                                value={method.value}
                                control={<Radio />}
                                label={
                                  <Box>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                      {method.label}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {method.description}
                                    </Typography>
                                  </Box>
                                }
                                sx={{ m: 0, width: '100%' }}
                              />
                            </Paper>
                          ))}
                        </RadioGroup>
                        {errors.paymentMethod && (
                          <FormHelperText>{errors.paymentMethod.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />

                  <Alert severity="info" sx={{ mt: 2 }}>
                    For eSewa and Khalti payments, you will be redirected to the payment gateway after placing the order.
                  </Alert>
                </Paper>
              )}

              {/* Navigation Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={activeStep === 0 ? () => navigate('/cart') : handleBack}
                  disabled={isSubmitting || isRedirectingToEsewa}
                  sx={{ px: 4 }}
                >
                  {activeStep === 0 ? 'Back to Cart' : 'Back'}
                </Button>

                {activeStep === 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || isRedirectingToEsewa}
                    sx={{ px: 4 }}
                  >
                    {isRedirectingToEsewa ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                        Redirecting to eSewa...
                      </>
                    ) : isSubmitting ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ px: 4 }}
                  >
                    Continue to Payment
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: { xs: 2, md: 3 }, position: { lg: 'sticky' }, top: 80 }}>
              <Typography variant="h5" sx={{ mb: 2, fontFamily: '"Bebas Neue", sans-serif' }}>
                Order Summary
              </Typography>

              {/* Cart Items */}
              <Box sx={{ maxHeight: 250, overflow: 'auto', mb: 2 }}>
                {cartItems.map((item) => (
                  <Box
                    key={item.itemKey}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      py: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'grey.200',
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 50,
                        height: 50,
                        objectFit: 'cover',
                        bgcolor: 'grey.100',
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600} noWrap>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.size} / {item.color} × {item.quantity}
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {formatCurrency(item.price * item.quantity)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Totals */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Subtotal ({itemCount} items)</Typography>
                  <Typography fontWeight={600}>{formatCurrency(subtotal)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography fontWeight={600} color={shippingCost === 0 ? 'success.main' : 'text.primary'}>
                    {shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}
                  </Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary.main">
                    {formatCurrency(total)}
                  </Typography>
                </Box>
              </Box>

              {shippingCost === 0 && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  You qualify for free shipping!
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
