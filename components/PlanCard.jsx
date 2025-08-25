import React from 'react';
import Link from 'next/link';
import PaymentButton from '@/components/PaymentButton';

const PlanCard = ({ plan }) => {
  const { id, name, level, duration, price, features, color, popular } = plan;

  return (
    <div className={`relative p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${color} ${popular ? 'ring-4 ring-yellow-400' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6 h-[24%]">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-white/90 text-sm">{level}</p>
        <div className="mt-4">
          <span className="text-3xl font-bold text-white">₹{price}</span>
          <span className="text-white/80">/{duration}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6 h-[53%]">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-white/90">
            <svg className="w-5 h-5 text-green-300 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="space-y-3 my-2 h-[20%]">
        <PaymentButton 
          plan={plan} 
          customAmount={price} 
          label={`Buy Now for ₹${price}`} 
        />

        <div className="flex space-x-2 my-2">
          <Link href={`/diet/${id}`} className="flex-1">
            <button className="w-full bg-white/20 backdrop-blur text-white font-medium py-2.5 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 text-sm flex items-center justify-center space-x-2 hover:scale-105">
              <span>🥗</span>
              <span>Diet Plan</span>
            </button>
          </Link>
          <Link href={`/lifestyle/${id}`} className="flex-1">
            <button className="w-full bg-white/20 backdrop-blur text-white font-medium py-2.5 px-4 rounded-lg hover:bg-white/30 transition-all duration-300 text-sm flex items-center justify-center space-x-2 hover:scale-105">
              <span>🧘‍♀️</span>
              <span>Lifestyle</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
