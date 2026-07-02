// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Submit contact form
 */
export const submitContactForm = async (formData) => {
  await delay(1000); // Simulate network delay
  
  // Simulate form submission
  console.log('Contact form submitted:', formData);
  
  // Simulate random success/failure for demo
  const success = Math.random() > 0.1; // 90% success rate
  
  if (!success) {
    throw new Error('Failed to submit contact form. Please try again.');
  }
  
  return {
    success: true,
    message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
    ticketId: `HM-${Date.now()}`,
  };
};

/**
 * Subscribe to newsletter
 */
export const subscribeNewsletter = async (email) => {
  await delay(800);
  
  console.log('Newsletter subscription:', email);
  
  return {
    success: true,
    message: 'Successfully subscribed to our newsletter!',
  };
};

/**
 * Fetch FAQ data
 */
export const fetchFAQ = async () => {
  await delay(500);
  
  return [
    {
      id: 1,
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all unworn items with original tags attached. Returns are free for exchanges.',
    },
    {
      id: 2,
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days within Nepal, and 10-15 business days for international orders.',
    },
    {
      id: 3,
      question: 'Do you ship internationally?',
      answer: 'Yes! We ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.',
    },
    {
      id: 4,
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email to monitor your package.',
    },
    {
      id: 5,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, eSewa, Khalti, and bank transfers.',
    },
  ];
};