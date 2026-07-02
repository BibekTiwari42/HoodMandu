import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import {
  ArrowForward,
} from '@mui/icons-material';
import Logo from './Logo';
import { CONTACT_INFO, SOCIAL_LINKS, NAV_LINKS, CATEGORIES } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.dark',
        color: 'white',
        pt: { xs: 8, md: 12 },
        pb: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Newsletter Section */}
        <Box
          sx={{
            mb: { xs: 6, md: 10 },
            pb: { xs: 6, md: 10 },
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  mb: 2,
                }}
              >
                Join The Movement
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'grey.400', maxWidth: 400 }}
              >
                Subscribe to get exclusive drops, early access, and street culture stories delivered to your inbox.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="form"
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <TextField
                  placeholder="Enter your email"
                  variant="outlined"
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.4)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                    '& input::placeholder': {
                      color: 'grey.500',
                      opacity: 1,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForward />}
                  sx={{
                    minWidth: { xs: '100%', sm: 180 },
                    whiteSpace: 'nowrap',
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Main Footer Content */}
        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Logo variant="light" />
            </Box>
            <Typography
              variant="body2"
              sx={{ color: 'grey.400', mb: 4, maxWidth: 300, lineHeight: 1.8 }}
            >
              Urban streetwear brand born in the heart of Kathmandu. We blend raw street culture with premium craftsmanship.
            </Typography>
            <Stack direction="row" spacing={1}>
              {SOCIAL_LINKS.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  target="_blank"
                  sx={{
                    color: 'grey.400',
                    border: '1px solid rgba(255,255,255,0.1)',
                    '&:hover': {
                      color: 'white',
                      bgcolor: 'primary.main',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="subtitle2"
              sx={{ color: 'white', mb: 3, fontWeight: 700 }}
            >
              Quick Links
            </Typography>
            <Stack spacing={2}>
              {NAV_LINKS.map((link) => (
                <Box
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: 'grey.400',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      pl: 1,
                    },
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Categories */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="subtitle2"
              sx={{ color: 'white', mb: 3, fontWeight: 700 }}
            >
              Categories
            </Typography>
            <Stack spacing={2}>
              {CATEGORIES.slice(1, 6).map((cat) => (
                <Box
                  key={cat.id}
                  component={Link}
                  to={`/products?category=${cat.slug}`}
                  sx={{
                    color: 'grey.400',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      pl: 1,
                    },
                  }}
                >
                  {cat.name}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={4} md={4}>
            <Typography
              variant="subtitle2"
              sx={{ color: 'white', mb: 3, fontWeight: 700 }}
            >
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                {CONTACT_INFO.address.street}, {CONTACT_INFO.address.city}, {CONTACT_INFO.address.country}
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                {CONTACT_INFO.email.general}
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                {CONTACT_INFO.phone.main}
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                {CONTACT_INFO.hours.weekdays}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 6 }} />
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'grey.500' }}>
            © {currentYear} HoodMandu. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Box
              component={Link}
              to="/privacy"
              sx={{
                color: 'grey.500',
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Privacy Policy
            </Box>
            <Box
              component={Link}
              to="/terms"
              sx={{
                color: 'grey.500',
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Terms of Service
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;