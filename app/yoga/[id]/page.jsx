// app/yoga/[id]/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession } from '@/components/SessionWrapper';

export default function YogaPoseDetailPage() {
  const params = useParams();
  const { user, isAuthenticated } = useSession();
  const [pose, setPose] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const yogaPoses = {
    1: {
      id: 1,
      name: "Surya Namaskar",
      sanskritName: "सूर्य नमस्कार",
      level: "Beginner",
      duration: "15-20 minutes",
      benefits: [
        "Improves cardiovascular health",
        "Increases flexibility",
        "Strengthens muscles",
        "Improves concentration",
        "Boosts metabolism"
      ],
      precautions: [
        "Avoid if you have back injury",
        "Don't practice on empty stomach",
        "Go slow if you're a beginner",
        "Stop if you feel dizzy"
      ],
      steps: [
        {
          name: "Pranamasana (Prayer Pose)",
          description: "Stand upright with feet together. Bring your palms together in front of your chest in prayer position.",
          duration: 30,
          image: "🙏",
          breathing: "Normal breathing"
        },
        {
          name: "Hasta Uttanasana (Raised Arms Pose)",
          description: "Inhale and raise your arms up and back, keeping biceps close to ears.",
          duration: 30,
          image: "🤸‍♀️",
          breathing: "Deep inhale"
        },
        {
          name: "Uttanasana (Forward Fold)",
          description: "Exhale and bend forward from the waist, keeping the spine erect.",
          duration: 30,
          image: "🤸‍♂️",
          breathing: "Exhale completely"
        },
        {
          name: "Ashwa Sanchalanasana (Lunge Pose)",
          description: "Inhale and push your right leg back, drop the knee to the ground and look up.",
          duration: 45,
          image: "🏃‍♀️",
          breathing: "Deep inhale"
        },
        {
          name: "Dandasana (Plank Pose)",
          description: "Take the left leg back and come into a straight plank position.",
          duration: 30,
          image: "🏋️‍♀️",
          breathing: "Hold breath"
        },
        {
          name: "Ashtanga Namaskara (Eight-Point Pose)",
          description: "Gently bring your knees down to the floor and slowly lower your chest and chin.",
          duration: 30,
          image: "🧘‍♀️",
          breathing: "Exhale"
        }
      ],
      tips: [
        "Practice early morning on an empty stomach",
        "Start with 3-5 rounds and gradually increase",
        "Focus on your breathing throughout",
        "Listen to your body and don't force poses",
        "End with a few minutes of relaxation"
      ],
      modifications: {
        beginner: [
          "Use blocks for support in forward fold",
          "Keep slight bend in knees if needed",
          "Take breaks between rounds"
        ],
        advanced: [
          "Hold poses longer",
          "Add variations like jumping back",
          "Increase number of rounds"
        ]
      }
    },
    2: {
      id: 2,
      name: "Vrikshasana",
      sanskritName: "वृक्षासन",
      level: "Beginner",
      duration: "5-10 minutes",
      benefits: [
        "Improves balance and stability",
        "Strengthens legs and core",
        "Improves focus and concentration",
        "Opens hips and stretches groins"
      ],
      precautions: [
        "Avoid if you have knee injury",
        "Don't place foot on the side of knee",
        "Use wall support if needed"
      ],
      steps: [
        {
          name: "Mountain Pose",
          description: "Stand tall with feet together, arms at your sides.",
          duration: 30,
          image: "🧍‍♀️",
          breathing: "Deep, steady breaths"
        },
        {
          name: "Shift Weight",
          description: "Shift your weight to your left foot, keeping it firmly planted.",
          duration: 15,
          image: "⚖️",
          breathing: "Maintain steady breathing"
        },
        {
          name: "Lift Right Foot",
          description: "Bend your right knee and place right foot on inner left thigh.",
          duration: 60,
          image: "🦩",
          breathing: "Breathe deeply and maintain focus"
        },
        {
          name: "Hand Position",
          description: "Bring palms together in prayer position at heart center.",
          duration: 60,
          image: "🙏",
          breathing: "Continue deep breathing"
        },
        {
          name: "Hold and Balance",
          description: "Hold the pose while focusing on a point in front of you.",
          duration: 60,
          image: "🌳",
          breathing: "Calm, steady breaths"
        },
        {
          name: "Release and Repeat",
          description: "Slowly release and repeat on the other side.",
          duration: 60,
          image: "🔄",
          breathing: "Return to normal breathing"
        }
      ],
      tips: [
        "Fix your gaze on a stationary object",
        "Start with foot at ankle if balance is difficult",
        "Engage your core muscles",
        "Press foot into leg and leg into foot"
      ],
      modifications: {
        beginner: [
          "Use wall support",
          "Keep toe on ground, heel on ankle",
          "Hold for shorter duration"
        ],
        advanced: [
          "Close your eyes while balancing",
          "Raise arms overhead",
          "Try different arm variations"
        ]
      }
    }
    // Add more poses here...
  };

  useEffect(() => {
    const foundPose = yogaPoses[parseInt(params.id)];
    if (foundPose) {
      setPose(foundPose);
      setTimeRemaining(foundPose.steps[0]?.duration || 30);
    }
    setLoading(false);
  }, [params.id]);

  useEffect(() => {
    let interval = null;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            // Move to next step or complete session
            if (currentStep < pose.steps.length - 1) {
              setCurrentStep(prev => prev + 1);
              return pose.steps[currentStep + 1].duration;
            } else {
              setSessionCompleted(true);
              setTimerActive(false);
              return 0;
            }
          }
          return time - 1;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining, currentStep, pose]);

  const startTimer = () => {
    setTimerActive(true);
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setCurrentStep(0);
    setTimeRemaining(pose.steps[0]?.duration || 30);
    setSessionCompleted(false);
  };

  const nextStep = () => {
    if (currentStep < pose.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeRemaining(pose.steps[currentStep + 1].duration);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setTimeRemaining(pose.steps[currentStep - 1].duration);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading yoga pose...</p>
        </div>
      </div>
    );
  }

  if (!pose) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Pose Not Found</h1>
          <Link href="/yoga" className="text-green-600 hover:text-green-700 font-medium">
            ← Back to Yoga Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/yoga" className="text-green-600 hover:text-green-700 font-medium mb-4 inline-block">
            ← Back to Yoga Library
          </Link>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{pose.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{pose.sanskritName}</p>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{pose.level}</div>
                  <div className="text-sm text-gray-500">Difficulty</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{pose.duration}</div>
                  <div className="text-sm text-gray-500">Duration</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Session */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Current Step Display */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{pose.steps[currentStep]?.image}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {pose.steps[currentStep]?.name}
              </h2>
              <p className="text-gray-600 mb-4">{pose.steps[currentStep]?.description}</p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Breathing:</strong> {pose.steps[currentStep]?.breathing}
                </p>
              </div>
            </div>

            {/* Timer Display */}
            <div className="text-center mb-6">
              <div className={`text-6xl font-bold mb-4 ${timerActive ? 'text-green-500' : 'text-gray-400'}`}>
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                Step {currentStep + 1} of {pose.steps.length}
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / pose.steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Previous
              </button>
              
              {!timerActive ? (
                <button
                  onClick={startTimer}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Start
                </button>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Pause
                </button>
              )}
              
              <button
                onClick={resetTimer}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Reset
              </button>
              
              <button
                onClick={nextStep}
                disabled={currentStep === pose.steps.length - 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
              >
                Next
              </button>
            </div>

            {sessionCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <h3 className="text-lg font-bold text-green-800 mb-2">🎉 Session Completed!</h3>
                <p className="text-green-700 text-sm mb-4">Great job! You've completed the {pose.name} practice.</p>
                <div className="space-x-2">
                  <button
                    onClick={resetTimer}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    Practice Again
                  </button>
                  <Link href="/yoga">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      More Poses
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Step List */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Practice Steps</h3>
            <div className="space-y-3">
              {pose.steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    idx === currentStep
                      ? 'border-green-500 bg-green-50'
                      : idx < currentStep
                      ? 'border-gray-300 bg-gray-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => {
                    setCurrentStep(idx);
                    setTimeRemaining(step.duration);
                    setTimerActive(false);
                  }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`text-2xl ${idx === currentStep ? 'animate-pulse' : ''}`}>
                      {step.image}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{step.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{step.breathing}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {step.duration}s
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits and Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💪 Benefits</h3>
            <ul className="space-y-2">
              {pose.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">⚠️ Precautions</h3>
            <ul className="space-y-2">
              {pose.precautions.map((precaution, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-red-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700 text-sm">{precaution}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Pro Tips</h3>
            <ul className="space-y-2">
              {pose.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">💡</span>
                  <span className="text-gray-700 text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🌱 Beginner Modifications</h3>
            <ul className="space-y-2">
              {pose.modifications.beginner.map((mod, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">→</span>
                  <span className="text-gray-700 text-sm">{mod}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🔥 Advanced Variations</h3>
            <ul className="space-y-2">
              {pose.modifications.advanced.map((mod, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">→</span>
                  <span className="text-gray-700 text-sm">{mod}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Want More Guided Sessions?</h2>
          <p className="mb-6">Join our premium membership for unlimited access to guided yoga sessions</p>
          <div className="space-x-4">
            <Link href="/plans">
              <button className="bg-white text-green-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                View Plans
              </button>
            </Link>
            <Link href="/consult">
              <button className="border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-green-600 transition-colors">
                Get Personal Coach
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}