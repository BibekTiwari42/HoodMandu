import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { signupSchema } from '../validation/authSchema';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  selectAuthLoading,
  selectAuthError,
} from '../store/slices/authSlice';
import { showSnackbar } from '../store/slices/uiSlice';
import Logo from '../components/common/Logo';

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
    },
  });

  const onSubmit = async (data) => {
    dispatch(loginStart());

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const user = {
        id: Date.now(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        createdAt: new Date().toISOString(),
      };

      dispatch(loginSuccess(user));
      dispatch(
        showSnackbar({
          message: 'Account created successfully! Welcome to HoodMandu.',
          severity: 'success',
        })
      );
      navigate('/');
    } catch (error) {
      dispatch(loginFailure('Failed to create account. Please try again.'));
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
      {/* Left Side - Image */}
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
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800"
          alt="Streetwear"
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
            Join The Movement
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Create an account to get exclusive access to new drops, member-only discounts, and more.
          </Typography>
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, sm: 6, md: 8 },
          py: 2,
          overflow: 'auto',
        }}
      >
        <Box sx={{ maxWidth: 450, width: '100%', mx: 'auto' }}>
          {/* Logo */}
          <Box sx={{ mb: 2 }}>
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
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Join HoodMandu and start shopping
          </Typography>

          {/* Error Alert */}
          {authError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {authError}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      fullWidth
                      size="small"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      fullWidth
                      size="small"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

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
                  sx={{ mt: 1.5 }}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number (Optional)"
                  fullWidth
                  size="small"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  sx={{ mt: 1.5 }}
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
                          size="small"
                        >
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mt: 1.5 }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  size="small"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          size="small"
                        >
                          {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mt: 1.5 }}
                />
              )}
            />

            <Controller
              name="agreeTerms"
              control={control}
              render={({ field }) => (
                <Box sx={{ mt: 1.5 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="caption">
                        I agree to the{' '}
                        <Link to="/terms" style={{ color: '#0066FF' }}>
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" style={{ color: '#0066FF' }}>
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                  />
                  {errors.agreeTerms && (
                    <FormHelperText error>
                      {errors.agreeTerms.message}
                    </FormHelperText>
                  )}
                </Box>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{ py: 1, mt: 2, mb: 2 }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </Box>

          <Divider sx={{ my: 1.5 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          {/* Sign In Link */}
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Typography
              component={Link}
              to="/login"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Sign in
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
