import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Shield } from "lucide-react";
import { useUser } from "../context/UserContext.jsx";

const Auth = () => {
  const { login, register, logout, authLoading, authError, token, user } =
    useUser();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "USER",
  });
  const [loginIdentifier, setLoginIdentifier] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (token && user) {
      navigate("/", { replace: true });
    }
  }, [token, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateRegister = () => {
    const errors = {};

    // Username validation
    if (!form.username.trim()) {
      errors.username = "Username is required";
    } else {
      if (form.username.length < 3) {
        errors.username = "Username must be at least 3 characters";
      } else if (form.username.length > 20) {
        errors.username = "Username must be less than 20 characters";
      } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
        errors.username = "Username can only contain letters, numbers, and underscore";
      } else if (/^[0-9]/.test(form.username)) {
        errors.username = "Username cannot start with a number";
      }
    }

    // Email validation
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        errors.email = "Invalid email format (e.g., user@example.com)";
      } else if (form.email.length > 100) {
        errors.email = "Email is too long (max 100 characters)";
      }
    }

    // Phone validation
    if (!form.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      errors.phone = "Phone must be exactly 10 digits (numbers only)";
    } else if (!/^[6-9]/.test(form.phone)) {
      errors.phone = "Phone number should start with 6, 7, 8, or 9";
    }

    // Password validation
    if (!form.password) {
      errors.password = "Password is required";
    } else {
      if (form.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      } else if (form.password.length > 50) {
        errors.password = "Password is too long (max 50 characters)";
      } else {
        const hasUpper = /[A-Z]/.test(form.password);
        const hasLower = /[a-z]/.test(form.password);
        const hasNumber = /[0-9]/.test(form.password);
        const hasSpecial = /[^A-Za-z0-9]/.test(form.password);

        if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
          const missing = [];
          if (!hasUpper) missing.push("uppercase letter");
          if (!hasLower) missing.push("lowercase letter");
          if (!hasNumber) missing.push("number");
          if (!hasSpecial) missing.push("special character");
          errors.password = `Password must include: ${missing.join(", ")}`;
        }
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateLogin = () => {
    const errors = {};

    if (!loginIdentifier.trim()) {
      errors.identifier = "Username/Email/Phone is required";
    } else {
      // Validate identifier format
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginIdentifier);
      const isPhone = /^[0-9]{10}$/.test(loginIdentifier);
      const isUsername = /^[a-zA-Z0-9_]+$/.test(loginIdentifier);

      if (!isEmail && !isPhone && !isUsername) {
        errors.identifier = "Invalid format. Use username, email, or 10-digit phone";
      }
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 1) {
      errors.password = "Password cannot be empty";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Password strength checker for register
  const getPasswordStrength = () => {
    if (!form.password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (form.password.length >= 8) strength++;
    if (/[A-Z]/.test(form.password)) strength++;
    if (/[a-z]/.test(form.password)) strength++;
    if (/[0-9]/.test(form.password)) strength++;
    if (/[^A-Za-z0-9]/.test(form.password)) strength++;

    const levels = [
      { label: "Very Weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-orange-500" },
      { label: "Fair", color: "bg-yellow-500" },
      { label: "Good", color: "bg-gray-700" },
      { label: "Strong", color: "bg-green-500" },
      { label: "Very Strong", color: "bg-green-600" },
    ];

    return {
      strength,
      ...levels[Math.min(strength, levels.length - 1)],
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setValidationErrors({});

    try {
      if (mode === "register") {
        if (!validateRegister()) {
          return;
        }
        await register(form);
        setMessage("Registered successfully! Please login.");
        // Clear form and switch to login
        setForm({
          username: "",
          email: "",
          phone: "",
          password: "",
          role: "USER",
        });
        setMode("login");
        setLoginIdentifier(form.username); // Pre-fill login with username
        return;
      }
      // Login mode
      if (!validateLogin()) {
        return;
      }
      await login({
        identifier: loginIdentifier.trim(),
        password: form.password,
      });
      setMessage("Logged in successfully! Redirecting...");
      // Navigation will happen via useEffect when token/user updates
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 600);
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="space-y-6 max-w-xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gray-900 p-3 rounded-lg">
              <Shield size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              LivPay
            </h1>
          </div>
          <p className="text-gray-600">Welcome! Please login or register to continue</p>
        </div>

      <div className="card">
        <div className="flex gap-3 mb-6 border-b-2 border-gray-200 pb-4">
          <button
            type="button"
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-lg transition-all ${
              mode === "login"
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setMode("login");
              setMessage("");
              setValidationErrors({});
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <LogIn size={20} />
              <span>Login</span>
            </div>
          </button>
          <button
            type="button"
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-lg transition-all ${
              mode === "register"
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setMode("register");
              setMessage("");
              setValidationErrors({});
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <UserPlus size={20} />
              <span>Register</span>
            </div>
          </button>
        </div>
        
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 text-center">
            {mode === "login" ? "Login to Your Account" : "Create New Account"}
          </h2>
          <p className="text-sm text-gray-600 text-center mt-2">
            {mode === "login"
              ? "Enter your credentials to access your account"
              : "Fill in the details below to create your account"}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "login" ? (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Username / Email / Phone *
                </label>
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => {
                    setLoginIdentifier(e.target.value);
                    if (validationErrors.identifier) {
                      setValidationErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.identifier;
                        return newErrors;
                      });
                    }
                  }}
                  className={`input ${validationErrors.identifier ? "border-red-500" : loginIdentifier && !validationErrors.identifier ? "border-green-500" : ""}`}
                  placeholder="Enter username, email, or 10-digit phone"
                  required
                />
                {validationErrors.identifier ? (
                  <p className="text-xs text-red-600">{validationErrors.identifier}</p>
                ) : loginIdentifier ? (
                  <p className="text-xs text-green-600">✓ Format looks valid</p>
                ) : (
                  <p className="text-xs text-gray-500">
                    You can login with username, email, or phone number
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className={`input ${validationErrors.username ? "border-red-500" : form.username && !validationErrors.username ? "border-green-500" : ""}`}
                  placeholder="Enter username (3-20 chars, letters, numbers, _)"
                  minLength={3}
                  maxLength={20}
                  required
                />
                {validationErrors.username ? (
                  <p className="text-xs text-red-600">{validationErrors.username}</p>
                ) : form.username && (
                  <p className="text-xs text-green-600">✓ Username looks good</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`input ${validationErrors.email ? "border-red-500" : form.email && !validationErrors.email ? "border-green-500" : ""}`}
                  placeholder="Enter email (e.g., user@example.com)"
                  required
                />
                {validationErrors.email ? (
                  <p className="text-xs text-red-600">{validationErrors.email}</p>
                ) : form.email && (
                  <p className="text-xs text-green-600">✓ Email format is valid</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    if (value.length <= 10) {
                      handleChange({ target: { name: 'phone', value } });
                    }
                  }}
                  className={`input ${validationErrors.phone ? "border-red-500" : form.phone.length === 10 && !validationErrors.phone ? "border-green-500" : ""}`}
                  placeholder="Enter 10-digit phone number"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  required
                />
                {validationErrors.phone ? (
                  <p className="text-xs text-red-600">{validationErrors.phone}</p>
                ) : form.phone.length === 10 ? (
                  <p className="text-xs text-green-600">✓ Phone number is valid</p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Must be exactly 10 digits (numbers only, start with 6-9)
                  </p>
                )}
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-800">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`input ${validationErrors.password ? "border-red-500" : form.password && mode === "register" && getPasswordStrength().strength >= 4 ? "border-green-500" : ""}`}
              placeholder={mode === "register" ? "Enter strong password" : "Enter password"}
              required
            />
            {mode === "register" && form.password && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${getPasswordStrength().color}`}
                      style={{ width: `${(getPasswordStrength().strength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {getPasswordStrength().label}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`flex items-center gap-1 ${/[A-Z]/.test(form.password) ? "text-green-600" : "text-gray-400"}`}>
                    {/[A-Z]/.test(form.password) ? "✓" : "○"} Uppercase
                  </div>
                  <div className={`flex items-center gap-1 ${/[a-z]/.test(form.password) ? "text-green-600" : "text-gray-400"}`}>
                    {/[a-z]/.test(form.password) ? "✓" : "○"} Lowercase
                  </div>
                  <div className={`flex items-center gap-1 ${/[0-9]/.test(form.password) ? "text-green-600" : "text-gray-400"}`}>
                    {/[0-9]/.test(form.password) ? "✓" : "○"} Number
                  </div>
                  <div className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(form.password) ? "text-green-600" : "text-gray-400"}`}>
                    {/[^A-Za-z0-9]/.test(form.password) ? "✓" : "○"} Special
                  </div>
                </div>
              </div>
            )}
            {validationErrors.password ? (
              <p className="text-xs text-red-600">{validationErrors.password}</p>
            ) : mode === "register" && form.password && getPasswordStrength().strength >= 4 ? (
              <p className="text-xs text-green-600">✓ Password strength is good</p>
            ) : mode === "register" && !form.password ? (
              <p className="text-xs text-gray-500">
                Password must be 8+ chars with upper, lower, number, special.
              </p>
            ) : null}
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="input"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
              <p className="text-xs text-gray-500">
                Admin role can create/update products in the backend.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={authLoading}
          >
            {authLoading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        {(authError || message) && (
          <div className={`mt-4 text-sm p-3 rounded-lg ${
            message.includes("successfully") || message.includes("successful")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}>
            {authError || message}
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Session Status
        </h3>
        {token && user ? (
          <div className="space-y-2">
            <div className="text-sm text-gray-700">
              Logged in as <span className="font-semibold">{user.username}</span>
            </div>
            <div className="text-xs text-gray-600">
              Role: <span className="font-semibold">{user.role}</span>
            </div>
            {user.role === "ADMIN" && (
              <div className="text-xs bg-yellow-100 text-yellow-800 p-2 rounded">
                Admin: You can create/update/delete products
              </div>
            )}
            <button className="btn btn-secondary w-full" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-700">
            You are not logged in. Create an account or login to access
            protected APIs.
          </p>
        )}
      </div>
      </div>
    </div>
  );
};

export default Auth;

