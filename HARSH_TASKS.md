# 👨‍💻 Harsh's Task List - Backend Developer & Payment Integration Specialist

## 🎯 Your Role
**Backend Developer & Payment Integration Specialist**

You are responsible for the payment processing system, order management, and email notification services. Your work ensures customers can complete purchases and receive confirmations.

---

## 📋 Your Responsibilities

### 1. Payment System (40%)

#### Stripe Integration Setup
- [ ] Install and configure Stripe SDK
- [ ] Set up Stripe API keys in environment
- [ ] Create Stripe service utilities
- [ ] Implement webhook handling
- [ ] Test with Stripe test mode

**Files to work on:**
- `server/routes/payments.js`
- `client/src/services/stripeService.js`

#### Payment Routes

**Create these endpoints:**

```javascript
POST /api/payments/create-checkout-session
- Creates Stripe checkout session
- Accepts: orderItems, shippingAddress, totalAmount
- Returns: sessionId and checkoutUrl

POST /api/payments/webhook
- Handles Stripe webhooks
- Verifies webhook signature
- Updates order payment status

GET /api/payments/verify/:sessionId
- Verifies payment completion
- Returns payment details
```

#### Payment Security
- [ ] Validate payment amounts server-side
- [ ] Verify webhook signatures
- [ ] Never expose secret keys to frontend
- [ ] Log all payment transactions
- [ ] Handle payment failures gracefully

---

### 2. Order Management System (40%)

#### Order Routes
- [ ] Create order endpoint
- [ ] Get user orders endpoint
- [ ] Get single order endpoint
- [ ] Update order payment status
- [ ] Update order delivery status (admin)
- [ ] Cancel order endpoint

**File to work on:**
- `server/routes/orders.js`

**Endpoints to create:**

```javascript
POST /api/orders
- Create new order
- Body: { orderItems, shippingAddress, paymentMethod, totalPrice }
- Returns: created order

GET /api/orders
- Get logged-in user's orders
- Supports pagination
- Returns: array of orders

GET /api/orders/:id
- Get single order details
- Returns: order with populated product details

PUT /api/orders/:id/pay
- Update order payment status
- Called after successful payment
- Body: { paymentResult }

PUT /api/orders/:id/deliver
- Mark order as delivered (Admin only)
- Returns: updated order

PUT /api/orders/:id/cancel
- Cancel order
- Only if not yet shipped
- Returns: updated order

GET /api/admin/orders
- Get all orders (Admin only)
- Supports filtering and pagination
```

#### Order Model Collaboration
Work with **Subham** on the Order model:
```javascript
{
  user: ObjectId (ref to User),
  orderItems: [{
    product: ObjectId,
    name: String,
    quantity: Number,
    price: Number,
    image: String
  }],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: Boolean,
  paidAt: Date,
  isDelivered: Boolean,
  deliveredAt: Date,
  orderStatus: String // 'pending', 'processing', 'shipped', 'delivered'
}
```

---

### 3. Email & Notification Services (20%)

#### Email Service Setup
- [ ] Configure Nodemailer with Gmail/SMTP
- [ ] Create email templates
- [ ] Implement email sending functions
- [ ] Add error handling for failed emails
- [ ] Test email delivery

**File to work on:**
- `server/services/emailService.js`

#### Email Functions to Create

```javascript
sendOrderConfirmation(order, user)
- Send when order is created
- Include order details, items, total
- Shipping address

sendPaymentConfirmation(order, user)
- Send when payment is successful
- Include payment details
- Receipt information

sendShippingNotification(order, user, trackingNumber)
- Send when order is shipped
- Include tracking information

sendDeliveryConfirmation(order, user)
- Send when order is delivered
- Thank you message
- Request review

sendPasswordReset(user, resetToken)
- Send password reset link
- Include expiry time

sendWelcomeEmail(user)
- Send on new user registration
- Welcome message
```

#### Email Templates
Create HTML email templates:
- Order confirmation template
- Payment receipt template
- Shipping notification template
- Password reset template
- Welcome email template

---

## 🔧 Technical Stack You'll Use

- **Stripe** - Payment processing
- **Nodemailer** - Email sending
- **Express.js** - Backend framework
- **MongoDB/Mongoose** - Database
- **Stripe Webhooks** - Payment events

---

## 📝 Step-by-Step Implementation Guide

### Week 1: Payment Setup

#### Day 1-2: Stripe Configuration
1. Create Stripe account (use test mode)
2. Get API keys (publishable and secret)
3. Install Stripe package: `npm install stripe`
4. Configure environment variables
5. Create basic payment route file

**Environment variables needed:**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Day 3-4: Payment Routes
1. Create checkout session endpoint
2. Implement payment verification
3. Set up webhook endpoint
4. Test with Stripe CLI
5. Handle edge cases

#### Day 5: Frontend Integration Helper
1. Create Stripe service in client
2. Add helper functions
3. Document usage for Tushar
4. Test checkout flow

### Week 2: Order Management

#### Day 1-2: Order Routes - Part 1
1. Create order creation endpoint
2. Validate order data
3. Calculate totals server-side
4. Save order to database
5. Test with Postman

