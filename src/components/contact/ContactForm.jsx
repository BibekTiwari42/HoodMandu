import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { submitContactForm } from '../../api/contactApi';
import { contactSchema } from '../../validation/contactSchema';
import { showSnackbar } from '../../store/slices/uiSlice';

const subjects = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'order', label: 'Order Status' },
  { value: 'returns', label: 'Returns & Exchanges' },
  { value: 'wholesale', label: 'Wholesale Inquiry' },
  { value: 'press', label: 'Press & Media' },
  { value: 'other', label: 'Other' },
];

const ContactForm = () => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(contactSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      dispatch(
        showSnackbar({
          message: 'Message sent successfully! We\'ll get back to you soon.',
          severity: 'success',
        })
      );
      reset();
    },
    onError: (error) => {
      dispatch(
        showSnackbar({
          message: error.message || 'Error sending message. Please try again.',
          severity: 'error',
        })
      );
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {mutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {mutation.error?.message || 'Something went wrong. Please try again.'}
        </Alert>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
        }}
      >
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              placeholder="John Doe"
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              required
              InputProps={{
                sx: { bgcolor: 'background.paper' },
              }}
            />
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email Address"
              placeholder="john@example.com"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              required
              InputProps={{
                sx: { bgcolor: 'background.paper' },
              }}
            />
          )}
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 3,
        }}
      >
        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
              InputProps={{
                sx: { bgcolor: 'background.paper' },
              }}
            />
          )}
        />

        {/* Subject */}
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Subject"
              error={!!errors.subject}
              helperText={errors.subject?.message}
              fullWidth
              required
              InputProps={{
                sx: { bgcolor: 'background.paper' },
              }}
            >
              <MenuItem value="" disabled>
                Select a subject
              </MenuItem>
              {subjects.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      {/* Message */}
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Message"
            placeholder="Tell us how we can help..."
            multiline
            rows={6}
            error={!!errors.message}
            helperText={errors.message?.message || `${field.value.length}/1000`}
            fullWidth
            required
            InputProps={{
              sx: { bgcolor: 'background.paper' },
            }}
          />
        )}
      />

      {/* Submit Button */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={mutation.isPending || !isValid}
          endIcon={
            mutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Send />
            )
          }
          sx={{
            py: 2,
            alignSelf: { xs: 'stretch', sm: 'flex-start' },
            px: 6,
          }}
        >
          {mutation.isPending ? 'Sending...' : 'Send Message'}
        </Button>

        <Typography variant="caption" color="text.secondary">
          We typically respond within 24-48 hours during business days.
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactForm;