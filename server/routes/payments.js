const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { auth } = require('../middleware/auth');
const Order = require('../models/Order');

const router = express.Router();

// @route   POST /api/payments/create-payment-intent
// @desc    Create payment intent for Stripe
// @access  Private
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        userId: req.user.id,
        items: JSON.stringify(items),
        shippingAddress: JSON.stringify(shippingAddress)
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ message: 'Failed to create payment intent' });
  }
});

// @route   POST /api/payments/confirm-payment
// @desc    Confirm payment and create order
// @access  Private
router.post('/confirm-payment', auth, async (req, res) => {
  try {
    const { paymentIntentId, items, shippingAddress, totalAmount } = req.body;

    // Verify payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    // Create order
    const order = new Order({
      user: req.user.id,
      items: items.map(item => ({
        product: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      shippingAddress,
      paymentInfo: {
        id: paymentIntentId,
        status: paymentIntent.status,
        amount: totalAmount
      },
      totalAmount,
      status: 'processing'
    });

    await order.save();

    res.json({
      message: 'Payment confirmed and order created',
      orderId: order._id
    });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({ message: 'Failed to confirm payment' });
  }
});

// @route   POST /api/payments/webhook
// @desc    Handle Stripe webhooks
// @access  Public
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent.id);
      // Update order status if needed
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('PaymentIntent failed!', failedPayment.id);
      // Handle failed payment
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
