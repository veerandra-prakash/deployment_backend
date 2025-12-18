import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Smartphone, Tv, CreditCard, History, Gift, User, Zap, Info, Phone, ChevronDown, BarChart3, Shield } from 'lucide-react';
import { useUser } from '../context/UserContext.jsx';

const Navigation = () => {
  const { user, token, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/recharge-plans', label: 'Recharge Plans', icon: Zap },
    { path: '/mobile-recharge', label: 'Mobile Recharge', icon: Smartphone },
    { path: '/dth-recharge', label: 'DTH Recharge', icon: Tv },
    { path: '/bill-payment', label: 'Bill Payment', icon: CreditCard },
    { path: '/history', label: 'History', icon: History },
    { path: '/offers', label: 'Offers', icon: Gift },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const infoItems = [
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  const allNavItems = [...navItems, ...infoItems];

  return (
    <nav className="bg-white py-4 md:py-5 shadow-sm sticky top-0 z-50 border-b border-gray-200 w-full">
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold text-black flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          LivPay
          {user && user.role === "ADMIN" && (
            <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
              <Shield size={10} />
              ADMIN
            </span>
          )}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-between gap-4 flex-1 ml-8">
          <div className="flex items-center gap-4 flex-wrap">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-2 py-2 font-medium text-xs md:text-sm whitespace-nowrap transition-all duration-200 ${
                    isActive 
                      ? 'text-black border-b-2 border-black font-semibold' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <Icon size={14} />
                  <span className="text-xs md:text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth status - neatly aligned horizontally at the end */}
          <div className="flex items-center gap-3 whitespace-nowrap pl-6 border-l border-gray-200">
            {token && user ? (
              <>
                <span className="text-xs md:text-sm text-gray-700 flex items-center gap-1">
                  <span className="hidden md:inline">Signed in as</span>
                  <span className="font-semibold">{user.username}</span>
                </span>
                <button
                  onClick={() => {
                    logout();
                    navigate('/', { replace: true });
                  }}
                  className="px-3 py-1.5 text-xs md:text-sm rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs md:text-sm rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-100 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-xs md:text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-900 p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-50 mt-2 mx-4 rounded-md p-3 shadow-md border border-gray-200">
          {allNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-2 font-medium text-sm transition-all duration-200 mb-1 last:mb-0 border-b border-gray-200 last:border-b-0 ${
                  isActive 
                    ? 'text-white bg-black font-semibold' 
                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
