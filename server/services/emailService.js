const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email templates
const emailTemplates = {
  welcome: (userName) => ({
    subject: 'Welcome to Amazon Clone!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #232f3e;">Welcome to Amazon Clone!</h2>
        <p>Hi ${userName},</p>
        <p>Thank you for joining Amazon Clone! We're excited to have you on board.</p>
        <p>You can now:</p>
        <ul>
          <li>Browse thousands of products</li>
          <li>Add items to your wishlist</li>
          <li>Track your orders</li>
          <li>Enjoy fast and secure checkout</li>
        </ul>
        <p>Happy shopping!</p>
        <p>Best regards,<br>The Amazon Clone Team</p>
      </div>
    `
  }),

  orderConfirmation: (order) => ({
    subject: `Order Confirmation - #${order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #232f3e;">Order Confirmation</h2>
        <p>Thank you for your order!</p>
        <p><strong>Order ID:</strong> #${order._id}</p>
        <p><strong>Total Amount:</strong> $${order.totalAmount}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        
        <h3>Order Items:</h3>
        <ul>
          ${order.items.map(item => `
            <li>
              <strong>${item.name}</strong><br>
              Quantity: ${item.quantity}<br>
              Price: $${item.price}
            </li>
          `).join('')}
        </ul>
        
        <h3>Shipping Address:</h3>
        <p>
          ${order.shippingAddress.street}<br>
          ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
          ${order.shippingAddress.country}
        </p>
        
        <p>We'll send you another email when your order ships.</p>
        <p>Best regards,<br>The Amazon Clone Team</p>
      </div>
    `
  }),

  orderShipped: (order, trackingNumber) => ({
    subject: `Your Order Has Shipped - #${order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #232f3e;">Your Order Has Shipped!</h2>
        <p>Great news! Your order has been shipped and is on its way.</p>
        <p><strong>Order ID:</strong> #${order._id}</p>
        <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
        
        <h3>Order Items:</h3>
        <ul>
          ${order.items.map(item => `
            <li>
              <strong>${item.name}</strong><br>
              Quantity: ${item.quantity}
            </li>
          `).join('')}
        </ul>
        
        <p>You can track your package using the tracking number above.</p>
        <p>Best regards,<br>The Amazon Clone Team</p>
      </div>
    `
  }),

  passwordReset: (userName, resetToken) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #232f3e;">Password Reset Request</h2>
        <p>Hi ${userName},</p>
        <p>We received a request to reset your password. Click the link below to reset it:</p>
        <p>
          <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}" 
             style="background-color: #ff9900; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>The Amazon Clone Team</p>
      </div>
    `
  })
};

// Send email function
const sendEmail = async (to, templateName, data) => {
  try {
    const template = emailTemplates[templateName];
    if (!template) {
      throw new Error(`Email template '${templateName}' not found`);
    }

    const emailContent = typeof template === 'function' ? template(data) : template;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: emailContent.subject,
      html: emailContent.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Email service functions
const emailService = {
  sendWelcomeEmail: (userEmail, userName) => 
    sendEmail(userEmail, 'welcome', userName),

  sendOrderConfirmation: (userEmail, order) => 
    sendEmail(userEmail, 'orderConfirmation', order),

  sendOrderShipped: (userEmail, order, trackingNumber) => 
    sendEmail(userEmail, 'orderShipped', { order, trackingNumber }),

  sendPasswordReset: (userEmail, userName, resetToken) => 
    sendEmail(userEmail, 'passwordReset', { userName, resetToken })
};

module.exports = emailService;
