import React from 'react';
import UserDashboard from '@/components/UserDashboard';

/**
 * Dashboard Page
 *
 * Displays the user's learning progress and statistics
 */
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <UserDashboard />
      </div>
    </div>
  );
}
