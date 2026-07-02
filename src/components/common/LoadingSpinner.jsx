import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ 
  fullScreen = false, 
  size = 40, 
  message = 'Loading...',
  showMessage = true 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: fullScreen ? '100vh' : 400,
        gap: 3,
      }}
    >
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          size={size}
          thickness={2}
          sx={{
            color: 'primary.main',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size * 0.6,
            height: size * 0.6,
            bgcolor: 'black',
          }}
        />
      </Box>
      {showMessage && (
        <Typography
          variant="subtitle2"
          sx={{
            color: 'text.secondary',
            letterSpacing: '0.1em',
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;