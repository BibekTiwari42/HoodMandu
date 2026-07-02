import { Grid, Box, Typography, Button } from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { useProducts } from '../../hooks/useProducts';

const ProductGrid = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          gap: 2,
        }}
      >
        <Typography variant="h6" color="error">
          Error loading products
        </Typography>
        <Button variant="outlined" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Box>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          gap: 3,
          py: 8,
        }}
      >
        <SentimentDissatisfied sx={{ fontSize: 80, color: 'grey.300' }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            No Products Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your filters or search criteria
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* Results Count */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Showing{' '}
          <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {products.length}
          </Box>{' '}
          products
        </Typography>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {products.map((product, index) => (
          <Grid
            item
            xs={6}
            sm={6}
            md={4}
            lg={4}
            key={product.id}
            sx={{
              animation: 'fadeInUp 0.5s ease-out',
              animationDelay: `${index * 0.05}s`,
              animationFillMode: 'both',
              '@keyframes fadeInUp': {
                from: {
                  opacity: 0,
                  transform: 'translateY(20px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;