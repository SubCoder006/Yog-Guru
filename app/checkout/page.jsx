// app/checkout/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from '@/components/SessionWrapper';
import { SUBSCRIPTION_PLANS } from '@/lib/razorpay';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isAuthenticated } = useSession();
  const [loading, setLoading] = useState(false);
  const [planId, setPlanId] = useState(null);
  const [plan, setPlan] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gst: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    const planParam = searchParams.get('plan');
    if (planParam && SUBSCRIPTION_PLANS[planParam]) {
      setPlanId(planParam);
      setPlan(SUBSCRIPTION_PLANS[planParam]);
      setBillingDetails(prev => ({
        ...prev,
        name: user?.name || '',
        email: user?.email || ''
      }));
    } else {
      router.push('/premium');
    }
  }, [searchParams, isAuthenticated, user, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error);
      }

      // Initialize Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Yog-Guru',
        description: `${plan.name} Subscription`,
        image: '/logo.png',
        order_id: orderData.orderId,
        prefill: {
          name: billingDetails.name,
          email: billingDetails.email,
          contact: billingDetails.phone
        },
        notes: {
          address: billingDetails.address,
          city: billingDetails.city,
          state: billingDetails.state
        },
        theme: {
          color: '#8B5CF6'
        },
        handler: async function (response) {
          try {
            // Verify payment on server
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planId,
                billingDetails
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
              // Payment successful - redirect to success page
              router.push(`/payments/success?payment_id=${response.razorpay_payment_id}`);
            } else {
              throw new Error(verifyData.error);
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            router.push('/payments/failed');
          }
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
        script.onerror = () => {
          alert('Failed to load payment gateway. Please try again.');
          setLoading(false);
        };
        document.body.appendChild(script);
      } else {
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
            <p className="text-purple-100">You're one step away from transforming your wellness journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Billing Form */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Details</h2>
              
              <form onSubmit={handlePayment} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={billingDetails.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={billingDetails.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={billingDetails.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    name="address"
                    value={billingDetails.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={billingDetails.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={billingDetails.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                    <input
                      type="text"
                      name="pincode"
                      value={billingDetails.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="PIN Code"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Number (Optional)</label>
                  <input
                    type="text"
                    name="gst"
                    value={billingDetails.gst}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter GST number for business"
                  />
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full font-bold py-4 px-6 rounded-lg text-lg transition-all ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Processing...
                      </div>
                    ) : (
                      `Pay ₹${plan.amount} - Complete Purchase`
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="bg-white rounded-xl p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{plan.name}</h3>
                    <p className="text-gray-600 text-sm">{plan.duration} days access</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">₹{plan.amount}</div>
                    {planId !== 'monthly' && (
                      <div className="text-green-600 text-sm font-medium">
                        Save {planId === 'yearly' ? '25%' : '15%'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-800 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 5 && (
                      <li className="text-sm text-purple-600 font-medium">
                        +{plan.features.length - 5} more features
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{plan.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-semibold">₹{Math.round(plan.amount * 0.18)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">₹{Math.round(plan.amount * 1.18)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-blue-600 mr-2">🔒</span>
                  <span className="font-semibold text-blue-800">Secure Payment</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Your payment information is encrypted and secure. We accept all major cards and UPI.
                </p>
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-green-600 mr-2">📞</span>
                  <span className="font-semibold text-green-800">24/7 Support</span>
                </div>
                <p className="text-green-700 text-sm">
                  Need help? Contact our support team anytime at support@yog-guru.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security badges */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm mb-4">Secured by industry-standard encryption</p>
          <div className="flex justify-center space-x-6 opacity-60">
            <div className="text-xs font-semibold text-gray-500">SSL SECURED</div>
            <div className="text-xs font-semibold text-gray-500">PCI COMPLIANT</div>
            <div className="text-xs font-semibold text-gray-500">256-BIT ENCRYPTION</div>
          </div>
        </div>
      </div>
    </div>
  );
}