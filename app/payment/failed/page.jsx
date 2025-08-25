
// app/payments/failed/page.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentFailedPage() {
  const router = useRouter();

  const retryPayment = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Error Icon */}
          <div className="mx-auto mb-6 w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Failed 😞</h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but your payment could not be processed. This might be due to insufficient funds, 
            network issues, or other technical problems.
          </p>

          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Common reasons for payment failure:</h2>
            <ul className="text-left space-y-1 text-sm text-red-700">
              <li>• Insufficient account balance</li>
              <li>• Incorrect card details</li>
              <li>• Network connectivity issues</li>
              <li>• Card expired or blocked</li>
              <li>• Bank server temporarily down</li>
            </ul>
          </div>

          <div className="space-y-3 mb-6">
            <button
              onClick={retryPayment}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all"
            >
              Try Again
            </button>
            <Link href="/premium">
              <button className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                Choose Different Plan
              </button>
            </Link>
            <Link href="/consult">
              <button className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                Contact Support
              </button>
            </Link>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Still having trouble?</strong> Contact our support team at support@yog-guru.com 
              or call us at +91-1234567890
            </p>
          </div>
        </div>

        {/* Alternative Options */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Alternative Options</h2>
          <div className="space-y-3">
            <Link href="/yoga" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <span className="text-2xl mr-3">🧘‍♀️</span>
              <div>
                <div className="font-medium text-gray-800">Continue with Free Plan</div>
                <div className="text-sm text-gray-600">Access basic yoga poses and breathing exercises</div>
              </div>
            </Link>
            <Link href="/consult" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span className="text-2xl mr-3">👩‍⚕️</span>
              <div>
                <div className="font-medium text-gray-800">Book Expert Consultation</div>
                <div className="text-sm text-gray-600">Get personalized guidance from yoga experts</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}