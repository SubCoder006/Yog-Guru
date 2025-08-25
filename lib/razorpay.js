// lib/razorpay.js
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;

// Helper function to create order
export async function createRazorpayOrder(amount, currency = 'INR', receipt) {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency,
      receipt,
      partial_payment: false,
    });
    
    return order;
  } catch (error) {
    const message = error?.error?.description || error?.message || 'Razorpay order creation failed';
    console.error('Error creating Razorpay order:', message);
    throw new Error(message);
  }
}

// Helper function to verify payment signature
export function verifyPaymentSignature(orderId, paymentId, signature) {
  const crypto = require('crypto');
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');
  
  return expectedSignature === signature;
}

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  monthly: {
    id: 'monthly_plan',
    name: 'Monthly Premium',
    amount: 299,
    currency: 'INR',
    duration: 30, // days
    features: [
      'Access to all yoga videos',
      'Personalized diet plans',
      'Progress tracking',
      'Expert consultations',
      'Premium content'
    ]
  },
  quarterly: {
    id: 'quarterly_plan',
    name: 'Quarterly Premium',
    amount: 799,
    currency: 'INR',
    duration: 90, // days
    features: [
      'Access to all yoga videos',
      'Personalized diet plans',
      'Progress tracking',
      'Expert consultations',
      'Premium content',
      '15% savings'
    ]
  },
  yearly: {
    id: 'yearly_plan',
    name: 'Yearly Premium',
    amount: 2999,
    currency: 'INR',
    duration: 365, // days
    features: [
      'Access to all yoga videos',
      'Personalized diet plans',
      'Progress tracking',
      'Expert consultations',
      'Premium content',
      '25% savings',
      'Priority support'
    ]
  }
};