#### Day 3-4: Order Routes - Part 2
1. Get user orders endpoint
2. Get single order endpoint
3. Update payment status endpoint
4. Update delivery status endpoint
5. Add pagination and filtering

#### Day 5: Admin Order Management
1. Get all orders endpoint (admin)
2. Order statistics
3. Recent orders
4. Order status updates

### Week 3: Email Service

#### Day 1-2: Email Setup
1. Configure Nodemailer
2. Set up Gmail app password
3. Create email service file
4. Test basic email sending

**Gmail Setup:**
- Enable 2-factor authentication
- Generate app password
- Use in EMAIL_PASS variable

#### Day 3-4: Email Templates
1. Create order confirmation email
2. Create payment receipt email
3. Create shipping notification email
4. Style emails with inline CSS

#### Day 5: Email Integration
1. Integrate with order creation
2. Integrate with payment success
3. Test all email flows
4. Handle email errors

### Week 4: Testing & Integration

#### Day 1-2: Payment Testing
1. Test with Stripe test cards
2. Test successful payment
3. Test failed payment
4. Test webhook handling

**Stripe Test Cards:**
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- 3D Secure: 4000 0025 0000 3155

#### Day 3-4: Integration Testing
1. Complete order flow testing
2. Test email delivery
3. Test with frontend (work with Tushar)
4. Fix any bugs

#### Day 5: Documentation
1. Document payment flow
2. Document order endpoints
3. Create troubleshooting guide

### Week 5: Production Preparation

1. Switch to Stripe live mode
2. Test production payment flow
3. Configure production email
4. Monitor and fix issues

---

## 💻 Code Examples

### Example: Payment Route
```javascript
// server/routes/payments.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create checkout session
router.post('/create-checkout-session', protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalAmount } = req.body;

    // Create line items for Stripe
    const lineItems = orderItems.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
      customer_email: req.user.email,
      metadata: {
        userId: req.user._id.toString(),
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment session creation failed',
      error: error.message,
    });
  }
});

// Webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        // Update order as paid
        await handleSuccessfulPayment(session);
        break;
      
      case 'payment_intent.payment_failed':
        // Handle failed payment
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// Helper function
async function handleSuccessfulPayment(session) {
  const Order = require('../models/Order');
  
  // Find and update order
  const order = await Order.findOne({ 
    'paymentResult.id': session.payment_intent 
  });
  
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: session.payment_intent,
      status: session.payment_status,
      email_address: session.customer_email,
    };
    await order.save();
    
    // Send payment confirmation email
    const emailService = require('../services/emailService');
    await emailService.sendPaymentConfirmation(order, order.user);
  }
}

module.exports = router;
```

### Example: Order Routes
```javascript
// server/routes/orders.js
const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');
const emailService = require('../services/emailService');

const router = express.Router();

// Create order
router.post('/', protect, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Send order confirmation email
    await emailService.sendOrderConfirmation(order, req.user);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('orderItems.product', 'name image');

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name image price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user or user is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order to paid
router.put('/:id/pay', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();

    // Send payment confirmation
    await emailService.sendPaymentConfirmation(updatedOrder, req.user);

    res.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order to delivered (Admin)
router.put('/:id/deliver', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.orderStatus = 'delivered';

    const updatedOrder = await order.save();

    // Send delivery confirmation
    await emailService.sendDeliveryConfirmation(updatedOrder, order.user);

    res.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (Admin)
router.get('/admin/all', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .limit(100);

    res.json({
      success: true,
      orders,
      count: orders.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### Example: Email Service
```javascript
// server/services/emailService.js
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password
  },
});

// Send order confirmation
exports.sendOrderConfirmation = async (order, user) => {
  try {
    const orderItems = order.orderItems
      .map(
        (item) =>
          `<tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td>$${(item.quantity * item.price).toFixed(2)}</td>
          </tr>`
      )
      .join('');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Order Confirmation - Order #${order._id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Order Confirmation</h2>
          <p>Hi ${user.name},</p>
          <p>Thank you for your order! We've received your order and will process it shortly.</p>
          
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          
          <h3>Items</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f3f4f6;">
                <th style="padding: 10px; text-align: left;">Product</th>
                <th style="padding: 10px;">Quantity</th>
                <th style="padding: 10px;">Price</th>
                <th style="padding: 10px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItems}
            </tbody>
          </table>
          
          <h3>Shipping Address</h3>
          <p>
            ${order.shippingAddress.address}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
            ${order.shippingAddress.country}
          </p>
          
          <h3>Order Summary</h3>
          <p><strong>Items:</strong> $${order.itemsPrice.toFixed(2)}</p>
          <p><strong>Shipping:</strong> $${order.shippingPrice.toFixed(2)}</p>
          <p><strong>Tax:</strong> $${order.taxPrice.toFixed(2)}</p>
          <p style="font-size: 18px;"><strong>Total:</strong> $${order.totalPrice.toFixed(2)}</p>
          
          <p>We'll send you another email when your order ships.</p>
          
          <p>Thanks for shopping with us!</p>
          <p style="color: #6B7280;">The ShopHub Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', user.email);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    // Don't throw error - email failure shouldn't break order creation
  }
};

