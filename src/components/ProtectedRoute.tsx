
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
    if (loading) return;

    if (requireAuth && !user) {
      window.location.href = '/auth';
      return;
    }

    if (adminOnly && profile?.role !== 'admin') {
      window.location.href = '/';
      return;
    }

    // If user is logged in and trying to access auth page, redirect based on role
    if (user && window.location.pathname === '/auth') {
      if (profile?.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    }
  }, [user, profile, loading, requireAuth, adminOnly]);

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

  return <>{children}</>;
};

export default ProtectedRoute;
