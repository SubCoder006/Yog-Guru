'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PlanCard from '@/components/PlanCard';

export default function PlanDetailPage() {
  const params = useParams();
  const planId = parseInt(params.id, 10);

  const plans = useMemo(() => ([
    {
      id: 1,
      name: 'Beginner Bliss',
      level: 'Perfect for newcomers to yoga',
      duration: 'month',
      price: 99,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      popular: false,
      features: [
        'Basic yoga poses and breathing',
        '15-minute daily sessions',
        'Beginner-friendly diet plan',
        'Weekly progress tracking',
        'Mobile app access',
        'Community support'
      ]
    },
    {
      id: 2,
      name: 'Intermediate Flow',
      level: 'Build strength and flexibility',
      duration: 'month',
      price: 159,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      popular: true,
      features: [
        'Intermediate poses & sequences',
        '30-minute daily sessions',
        'Personalized nutrition plan',
        'Flexibility & strength tracking',
        'Video tutorials library',
        'Monthly expert consultation',
        'Lifestyle optimization guide'
      ]
    },
    {
      id: 3,
      name: 'Advanced Mastery',
      level: 'Challenge your limits',
      duration: 'month',
      price: 209,
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      popular: false,
      features: [
        'Advanced poses & meditation',
        '45-minute intensive sessions',
        'Custom meal planning',
        'Body composition analysis',
        '1-on-1 virtual sessions',
        'Advanced breathing techniques',
        'Injury prevention program',
        'Priority customer support'
      ]
    },
    {
      id: 4,
      name: 'Expert Transformation',
      level: 'Complete mind-body transformation',
      duration: 'month',
      price: 299,
      color: 'bg-gradient-to-br from-red-400 to-pink-600',
      popular: false,
      features: [
        'Master-level sequences',
        '60-minute daily practice',
        'Ayurvedic meal planning',
        'Comprehensive health tracking',
        'Weekly 1-on-1 sessions',
        'Meditation & mindfulness',
        'Complete lifestyle overhaul',
        '24/7 expert support',
        'Certification pathway'
      ]
    }
  ]), []);

  const plan = plans.find(p => p.id === planId);

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Plan Not Found</h1>
          <Link href="/plans" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/plans" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Plans
          </Link>
        </div>
        <PlanCard plan={plan} />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href={`/plans/${plan.id}/diet`} className="block">
            <div className="w-full bg-white text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 text-center">View Diet Plan</div>
          </Link>
          <Link href={`/plans/${plan.id}/lifestyle`} className="block">
            <div className="w-full bg-white text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 text-center">View Lifestyle Plan</div>
          </Link>
        </div>
      </div>
    </div>
  );
}


