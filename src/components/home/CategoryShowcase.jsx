import { Link } from 'react-router-dom';
import { Box, Container, Typography, Grid } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const categories = [
  {
    id: 'hoodies',
    title: 'Hoodies',
    subtitle: 'Premium Comfort',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
    count: '24 Items',
  },
  {
    id: 'tshirts',
    title: 'T-Shirts',
    subtitle: 'Essential Basics',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    count: '36 Items',
  },
  {
    id: 'jackets',
    title: 'Jackets',
    subtitle: 'Street Ready',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    count: '18 Items',
  },
  {
    id: 'pants',
    title: 'Pants',
    subtitle: 'Urban Utility',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600',
    count: '20 Items',
  },
];

const CategoryShowcase = () => {
  return (
    <Box
      sx={{
        py: { xs: 10, md: 15 },
        bgcolor: '#0A0A0A',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              display: 'block',
              mb: 1,
            }}
          >
            Categories
          </Typography>
          <Typography variant="h2" sx={{ color: 'white' }}>
            Shop By Category
          </Typography>
        </Box>

        {/* Categories Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {categories.map((category, index) => (
            <Grid item xs={6} md={3} key={category.id}>
              <Box
                component={Link}
                to={`/products?category=${category.id}`}
                sx={{
                  display: 'block',
                  position: 'relative',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  aspectRatio: { xs: '3/4', md: '3/4' },
                  '&:hover': {
                    '& .category-image': {
                      transform: 'scale(1.1)',
                    },
                    '& .category-overlay': {
                      bgcolor: 'rgba(0,0,0,0.4)',
                    },
                    '& .category-arrow': {
                      transform: 'translateX(0)',
                      opacity: 1,
                    },
                  },
                }}
              >
                {/* Background Image */}
                <Box
                  className="category-image"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />

                {/* Overlay */}
                <Box
                  className="category-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: 'rgba(0,0,0,0.5)',
                    transition: 'all 0.4s ease',
                  }}
                />

                {/* Content */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 2, md: 3 },
                    color: 'white',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'grey.400',
                      display: 'block',
                      mb: 0.5,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {category.count}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: '"Bebas Neue", sans-serif',
                          fontSize: { xs: '1.5rem', md: '2rem' },
                          letterSpacing: '0.02em',
                          mb: 0.5,
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'grey.400',
                          display: { xs: 'none', sm: 'block' },
                        }}
                      >
                        {category.subtitle}
                      </Typography>
                    </Box>
                    <Box
                      className="category-arrow"
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'primary.main',
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'translateX(20px)',
                        opacity: 0,
                        transition: 'all 0.4s ease',
                      }}
                    >
                      <ArrowForward sx={{ fontSize: 20 }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryShowcase;