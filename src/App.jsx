import { Box, CssBaseline, Snackbar, Alert } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AppRoutes from './routes/AppRoutes';
import theme from './styles/theme';
import { selectSnackbar, hideSnackbar } from './store/slices/uiSlice';

const App = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(selectSnackbar);

  const handleCloseSnackbar = () => {
    dispatch(hideSnackbar());
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: { xs: '56px', md: '64px' },
          }}
        >
          <AppRoutes />
        </Box>
        <Footer />
      </Box>

      {/* Global Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;