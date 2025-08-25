// app/dashboard/page.jsx
'use client';

import { ProtectedRoute } from '@/components/SessionWrapper';
import DashboardComponent from '@/components/Dashboard';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardComponent />
    </ProtectedRoute>
  );
}
