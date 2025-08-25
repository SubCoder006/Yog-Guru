'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create Session Context
const SessionContext = createContext();

// Custom hook to use session
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

// Session Provider Component
export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Initialize session on component mount
  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      // Check for existing session in localStorage
      const savedUser = localStorage.getItem('yogaGuruUser');
      const savedToken = localStorage.getItem('yogaGuruToken');

      if (savedUser && savedToken) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error initializing session:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data - replace with actual API response
      const mockUser = {
        id: Date.now(),
        username: credentials.username || credentials.email.split('@')[0],
        email: credentials.email,
        plan: 'beginner',
        joinDate: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.username}`,
        preferences: {
          dietType: 'vegetarian',
          fitnessLevel: 'beginner',
          goals: ['flexibility', 'stress-relief']
        }
      };

      const mockToken = `mock_token_${Date.now()}`;

      // Save to localStorage
      localStorage.setItem('yogaGuruUser', JSON.stringify(mockUser));
      localStorage.setItem('yogaGuruToken', mockToken);

      setUser(mockUser);
      setIsAuthenticated(true);

      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Invalid credentials' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock registration
      const newUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        plan: userData.plan || 'beginner',
        joinDate: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
        preferences: {
          dietType: userData.dietType || 'vegetarian',
          fitnessLevel: userData.fitnessLevel || 'beginner',
          goals: userData.goals || ['flexibility']
        }
      };

      const token = `token_${Date.now()}`;

      localStorage.setItem('yogaGuruUser', JSON.stringify(newUser));
      localStorage.setItem('yogaGuruToken', token);

      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('yogaGuruUser');
    localStorage.removeItem('yogaGuruToken');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/');
  };

  const updateUser = (updatedData) => {
  if (!user) return; // no user yet, nothing to update

  const newUser = { ...user, ...updatedData };

  // Only update if something actually changed
  if (JSON.stringify(user) !== JSON.stringify(newUser)) {
    localStorage.setItem('yogaGuruUser', JSON.stringify(newUser));
    setUser(newUser);
  }
};


  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

// Protected Route Wrapper
export const ProtectedRoute = ({ children, redirectTo = '/auth/login' }) => {
  const { isAuthenticated, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, router, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your yoga journey...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return children;
};

// Public Route Wrapper (redirects authenticated users)
export const PublicRoute = ({ children, redirectTo = '/dashboard' }) => {
  const { isAuthenticated, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, router, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return children;
};

// Session Status Component
export const SessionStatus = () => {
  const { user, isAuthenticated, loading } = useSession();

  if (loading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-sm text-gray-500">Not authenticated</div>;
  }

  return (
    <div className="text-sm text-green-600">
      Welcome, {user.username}!
    </div>
  );
};

// Default export
const SessionWrapper = SessionProvider;
export default SessionWrapper;