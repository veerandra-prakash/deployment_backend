import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, AlertCircle, Eye, EyeOff, Loader, CheckCircle } from "lucide-react";
import { useUser } from "../context/UserContext.jsx";

const RegisterPage = () => {
  const { register, authLoading, authError, token, user } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // Only redirect if already logged in (but ALWAYS show form first)
  useEffect(() => {
    // Only redirect if we have complete valid credentials
    if (token && user && user.id && user.username) {
      // Wait 2 seconds so form is definitely visible first
      const timer = setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [token, user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setMessage("");
    setSuccessMessage("");
  };

  const validateRegister = () => {
    const newErrors = {};

    // Username validation
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else {
      if (form.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
      } else if (form.username.length > 20) {
        newErrors.username = "Username must be less than 20 characters";
      } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
        newErrors.username = "Username can only contain letters, numbers, and underscore";
      } else if (/^[0-9]/.test(form.username)) {
        newErrors.username = "Username cannot start with a number";
      }
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    // Phone validation
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneValid = /^[0-9]{10}$/.test(form.phone);
      if (!phoneValid) {
        newErrors.phone = "Phone must be exactly 10 digits";
      } else if (!/^[6-9]/.test(form.phone)) {
        newErrors.phone = "Phone number should start with 6, 7, 8, or 9";
      }
    }

    // Password validation
    if (!form.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordStrong =
        form.password.length >= 8 &&
        /[A-Z]/.test(form.password) &&
        /[a-z]/.test(form.password) &&
        /[0-9]/.test(form.password) &&
        /[^A-Za-z0-9]/.test(form.password);

      if (!passwordStrong) {
        newErrors.password =
          "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
      }
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!form.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessMessage("");

    if (!validateRegister()) {
      return;
    }

    try {
      const result = await register({
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: "USER",
      });
      
      if (result && result.success) {
        setSuccessMessage("Registration successful! Redirecting to dashboard...");
        // Auto-login should have happened, redirect to dashboard
        setTimeout(() => {
          navigate("/mobile-recharge", { replace: true });
        }, 1500);
      } else {
        // Registration succeeded but auto-login didn't work
        setSuccessMessage("Registration successful! Please login.");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage(err.message || "Registration failed. Please check your information and try again.");
      // Clear password fields on error
      setForm(prev => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    }
  };

  // Don't show loading - always show the form
  // Only redirect after form is visible if already logged in

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
      <div className="w-full max-w-md relative bg-white rounded-2xl shadow-2xl" style={{ minHeight: '600px' }}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-4">
            <UserPlus className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join LivPay and start paying smartly</p>
        </div>

        {/* Form Card */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-900 border border-green-700 rounded-lg p-4 flex gap-3">
                <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-green-300">Success!</p>
                  <p className="text-green-400 text-sm">{successMessage}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {(message || authError) && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-4 flex gap-3">
                <AlertCircle className="text-red-300 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-red-200">Registration Error</p>
                  <p className="text-red-300 text-sm">{message || authError}</p>
                </div>
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose a unique username"
                className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none text-base ${
                  errors.username
                    ? "border-red-500 focus:border-red-600 bg-red-50 text-gray-900"
                    : "border-gray-300 focus:border-black bg-white text-gray-900"
                }`}
              />
              {errors.username && (
                <p className="text-red-600 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg border-2 transition focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:border-red-600 bg-red-50 text-gray-900"
                    : "border-gray-300 focus:border-black bg-gray-50 text-gray-900"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit phone number"
                maxLength="10"
                className={`w-full px-4 py-2 rounded-lg border-2 transition focus:outline-none ${
                  errors.phone
                    ? "border-red-500 focus:border-red-600 bg-red-50 text-gray-900"
                    : "border-gray-300 focus:border-black bg-gray-50 text-gray-900"
                }`}
              />
              {errors.phone && (
                <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
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
                  placeholder="Min 8 chars, uppercase, number, special char"
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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full px-4 py-2 pr-12 rounded-lg border-2 transition focus:outline-none ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-600 bg-red-50 text-gray-900"
                      : "border-gray-300 focus:border-black bg-gray-50 text-gray-900"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-600 hover:text-gray-900"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 bg-gray-50"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="#" className="text-black hover:text-gray-800 font-medium">
                    terms and conditions
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-600 text-xs mt-1">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {authLoading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Create Account
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

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-black hover:text-gray-800 font-bold">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="mt-6 bg-gray-100 border border-gray-300 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">Password Requirements:</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• At least 8 characters</li>
            <li>• One uppercase letter (A-Z)</li>
            <li>• One lowercase letter (a-z)</li>
            <li>• One number (0-9)</li>
            <li>• One special character (!@#$%^&*)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
