import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginSchema } from '../validation/authSchema';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  selectAuthLoading,
  selectAuthError,
} from '../store/slices/authSlice';
import { showSnackbar } from '../store/slices/uiSlice';
import Logo from '../components/common/Logo';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  
  const [showPassword, setShowPassword] = useState(false);

  // Get redirect path from location state
  const from = location.state?.from?.pathname || '/';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    dispatch(loginStart());

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo: accept any valid email/password combination
    // In production, this would be an actual API call
    try {
      const user = {
        id: Date.now(),
        email: data.email,
        firstName: data.email.split('@')[0],
        lastName: '',
        createdAt: new Date().toISOString(),
      };

      dispatch(loginSuccess(user));
      dispatch(
        showSnackbar({
          message: 'Welcome back!',
          severity: 'success',
        })
      );
      navigate(from, { replace: true });
    } catch (error) {
      dispatch(loginFailure('Invalid email or password'));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default',
      }}
    >
      {/* Left Side - Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, sm: 6, md: 8 },
          py: 3,
        }}
      >
        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
          {/* Logo */}
          <Box sx={{ mb: 3 }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo />
            </Link>
          </Box>

          {/* Header */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              mb: 0.5,
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Sign in to continue to your account
          </Typography>

          {/* Error Alert */}
          {authError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {authError}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  size="small"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ mb: 2 }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 1.5 }}
                />
              )}
            />

            <Box sx={{ textAlign: 'right', mb: 2 }}>
              <Typography
                variant="body2"
                component={Link}
                to="/forgot-password"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{ py: 1, mb: 2 }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          {/* Sign Up Link */}
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Typography
              component={Link}
              to="/signup"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'block' },
          bgcolor: 'secondary.main',
          position: 'relative',
          overflow: 'hidden',
          maxHeight: '100vh',
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
          alt="Fashion"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.7,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            right: 40,
            color: 'white',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Bebas Neue", sans-serif',
              mb: 1,
            }}
          >
            Urban Style Awaits
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Join the HoodMandu community and discover exclusive streetwear collections.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
