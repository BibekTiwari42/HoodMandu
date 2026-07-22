import emailjs from '@emailjs/browser';

// EmailJS Configuration
// To set up:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add Gmail as a service (use hoodmandu@gmail.com)
// 3. Create a new email template with the template below
// 4. Copy  Service ID, Template ID, and Public Key here

const EMAILJS_SERVICE_ID = 'service_fr7a2mh';
const EMAILJS_TEMPLATE_ID = 'template_7xhuas8'; 
const EMAILJS_PUBLIC_KEY = 'vLawSjbETVW_uRouy'; 

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Send order confirmation email to customer
 * @param {Object} orderData - Order details
 * @param {string} orderData.customerEmail - Customer's email
 * @param {string} orderData.customerName - Customer's name
 * @param {string} orderData.orderNumber - Order ID
 * @param {number} orderData.totalAmount - Total order amount
 * @param {Array} orderData.items - Order items
 * @param {string} orderData.paymentMethod - Payment method used
 */
export const sendOrderConfirmationEmail = async (orderData) => {
  const {
    customerEmail,
    customerName,
    orderNumber,
    totalAmount,
    items = [],
    paymentMethod = 'eSewa',
    shippingAddress = {},
  } = orderData;

  // Format items for email
  const itemsList = items
    .map(
      (item) =>
        `• ${item.name} (${item.size}, ${item.color}) x${item.quantity} - Rs. ${item.price * item.quantity}`
    )
    .join('\n');

  // Format items as HTML for the template
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 16px 0; border-bottom: 1px solid #e5e7eb;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="width: 70px; vertical-align: top;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 70px; object-fit: cover; border-radius: 4px; border: 1px solid #e5e7eb;">
              </td>
              <td style="vertical-align: top; padding-left: 12px;">
                <p style="margin: 0; font-weight: 600; color: #0a0a0a; font-size: 14px;">${item.name}</p>
                <p style="margin: 4px 0 0; font-size: 12px; color: #666666;">Size: ${item.size} | Color: ${item.color}</p>
                <p style="margin: 4px 0 0; font-size: 12px; color: #666666;">Qty: ${item.quantity}</p>
              </td>
              <td style="vertical-align: top; text-align: right; padding-left: 12px;">
                <p style="margin: 0; font-weight: 600; color: #0a0a0a; font-size: 14px;">Rs. ${(item.price * item.quantity).toLocaleString()}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
    )
    .join('');

  const templateParams = {
    toEmail: customerEmail,
    toName: customerName || 'Valued Customer',
    orderNumber: orderNumber,
    totalAmount: totalAmount.toLocaleString(),
    itemsList: itemsList,
    itemsHtml: itemsHtml,
    paymentMethod: paymentMethod,
    orderDate: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    shippingAddress: shippingAddress.address || 'Will be confirmed',
    shippingCity: shippingAddress.city || '',
    estimatedDelivery: getEstimatedDelivery(),
  };

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    console.log('Order confirmation email sent:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    // Throw error so caller knows it failed
    throw error;
  }
};

// /**
//  * Test email sending - use this to debug
//  * Call from browser console: testEmail('your@email.com')
//  */
// export const testEmail = async (email) => {
//   const testParams = {
//     toEmail: email,
//     toName: 'Test Customer',
//     orderNumber: 'TEST123',
//     totalAmount: '5,000',
//     itemsList: '• Test Product x1 - Rs. 5,000',
//     itemsHtml: '<tr><td style="padding:12px 0;">Test Product - Rs. 5,000</td></tr>',
//     paymentMethod: 'Test Payment',
//     orderDate: new Date().toLocaleDateString(),
//     shippingAddress: 'Test Address',
//     shippingCity: 'Kathmandu',
//     estimatedDelivery: 'Feb 20 - Feb 22',
//   };

//   try {
//     const response = await emailjs.send(
//       EMAILJS_SERVICE_ID,
//       EMAILJS_TEMPLATE_ID,
//       testParams
//     );
//     console.log('Test email sent successfully!', response);
//     return response;
//   } catch (error) {
//     console.error('Test email failed:', error);
//     throw error;
//   }
// };

// // Make testEmail available globally for debugging
// if (typeof window !== 'undefined') {
//   window.testHoodManduEmail = testEmail;
// }
//     return { success: false, error };
//   }
// };

// /**
//  * Get estimated delivery date (3-5 business days)
//  */
// const getEstimatedDelivery = () => {
//   const today = new Date();
//   const minDays = 3;
//   const maxDays = 5;
  
//   const minDate = new Date(today);
//   const maxDate = new Date(today);
  
//   // Add business days
//   let addedDays = 0;
//   while (addedDays < minDays) {
//     minDate.setDate(minDate.getDate() + 1);
//     if (minDate.getDay() !== 0 && minDate.getDay() !== 6) addedDays++;
//   }
  
//   addedDays = 0;
//   while (addedDays < maxDays) {
//     maxDate.setDate(maxDate.getDate() + 1);
//     if (maxDate.getDay() !== 0 && maxDate.getDay() !== 6) addedDays++;
//   }

