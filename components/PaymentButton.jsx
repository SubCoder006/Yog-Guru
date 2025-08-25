// components/PaymentButton.jsx
'use client';

import { useState } from 'react';
import { useSession } from '@/components/SessionWrapper';

const PaymentButton = ({ plan, planId, customAmount, label }) => {
  const { user, isAuthenticated } = useSession();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!isAuthenticated) return;

    setLoading(true);

    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id?.toString?.() || ''
        },
        body: JSON.stringify({
          planId,
          customAmount,
          description: plan?.name || label || 'Payment'
        }),
      });

      let orderData;
      const rawText = await orderResponse.text();
      try { orderData = JSON.parse(rawText); } catch { orderData = { error: rawText }; }

      if (!orderResponse.ok) {
        const message = orderData?.error || orderData?.message || 'Unable to create order';
        throw new Error(message);
      }

      // Initialize Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Yog-Guru',
        description: orderData.description || (plan?.name ? `${plan.name}` : 'Payment'),
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // Verify payment on server
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-user-id': user?.id?.toString?.() || ''
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
              // Payment successful - redirect to success page
              window.location.href = '/payment/success';
            } else {
              throw new Error(verifyData.error);
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.username || 'Yog-Guru user',
          email: user?.email || 'noreply@yogguru.local',
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          const rzp = new window.Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);
      } else {
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert(`Razorpay order creation failed: ${error?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
        loading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-white/50 hover:bg-gray-200/50 text-white'
      }`}
    >
      {loading ? 'Processing...' : (label || (plan?.amount ? `Buy Now for ₹${plan.amount}` : 'Buy Now'))}
    </button>
  );
};

export default PaymentButton;
