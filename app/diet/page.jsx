'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/components/SessionWrapper';

export default function DietPlansPage() {
  const { user, isAuthenticated } = useSession();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const dietPlans = [
    {
      id: 'weight-loss',
      name: 'Weight Loss Plan',
      category: 'weight-loss',
      description: 'Scientifically designed meal plans to help you lose weight sustainably',
      duration: '30 days',
      calories: '1200-1500',
      difficulty: 'Beginner',
      image: '⚖️',
      color: 'from-green-400 to-green-600',
      features: [
        'Calorie-controlled meals',
        'High fiber, low fat foods',
        'Metabolism boosting recipes',
        'Portion control guidance',
        '24/7 nutritionist support'
      ],
      benefits: [
        'Lose 5-8 kg in 30 days',
        'Improved metabolism',
        'Better digestion',
        'Increased energy levels'
      ],
      isPremium: false
    },
    {
      id: 'muscle-gain',
      name: 'Muscle Building Plan',
      category: 'fitness',
      description: 'High-protein diet plan to support muscle growth and strength training',
      duration: '45 days',
      calories: '2500-3000',
      difficulty: 'Intermediate',
      image: '💪',
      color: 'from-blue-400 to-blue-600',
      features: [
        'High protein meals (150g+ daily)',
        'Pre & post workout nutrition',
        'Lean muscle building foods',
        'Supplement recommendations',
        'Meal timing guidance'
      ],
      benefits: [
        'Gain 3-5 kg lean muscle',
        'Increased strength',
        'Better recovery',
        'Enhanced performance'
      ],
      isPremium: true
    },
    {
      id: 'detox',
      name: 'Detox & Cleanse',
      category: 'cleanse',
      description: 'Natural detoxification plan to cleanse your body and boost energy',
      duration: '14 days',
      calories: '800-1200',
      difficulty: 'Advanced',
      image: '🌿',
      color: 'from-purple-400 to-purple-600',
      features: [
        'Natural detox foods',
        'Liver cleansing recipes',
        'Anti-inflammatory meals',
        'Hydration protocols',
        'Herbal tea recommendations'
      ],
      benefits: [
        'Improved digestion',
        'Boosted energy',
        'Clearer skin',
        'Better sleep quality'
      ],
      isPremium: true
    },
    {
      id: 'keto',
      name: 'Ketogenic Diet',
      category: 'special',
      description: 'Low-carb, high-fat diet plan for rapid weight loss and mental clarity',
      duration: '21 days',
      calories: '1500-2000',
      difficulty: 'Advanced',
      image: '🥑',
      color: 'from-orange-400 to-red-400',
      features: [
        'Ultra-low carb meals (<20g)',
        'High healthy fat content',
        'Ketosis tracking guide',
        'Keto-friendly recipes',
        'Electrolyte balance tips'
      ],
      benefits: [
        'Rapid weight loss',
        'Mental clarity',
        'Stable energy',
        'Reduced cravings'
      ],
      isPremium: true
    },
    {
      id: 'diabetes',
      name: 'Diabetic Friendly',
      category: 'medical',
      description: 'Blood sugar friendly meal plans for diabetes management',
      duration: '60 days',
      calories: '1600-2000',
      difficulty: 'Beginner',
      image: '🩺',
      color: 'from-teal-400 to-cyan-600',
      features: [
        'Low glycemic index foods',
        'Blood sugar monitoring tips',
        'Carb counting guidance',
        'Balanced macro nutrients',
        'Doctor approved recipes'
      ],
      benefits: [
        'Stable blood sugar',
        'Better HbA1c levels',
        'Weight management',
        'Reduced complications'
      ],
      isPremium: true
    },
    {
      id: 'vegetarian',
      name: 'Vegetarian Power',
      category: 'lifestyle',
      description: 'Plant-based nutrition plan packed with proteins and essential nutrients',
      duration: '30 days',
      calories: '1400-1800',
      difficulty: 'Beginner',
      image: '🥬',
      color: 'from-green-400 to-lime-500',
      features: [
        'Plant-based proteins',
        'Complete amino acid profiles',
        'Iron & B12 rich foods',
        'Seasonal vegetables',
        'Dairy alternatives'
      ],
      benefits: [
        'Improved heart health',
        'Better digestion',
        'Environmental benefits',
        'Cost effective'
      ],
      isPremium: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Plans', icon: '📋' },
    { id: 'weight-loss', name: 'Weight Loss', icon: '⚖️' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'cleanse', name: 'Detox', icon: '🌿' },
    { id: 'special', name: 'Special Diet', icon: '🥑' },
    { id: 'medical', name: 'Medical', icon: '🩺' },
    { id: 'lifestyle', name: 'Lifestyle', icon: '🥬' }
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? dietPlans 
    : dietPlans.filter(plan => plan.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Personalized Diet Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your health with scientifically designed meal plans. Whether you want to lose weight, 
            build muscle, or improve your overall wellness, we have the perfect plan for you.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-green-600">10,000+</div>
              <div className="text-sm text-gray-600">Success Stories</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-600">Recipes</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-gray-600">Nutritionists</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-2xl font-bold text-orange-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Diet Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Plan Header */}
              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white relative`}>
                {plan.isPremium && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                    PREMIUM
                  </div>
                )}
                <div className="text-center">
                  <div className="text-6xl mb-4">{plan.image}</div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/90 text-sm">{plan.description}</p>
                </div>
              </div>

              {/* Plan Details */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-4 text-sm">
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <div className="font-semibold">{plan.duration}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Calories:</span>
                      <div className="font-semibold">{plan.calories}</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(plan.difficulty)}`}>
                    {plan.difficulty}
                  </span>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 3 && (
                      <li className="text-sm text-blue-600 font-medium">
                        +{plan.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Expected Benefits:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {plan.benefits.map((benefit, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-2 text-xs text-center">
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link href={`/diet/${plan.id}`}>
                    <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all">
                      View Plan Details
                    </button>
                  </Link>
                  
                  {plan.isPremium && !isAuthenticated && (
                    <div className="text-center">
                      <Link href="/auth/signup" className="text-sm text-blue-600 hover:text-blue-700">
                        Sign up for premium access
                      </Link>
                    </div>
                  )}
                  
                  {plan.isPremium && isAuthenticated && user?.subscription?.status !== 'active' && (
                    <div className="text-center">
                      <Link href="/premium" className="text-sm text-purple-600 hover:text-purple-700">
                        Upgrade to premium
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}


