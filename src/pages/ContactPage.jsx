import {
  Box,
  Container,
  Typography,
  Grid,
  Toolbar,
} from '@mui/material';
import {
  LocationOn,
  Email,
  Phone,
  AccessTime,
} from '@mui/icons-material';
import ContactForm from '../components/contact/ContactForm';
import { CONTACT_INFO, SOCIAL_LINKS } from '../utils/constants';

const ContactPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          color: 'white',
          py: { xs: 5, md: 8 },
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              fontFamily: '"Bebas Neue", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            GET IN TOUCH
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'grey.400',
              maxWidth: 500,
              mt: 2,
            }}
          >
            Have questions about our products, orders, or collaborations? 
            We'd love to hear from you.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 6, md: 10 }}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  mb: 1,
                }}
              >
                Send Us a Message
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Fill out the form below and we'll get back to you as soon as possible.
              </Typography>
              <ContactForm />
            </Box>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                bgcolor: 'grey.50',
                p: { xs: 4, md: 5 },
                height: '100%',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  mb: 4,
                }}
              >
                Contact Info
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Address */}
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <LocationOn sx={{ color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Visit Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {CONTACT_INFO.address.street}<br />
                      {CONTACT_INFO.address.city}, {CONTACT_INFO.address.country}
                    </Typography>
                  </Box>
                </Box>

                {/* Email */}
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Email sx={{ color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Email Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      General: {CONTACT_INFO.email.general}<br />
                      Support: {CONTACT_INFO.email.support}
                    </Typography>
                  </Box>
                </Box>

                {/* Phone */}
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Phone sx={{ color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Call Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {CONTACT_INFO.phone.main}<br />
                      {CONTACT_INFO.phone.whatsapp} (WhatsApp)
                    </Typography>
                  </Box>
                </Box>

                {/* Hours */}
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <AccessTime sx={{ color: 'white' }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Business Hours
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {CONTACT_INFO.hours.weekdays}<br />
                      {CONTACT_INFO.hours.weekend}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Social Links */}
              <Box sx={{ mt: 6 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {SOCIAL_LINKS.map((social, index) => (
                    <Box
                      key={index}
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        width: 44,
                        height: 44,
                        border: '1px solid',
                        borderColor: 'grey.300',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'text.primary',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          bgcolor: 'primary.main',
                          color: 'white',
                        },
                      }}
                    >
                      <social.icon sx={{ fontSize: 20 }} />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Box
        sx={{
          height: { xs: 300, md: 400 },
          bgcolor: 'grey.200',
          position: 'relative',
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2651513789897!2d85.32400031506096!3d27.717245982788695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19064c940bb7%3A0x4a7e6c3a38e8b5f9!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1647881234567!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="HoodMandu Location"
        />
      </Box>

      {/* FAQ Teaser */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'secondary.main', color: 'white' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              mb: 2,
            }}
          >
            Need Quick Answers?
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400', mb: 4 }}>
            Check out our FAQ section for answers to common questions about orders, 
            shipping, returns, and more.
          </Typography>
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: 'transparent',
              border: '2px solid white',
              px: 4,
              py: 2,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'white',
                color: 'secondary.main',
              },
            }}
          >
            <Typography variant="button" sx={{ fontWeight: 600 }}>
              View FAQs
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ContactPage;