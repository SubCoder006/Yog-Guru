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
      duration: '15-30 min daily'
    },
    2: {
      name: 'Intermediate Lifestyle Plan', 
      focus: 'Strengthening mind-body connection',
      duration: '30-45 min daily'
    },
    3: {
      name: 'Advanced Lifestyle Plan',
      focus: 'Peak performance optimization',
      duration: '45-60 min daily'
    },
    4: {
      name: 'Expert Lifestyle Plan',
      focus: 'Complete transformation',
      duration: '60-90 min daily'
    }
  };

  const dailyRoutines = {
    1: { // Beginner
      morning: [
        { time: '6:00 AM', activity: 'Wake up with gratitude', duration: '2 min' },
        { time: '6:05 AM', activity: 'Warm water with lemon', duration: '5 min' },
        { time: '6:10 AM', activity: 'Gentle stretching', duration: '10 min' },
        { time: '6:20 AM', activity: 'Basic breathing exercise', duration: '5 min' },
        { time: '6:30 AM', activity: 'Light breakfast', duration: '15 min' }
      ],
      evening: [
        { time: '7:00 PM', activity: 'Dinner (light)', duration: '20 min' },
        { time: '8:00 PM', activity: 'Evening walk', duration: '15 min' },
        { time: '8:30 PM', activity: 'Relaxing yoga poses', duration: '10 min' },
        { time: '9:00 PM', activity: 'Meditation/reflection', duration: '5 min' },
        { time: '10:00 PM', activity: 'Sleep preparation', duration: '15 min' }
      ]
    },
    2: { // Intermediate
      morning: [
        { time: '5:45 AM', activity: 'Wake up & intention setting', duration: '5 min' },
        { time: '5:50 AM', activity: 'Oil pulling', duration: '10 min' },
        { time: '6:00 AM', activity: 'Pranayama practice', duration: '15 min' },
        { time: '6:15 AM', activity: 'Yoga sequence', duration: '20 min' },
        { time: '6:45 AM', activity: 'Cold shower', duration: '5 min' },
        { time: '7:00 AM', activity: 'Healthy breakfast', duration: '20 min' }
      ],
      evening: [
        { time: '6:30 PM', activity: 'Balanced dinner', duration: '25 min' },
        { time: '7:30 PM', activity: 'Nature connection', duration: '20 min' },
        { time: '8:00 PM', activity: 'Restorative yoga', duration: '15 min' },
        { time: '8:30 PM', activity: 'Journaling', duration: '10 min' },
        { time: '9:30 PM', activity: 'Digital detox begins', duration: '30 min' }
      ]
    }
  };

  const weeklySchedule = [
    { day: 'Monday', focus: 'Strength & Foundation', activities: ['Core yoga', 'Meal prep', 'Goal setting'] },
    { day: 'Tuesday', focus: 'Flexibility & Flow', activities: ['Vinyasa flow', 'Nature walk', 'Reading'] },
    { day: 'Wednesday', focus: 'Balance & Stability', activities: ['Balance poses', 'Meditation', 'Social connection'] },
    { day: 'Thursday', focus: 'Power & Energy', activities: ['Power yoga', 'Creative time', 'Planning'] },
    { day: 'Friday', focus: 'Release & Restore', activities: ['Yin yoga', 'Relaxation', 'Entertainment'] },
    { day: 'Saturday', focus: 'Adventure & Joy', activities: ['Outdoor activity', 'Cooking', 'Hobbies'] },
    { day: 'Sunday', focus: 'Rest & Reflection', activities: ['Gentle yoga', 'Reflection', 'Preparation'] }
  ];

  const mentalWellnessPractices = [
    {
      title: 'Daily Meditation',
      description: 'Start with 5 minutes and gradually increase',
      benefits: ['Reduces stress', 'Improves focus', 'Enhances emotional regulation'],
      techniques: ['Breath awareness', 'Body scan', 'Loving-kindness', 'Mantra repetition']
    },
    {
      title: 'Mindful Breathing',
      description: '4-7-8 breathing technique for instant calm',
      benefits: ['Activates parasympathetic nervous system', 'Reduces anxiety', 'Improves sleep'],
      techniques: ['Inhale 4 counts', 'Hold 7 counts', 'Exhale 8 counts', 'Repeat 4 cycles']
    },
    {
      title: 'Gratitude Practice',
      description: 'Write 3 things you\'re grateful for daily',
      benefits: ['Increases happiness', 'Improves relationships', 'Enhances resilience'],
      techniques: ['Morning gratitude', 'Evening reflection', 'Gratitude letters', 'Appreciation walks']
    },
    {
      title: 'Digital Detox',
      description: 'Scheduled breaks from screens and social media',
      benefits: ['Improves sleep quality', 'Reduces comparison', 'Enhances real connections'],
      techniques: ['Phone-free meals', 'No screens 1hr before bed', 'Weekend digital breaks', 'Notification limits']
    }
  ];

  const environmentalWellness = {
    home: [
      'Create a dedicated meditation/yoga space',
      'Use natural lighting when possible',
      'Keep plants for better air quality',
      'Minimize clutter for mental clarity',
      'Use calming colors and natural materials'
    ],
    work: [
      'Take regular breaks every hour',
      'Practice desk yoga stretches',
      'Keep healthy snacks nearby',
      'Stay hydrated throughout the day',
      'Create boundaries between work and personal time'
    ],
    social: [
      'Surround yourself with positive people',
      'Limit toxic relationships',
      'Join yoga or wellness communities',
      'Practice active listening',
      'Set healthy boundaries'
    ]
  };

  const currentPlan = planLifestyleData[planId] || planLifestyleData[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {currentPlan.name}
          </h1>
          <p className="text-lg text-gray-600">
            {currentPlan.focus} • {currentPlan.duration}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'routine', label: 'Daily Routine' },
              { key: 'weekly', label: 'Weekly Plan' },
              { key: 'mental', label: 'Mental Wellness' },
              { key: 'environment', label: 'Environment' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Daily Routine Tab */}
          {activeTab === 'routine' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Morning Routine */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-orange-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2L13.09 8.26L20 9L14 14.74L15.18 21.02L10 18.266L4.82 21.02L6 14.74L0 9L6.91 8.26L10 2Z" />
                    </svg>
                    Morning Ritual
                  </h3>
                  <div className="space-y-3">
                    {(dailyRoutines[planId] || dailyRoutines[1]).morning.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <span className="font-medium text-orange-700">{item.time}</span>
                          <p className="text-gray-700">{item.activity}</p>
                        </div>
                        <span className="text-sm text-gray-500">{item.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evening Routine */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    Evening Wind-Down
                  </h3>
                  <div className="space-y-3">
                    {(dailyRoutines[planId] || dailyRoutines[1]).evening.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <span className="font-medium text-purple-700">{item.time}</span>
                          <p className="text-gray-700">{item.activity}</p>
                        </div>
                        <span className="text-sm text-gray-500">{item.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Weekly Plan Tab */}
          {activeTab === 'weekly' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">7-Day Wellness Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weeklySchedule.map((day, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-teal-800 mb-2">{day.day}</h4>
                    <p className="text-teal-600 font-medium mb-4">{day.focus}</p>
                    <ul className="space-y-2">
                      {day.activities.map((activity, actIdx) => (
                        <li key={actIdx} className="flex items-center text-gray-700">
                          <svg className="w-4 h-4 text-teal-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                          </svg>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mental Wellness Tab */}
          {activeTab === 'mental' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Mental & Emotional Wellbeing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mentalWellnessPractices.map((practice, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-indigo-800 mb-2">{practice.title}</h4>
                    <p className="text-gray-600 mb-4">{practice.description}</p>
                    
                    <div className="mb-4">
                      <h5 className="font-semibold text-indigo-700 mb-2">Benefits:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {practice.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-center">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-indigo-700 mb-2">Techniques:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {practice.techniques.map((technique, tIdx) => (
                          <li key={tIdx} className="flex items-center">
                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                            {technique}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Environment Tab */}
          {activeTab === 'environment' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Creating Your Wellness Environment</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Home Environment */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-emerald-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Home Space
                  </h4>
                  <ul className="space-y-3">
                    {environmentalWellness.home.map((tip, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <svg className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Work Environment */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-cyan-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                    </svg>
                    Work Balance
                  </h4>
                  <ul className="space-y-3">
                    {environmentalWellness.work.map((tip, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <svg className="w-4 h-4 text-cyan-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Environment */}
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-rose-800 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    Social Wellness
                  </h4>
                  <ul className="space-y-3">
                    {environmentalWellness.social.map((tip, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <svg className="w-4 h-4 text-rose-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Tracking */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Track Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
              <div className="text-3xl font-bold text-green-800">21</div>
              <div className="text-sm text-green-600">Days to Build Habit</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
              <div className="text-3xl font-bold text-blue-800">66</div>
              <div className="text-sm text-blue-600">Days for Automatic Behavior</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
              <div className="text-3xl font-bold text-purple-800">90</div>
              <div className="text-sm text-purple-600">Days for Lifestyle Change</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg">
              <div className="text-3xl font-bold text-orange-800">365</div>
              <div className="text-sm text-orange-600">Days for Complete Transformation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}