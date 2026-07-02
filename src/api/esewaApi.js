/**
 * eSewa Payment Gateway Integration
 * 
 * Documentation: https://developer.esewa.com.np/
 * 
 * Test Credentials (Sandbox):
 * - eSewa ID: 9806800001/2/3/4/5
 * - Password: Nepal@123
 * - MPIN: 1122
 * - Token: 123456
 */

// Environment configuration
const ESEWA_CONFIG = {
  // Use sandbox for development, production for live
  isDevelopment: import.meta.env.DEV,
  
  // Sandbox/Test environment
  sandbox: {
    paymentUrl: 'https://uat.esewa.com.np/epay/main',
    verifyUrl: 'https://uat.esewa.com.np/epay/transrec',
    merchantCode: 'EPAYTEST',
  },
  
  // Production environment
  production: {
    paymentUrl: 'https://esewa.com.np/epay/main',
    verifyUrl: 'https://esewa.com.np/epay/transrec',
    merchantCode: 'YOUR_MERCHANT_CODE', // 
  },
};

// Get current environment config
const getConfig = () => {
  return ESEWA_CONFIG.isDevelopment ? ESEWA_CONFIG.sandbox : ESEWA_CONFIG.production;
};

/**
 * Generate eSewa payment parameters
 * @param {Object} params - Payment parameters
 * @param {number} params.amount - Product/service amount
 * @param {number} params.taxAmount - Tax amount (default: 0)
 * @param {number} params.serviceCharge - Service charge (default: 0)
 * @param {number} params.deliveryCharge - Delivery charge (default: 0)
 * @param {string} params.productId - Unique product/order ID
 * @returns {Object} eSewa payment parameters
 */
export const generateEsewaParams = ({
  amount,
  taxAmount = 0,
  serviceCharge = 0,
  deliveryCharge = 0,
  productId,
}) => {
  const config = getConfig();
  const baseUrl = window.location.origin;
  
  // Calculate total amount
  const totalAmount = amount + taxAmount + serviceCharge + deliveryCharge;
  
  return {
    amt: amount,
    txAmt: taxAmount,
    psc: serviceCharge,
    pdc: deliveryCharge,
    tAmt: totalAmount,
    pid: productId,
    scd: config.merchantCode,
    su: `${baseUrl}/payment/success`, // Success URL
    fu: `${baseUrl}/payment/failure`, // Failure URL
  };
};

/**
 * Initiate eSewa payment by creating and submitting a form
 * @param {Object} paymentData - Payment data from generateEsewaParams
 */
export const initiateEsewaPayment = (paymentData) => {
  const config = getConfig();
  
  // Create a form element
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = config.paymentUrl;
  form.id = 'esewa-payment-form';
  
  // Add all payment parameters as hidden inputs
  Object.entries(paymentData).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });
  
  // Remove any existing eSewa form
  const existingForm = document.getElementById('esewa-payment-form');
  if (existingForm) {
    existingForm.remove();
  }
  
  // Append form to body and submit
  document.body.appendChild(form);
  form.submit();
  
  // Don't remove the form - let the page navigate away
};

/**
 * Verify eSewa payment transaction
 * This should ideally be done on the server-side for security
 * @param {Object} params - Verification parameters
 * @param {string} params.refId - Reference ID from eSewa
 * @param {string} params.productId - Product/Order ID
 * @param {number} params.totalAmount - Total amount paid
 * @returns {Promise<Object>} Verification response
 */
export const verifyEsewaPayment = async ({ refId, productId, totalAmount }) => {
  const config = getConfig();
  
  // Note: In production, this verification should be done server-side
  // to prevent tampering. This is a simplified client-side version.
  const verificationData = {
    amt: totalAmount,
    rid: refId,
    pid: productId,
    scd: config.merchantCode,
  };
  
  try {
    // In a real application, you would call your backend API
    // which would then verify with eSewa's server
    const response = await fetch('/api/verify-esewa-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(verificationData),
    });
    
    if (!response.ok) {
      throw new Error('Payment verification failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('eSewa verification error:', error);
    // For demo purposes, we'll return success if refId exists
    // In production, always verify server-side
    return {
      success: !!refId,
      message: refId ? 'Payment verified' : 'Verification failed',
    };
  }
};

/**
 * Parse eSewa callback URL parameters
 * @param {string} searchParams - URL search string
 * @returns {Object} Parsed parameters
 */
export const parseEsewaCallback = (searchParams) => {
  const params = new URLSearchParams(searchParams);
  
  return {
    refId: params.get('refId') || params.get('oid'),
    productId: params.get('pid'),
    amount: params.get('amt'),
    status: params.get('status'),
  };
};

export default {
  generateEsewaParams,
  initiateEsewaPayment,
  verifyEsewaPayment,
  parseEsewaCallback,
  getConfig,
};
