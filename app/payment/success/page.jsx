// app/payments/success/page.jsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession } from '@/components/SessionWrapper';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const { user, updateUser } = useSession();
  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    // Update user session to reflect premium status
    if (user) {
      updateUser({
        ...user,
        subscription: {
          status: 'active',
          plan: 'premium'
        }
      });
    }
  }, [user, updateUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-6 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful! 🎉</h1>
          <p className="text-gray-600 mb-6">
            Congratulations! Your premium subscription has been activated successfully. 
            Welcome to the Yog-Guru premium family!
          </p>

          {paymentId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Payment ID:</span> {paymentId}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">What happens next?</h2>
            <div className="text-left space-y-3">
              <div className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span className="text-gray-700 text-sm">Instant access to all premium features</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span className="text-gray-700 text-sm">Confirmation email sent to your inbox</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span className="text-gray-700 text-sm">Access to expert consultations</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span className="text-gray-700 text-sm">Personalized diet and yoga plans</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Link href="/dashboard">
              <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all">
                Go to Dashboard
              </button>
            </Link>
            <Link href="/yoga">
              <button className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                Start Practicing Yoga
              </button>
            </Link>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Need help?</strong> Contact our support team at support@yog-guru.com
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-green-600">500+</div>
            <div className="text-xs text-gray-600">Yoga Poses</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-purple-600">50+</div>
            <div className="text-xs text-gray-600">Diet Plans</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-xs text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
