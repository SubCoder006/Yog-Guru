'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SocialBridge() {
  const router = useRouter();

  useEffect(() => {
    try {
      // Pull next-auth session from cookie-backed API and map into our local session
      // For now, we just redirect to dashboard; user data will be pulled by UI as needed.
      router.replace('/dashboard');
    } catch {
      router.replace('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p>Signing you in...</p>
      </div>
    </div>
  );
}