//   const formatDate = (date) =>
//     date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

//   return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
// };

/**
 * Get the clean HTML email template
 * Use this template in EmailJS dashboard
 * Brand Colors: Electric Blue (#0066FF), Black (#000000), White
 */
export const getEmailTemplate = () => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed - HoodMandu</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #000000; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: 3px; text-transform: uppercase;">
                HOODMANDU
              </h1>
              <p style="margin: 8px 0 0; color: #999999; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">
                Streetwear That Speaks
              </p>
            </td>
          </tr>

          <!-- Success Banner -->
          <tr>
            <td style="background-color: #0066FF; padding: 24px 40px; text-align: center;">
              <table cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td style="width: 24px; height: 24px; background-color: #ffffff; border-radius: 50%; text-align: center; vertical-align: middle;">
                    <span style="color: #0066FF; font-size: 14px; font-weight: bold; line-height: 24px;">&#10003;</span>
                  </td>
                  <td style="padding-left: 12px;">
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">
                      Order Confirmed
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 40px 40px 24px; text-align: center;">
              <h2 style="margin: 0; font-size: 24px; color: #0a0a0a; font-weight: 600;">
                Thank you, {{to_name}}
              </h2>
              <p style="margin: 12px 0 0; font-size: 15px; color: #666666; line-height: 1.6;">
                Your order has been received and is being processed.<br>
                We will notify you once it ships.
              </p>
            </td>
          </tr>

          <!-- Order Details Box -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 6px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width: 50%; vertical-align: top;">
                          <p style="margin: 0 0 4px; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">
                            Order Number
                          </p>
                          <p style="margin: 0; font-size: 18px; color: #0066FF; font-weight: 700;">
                            #{{order_number}}
                          </p>
                        </td>
                        <td style="width: 50%; vertical-align: top; text-align: right;">
                          <p style="margin: 0 0 4px; font-size: 11px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">
                            Order Date
                          </p>
                          <p style="margin: 0; font-size: 14px; color: #0a0a0a; font-weight: 500;">
                            {{order_date}}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Items Section -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <p style="margin: 0 0 16px; font-size: 14px; color: #0a0a0a; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                Order Items
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                {{items_html}}
              </table>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; border-radius: 6px;">
                <tr>
                  <td style="padding: 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="color: #999999; font-size: 13px;">Payment Method</td>
                              <td style="color: #ffffff; font-size: 13px; text-align: right; font-weight: 500;">{{payment_method}}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-top: 1px solid #333333;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="color: #ffffff; font-size: 16px; font-weight: 600;">Total</td>
                              <td style="color: #0066FF; font-size: 22px; text-align: right; font-weight: 700;">Rs. {{total_amount}}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Delivery Info -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-left: 3px solid #0066FF; background-color: #f8f9fa;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px; font-size: 14px; color: #0a0a0a; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      Delivery Information
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 8px;">
                          <span style="color: #666666; font-size: 13px;">Estimated Delivery:</span>
                          <span style="color: #0a0a0a; font-size: 13px; font-weight: 500; margin-left: 8px;">{{estimated_delivery}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="color: #666666; font-size: 13px;">Shipping To:</span>
                          <span style="color: #0a0a0a; font-size: 13px; font-weight: 500; margin-left: 8px;">{{shipping_address}} {{shipping_city}}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 0 40px 40px; text-align: center;">
              <a href="https://hoodmandu.com/orders" style="display: inline-block; background-color: #0066FF; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 4px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                Track Your Order
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0;">
            </td>
          </tr>

          <!-- Help Section -->
          <tr>
            <td style="padding: 32px 40px; text-align: center;">
              <p style="margin: 0 0 8px; color: #666666; font-size: 14px;">
                Need help with your order?
              </p>
              <a href="mailto:hoodmandu@gmail.com" style="color: #0066FF; text-decoration: none; font-size: 14px; font-weight: 500;">
                hoodmandu@gmail.com
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #000000; padding: 24px 40px; text-align: center;">
              <p style="margin: 0 0 12px; color: #ffffff; font-size: 14px; font-weight: 600; letter-spacing: 2px;">
                HOODMANDU
              </p>
              <table cellpadding="0" cellspacing="0" align="center" style="margin-bottom: 16px;">
                <tr>
                  <td style="padding: 0 12px;">
                    <a href="https://instagram.com/hoodmandu" style="color: #999999; text-decoration: none; font-size: 12px;">Instagram</a>
                  </td>
                  <td style="color: #333333;">|</td>
                  <td style="padding: 0 12px;">
                    <a href="https://facebook.com/hoodmandu" style="color: #999999; text-decoration: none; font-size: 12px;">Facebook</a>
                  </td>
                  <td style="color: #333333;">|</td>
                  <td style="padding: 0 12px;">
                    <a href="https://tiktok.com/@hoodmandu" style="color: #999999; text-decoration: none; font-size: 12px;">TikTok</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 0; color: #666666; font-size: 11px;">
                © 2026 HoodMandu. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export default {
  sendOrderConfirmationEmail,
  getEmailTemplate,
};
