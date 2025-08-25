// app/premium/page.jsx
'use client';

import React, { useState } from 'react';
import { useSession } from '@/components/SessionWrapper';
import { useRouter } from 'next/navigation';
import PaymentButton from '@/components/PaymentButton';
import { SUBSCRIPTION_PLANS } from '@/lib/razorpay';

export default function PremiumPage() {
  const { user, isAuthenticated } = useSession();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const features = {
    free: [
      'Access to 5 basic yoga poses',
      'Basic breathing exercises',
      'Community support',
      'Mobile app access'
    ],
    premium: [
      'Unlimited access to all yoga poses',
      'Personalized diet plans',
      'Expert consultations',
      'Advanced breathing techniques',
      'Progress tracking & analytics',
      'Meditation sessions',
      'Live group classes',
      'Priority customer support',
      'Downloadable content',
      'Ad-free experience'
    ]
  };

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      text: 'Yog-Guru transformed my daily routine. The personalized diet plans and expert guidance helped me lose 15kg in 4 months!',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi, India',
      text: 'As a software engineer, the stress relief techniques and flexibility sessions have been a game-changer for my posture and mental health.',
      rating: 5
    },
    {
      name: 'Anita Desai',
      location: 'Bangalore, India',
      text: 'The expert consultations are worth every penny. Dr. Priya helped me with my chronic back pain through targeted yoga therapy.',
      rating: 5
    }
  ];

  const handleUpgrade = (planId) => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    setSelectedPlan(planId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Premium</span> Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your life with unlimited access to expert-guided yoga, personalized nutrition, 
            and one-on-one consultations. Join thousands who've already transformed their lives.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="text-green-500 mr-1">✓</span>
              7-day free trial
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-1">✓</span>
              Cancel anytime
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-1">✓</span>
              Money-back guarantee
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Plan</h2>
          <p className="text-gray-600">All plans include full access to our premium features</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(SUBSCRIPTION_PLANS).map(([planId, plan]) => (
            <div
              key={planId}
              className={`relative bg-white rounded-2xl shadow-xl p-8 ${
                planId === 'quarterly' ? 'ring-4 ring-purple-400 transform scale-105' : ''
              }`}
            >
              {planId === 'quarterly' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-800">₹{plan.amount}</span>
                  <span className="text-gray-500">/{planId === 'yearly' ? 'year' : planId === 'quarterly' ? 'quarter' : 'month'}</span>
                </div>
                {planId !== 'monthly' && (
                  <div className="text-green-600 font-semibold text-sm">
                    Save {planId === 'yearly' ? '25%' : '15%'}
                  </div>
                )}
                <div className="text-gray-500 text-sm">
                  ₹{Math.round(plan.amount / (planId === 'yearly' ? 12 : planId === 'quarterly' ? 3 : 1))}/month
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <PaymentButton 
                plan={plan} 
                planId={planId}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-all ${
                  planId === 'quarterly'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                    : 'bg-gray-800 text-white hover:bg-gray-900'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Free vs Premium</h2>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-3 gap-0">
            {/* Header */}
            <div className="p-6 bg-gray-50 font-semibold text-gray-800">Features</div>
            <div className="p-6 bg-gray-100 text-center font-semibold text-gray-800">Free</div>
            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-center font-semibold text-white">Premium</div>
            
            {/* Feature rows */}
            {[
              ['Yoga Poses', '5 Basic Poses', 'Unlimited Access'],
              ['Diet Plans', 'Basic Tips', 'Personalized Plans'],
              ['Expert Consultations', 'None', 'Unlimited'],
              ['Progress Tracking', 'Basic', 'Advanced Analytics'],
              ['Live Classes', 'None', 'Daily Sessions'],
              ['Mobile App', 'Limited', 'Full Access'],
              ['Customer Support', 'Community', 'Priority Support']
            ].map(([feature, freeValue, premiumValue], idx) => (
              <React.Fragment key={idx}>
                <div className="p-4 border-t border-gray-200 font-medium text-gray-800">{feature}</div>
                <div className="p-4 border-t border-gray-200 text-center text-gray-600">{freeValue}</div>
                <div className="p-4 border-t border-gray-200 text-center bg-purple-50 text-purple-800 font-semibold">{premiumValue}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">What Our Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="text-sm text-gray-600">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div>{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
            <div className="text-gray-600">Happy Members</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-pink-600 mb-2">500+</div>
            <div className="text-gray-600">Yoga Poses</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
            <div className="text-gray-600">Expert Instructors</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period, and you won't be charged again."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! We offer a 7-day free trial for all new premium members. You can explore all premium features risk-free."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets through our secure payment gateway."
              },
              {
                question: "Can I switch plans?",
                answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your premium experience, we'll refund your money."
              },
              {
                question: "Are the consultations really one-on-one?",
                answer: "Yes, all expert consultations are private, one-on-one video sessions with certified yoga instructors and wellness experts."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Life?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of members who've already started their wellness journey</p>
          <div className="space-y-4">
            <div className="flex justify-center space-x-8 text-gray-300 mb-6">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Instant Access
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                7-Day Free Trial
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Cancel Anytime
              </div>
            </div>
            <PaymentButton 
              plan={SUBSCRIPTION_PLANS.quarterly} 
              planId="quarterly"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-lg text-lg hover:shadow-2xl transition-all transform hover:scale-105"
            />
            <p className="text-sm text-gray-400">
              By subscribing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}