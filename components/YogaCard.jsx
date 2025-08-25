import Link from "next/link";

export default function YogaCard({ pose }) {
  const levelColors = {
    'Beginner': 'from-green-400 to-green-600',
    'Intermediate': 'from-blue-400 to-blue-600',
    'Advanced': 'from-purple-400 to-purple-600',
    'Expert': 'from-red-400 to-red-600'
  };

  const levelIcons = {
    'Beginner': '🌱',
    'Intermediate': '🌿',
    'Advanced': '🌳',
    'Expert': '🏆'
  };

  return (
    <div className="group p-6 border rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-green-200 to-[#76cbdf] ">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${levelColors[pose.level]} flex items-center justify-center text-2xl`}>
          {levelIcons[pose.level]}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${levelColors[pose.level]} text-white`}>
          {pose.level}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
        {pose.name}
      </h3>
      
      <p className="text-gray-600 mb-4">
        Perfect for {pose.level.toLowerCase()} practitioners
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>15-30 min</span>
        </div>
        
        <Link
          href={`/yoga/${pose.id}`}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
        >
          Start Practice
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}