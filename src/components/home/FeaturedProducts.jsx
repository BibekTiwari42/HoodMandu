import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useFeaturedProducts } from '../../hooks/useProducts';
import ProductCard from '../products/ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useFeaturedProducts(8);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return null;
  }

  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: 'background.default',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            mb: { xs: 6, md: 8 },
            gap: 3,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                display: 'block',
                mb: 1,
              }}
            >
              Curated Selection
            </Typography>
            <Typography variant="h2">
              Featured
              <Box component="span" sx={{ color: 'primary.main', ml: 2 }}>
                Pieces
              </Box>
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/products"
            variant="outlined"
            color="secondary"
            endIcon={<ArrowForward />}
            sx={{ minWidth: 180 }}
          >
            View All
          </Button>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {products?.map((product, index) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              sx={{
                animation: 'fadeInUp 0.6s ease-out',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
                '@keyframes fadeInUp': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(30px)',
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
      </Container>
    </Box>
  );
};

export default FeaturedProducts;