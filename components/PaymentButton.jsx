// components/PaymentButton.jsx
'use client';

import { useState } from 'react';
import { useSession } from '@/components/SessionWrapper';

const PaymentButton = ({ plan, planId, customAmount, label }) => {
  const { user, isAuthenticated } = useSession();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    console.log('🔥 Payment button clicked!', { 
      isAuthenticated, 
      user: user?.username, 
      plan: plan?.name,
      planId,
      customAmount 
    });
    
    if (!isAuthenticated) {
      alert('⚠️ Please login to continue with payment');
      return;
    }

    setLoading(true);

    try {
      console.log('📝 Step 1: Creating Razorpay order...');
      
      // Create Razorpay order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user?.id?.toString?.() || ''
        },
        body: JSON.stringify({
          planId: planId || plan?.id,
          customAmount: customAmount || plan?.amount,
          description: plan?.name || label || 'Yog-Guru Premium'
        }),
      });

      console.log('📊 Order API Response Status:', orderResponse.status);

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        console.error('❌ Order creation failed:', errorText);
        throw new Error(`Failed to create order: ${errorText}`);
      }

      const orderData = await orderResponse.json();
      console.log('✅ Order created successfully:', orderData);

      // Validate required fields
      if (!orderData.keyId || !orderData.orderId || !orderData.amount) {
        console.error('❌ Invalid order data:', orderData);
        throw new Error('Invalid order response from server');
      }

      console.log('🔧 Step 2: Loading Razorpay script...');
      await loadRazorpayScript();

      console.log('🚀 Step 3: Opening Razorpay checkout...');
      
      // Initialize Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Yog-Guru',
        description: orderData.description || `${plan?.name || 'Premium'} Subscription`,
        image: '/logo.png', // Add your logo if available
        order_id: orderData.orderId,
        
        handler: async function (response) {
          console.log('💳 Payment successful! Response:', response);
          setLoading(true); // Keep loading during verification
          
          try {
            console.log('🔍 Step 4: Verifying payment...');
            
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
                planId: planId || plan?.id,
              }),
            });

            const verifyData = await verifyResponse.json();
            console.log('🔍 Verification response:', verifyData);

            if (verifyResponse.ok && verifyData.success) {
              console.log('✅ Payment verified successfully!');
              // Payment successful - redirect to success page
              window.location.href = `/payments/success?payment_id=${response.razorpay_payment_id}&plan=${plan?.name || 'Premium'}`;
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('❌ Payment verification failed:', error);
            alert(`Payment verification failed: ${error.message}. Please contact support with Payment ID: ${response.razorpay_payment_id}`);
            window.location.href = `/payments/failed?payment_id=${response.razorpay_payment_id}`;
          }
        },
        
        prefill: {
          name: user?.username || user?.name || 'Yog-Guru User',
          email: user?.email || 'user@yogguru.com',
          contact: user?.phone || '',
        },
        
        theme: {
          color: '#3B82F6',
        },
        
        modal: {
          ondismiss: function() {
            console.log('💔 Payment modal dismissed by user');
            setLoading(false);
          }
        },
        
        // Add retry configuration
        retry: {
          enabled: true,
          max_count: 3
        }
      };

      console.log('🎯 Opening Razorpay with options:', {
        key: options.key,
        amount: options.amount,
        currency: options.currency,
        order_id: options.order_id
      });

      if (!window.Razorpay) {
        throw new Error('Razorpay script not loaded properly');
      }

      const rzp = new window.Razorpay(options);
      
      // Handle Razorpay errors
      rzp.on('payment.failed', function (response) {
        console.error('💥 Razorpay payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      rzp.open();

    } catch (error) {
      console.error('💥 Payment initiation failed:', error);
      alert(`❌ Payment failed: ${error?.message || 'Unknown error occurred'}`);
      setLoading(false);
    }
  };

  // Enhanced Razorpay script loader with better error handling
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      // Check if Razorpay is already loaded
      if (window.Razorpay) {
        console.log('✅ Razorpay already loaded');
        resolve();
        return;
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src*="checkout.razorpay.com"]');
      if (existingScript) {
        console.log('⏳ Razorpay script already loading...');
        existingScript.onload = resolve;
        existingScript.onerror = reject;
        return;
      }

      console.log('📥 Loading Razorpay script...');
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        console.log('✅ Razorpay script loaded successfully');
        resolve();
      };
      
      script.onerror = (error) => {
        console.error('❌ Failed to load Razorpay script:', error);
        reject(new Error('Failed to load Razorpay checkout script'));
      };
      
      document.body.appendChild(script);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        if (!window.Razorpay) {
          reject(new Error('Razorpay script load timeout'));
        }
      }, 10000);
    });
  };

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="w-full py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 text-center cursor-not-allowed">
        <span className="flex items-center justify-center">
          🔒 Please login to purchase
        </span>
      </div>
    );
  }

  const displayAmount = customAmount || plan?.amount;

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`
        w-full max-w-full py-3 px-4 rounded-lg font-semibold text-base transition-all duration-300 
        ${loading
          ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed shadow-none'
          : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
        }
        focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2
        overflow-hidden
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center text-sm">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : (
        <span className="flex items-center justify-center text-sm truncate">
          💳 <span className="ml-1 truncate">{label || (displayAmount ? `Buy for ₹${displayAmount}` : 'Subscribe')}</span>
          <svg className="ml-1 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </span>
      )}
    </button>
  );
};

export default PaymentButton;
