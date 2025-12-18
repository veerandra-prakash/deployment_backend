import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';
import { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary.jsx';

const ProtectedRoute = ({ children }) => {
  const { token, user } = useUser();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  useEffect(() => {
    // Small delay to ensure context is loaded
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Clear invalid data if needed - MOVED BEFORE CONDITIONAL RETURNS
  useEffect(() => {
    if (!isChecking) {
      // STRICT CHECK: Must have BOTH token AND user with valid properties
      if (!token || !user || !user.id || !user.username) {
        // Clear invalid data
        if (token || user) {
          localStorage.removeItem("livpay_token");
          localStorage.removeItem("livpay_user");
        }
      }
    }
  }, [isChecking, token, user]);

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // STRICT CHECK: Must have BOTH token AND user with valid properties
  // This prevents access with stale/invalid localStorage data
  if (!token || !user || !user.id || !user.username) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Wrap children in error boundary to prevent blank pages
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
};

export default ProtectedRoute;

