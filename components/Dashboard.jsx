'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/components/SessionWrapper';

export default function DashboardPage() {
  const { user, updateUser, logout } = useSession();
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [userForm, setUserForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    dietType: user?.preferences?.dietType || 'vegetarian',
    fitnessLevel: user?.preferences?.fitnessLevel || 'beginner',
    goals: user?.preferences?.goals || []
  });

  // Mock progress data
  const progressData = {
    currentStreak: 12,
    totalSessions: 45,
    minutesPracticed: 1350,
    currentPlan: user?.plan || 'beginner',
    nextMilestone: 50,
    achievements: [
      { id: 1, title: '7-Day Streak', icon: '🔥', earned: true, date: '2025-01-15' },
      { id: 2, title: 'First Month', icon: '🗓️', earned: true, date: '2025-01-10' },
      { id: 3, title: 'Flexibility Master', icon: '🤸‍♀️', earned: true, date: '2025-01-20' },
      { id: 4, title: '30-Day Streak', icon: '⚡', earned: false, date: null },
      { id: 5, title: 'Meditation Expert', icon: '🧘‍♂️', earned: false, date: null },
    ]
  };

  const recentSessions = [
    { date: '2025-01-23', pose: 'Surya Namaskar', duration: 30, completed: true },
    { date: '2025-01-22', pose: 'Padmasana', duration: 25, completed: true },
    { date: '2025-01-21', pose: 'Warrior Pose', duration: 20, completed: true },
    { date: '2025-01-20', pose: 'Tree Pose', duration: 15, completed: true },
  ];

  const upcomingSessions = [
    { date: '2025-01-24', time: '07:00 AM', pose: 'Morning Flow', type: 'scheduled' },
    { date: '2025-01-25', time: '06:30 AM', pose: 'Strength Builder', type: 'scheduled' },
    { date: '2025-01-26', time: '12:00 PM', expert: 'Dr. Priya Sharma', type: 'consultation' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  const handleGoalToggle = (goal) => {
    setUserForm(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSaveProfile = () => {
    updateUser({
      username: userForm.username,
      email: userForm.email,
      preferences: {
        dietType: userForm.dietType,
        fitnessLevel: userForm.fitnessLevel,
        goals: userForm.goals
      }
    });
    setEditMode(false);
  };

  const goalOptions = [
    { id: 'flexibility', label: 'Flexibility', icon: '🤸‍♀️' },
    { id: 'strength', label: 'Strength', icon: '💪' },
    { id: 'stress-relief', label: 'Stress Relief', icon: '🧘‍♂️' },
    { id: 'weight-loss', label: 'Weight Loss', icon: '⚖️' },
    { id: 'balance', label: 'Balance', icon: '⚖️' },
    { id: 'mindfulness', label: 'Mindfulness', icon: '🧠' }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={user.image || user.avatar}
                alt={user.username || 'Profile'}
                className="w-16 h-16 rounded-full bg-gray-200 object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.username}!</h1>
                <p className="text-gray-600">Continue your yoga journey</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setEditMode(!editMode)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {editMode ? 'Cancel' : 'Edit Profile'}
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'overview', label: 'Overview', icon: '📊' },
              { key: 'progress', label: 'Progress', icon: '📈' },
              { key: 'sessions', label: 'Sessions', icon: '🧘‍♀️' },
              { key: 'profile', label: 'Profile Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-green-800">{progressData.currentStreak}</div>
                  <div className="text-green-600">Day Streak</div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-blue-800">{progressData.totalSessions}</div>
                  <div className="text-blue-600">Total Sessions</div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-purple-800">{Math.floor(progressData.minutesPracticed / 60)}h {progressData.minutesPracticed % 60}m</div>
                  <div className="text-purple-600">Time Practiced</div>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-orange-800 capitalize">{progressData.currentPlan}</div>
                  <div className="text-orange-600">Current Plan</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="/yoga" className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-xl text-white hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2">Start Practice</h3>
                  <p className="text-green-100">Begin your daily yoga session</p>
                </Link>
                <Link href="/plans" className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-xl text-white hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2">View Plans</h3>
                  <p className="text-blue-100">Explore different yoga programs</p>
                </Link>
                <Link href="/consult" className="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-xl text-white hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-2">Book Consultation</h3>
                  <p className="text-purple-100">Connect with yoga experts</p>
                </Link>
              </div>

              {/* Upcoming Sessions */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Sessions</h2>
                <div className="space-y-3">
                  {upcomingSessions.map((session, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          {session.type === 'consultation' ? '👩‍⚕️' : '🧘‍♀️'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {session.expert || session.pose}
                          </h3>
                          <p className="text-gray-600 text-sm">{session.date} at {session.time}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.type === 'consultation' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {session.type === 'consultation' ? 'Consultation' : 'Practice'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-8">
              {/* Progress Chart Placeholder */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Weekly Progress</h2>
                <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Progress chart would be displayed here</p>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {progressData.achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-4 rounded-lg border-2 ${
                      achievement.earned 
                        ? 'bg-yellow-50 border-yellow-300' 
                        : 'bg-gray-100 border-gray-300'
                    }`}>
                      <div className="text-center">
                        <div className="text-4xl mb-2">{achievement.icon}</div>
                        <h3 className={`font-semibold ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                          {achievement.title}
                        </h3>
                        {achievement.earned && (
                          <p className="text-yellow-600 text-sm mt-1">
                            Earned on {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Milestone */}
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Next Milestone</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-800">
                      {progressData.nextMilestone} Total Sessions
                    </h3>
                    <p className="text-indigo-600">
                      {progressData.nextMilestone - progressData.totalSessions} sessions to go
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="w-20 h-20 bg-indigo-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="bg-indigo-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 rounded-full h-2 transition-all duration-500"
                      style={{ width: `${(progressData.totalSessions / progressData.nextMilestone) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="space-y-8">
              {/* Recent Sessions */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Sessions</h2>
                <div className="space-y-3">
                  {recentSessions.map((session, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          ✅
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{session.pose}</h3>
                          <p className="text-gray-600 text-sm">{session.date} • {session.duration} minutes</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Completed
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Session Calendar Placeholder */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Session Calendar</h2>
                <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Calendar view would be displayed here</p>
                </div>
              </div>
            </div>
          )}

          {/* Profile Settings Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {editMode ? (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                          type="text"
                          name="username"
                          value={userForm.username}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={userForm.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Diet Type</label>
                        <select
                          name="dietType"
                          value={userForm.dietType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="vegetarian">Vegetarian</option>
                          <option value="vegan">Vegan</option>
                          <option value="non-vegetarian">Non-Vegetarian</option>
                          <option value="keto">Keto</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fitness Level</label>
                        <select
                          name="fitnessLevel"
                          value={userForm.fitnessLevel}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Goals</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {goalOptions.map((goal) => (
                          <div
                            key={goal.id}
                            onClick={() => handleGoalToggle(goal.id)}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors text-center ${
                              userForm.goals.includes(goal.id)
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-blue-300'
                            }`}
                          >
                            <div className="text-2xl mb-1">{goal.icon}</div>
                            <div className="text-xs font-medium">{goal.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Personal Details</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Username:</span> {user.username}</p>
                        <p><span className="font-medium">Email:</span> {user.email}</p>
                        <p><span className="font-medium">Member since:</span> {new Date(user.joinDate).toLocaleDateString()}</p>
                        <p><span className="font-medium">Current Plan:</span> <span className="capitalize">{user.plan}</span></p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Preferences</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Diet Type:</span> {user.preferences?.dietType}</p>
                        <p><span className="font-medium">Fitness Level:</span> {user.preferences?.fitnessLevel}</p>
                        <p><span className="font-medium">Goals:</span> {user.preferences?.goals?.join(', ') || 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}