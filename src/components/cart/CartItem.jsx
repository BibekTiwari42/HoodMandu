import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import { Close, Add, Remove } from '@mui/icons-material';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
} from '../../store/slices/cartSlice';
import { formatCurrency } from '../../utils/formatCurrency';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.itemKey));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.itemKey));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(item.itemKey));
  };

  const handleQuantityChange = (event) => {
    dispatch(updateQuantity({ itemKey: item.itemKey, quantity: event.target.value }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 1.5, sm: 2 },
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'grey.200',
      }}
    >
      {/* Product Image */}
      <Box
        sx={{
          width: { xs: 80, sm: 100 },
          height: { xs: 100, sm: 130 },
          flexShrink: 0,
          bgcolor: 'grey.100',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Product Details */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header Row */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                mb: 0.5,
              }}
            >
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Size: {item.size} | Color: {item.color}
            </Typography>
          </Box>
          <IconButton
            onClick={handleRemove}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'error.main',
              },
            }}
          >
            <Close sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Price */}
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          {formatCurrency(item.price)}
        </Typography>

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Bottom Row */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
          }}
        >
          {/* Quantity Selector */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={handleDecrement}
              size="small"
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 0,
              }}
            >
              <Remove sx={{ fontSize: 18 }} />
            </IconButton>
            <Select
              value={item.quantity}
              onChange={handleQuantityChange}
              size="small"
              variant="outlined"
              sx={{
                width: 60,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderLeft: 0,
                  borderRight: 0,
                  borderRadius: 0,
                },
                '& .MuiSelect-select': {
                  textAlign: 'center',
                  py: '6px',
                },
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
            <IconButton
              onClick={handleIncrement}
              size="small"
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 0,
              }}
            >
              <Add sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Line Total */}
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.2rem',
            }}
          >
            {formatCurrency(item.price * item.quantity)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItem;