import { Box, Typography } from '@mui/material';

const Logo = ({ variant = 'dark', size = 'medium' }) => {
  const isDark = variant === 'dark';
  
  const sizes = {
    small: { fontSize: '1.25rem', letterSpacing: '0.02em' },
    medium: { fontSize: '1.75rem', letterSpacing: '0.02em' },
    large: { fontSize: '2.5rem', letterSpacing: '0.03em' },
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography
        sx={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontWeight: 400,
          ...sizes[size],
          color: isDark ? 'text.primary' : 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          component="span"
          sx={{
            color: 'primary.main',
          }}
        >
          HOOD
        </Box>
        <Box component="span">MANDU</Box>
      </Typography>
    </Box>
  );
};

export default Logo;