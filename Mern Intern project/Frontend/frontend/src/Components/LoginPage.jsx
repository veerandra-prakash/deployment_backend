import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { LogIn, AlertCircle, Eye, EyeOff, Loader } from "lucide-react";
import { useUser } from "../context/UserContext.jsx";

const LoginPage = () => {
  const { login, authLoading, authError, token, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    loginIdentifier: "",
    password: "",
  });

  // CRITICAL: Always show form - no checking state that could block render
  // Only redirect if already logged in (but show form first)
  useEffect(() => {
    // Only redirect if we have complete valid credentials
    if (token && user && user.id && user.username) {
      // Small delay to ensure state is stable
      const timer = setTimeout(() => {
        const from = location.state?.from || "/dashboard";
        navigate(from, { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [token, user, navigate, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setMessage("");
  };

  const validateLogin = () => {
    const newErrors = {};

    if (!form.loginIdentifier.trim()) {
      newErrors.loginIdentifier = "Email or username is required";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    if (!validateLogin()) {
      return;
    }

    try {
      const result = await login(form.loginIdentifier, form.password);
      // Only redirect if login was successful
      if (result && result.token) {
        // Small delay to ensure state is updated, then redirect
        setTimeout(() => {
          const from = location.state?.from || "/mobile-recharge";
          navigate(from, { replace: true });
        }, 100);
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage(err.message || "Login failed. Please check your credentials and try again.");
      // Clear form on error
      setForm({
        loginIdentifier: form.loginIdentifier, // Keep identifier
        password: "", // Clear password
      });
    }
  };

  const isFormValid =
    form.loginIdentifier.trim().length > 0 && form.password.length >= 6;

  // Always render the form - never show blank page
  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 py-12" 
      style={{ 
        zIndex: 1000, 
        position: 'relative',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <div className="w-full max-w-md relative bg-white rounded-2xl shadow-2xl" style={{ minHeight: '500px' }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
            <LogIn className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your LivPay account</p>
        </div>

        {/* Form Card */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {(message || authError) && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-4 flex gap-3">
                <AlertCircle className="text-red-300 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-red-200">Login Error</p>
                  <p className="text-red-300 text-sm">{message || authError}</p>
                </div>
              </div>
            )}

            {/* Email/Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email or Username
              </label>
              <input
                type="text"
                name="loginIdentifier"
                value={form.loginIdentifier}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none text-base ${
                  errors.loginIdentifier
                    ? "border-red-500 focus:border-red-600 bg-red-50 text-gray-900"
                    : "border-gray-300 focus:border-black bg-white text-gray-900"
                }`}
              />
              {errors.loginIdentifier && (
                <p className="text-red-600 text-sm mt-1">{errors.loginIdentifier}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition focus:outline-none text-base ${
                    errors.password
                      ? "border-red-500 focus:border-red-600 bg-red-50 text-gray-900"
                      : "border-gray-300 focus:border-black bg-white text-gray-900"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-600 hover:text-gray-900"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 bg-gray-50" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="#" className="text-sm text-black hover:text-gray-800 font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={authLoading || !isFormValid}
              className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-600">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-black hover:text-gray-800 font-bold">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-gray-800 border-2 border-white rounded-lg p-4">
          <p className="text-sm font-semibold text-white mb-2">Demo Credentials:</p>
          <p className="text-sm text-gray-300">Email: demo@test.com</p>
          <p className="text-sm text-gray-300">Password: Demo@12345</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
