'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';

export default function LifestylePage() {
  const params = useParams();
  const planId = params?.id;
  const [activeTab, setActiveTab] = useState('routine');

  // Plan-specific lifestyle data
  const planLifestyleData = {
    1: {
      name: 'Beginner Lifestyle Plan',
      focus: 'Building healthy foundations',
      duration: '15-30 min daily',
      gradient: 'from-green-400 to-blue-500',
      description: 'Perfect for those starting their wellness journey with gentle, sustainable practices.'
    },
    2: {
      name: 'Intermediate Lifestyle Plan', 
      focus: 'Strengthening mind-body connection',
      duration: '30-45 min daily',
      gradient: 'from-purple-400 to-pink-500',
      description: 'Deepen your practice with advanced breathing techniques and mindful movement.'
    },
    3: {
      name: 'Advanced Lifestyle Plan',
      focus: 'Peak performance optimization',
      duration: '45-60 min daily',
      gradient: 'from-red-400 to-orange-500',
      description: 'Intensive practices for those seeking complete physical and mental transformation.'
    },
    4: {
      name: 'Expert Lifestyle Plan',
      focus: 'Complete holistic transformation',
      duration: '60-90 min daily',
      gradient: 'from-indigo-400 to-cyan-500',
      description: 'Master-level practices combining ancient wisdom with modern wellness science.'
    }
  };

  const dailyRoutines = {
    1: { // Beginner
      morning: [
        { time: '6:00 AM', activity: 'Wake up with gratitude meditation', duration: '5 min', icon: '🌅' },
        { time: '6:05 AM', activity: 'Warm water with lemon', duration: '5 min', icon: '🍋' },
        { time: '6:10 AM', activity: 'Gentle stretching sequence', duration: '15 min', icon: '🤸‍♀️' },
        { time: '6:25 AM', activity: 'Basic breathing exercise', duration: '5 min', icon: '🧘‍♀️' },
        { time: '6:30 AM', activity: 'Nutritious breakfast', duration: '20 min', icon: '🥣' }
      ],
      evening: [
        { time: '7:00 PM', activity: 'Light dinner preparation', duration: '30 min', icon: '🥗' },
        { time: '8:00 PM', activity: 'Peaceful evening walk', duration: '20 min', icon: '🚶‍♀️' },
        { time: '8:30 PM', activity: 'Restorative yoga poses', duration: '15 min', icon: '🧘' },
        { time: '9:00 PM', activity: 'Reflection & journaling', duration: '10 min', icon: '📝' },
        { time: '10:00 PM', activity: 'Sleep preparation ritual', duration: '15 min', icon: '😴' }
      ]
    },
    2: { // Intermediate
      morning: [
        { time: '5:45 AM', activity: 'Intention setting meditation', duration: '10 min', icon: '🌅' },
        { time: '5:55 AM', activity: 'Oil pulling practice', duration: '15 min', icon: '🥥' },
        { time: '6:10 AM', activity: 'Pranayama breathing', duration: '20 min', icon: '🫁' },
        { time: '6:30 AM', activity: 'Dynamic yoga flow', duration: '25 min', icon: '🤸‍♀️' },
        { time: '6:55 AM', activity: 'Cold shower therapy', duration: '5 min', icon: '🚿' },
        { time: '7:00 AM', activity: 'Protein-rich breakfast', duration: '25 min', icon: '🍳' }
      ],
      evening: [
        { time: '6:30 PM', activity: 'Mindful dinner preparation', duration: '30 min', icon: '🍽️' },
        { time: '7:30 PM', activity: 'Nature connection walk', duration: '25 min', icon: '🌳' },
        { time: '8:00 PM', activity: 'Yin yoga practice', duration: '20 min', icon: '🧘‍♀️' },
        { time: '8:30 PM', activity: 'Gratitude journaling', duration: '15 min', icon: '📖' },
        { time: '9:00 PM', activity: 'Digital detox begins', duration: '60 min', icon: '📱' }
      ]
    },
    3: { // Advanced
      morning: [
        { time: '5:30 AM', activity: 'Deep meditation practice', duration: '20 min', icon: '🧘‍♂️' },
        { time: '5:50 AM', activity: 'Advanced pranayama', duration: '25 min', icon: '🌬️' },
        { time: '6:15 AM', activity: 'Power yoga sequence', duration: '35 min', icon: '🔥' },
        { time: '6:50 AM', activity: 'Ice bath therapy', duration: '10 min', icon: '🧊' },
        { time: '7:00 AM', activity: 'Superfood breakfast', duration: '30 min', icon: '🥑' }
      ],
      evening: [
        { time: '6:00 PM', activity: 'Intermittent fasting break', duration: '45 min', icon: '🍲' },
        { time: '7:00 PM', activity: 'High-intensity movement', duration: '30 min', icon: '💪' },
        { time: '7:30 PM', activity: 'Advanced breathwork', duration: '20 min', icon: '🫁' },
        { time: '8:00 PM', activity: 'Philosophical study', duration: '30 min', icon: '📚' },
        { time: '8:30 PM', activity: 'Complete digital silence', duration: '90 min', icon: '🔇' }
      ]
    },
    4: { // Expert
      morning: [
        { time: '5:00 AM', activity: 'Extended meditation', duration: '30 min', icon: '🕉️' },
        { time: '5:30 AM', activity: 'Advanced breathing mastery', duration: '30 min', icon: '🌊' },
        { time: '6:00 AM', activity: 'Intensive yoga practice', duration: '45 min', icon: '🧘‍♀️' },
        { time: '6:45 AM', activity: 'Cold exposure training', duration: '15 min', icon: '❄️' },
        { time: '7:00 AM', activity: 'Conscious nutrition', duration: '30 min', icon: '🌱' }
      ],
      evening: [
        { time: '5:30 PM', activity: 'Mindful eating ceremony', duration: '60 min', icon: '🍽️' },
        { time: '6:30 PM', activity: 'Movement meditation', duration: '40 min', icon: '🌊' },
        { time: '7:10 PM', activity: 'Breathwork mastery', duration: '30 min', icon: '🫁' },
        { time: '7:40 PM', activity: 'Wisdom study & reflection', duration: '40 min', icon: '📜' },
        { time: '8:20 PM', activity: 'Complete stillness practice', duration: '100 min', icon: '🧘‍♂️' }
      ]
    }
  };

  const weeklySchedule = [
    { 
      day: 'Monday', 
      focus: 'Foundation & Strength', 
      activities: ['Core stability yoga', 'Meal prep session', 'Goal setting ritual'],
      gradient: 'from-red-400 to-pink-500'
    },
    { 
      day: 'Tuesday', 
      focus: 'Flow & Flexibility', 
      activities: ['Dynamic vinyasa', 'Nature immersion', 'Creative expression'],
      gradient: 'from-blue-400 to-cyan-500'
    },
    { 
      day: 'Wednesday', 
      focus: 'Balance & Stability', 
      activities: ['Balance poses', 'Mindfulness practice', 'Social connection'],
      gradient: 'from-green-400 to-teal-500'
    },
    { 
      day: 'Thursday', 
      focus: 'Power & Energy', 
      activities: ['Power yoga flow', 'Creative projects', 'Strategic planning'],
      gradient: 'from-yellow-400 to-orange-500'
    },
    { 
      day: 'Friday', 
      focus: 'Release & Restore', 
      activities: ['Yin yoga practice', 'Deep relaxation', 'Entertainment time'],
      gradient: 'from-purple-400 to-indigo-500'
    },
    { 
      day: 'Saturday', 
      focus: 'Adventure & Joy', 
      activities: ['Outdoor adventure', 'Cooking exploration', 'Hobby time'],
      gradient: 'from-emerald-400 to-blue-500'
    },
    { 
      day: 'Sunday', 
      focus: 'Rest & Reflection', 
      activities: ['Gentle restoration', 'Weekly reflection', 'Week preparation'],
      gradient: 'from-violet-400 to-purple-500'
    }
  ];

  const mentalWellnessPractices = [
    {
      title: 'Mindfulness Meditation',
      description: 'Daily practice for mental clarity and emotional balance',
      benefits: ['Reduces stress and anxiety', 'Improves focus and concentration', 'Enhances emotional regulation'],
      techniques: ['Breath awareness', 'Body scan meditation', 'Loving-kindness practice', 'Mantra meditation'],
      gradient: 'from-blue-400 to-purple-500'
    },
    {
      title: 'Breathwork Mastery',
      description: 'Powerful breathing techniques for instant transformation',
      benefits: ['Activates parasympathetic nervous system', 'Reduces anxiety instantly', 'Improves sleep quality'],
      techniques: ['4-7-8 breathing', 'Box breathing', 'Wim Hof method', 'Alternate nostril breathing'],
      gradient: 'from-cyan-400 to-teal-500'
    },
    {
      title: 'Gratitude & Positivity',
      description: 'Daily practices to cultivate appreciation and joy',
      benefits: ['Increases overall happiness', 'Improves relationships', 'Builds resilience'],
      techniques: ['Morning gratitude ritual', 'Evening reflection', 'Gratitude letters', 'Appreciation meditation'],
      gradient: 'from-pink-400 to-rose-500'
    },
    {
      title: 'Digital Wellness',
      description: 'Healthy relationship with technology and screens',
      benefits: ['Improves sleep patterns', 'Reduces comparison and anxiety', 'Enhances real connections'],
      techniques: ['Phone-free meals', 'Screen curfew', 'Digital sabbaths', 'Mindful consumption'],
      gradient: 'from-orange-400 to-red-500'
    }
  ];

  const environmentalWellness = {
    home: {
      title: 'Sacred Home Space',
      tips: [
        'Create a dedicated meditation corner with plants',
        'Use natural lighting and open windows daily',
        'Keep crystals and essential oils for energy',
        'Maintain clutter-free spaces for mental clarity',
        'Use calming colors and natural materials'
      ],
      gradient: 'from-green-400 to-emerald-500'
    },
    work: {
      title: 'Mindful Work Environment',
      tips: [
        'Take conscious breathing breaks every hour',
        'Practice desk yoga and stretching',
        'Keep healthy snacks and herbal teas nearby',
        'Stay hydrated with reminders throughout day',
        'Create clear work-life boundaries'
      ],
      gradient: 'from-blue-400 to-indigo-500'
    },
    social: {
      title: 'Conscious Relationships',
      tips: [
        'Surround yourself with positive, growth-minded people',
        'Practice compassionate communication',
        'Join wellness and spiritual communities',
        'Develop active listening skills',
        'Set healthy emotional boundaries'
      ],
      gradient: 'from-purple-400 to-pink-500'
    }
  };

  const currentPlan = planLifestyleData[planId] || planLifestyleData[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className={`relative h-96 overflow-hidden bg-gradient-to-br ${currentPlan.gradient}`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl px-4">
            <h1 className="text-5xl font-bold text-white mb-4">
              {currentPlan.name}
            </h1>
            <p className="text-xl text-white/90 mb-2">
              {currentPlan.focus}
            </p>
            <p className="text-lg text-white/80">
              {currentPlan.duration} • {currentPlan.description}
            </p>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-white/20 text-6xl">🧘‍♀️</div>
        <div className="absolute bottom-10 right-10 text-white/20 text-6xl">🌟</div>
        <div className="absolute top-1/2 right-20 text-white/10 text-8xl">🕉️</div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* Tab Navigation */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { key: 'routine', label: '🌅 Daily Routine', color: 'from-orange-500 to-pink-500' },
              { key: 'weekly', label: '📅 Weekly Plan', color: 'from-green-500 to-teal-500' },
              { key: 'mental', label: '🧘‍♀️ Mental Wellness', color: 'from-purple-500 to-indigo-500' },
              { key: 'environment', label: '🏡 Environment', color: 'from-blue-500 to-cyan-500' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.key
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Daily Routine Tab */}
          {activeTab === 'routine' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Morning Routine */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-3xl font-bold text-orange-800 mb-6 flex items-center">
                    <span className="text-4xl mr-3">🌅</span>
                    Morning Sacred Ritual
                  </h3>
                  <div className="space-y-4">
                    {(dailyRoutines[planId] || dailyRoutines[1]).morning.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/60 backdrop-blur rounded-xl hover:bg-white/80 transition-all duration-300">
                        <div className="flex items-center">
                          <span className="text-2xl mr-4">{item.icon}</span>
                          <div>
                            <span className="font-bold text-orange-700 text-lg">{item.time}</span>
                            <p className="text-gray-700 font-medium">{item.activity}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 font-semibold bg-white/50 px-3 py-1 rounded-full">{item.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evening Routine */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
                    <span className="text-4xl mr-3">🌙</span>
                    Evening Wind-Down
                  </h3>
                  <div className="space-y-4">
                    {(dailyRoutines[planId] || dailyRoutines[1]).evening.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/60 backdrop-blur rounded-xl hover:bg-white/80 transition-all duration-300">
                        <div className="flex items-center">
                          <span className="text-2xl mr-4">{item.icon}</span>
                          <div>
                            <span className="font-bold text-purple-700 text-lg">{item.time}</span>
                            <p className="text-gray-700 font-medium">{item.activity}</p>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 font-semibold bg-white/50 px-3 py-1 rounded-full">{item.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Plan Tab */}
          {activeTab === 'weekly' && (
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">🗓️ 7-Day Transformation Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {weeklySchedule.map((day, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className={`relative h-48 bg-gradient-to-br ${day.gradient}`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-4 left-4">
                        <h4 className="text-2xl font-bold text-white">{day.day}</h4>
                        <p className="text-white/90 font-medium">{day.focus}</p>
                      </div>
                      {/* Decorative emoji */}
                      <div className="absolute top-4 right-4 text-4xl opacity-30">
                        {idx === 0 ? '💪' : idx === 1 ? '🌊' : idx === 2 ? '⚖️' : idx === 3 ? '⚡' : idx === 4 ? '🕊️' : idx === 5 ? '🎉' : '🧘‍♂️'}
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {day.activities.map((activity, actIdx) => (
                          <li key={actIdx} className="flex items-center text-gray-700">
                            <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            <span className="font-medium">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mental Wellness Tab */}
          {activeTab === 'mental' && (
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">🧠 Mental & Emotional Transformation</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {mentalWellnessPractices.map((practice, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className={`relative h-56 bg-gradient-to-br ${practice.gradient}`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-4 left-4">
                        <h4 className="text-2xl font-bold text-white">{practice.title}</h4>
                      </div>
                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 text-4xl text-white/30">
                        {idx === 0 ? '🧘‍♀️' : idx === 1 ? '🫁' : idx === 2 ? '🙏' : '📱'}
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 leading-relaxed">{practice.description}</p>
                      
                      <div className="mb-6">
                        <h5 className="font-bold text-purple-700 mb-3 text-lg">✨ Benefits:</h5>
                        <ul className="space-y-2">
                          {practice.benefits.map((benefit, bIdx) => (
                            <li key={bIdx} className="flex items-start">
                              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              <span className="text-gray-600">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-bold text-indigo-700 mb-3 text-lg">🎯 Techniques:</h5>
                        <ul className="space-y-2">
                          {practice.techniques.map((technique, tIdx) => (
                            <li key={tIdx} className="flex items-start">
                              <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              <span className="text-gray-600">{technique}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Environment Tab */}
          {activeTab === 'environment' && (
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">🏡 Creating Your Wellness Sanctuary</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {Object.entries(environmentalWellness).map(([key, environment]) => (
                  <div key={key} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className={`relative h-56 bg-gradient-to-br ${environment.gradient}`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute bottom-4 left-4">
                        <h4 className="text-2xl font-bold text-white">{environment.title}</h4>
                      </div>
                      {/* Decorative emoji */}
                      <div className="absolute top-4 right-4 text-4xl text-white/30">
                        {key === 'home' ? '🏠' : key === 'work' ? '💼' : '👥'}
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-4">
                        {environment.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start text-gray-700">
                            <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            <span className="font-medium leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Progress Tracking Section */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">📈 Your Transformation Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-bold text-green-800 mb-2">21</div>
              <div className="text-green-600 font-semibold">Days to Build Habit</div>
              <div className="text-sm text-green-700 mt-2">Neural pathway formation</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-cyan-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-bold text-blue-800 mb-2">66</div>
              <div className="text-blue-600 font-semibold">Days for Automatic Behavior</div>
              <div className="text-sm text-blue-700 mt-2">Subconscious integration</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-bold text-purple-800 mb-2">90</div>
              <div className="text-purple-600 font-semibold">Days for Lifestyle Change</div>
              <div className="text-sm text-purple-700 mt-2">Complete identity shift</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-100 to-red-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-5xl font-bold text-orange-800 mb-2">365</div>
              <div className="text-orange-600 font-semibold">Days for Transformation</div>
              <div className="text-sm text-orange-700 mt-2">Complete metamorphosis</div>
            </div>
          </div>
        </div>

        {/* Inspirational Quote Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl text-center">
          <blockquote className="text-2xl font-semibold text-white mb-4">
            "The journey of a thousand miles begins with a single step. Your wellness transformation starts today."
          </blockquote>
          <p className="text-purple-100 text-lg">Ancient Wisdom • Modern Application</p>
        </div>
      </div>
    </div>
  );
}
