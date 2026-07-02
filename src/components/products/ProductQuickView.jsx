import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Rating,
  Grid,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Close,
  Add,
  Remove,
  FavoriteBorder,
  Favorite,
  LocalShipping,
  Verified,
  ShoppingBag,
} from '@mui/icons-material';
import { closeQuickView, selectSelectedProduct, selectQuickViewOpen } from '../../store/slices/productsSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { showSnackbar } from '../../store/slices/uiSlice';
import { formatCurrency, calculateDiscount } from '../../utils/formatCurrency';

const ProductQuickView = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectQuickViewOpen);
  const product = useSelector(selectSelectedProduct);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? calculateDiscount(product.originalPrice, product.price) : 0;

  const handleClose = () => {
    dispatch(closeQuickView());
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    setSelectedImage(0);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      dispatch(showSnackbar({
        message: 'Please select size and color',
        severity: 'warning',
      }));
      return;
    }

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    }));

    dispatch(showSnackbar({
      message: `${product.name} added to cart!`,
      severity: 'success',
    }));

    handleClose();
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(prev + 1, 10));
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const getColorValue = (colorName) => {
    const colorMap = {
      'White': '#FFFFFF',
      'Black': '#1a1a1a',
      'Gray': '#6b7280',
      'Navy': '#1e3a5f',
      'Electric Blue': '#0066FF',
      'Red': '#dc2626',
      'Olive': '#4d7c0f',
      'Beige': '#d4c4a8',
      'Brown': '#78350f',
    };
    return colorMap[colorName] || '#1a1a1a';
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Zoom}
      transitionDuration={300}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          maxHeight: '90vh',
          m: { xs: 1, md: 2 },
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 12,
          top: 12,
          zIndex: 10,
          bgcolor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          '&:hover': {
            bgcolor: 'white',
            transform: 'rotate(90deg)',
          },
        }}
      >
        <Close />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        <Grid container sx={{ minHeight: { md: 480 } }}>
          {/* Images Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: '100%',
                bgcolor: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                p: { xs: 2, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Main Image */}
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  mb: 2,
                }}
              >
                {/* Discount Badge */}
                {hasDiscount && (
                  <Chip
                    label={`${discountPercent}% OFF`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      zIndex: 2,
                      bgcolor: '#dc2626',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      height: 24,
                    }}
                  />
                )}
                {product.isNew && (
                  <Chip
                    label="NEW"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 2,
                      bgcolor: '#0066FF',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      height: 24,
                    }}
                  />
                )}
                <Fade in={true} timeout={400}>
                  <Box
                    component="img"
                    src={product.images?.[selectedImage] || product.images?.[0]}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      height: { xs: 280, md: 320 },
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                </Fade>
              </Box>

              {/* Thumbnails */}
              {product.images?.length > 1 && (
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  {product.images.slice(0, 4).map((image, index) => (
                    <Box
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: '3px solid',
                        borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                        boxShadow: selectedImage === index 
                          ? '0 0 0 2px rgba(0,102,255,0.3)'
                          : '0 2px 8px rgba(0,0,0,0.08)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: { xs: 2.5, md: 3 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Category */}
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  fontSize: '0.7rem',
                }}
              >
                {product.category}
              </Typography>

              {/* Name */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mt: 0.5,
                  mb: 1,
                  color: '#1a1a1a',
                  lineHeight: 1.2,
                }}
              >
                {product.name}
              </Typography>

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating 
                  value={product.rating} 
                  precision={0.1} 
                  readOnly 
                  size="small"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#fbbf24',
                    },
                  }}
                />
                <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                  {product.rating} ({product.reviews} reviews)
                </Typography>
              </Box>

              {/* Price */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: hasDiscount ? '#dc2626' : '#1a1a1a',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {formatCurrency(product.price)}
                </Typography>
                {hasDiscount && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#94a3b8',
                      textDecoration: 'line-through',
                      fontWeight: 500,
                    }}
                  >
                    {formatCurrency(product.originalPrice)}
                  </Typography>
                )}
              </Box>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  mb: 2.5,
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {product.description}
              </Typography>

              {/* Size Selection */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}
                >
                  Size {selectedSize && <span style={{ color: '#0066FF' }}>— {selectedSize}</span>}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                  {product.sizes?.map((size) => (
                    <Box
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      sx={{
                        minWidth: 42,
                        height: 36,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 1,
                        border: '2px solid',
                        borderColor: selectedSize === size ? '#0066FF' : '#e2e8f0',
                        bgcolor: selectedSize === size ? '#0066FF' : 'white',
                        color: selectedSize === size ? 'white' : '#334155',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#0066FF',
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      {size}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Color Selection */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 600, color: '#334155', fontSize: '0.85rem' }}
                >
                  Color {selectedColor && <span style={{ color: '#0066FF' }}>— {selectedColor}</span>}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {product.colors?.map((color) => (
                    <Box
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: getColorValue(color),
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedColor === color 
                          ? `0 0 0 3px white, 0 0 0 5px #0066FF`
                          : '0 2px 4px rgba(0,0,0,0.1)',
                        border: color === 'White' ? '1px solid #e2e8f0' : 'none',
                        '&:hover': {
                          transform: 'scale(1.15)',
                        },
                        '&::after': selectedColor === color ? {
                          content: '"✓"',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          color: color === 'White' || color === 'Beige' ? '#1a1a1a' : 'white',
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                        } : {},
                      }}
                      title={color}
                    />
                  ))}
                </Box>
              </Box>

              {/* Quantity & Actions */}
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 2 }}>
                {/* Quantity */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '2px solid #e2e8f0',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={decrementQuantity}
                    sx={{
                      borderRadius: 0,
                      px: 1,
                      '&:hover': { bgcolor: '#f1f5f9' },
                    }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography
                    sx={{
                      minWidth: 36,
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                    }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={incrementQuantity}
                    sx={{
                      borderRadius: 0,
                      px: 1,
                      '&:hover': { bgcolor: '#f1f5f9' },
                    }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>

                {/* Add to Cart */}
                <Button
                  variant="contained"
                  onClick={handleAddToCart}
                  startIcon={<ShoppingBag />}
                  sx={{
                    flex: 1,
                    py: 1.25,
                    px: 3,
                    borderRadius: 2,
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textTransform: 'none',
                    bgcolor: '#1a1a1a',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: '#0066FF',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0,102,255,0.4)',
                    },
                  }}
                >
                  Add to Cart — {formatCurrency(product.price * quantity)}
                </Button>

                {/* Wishlist */}
                <IconButton
                  onClick={() => setIsFavorite(!isFavorite)}
                  sx={{
                    border: '2px solid #e2e8f0',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    color: isFavorite ? '#dc2626' : '#64748b',
                    '&:hover': {
                      borderColor: '#dc2626',
                      bgcolor: '#fef2f2',
                    },
                  }}
                >
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Box>

              {/* Features */}
              <Box
                sx={{
                  mt: 'auto',
                  pt: 2,
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  gap: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShipping sx={{ color: '#0066FF', fontSize: 20 }} />
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                    Free shipping over Rs. 10,000
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Verified sx={{ color: '#10b981', fontSize: 20 }} />
                  <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>
                    Authentic Product
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
