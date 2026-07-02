import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Toolbar,
} from '@mui/material';
import { ArrowForward, PlayArrow } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { TEAM_MEMBERS, BRAND_VALUES } from '../utils/constants';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          color: 'white',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  mb: 2,
                  display: 'block',
                }}
              >
                Our Story
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  fontFamily: '"Bebas Neue", sans-serif',
                  lineHeight: 1,
                  mb: 3,
                }}
              >
                REDEFINING
                <Box
                  component="span"
                  sx={{ display: 'block', color: 'primary.main' }}
                >
                  STREETWEAR
                </Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'grey.400',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  maxWidth: 500,
                  mb: 4,
                }}
              >
                Born in the heart of Kathmandu, HoodMandu bridges the gap between 
                traditional craftsmanship and contemporary urban fashion. We're not 
                just a clothing brand – we're a movement that celebrates individuality 
                and self-expression.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate('/products')}
                >
                  Shop Collection
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  Watch Story
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  bgcolor: 'grey.800',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600"
                  alt="About HoodMandu"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    p: 3,
                  }}
                >
                  <Typography variant="h4" sx={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                    EST. 2020
                  </Typography>
                  <Typography variant="body2">Kathmandu, Nepal</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {[
              { value: '50K+', label: 'Happy Customers' },
              { value: '120+', label: 'Unique Designs' },
              { value: '15+', label: 'Countries Shipped' },
              { value: '100%', label: 'Sustainable Materials' },
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      color: 'primary.main',
                      fontSize: { xs: '2.5rem', md: '4rem' },
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Brand Values */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
              }}
            >
              What We Stand For
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Our core values guide everything we do, from design to delivery.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {BRAND_VALUES.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 4,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: 'grey.100',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      fontSize: '2rem',
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 700 }}
                  >
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 2,
              }}
            >
              Meet The Team
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              The creative minds behind HoodMandu.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {TEAM_MEMBERS.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover img': {
                      transform: 'scale(1.05)',
                    },
                    '&:hover .overlay': {
                      opacity: 1,
                    },
                  }}
                >
                  <Box
                    sx={{
                      aspectRatio: '3/4',
                      bgcolor: 'grey.200',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                      }}
                    />
                  </Box>
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(0,0,0,0.8)',
                      p: 3,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <Typography variant="body2" color="grey.400">
                      {member.bio}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ pt: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 10, md: 16 },
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: { xs: '2.5rem', md: '4rem' },
              mb: 3,
            }}
          >
            Join The Movement
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Be part of the HoodMandu community. Get exclusive access to new drops, 
            special offers, and behind-the-scenes content.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              px: 6,
              py: 2,
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            Explore Collection
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;