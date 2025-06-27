
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  adminOnly = false 
}) => {
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    console.log('ProtectedRoute - user:', user?.email, 'profile:', profile?.role, 'loading:', loading);
    
    if (loading) {
      console.log('Still loading, waiting...');
      return;
    }

    const currentPath = window.location.pathname;
    console.log('Current path:', currentPath);

    // If authentication is required but user is not logged in
    if (requireAuth && !user) {
      console.log('User not authenticated, redirecting to auth');
      window.location.href = '/auth';
      return;
    }

    // If admin access is required but user is not admin
    if (adminOnly && profile?.role !== 'admin') {
      console.log('User is not admin, redirecting to home');
      window.location.href = '/';
      return;
    }

    // If user is authenticated and on auth page, redirect to home
    if (user && profile && currentPath === '/auth') {
      console.log('Authenticated user on auth page, redirecting to home');
      window.location.href = '/';
      return;
    }
  }, [user, profile, loading, requireAuth, adminOnly]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-muthu-warm-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair font-bold text-muthu-dark-brown mb-4">
            MUTHU's
          </h2>
          <p className="text-muthu-dark-brown/70">Loading...</p>
        </div>
      </div>
    );
  }

  // Show children if all conditions are met
  return <>{children}</>;
};

export default ProtectedRoute;
