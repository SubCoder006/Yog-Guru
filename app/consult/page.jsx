'use client';

import React, { useState } from 'react';
import PaymentButton from '@/components/PaymentButton';
import Link from 'next/link';

export default function ConsultPage() {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: 'general',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const experts = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      title: 'Certified Yoga Therapist',
      experience: '15+ years',
      specialization: 'Therapeutic Yoga, Stress Management',
      rating: 4.9,
      reviews: 247,
      languages: ['English', 'Hindi', 'Sanskrit'],
      price: 75,
      avatar: 'https://directory.uthscsa.edu/sites/directory/files/sharma_priya.jpg',
      bio: 'Specializes in therapeutic yoga and has helped thousands overcome chronic pain and stress.',
      certifications: ['RYT-500', 'Yoga Therapy Certification', 'Ayurveda Practitioner'],
      availability: ['Monday', 'Wednesday', 'Friday', 'Saturday']
    },
    {
      id: 2,
      name: 'Guru Rajesh Kumar',
      title: 'Traditional Hatha Yoga Master',
      experience: '25+ years',
      specialization: 'Traditional Hatha, Pranayama',
      rating: 5.0,
      reviews: 189,
      languages: ['English', 'Hindi', 'Bengali'],
      price: 90,
      avatar: 'https://guruhospitals.com/wp-content/uploads/2023/11/RAJESH-KUMAR-1.jpg',
      bio: 'Traditional yoga master with deep knowledge of ancient practices and breathing techniques.',
      certifications: ['Hatha Yoga Master', 'Pranayama Specialist', 'Meditation Teacher'],
      availability: ['Tuesday', 'Thursday', 'Sunday']
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      title: 'Vinyasa Flow Specialist',
      experience: '10+ years',
      specialization: 'Vinyasa Flow, Power Yoga',
      rating: 4.8,
      reviews: 156,
      languages: ['English', 'Spanish'],
      price: 65,
      avatar: 'https://www.adrianalajacona.com/wp-content/uploads/2016/09/team-1.jpg',
      bio: 'Dynamic yoga instructor focused on building strength and flexibility through flowing sequences.',
      certifications: ['RYT-200', 'Vinyasa Specialist', 'Anatomy Training'],
      availability: ['Monday', 'Tuesday', 'Thursday', 'Saturday']
    },
    {
      id: 4,
      name: 'Dr. Ananda Krishnan',
      title: 'Meditation & Mindfulness Expert',
      experience: '20+ years',
      specialization: 'Meditation, Mindfulness, Philosophy',
      rating: 4.9,
      reviews: 203,
      languages: ['English', 'Tamil', 'Sanskrit'],
      price: 80,
      avatar: 'https://www.persistent.com/wp-content/uploads/2022/04/Anand-Krishnan.jpg',
      bio: 'Philosophy scholar and meditation expert helping people find inner peace and clarity.',
      certifications: ['PhD in Yoga Philosophy', 'Meditation Teacher', 'Mindfulness Instructor'],
      availability: ['Wednesday', 'Friday', 'Saturday', 'Sunday']
    }
  ];

  const consultationTypes = [
    { id: 'general', label: 'General Consultation', description: 'Overall wellness and yoga guidance' },
    { id: 'therapy', label: 'Therapeutic Session', description: 'Address specific health concerns' },
    { id: 'nutrition', label: 'Nutrition Counseling', description: 'Diet and lifestyle optimization' },
    { id: 'meditation', label: 'Meditation Guidance', description: 'Mindfulness and mental wellness' },
    { id: 'prenatal', label: 'Prenatal Yoga', description: 'Safe practice during pregnancy' },
    { id: 'senior', label: 'Senior Yoga', description: 'Gentle practice for older adults' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBooking = (e) => {
    e.preventDefault();
    // Here you would integrate with your booking system
    alert(`Booking request submitted for ${selectedExpert.name}! We'll contact you soon.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Expert Yoga Consultations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with certified yoga experts for personalized guidance, therapeutic sessions, 
            and deep insights into your yoga practice.
          </p>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-12">
          {experts.map((expert) => (
            <div key={expert.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4 mb-6">
                <img 
                  src={`${expert.avatar}?v=${expert.id}`}
                  alt={expert.name}
                  className="w-20 h-20 rounded-full bg-gray-200 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{expert.name}</h3>
                  <p className="text-indigo-600 font-medium">{expert.title}</p>
                  <p className="text-gray-600 text-sm">{expert.experience} experience</p>
                  <div className="flex items-center mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(expert.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{expert.rating} ({expert.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">${expert.price}</div>
                  <div className="text-sm text-gray-500">per session</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Specialization</h4>
                  <p className="text-gray-600 text-sm">{expert.specialization}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">About</h4>
                  <p className="text-gray-600 text-sm">{expert.bio}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      {expert.languages.map((lang, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Available</h4>
                    <div className="flex flex-wrap gap-1">
                      {expert.availability.slice(0, 2).map((day, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {day.slice(0, 3)}
                        </span>
                      ))}
                      {expert.availability.length > 2 && (
                        <span className="text-xs text-gray-500">+{expert.availability.length - 2} more</span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-1">
                    {expert.certifications.map((cert, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedExpert(expert)}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Services Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Consultation Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultationTypes.map((type) => (
              <div key={type.id} className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{type.label}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Modal */}
        {selectedExpert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-90vh overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Book with {selectedExpert.name}
                </h2>
                <button
                  onClick={() => setSelectedExpert(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={bookingForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={bookingForm.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Type</label>
                  <select
                    name="consultationType"
                    value={bookingForm.consultationType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {consultationTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={bookingForm.preferredDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                    <select
                      name="preferredTime"
                      value={bookingForm.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={bookingForm.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Any specific concerns or questions..."
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Total Cost:</span>
                    <span className="text-2xl font-bold text-green-600">${selectedExpert.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">60-minute consultation session</p>
                </div>
                <PaymentButton customAmount={selectedExpert.price} label={`Buy Now for ₹${selectedExpert.price}`} />
              </form>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How long is each session?</h3>
              <p className="text-gray-600 text-sm">Each consultation session is 60 minutes long, giving you ample time to discuss your needs and receive personalized guidance.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Are sessions conducted online?</h3>
              <p className="text-gray-600 text-sm">Yes, all consultations are conducted via secure video calls, allowing you to connect from the comfort of your home.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I reschedule my appointment?</h3>
              <p className="text-gray-600 text-sm">Yes, you can reschedule up to 24 hours before your appointment. Contact us to make changes to your booking.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What should I prepare for the session?</h3>
              <p className="text-gray-600 text-sm">Have a quiet space, stable internet connection, and any specific questions or concerns you'd like to discuss with the expert.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}