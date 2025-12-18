import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UserProvider, useUser } from './context/UserContext.jsx';
import Navigation from './Components/Navigation.jsx';
import Home from './Components/Home.jsx';
import LandingPage from './Components/LandingPage.jsx';
import Dashboard from './Components/Dashboard.jsx';
import MobileRecharge from './Components/MobileRecharge.jsx';
import DTHRecharge from './Components/DTHRecharge.jsx';
import BillPayment from './Components/BillPayment.jsx';
import TransactionHistory from './Components/TransactionHistory.jsx';
import Offers from './Components/Offers.jsx';
import Profile from './Components/Profile.jsx';
import QuickRecharge from './Components/QuickRecharge.jsx';
import About from './Components/About.jsx';
import Contact from './Components/Contact.jsx';
import Auth from './Components/Auth.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import RechargePlans from './Components/RechargePlans.jsx';
import LoginPage from './Components/LoginPage.jsx';
import RegisterPage from './Components/RegisterPage.jsx';
import ErrorBoundary from './Components/ErrorBoundary.jsx';

function AppContent() {
  const { token, user } = useUser();
  const location = useLocation();
  // Strict authentication check - must have both token AND valid user
  const isAuthenticated = Boolean(token && user && user.id && user.username);
  // Only these pages are accessible without login
  const isPublicPage = ['/', '/login', '/register', '/recharge-plans'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50" style={{ minHeight: '100vh' }}>
      {isAuthenticated && !isPublicPage && <Navigation />}
      <main 
        className={`${isPublicPage ? "flex-1 w-full bg-white" : "flex-1 p-4 max-w-7xl mx-auto w-full"} page-transition`}
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <ErrorBoundary>
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/recharge-plans" element={<RechargePlans />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes - All require login */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mobile-recharge"
            element={
              <ProtectedRoute>
                <MobileRecharge />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dth-recharge"
            element={
              <ProtectedRoute>
                <DTHRecharge />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bill-payment"
            element={
              <ProtectedRoute>
                <BillPayment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <TransactionHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/offers"
            element={
              <ProtectedRoute>
                <Offers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quick-recharge"
            element={
              <ProtectedRoute>
                <QuickRecharge />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </BrowserRouter>
      </UserProvider>
    </ErrorBoundary>
  )
}

export default App