// Send payment confirmation
exports.sendPaymentConfirmation = async (order, user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Payment Received - Order #${order._id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10B981;">Payment Confirmed!</h2>
          <p>Hi ${user.name},</p>
          <p>We've received your payment for order #${order._id}.</p>
          
          <h3>Payment Details</h3>
          <p><strong>Amount Paid:</strong> $${order.totalPrice.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          <p><strong>Payment Date:</strong> ${new Date(order.paidAt).toLocaleDateString()}</p>
          
          <p>Your order is now being processed and will ship soon!</p>
          
          <p>Thank you!</p>
          <p style="color: #6B7280;">The ShopHub Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Payment confirmation email sent to:', user.email);
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
  }
};

// Send shipping notification
exports.sendShippingNotification = async (order, user, trackingNumber) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Your Order Has Shipped - Order #${order._id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Your Order Has Shipped!</h2>
          <p>Hi ${user.name},</p>
          <p>Great news! Your order #${order._id} has been shipped and is on its way!</p>
          
          <h3>Tracking Information</h3>
          <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
          <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
          
          <p>You can track your package using the tracking number above.</p>
          
          <p>Thank you for shopping with us!</p>
          <p style="color: #6B7280;">The ShopHub Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Shipping notification sent to:', user.email);
  } catch (error) {
    console.error('Error sending shipping notification:', error);
  }
};

// Send delivery confirmation
exports.sendDeliveryConfirmation = async (order, user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Order Delivered - Order #${order._id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10B981;">Order Delivered!</h2>
          <p>Hi ${user.name},</p>
          <p>Your order #${order._id} has been delivered!</p>
          
          <p>We hope you love your purchase. If you have any issues, please don't hesitate to contact us.</p>
          
          <p>Would you mind leaving a review? Your feedback helps us improve!</p>
          
          <p>Thank you for choosing us!</p>
          <p style="color: #6B7280;">The ShopHub Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Delivery confirmation sent to:', user.email);
  } catch (error) {
    console.error('Error sending delivery confirmation:', error);
  }
};

// Send welcome email
exports.sendWelcomeEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Welcome to ShopHub!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Welcome to ShopHub!</h2>
          <p>Hi ${user.name},</p>
          <p>Thank you for joining ShopHub! We're excited to have you as part of our community.</p>
          
          <p>Start exploring our wide range of products and enjoy shopping!</p>
          
          <p>Happy Shopping!</p>
          <p style="color: #6B7280;">The ShopHub Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', user.email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};
```

---

## 🧪 Testing Your Work

### Testing Payment with Stripe

**Test Cards:**
- **Success**: 4242 4242 4242 4242 (any future date, any CVC)
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

**Test Webhook with Stripe CLI:**
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:5001/api/payments/webhook

# Trigger events
stripe trigger checkout.session.completed
```

### Testing Orders
```bash
# Create order
POST http://localhost:5001/api/orders
Headers: Authorization: Bearer YOUR_TOKEN
{
  "orderItems": [...],
  "shippingAddress": {...},
  "paymentMethod": "Stripe",
  "itemsPrice": 100,
  "taxPrice": 10,
  "shippingPrice": 5,
  "totalPrice": 115
}

# Get user orders
GET http://localhost:5001/api/orders
Headers: Authorization: Bearer YOUR_TOKEN
```

### Testing Email
```bash
# Test email configuration
node -e "
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: { user: 'YOUR_EMAIL', pass: 'YOUR_APP_PASSWORD' }
});
transporter.sendMail({
  from: 'YOUR_EMAIL',
  to: 'TEST_EMAIL',
  subject: 'Test',
  text: 'Test email'
}, console.log);
"
```

---

## 📞 Coordination Points

### With Subham (Tech Lead)
- Get Order model reviewed
- Ask for help with middleware
- Report any issues
- Get code reviewed

### With Tushar (Admin/Cart)
- Coordinate on checkout flow
- Test payment integration together
- Ensure order creation works with cart
- Share payment response format

### With Sneha (Frontend)
- Provide Stripe publishable key
- Document payment flow
- Help with payment errors

---

## ✅ Success Criteria

You're doing great when:
- [ ] Stripe integration works
- [ ] Orders are created successfully
- [ ] Payment status updates correctly
- [ ] Emails are sent reliably
- [ ] Webhooks are handled properly
- [ ] All test payments work
- [ ] Error handling is robust
- [ ] Production payments work

---

## 🆘 Need Help?

### Resources
- [Stripe Docs](https://stripe.com/docs)
- [Nodemailer Docs](https://nodemailer.com/)
- [Stripe Testing](https://stripe.com/docs/testing)

### Common Issues
1. **Stripe webhook not working**: Use Stripe CLI to forward
2. **Email not sending**: Check Gmail app password
3. **Payment amount mismatch**: Verify calculations
4. **CORS on webhook**: Use raw body parser

---

**Remember: You're handling money! Security and accuracy are crucial! 💰**

---

*Payments = Trust!*

