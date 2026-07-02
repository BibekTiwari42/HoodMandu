import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Collapse,
  IconButton,
} from '@mui/material';
import { LocalShipping, Security, Replay, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { selectCartTotal, selectCartItemCount } from '../../store/slices/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';

const CartSummary = () => {
  const navigate = useNavigate();
  const subtotal = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);
  
  const [promoCode, setPromoCode] = useState('');
  const [promoExpanded, setPromoExpanded] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate shipping (free over Rs. 10,000)
  const shippingThreshold = 10000;
  const shippingCost = subtotal >= shippingThreshold ? 0 : 200;
  const amountToFreeShipping = shippingThreshold - subtotal;

  // Calculate discount
  const discount = promoApplied ? subtotal * 0.1 : 0;

  // Calculate total
  const total = subtotal - discount + shippingCost;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'hood10') {
      setPromoApplied(true);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'grey.50',
        p: { xs: 2, md: 3 },
        position: { lg: 'sticky' },
        top: 100,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Order Summary
      </Typography>

      {/* Free Shipping Progress */}
      {shippingCost > 0 && (
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            p: 1.5,
            mb: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Add {formatCurrency(amountToFreeShipping)} more for FREE shipping!
          </Typography>
          <Box
            sx={{
              mt: 1.5,
              height: 4,
              bgcolor: 'rgba(255,255,255,0.3)',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                bgcolor: 'white',
                width: `${(subtotal / shippingThreshold) * 100}%`,
                maxWidth: '100%',
              }}
            />
          </Box>
        </Box>
      )}

      {/* Summary Details */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" color="text.secondary">
            Subtotal ({itemCount} items)
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {formatCurrency(subtotal)}
          </Typography>
        </Box>

        {promoApplied && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" color="success.main">
              Discount (10%)
            </Typography>
            <Typography variant="body1" color="success.main" fontWeight={600}>
              -{formatCurrency(discount)}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" color="text.secondary">
            Shipping
          </Typography>
          <Typography
            variant="body1"
            fontWeight={600}
            color={shippingCost === 0 ? 'success.main' : 'text.primary'}
          >
            {shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      {/* Promo Code */}
      <Box sx={{ mb: 2 }}>
        <Box
          onClick={() => setPromoExpanded(!promoExpanded)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            py: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Have a promo code?
          </Typography>
          <IconButton size="small">
            <ExpandMore
              sx={{
                transform: promoExpanded ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s',
              }}
            />
          </IconButton>
        </Box>
        <Collapse in={promoExpanded}>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <TextField
              size="small"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoApplied}
              sx={{ flex: 1 }}
            />
            <Button
              variant="outlined"
              onClick={handleApplyPromo}
              disabled={promoApplied || !promoCode}
            >
              {promoApplied ? 'Applied!' : 'Apply'}
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Try: HOOD10 for 10% off
          </Typography>
        </Collapse>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      {/* Total */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>Total</Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Bebas Neue", sans-serif',
          }}
        >
          {formatCurrency(total)}
        </Typography>
      </Box>

      {/* Checkout Button */}
      <Button
        variant="contained"
        fullWidth
        size="medium"
        onClick={() => navigate('/checkout')}
        sx={{
          py: 1.5,
          mb: 1.5,
        }}
      >
        Proceed to Checkout
      </Button>

      <Button
        variant="outlined"
        fullWidth
        onClick={() => navigate('/products')}
      >
        Continue Shopping
      </Button>

      {/* Trust Badges */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          mt: 2,
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <LocalShipping sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Box>
            <Typography variant="body2" fontWeight={600}>
              Free Shipping
            </Typography>
            <Typography variant="caption" color="text.secondary">
              On orders over Rs. 10,000
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Security sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Box>
            <Typography variant="body2" fontWeight={600}>
              Secure Payment
            </Typography>
            <Typography variant="caption" color="text.secondary">
              256-bit SSL encryption
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Replay sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Box>
            <Typography variant="body2" fontWeight={600}>
              Easy Returns
            </Typography>
            <Typography variant="caption" color="text.secondary">
              30-day return policy
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartSummary;