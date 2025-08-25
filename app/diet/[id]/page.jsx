'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from '@/components/SessionWrapper';

export default function DietPlanDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useSession();
  const [dietPlan, setDietPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    dietType: 'vegetarian',
    allergies: '',
    goals: 'weight-loss',
    activityLevel: 'moderate'
  });

  // Four level-based plans: 1 Beginner, 2 Intermediate, 3 Advanced, 4 Expert
  const dietPlans = {
    1: {
      id: 1,
      name: 'Beginner Diet Plan',
      description: 'Simple, balanced meals to kickstart your wellness journey',
      duration: '30 days',
      target: 'Build healthy habits',
      meals: {
        breakfast: [
          { name: 'Oats with Fruits', calories: 300, ingredients: ['Oats', 'Banana', 'Berries', 'Nuts'], time: '7:30 AM' },
          { name: 'Veg Poha', calories: 280, ingredients: ['Flattened rice', 'Peas', 'Peanut', 'Lemon'], time: '8:00 AM' }
        ],
        lunch: [
          { name: 'Dal + Rice + Salad', calories: 500, ingredients: ['Toor dal', 'Rice', 'Cucumber', 'Tomato'], time: '1:00 PM' },
          { name: 'Roti + Mixed Veg', calories: 480, ingredients: ['Wheat roti', 'Seasonal veg'], time: '1:30 PM' }
        ],
        dinner: [
          { name: 'Khichdi + Curd', calories: 520, ingredients: ['Rice', 'Moong dal', 'Ghee', 'Curd'], time: '7:30 PM' },
          { name: 'Veg Pulao + Raita', calories: 540, ingredients: ['Rice', 'Veggies', 'Curd'], time: '8:00 PM' }
        ],
        snacks: [
          { name: 'Fruit + Nuts', calories: 180, ingredients: ['Apple', 'Almonds'], time: '11:00 AM' },
          { name: 'Buttermilk', calories: 90, ingredients: ['Curd', 'Water', 'Spices'], time: '5:00 PM' }
        ]
      },
      tips: [
        'Hydrate throughout the day',
        'Eat slowly and mindfully',
        'Keep portions moderate'
      ],
      supplements: ['Multivitamin (optional)']
    },
    2: {
      id: 2,
      name: 'Intermediate Diet Plan',
      description: 'Higher protein and fiber to support progress and activity',
      duration: '45 days',
      target: 'Fat loss with energy balance',
      meals: {
        breakfast: [
          { name: 'Besan Chilla + Curd', calories: 380, ingredients: ['Besan', 'Veggies', 'Curd'], time: '7:30 AM' },
          { name: 'Smoothie Bowl', calories: 350, ingredients: ['Yogurt', 'Fruits', 'Seeds'], time: '8:00 AM' }
        ],
        lunch: [
          { name: 'Quinoa Bowl', calories: 520, ingredients: ['Quinoa', 'Chickpeas', 'Veg'], time: '1:00 PM' },
          { name: 'Roti + Paneer Bhurji', calories: 560, ingredients: ['Wheat roti', 'Paneer', 'Onion', 'Tomato'], time: '1:30 PM' }
        ],
        dinner: [
          { name: 'Brown Rice + Rajma', calories: 560, ingredients: ['Brown rice', 'Rajma'], time: '7:30 PM' },
          { name: 'Millet Khichdi', calories: 520, ingredients: ['Millets', 'Moong', 'Ghee'], time: '8:00 PM' }
        ],
        snacks: [
          { name: 'Greek Yogurt + Seeds', calories: 200, ingredients: ['Greek yogurt', 'Chia', 'Flax'], time: '11:00 AM' },
          { name: 'Roasted Chana', calories: 150, ingredients: ['Chana'], time: '5:00 PM' }
        ]
      },
      tips: [
        'Target 1.2–1.5g protein/kg body weight',
        'Prefer whole grains and millets',
        'Limit sugar beverages'
      ],
      supplements: ['Omega-3 (optional)']
    },
    3: {
      id: 3,
      name: 'Advanced Diet Plan',
      description: 'Structured macros for performance and lean muscle',
      duration: '60 days',
      target: 'Recomposition/strength',
      meals: {
        breakfast: [
          { name: 'Paneer Scramble + Roti', calories: 520, ingredients: ['Paneer', 'Onion', 'Capsicum', 'Roti'], time: '7:30 AM' },
          { name: 'Protein Oats', calories: 500, ingredients: ['Oats', 'Milk', 'Protein'], time: '8:00 AM' }
        ],
        lunch: [
          { name: 'Grilled Chicken/Tofu + Rice', calories: 650, ingredients: ['Protein', 'Rice', 'Salad'], time: '1:00 PM' },
          { name: 'Roti + Soy/Paneer Curry', calories: 620, ingredients: ['Roti', 'Soy/Paneer'], time: '1:30 PM' }
        ],
        dinner: [
          { name: 'Fish/Paneer + Quinoa', calories: 620, ingredients: ['Protein', 'Quinoa', 'Veg'], time: '7:30 PM' },
          { name: 'Egg/Tofu Stir Fry + Rice', calories: 640, ingredients: ['Protein', 'Rice', 'Veg'], time: '8:00 PM' }
        ],
        snacks: [
          { name: 'Protein Shake', calories: 180, ingredients: ['Whey/Plant protein'], time: '11:00 AM' },
          { name: 'Peanut Butter Toast', calories: 230, ingredients: ['Whole grain bread', 'PB'], time: '5:00 PM' }
        ]
      },
      tips: [
        'Protein ~1.6–2.0g/kg body weight',
        'Split protein across 4–5 meals',
        'Track weekly progress and adjust portions'
      ],
      supplements: ['Whey/Plant Protein', 'Creatine (optional)']
    },
    4: {
      id: 4,
      name: 'Expert Diet Plan',
      description: 'High-discipline plan with precise macros and timing',
      duration: '90 days',
      target: 'Peak conditioning',
      meals: {
        breakfast: [
          { name: 'Egg White/Tofu Scramble + Oats', calories: 520, ingredients: ['Egg white/Tofu', 'Oats'], time: '7:00 AM' },
          { name: 'Protein Pancakes', calories: 520, ingredients: ['Protein', 'Oats', 'Egg whites'], time: '8:00 AM' }
        ],
        lunch: [
          { name: 'Lean Protein + Sweet Potato', calories: 650, ingredients: ['Chicken/Fish/Paneer', 'Sweet potato'], time: '12:30 PM' },
          { name: 'Lean Protein + Brown Rice', calories: 640, ingredients: ['Protein', 'Brown rice'], time: '1:30 PM' }
        ],
        dinner: [
          { name: 'Protein + Veg + Rice', calories: 630, ingredients: ['Protein', 'Veg', 'Rice'], time: '7:30 PM' },
          { name: 'Protein Salad Bowl', calories: 600, ingredients: ['Protein', 'Greens', 'Seeds'], time: '8:30 PM' }
        ],
        snacks: [
          { name: 'Intra-workout (Electrolytes)', calories: 40, ingredients: ['Electrolyte mix'], time: 'Workout' },
          { name: 'Casein/Yogurt', calories: 220, ingredients: ['Casein', 'Yogurt'], time: '10:00 PM' }
        ]
      },
      tips: [
        'Strict meal timing around training',
        'Micronutrient-dense foods',
        'Weekly refeeds if on a cut'
      ],
      supplements: ['Creatine', 'Omega-3', 'Electrolytes']
    }
  };

  useEffect(() => {
    const plan = dietPlans[parseInt(params.id, 10)];
    if (plan) {
      setDietPlan(plan);
    }
    setLoading(false);
  }, [params.id]);

  const generateCustomPlan = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Custom diet plan generated based on your preferences!');
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading diet plan...</p>
        </div>
      </div>
    );
  }

  if (!dietPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Diet Plan Not Found</h1>
          <Link href="/diet" className="text-green-600 hover:text-green-700 font-medium">
            ← Back to Diet Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Level Switch */}
        <div className="mb-4 flex flex-wrap gap-2">
          {[{id:1,label:'Beginner'},{id:2,label:'Intermediate'},{id:3,label:'Advanced'},{id:4,label:'Expert'}].map(l => (
            <Link key={l.id} href={`/diet/${l.id}`} className={`px-3 py-1 rounded-full text-sm ${dietPlan?.id===l.id?'bg-green-600 text-white':'bg-white text-gray-700 border'}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="mb-8">
          <Link href="/diet" className="text-green-600 hover:text-green-700 font-medium mb-4 inline-block">
            ← Back to Diet Plans
          </Link>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{dietPlan.name}</h1>
              <p className="text-xl text-gray-600 mb-6">{dietPlan.description}</p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{dietPlan.duration}</div>
                  <div className="text-sm text-gray-500">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{dietPlan.targetWeight}</div>
                  <div className="text-sm text-gray-500">Target</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Customize Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diet Type</label>
              <select
                value={userPreferences.dietType}
                onChange={(e) => setUserPreferences(prev => ({...prev, dietType: e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="keto">Keto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Goals</label>
              <select
                value={userPreferences.goals}
                onChange={(e) => setUserPreferences(prev => ({...prev, goals: e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
                <option value="detox">Detox</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
              <select
                value={userPreferences.activityLevel}
                onChange={(e) => setUserPreferences(prev => ({...prev, activityLevel: e.target.value}))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Very Active</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={generateCustomPlan}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-lg transition-all"
              >
                Generate Custom Plan
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Allergies (Optional)</label>
            <input
              type="text"
              value={userPreferences.allergies}
              onChange={(e) => setUserPreferences(prev => ({...prev, allergies: e.target.value}))}
              placeholder="e.g., nuts, dairy, gluten"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {Object.entries(dietPlan.meals).map(([mealType, meals]) => (
            <div key={mealType} className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize flex items-center">
                <span className="text-2xl mr-2">
                  {mealType === 'breakfast' ? '🌅' : 
                   mealType === 'lunch' ? '☀️' : 
                   mealType === 'dinner' ? '🌙' : '🍎'}
                </span>
                {mealType}
              </h3>
              <div className="space-y-4">
                {meals.map((meal, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{meal.name}</h4>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        {meal.calories} cal
                      </span>
                    </div>
                    <div className="mb-2">
                      <img src={`https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop`} alt={meal.name} className="w-full h-40 object-cover rounded" />
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>Time:</strong> {meal.time}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {meal.ingredients.map((ingredient, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Pro Tips</h3>
            <ul className="space-y-3">
              {dietPlan.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💊 Recommended Supplements</h3>
            <div className="space-y-3">
              {dietPlan.supplements.map((supplement, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-800">{supplement}</span>
                  <span className="text-sm text-gray-500">Daily</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Consult with a healthcare provider before starting any supplements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


