import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  Visibility,
  ShoppingBag,
} from '@mui/icons-material';
import { openQuickView } from '../../store/slices/productsSlice';
import { formatCurrency, calculateDiscount } from '../../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(openQuickView(product));
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        bgcolor: 'transparent',
        boxShadow: 'none',
        border: 'none',
        cursor: 'pointer',
        '&:hover': {
          transform: 'none',
          borderColor: 'transparent',
        },
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'grey.100',
          aspectRatio: '1/1',
        }}
      >
        <CardMedia
          component="img"
          image={product.images?.[0] || product.image}
          alt={product.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* Second Image on Hover */}
        {product.images?.[1] && (
          <CardMedia
            component="img"
            image={product.images[1]}
            alt={product.name}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        )}

        {/* Badges */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {product.isNew && (
            <Chip
              label="NEW"
              size="small"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.65rem',
                height: 24,
              }}
            />
          )}
          {hasDiscount && (
            <Chip
              label={`-${discountPercent}%`}
              size="small"
              sx={{
                bgcolor: 'error.main',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.65rem',
                height: 24,
              }}
            />
          )}
        </Box>

        {/* Favorite Button */}
        <IconButton
          onClick={handleFavorite}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'white',
            width: 36,
            height: 36,
            opacity: isHovered || isFavorite ? 1 : 0,
            transform: isHovered || isFavorite ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'white',
              color: 'error.main',
            },
          }}
        >
          {isFavorite ? (
            <Favorite sx={{ fontSize: 18, color: 'error.main' }} />
          ) : (
            <FavoriteBorder sx={{ fontSize: 18 }} />
          )}
        </IconButton>

        {/* Quick Actions */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            display: 'flex',
            gap: 1,
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease',
          }}
        >
          <Tooltip title="Quick View">
            <IconButton
              onClick={handleQuickView}
              sx={{
                flex: 1,
                bgcolor: 'white',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              <Visibility sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add to Cart">
            <IconButton
              onClick={handleQuickView}
              sx={{
                flex: 1,
                bgcolor: 'secondary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'grey.800',
                },
              }}
            >
              <ShoppingBag sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Product Info */}
      <Box sx={{ pt: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'block',
            mb: 0.5,
            fontSize: '0.65rem',
          }}
        >
          {product.category}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            lineHeight: 1.3,
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '0.875rem',
          }}
        >
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            {formatCurrency(product.price)}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                textDecoration: 'line-through',
              }}
            >
              {formatCurrency(product.originalPrice)}
            </Typography>
          )}
        </Box>

        {/* Color Options */}
        {product.colors && product.colors.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, mt: 1.5 }}>
            {product.colors.slice(0, 4).map((color) => (
              <Box
                key={color}
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: color === 'White' ? '#FFFFFF' : 
                           color === 'Black' ? '#000000' :
                           color === 'Gray' ? '#808080' :
                           color === 'Navy' ? '#1A1A4E' :
                           color === 'Electric Blue' ? '#0066FF' :
                           color === 'Red' ? '#E63946' :
                           color === 'Olive' ? '#556B2F' : '#000',
                  border: '1px solid',
                  borderColor: color === 'White' ? 'grey.300' : 'transparent',
                }}
              />
            ))}
            {product.colors.length > 4 && (
              <Typography variant="caption" sx={{ color: 'text.secondary', ml: 0.5 }}>
                +{product.colors.length - 4}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default ProductCard;