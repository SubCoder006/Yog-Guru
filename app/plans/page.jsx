'use client';
import PlanCard from "@/components/PlanCard";

export default function PlansPage() {
  const plans = [
    {
      id: 1,
      name: "Beginner Bliss",
      level: "Perfect for newcomers to yoga",
      duration: "month",
      price: 99,
      color: "bg-gradient-to-br from-green-400 to-green-600",
      popular: false,
      features: [
        "Basic yoga poses and breathing",
        "15-minute daily sessions",
        "Beginner-friendly diet plan",
        "Weekly progress tracking",
        "Mobile app access",
        "Community support"
      ]
    },
    {
      id: 2,
      name: "Intermediate Flow",
      level: "Build strength and flexibility",
      duration: "month",
      price: 159,
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
      popular: true,
      features: [
        "Intermediate poses & sequences",
        "30-minute daily sessions",
        "Personalized nutrition plan",
        "Flexibility & strength tracking",
        "Video tutorials library",
        "Monthly expert consultation",
        "Lifestyle optimization guide"
      ]
    },
    {
      id: 3,
      name: "Advanced Mastery",
      level: "Challenge your limits",
      duration: "month",
      price: 209,
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
      popular: false,
      features: [
        "Advanced poses & meditation",
        "45-minute intensive sessions",
        "Custom meal planning",
        "Body composition analysis",
        "1-on-1 virtual sessions",
        "Advanced breathing techniques",
        "Injury prevention program",
        "Priority customer support"
      ]
    },
    {
      id: 4,
      name: "Expert Transformation",
      level: "Complete mind-body transformation",
      duration: "month",
      price: 299,
      color: "bg-gradient-to-br from-red-400 to-pink-600",
      popular: false,
      features: [
        "Master-level sequences",
        "60-minute daily practice",
        "Ayurvedic meal planning",
        "Comprehensive health tracking",
        "Weekly 1-on-1 sessions",
        "Meditation & mindfulness",
        "Complete lifestyle overhaul",
        "24/7 expert support",
        "Certification pathway"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Choose Your Yoga Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your life with our structured yoga programs. Each plan includes personalized guidance, 
            nutrition support, and lifestyle optimization to help you achieve your wellness goals.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why Choose Yog-Guru?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Proven Results</h3>
              <p className="text-gray-600">Our scientifically-backed programs have helped thousands achieve their wellness goals.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Learn from certified yoga instructors with decades of combined experience.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personalized Plans</h3>
              <p className="text-gray-600">Every plan is customized to your fitness level, goals, and lifestyle preferences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
