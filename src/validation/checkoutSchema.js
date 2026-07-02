import * as yup from 'yup';

export const checkoutSchema = yup.object().shape({
  // Contact Information
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      'Please enter a valid phone number'
    ),

  // Shipping Address
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  
  address: yup
    .string()
    .required('Address is required')
    .min(5, 'Please enter a valid address'),
  
  city: yup
    .string()
    .required('City is required'),
  
  state: yup
    .string()
    .required('State/Province is required'),
  
  postalCode: yup
    .string()
    .required('Postal code is required'),
  
  country: yup
    .string()
    .required('Country is required'),

  // Payment Method
  paymentMethod: yup
    .string()
    .required('Please select a payment method')
    .oneOf(['cod', 'esewa', 'khalti', 'bank'], 'Invalid payment method'),

  // Additional
  notes: yup.string().max(500, 'Notes cannot exceed 500 characters'),
});

export default checkoutSchema;
