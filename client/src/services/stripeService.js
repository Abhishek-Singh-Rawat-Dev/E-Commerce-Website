import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Create payment intent
export const createPaymentIntent = async (items, shippingAddress) => {
  try {
    const response = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ items, shippingAddress })
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Confirm payment
export const confirmPayment = async (paymentIntentId, items, shippingAddress, totalAmount) => {
  try {
    const response = await fetch('/api/payments/confirm-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        paymentIntentId,
        items,
        shippingAddress,
        totalAmount
      })
    });

    if (!response.ok) {
      throw new Error('Failed to confirm payment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
};

// Process payment with Stripe
export const processPayment = async (items, shippingAddress) => {
  try {
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    // Create payment intent
    const { clientSecret, paymentIntentId } = await createPaymentIntent(items, shippingAddress);

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Confirm payment with Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          // Card details will be collected by Stripe Elements
        }
      }
    });

    if (error) {
      throw new Error(error.message);
    }

    if (paymentIntent.status === 'succeeded') {
      // Confirm payment on backend
      const result = await confirmPayment(paymentIntentId, items, shippingAddress, totalAmount);
      return result;
    } else {
      throw new Error('Payment was not successful');
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
};

export default stripePromise;
