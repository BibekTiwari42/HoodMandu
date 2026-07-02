import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const HeroBanner = () => {
  return (
    <Box
      sx={{
        minHeight: { xs: '80vh', md: '85vh' },
        bgcolor: 'background.dark',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 50px,
              rgba(255,255,255,0.1) 50px,
              rgba(255,255,255,0.1) 51px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 50px,
              rgba(255,255,255,0.1) 50px,
              rgba(255,255,255,0.1) 51px
            )
          `,
        }}
      />

      {/* Accent Circle */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '-20%',
          transform: 'translateY(-50%)',
          width: { xs: '300px', md: '600px', lg: '800px' },
          height: { xs: '300px', md: '600px', lg: '800px' },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            {/* Overline */}
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                mb: 2,
                display: 'block',
                fontSize: '0.875rem',
              }}
            >
              New Collection 2026
            </Typography>

            {/* Main Heading */}
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                maxWidth: 700,
              }}
            >
              Urban Style
              <Box
                component="span"
                sx={{
                  display: 'block',
                  color: 'primary.main',
                }}
              >
                Redefined
              </Box>
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                color: 'grey.400',
                mb: 5,
                maxWidth: 500,
                fontSize: '1.125rem',
                lineHeight: 1.8,
              }}
            >
              Where Kathmandu street culture meets premium craftsmanship. 
              Bold designs for those who dare to stand out.
            </Typography>

            {/* CTA Button */}
            <Button
              component={Link}
              to="/products"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: 'primary.main',
                px: 5,
                py: 2,
              }}
            >
              Shop Now
            </Button>


          </Grid>

          {/* Hero Image */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 500,
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600"
                alt="HoodMandu Streetwear"
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  filter: 'grayscale(20%)',
                }}
              />
              {/* Floating Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 40,
                  left: -40,
                  bgcolor: 'primary.main',
                  color: 'white',
                  px: 3,
                  py: 2,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  FREE SHIPPING
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  On orders over Rs. 10,000
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Scroll Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'grey.500',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </Typography>
        <Box
          sx={{
            width: 1,
            height: 40,
            bgcolor: 'rgba(255,255,255,0.3)',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              bgcolor: 'primary.main',
              animation: 'scroll 1.5s ease-in-out infinite',
            },
            '@keyframes scroll': {
              '0%': { transform: 'translateY(-100%)' },
              '100%': { transform: 'translateY(200%)' },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default HeroBanner;