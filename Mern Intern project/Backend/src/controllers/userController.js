const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.createUser = async (req, res) => {
  try {
    const { username, email, phone, password, role } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Username validation
    if (username.length < 3) {
      return res.status(400).json({ 
        success: false,
        message: "Username must be at least 3 characters" 
      });
    }
    if (username.length > 20) {
      return res.status(400).json({ 
        success: false,
        message: "Username must be less than 20 characters" 
      });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return res.status(400).json({ 
        success: false,
        message: "Username can only contain letters, numbers, and underscore" 
      });
    }
    if (/^[0-9]/.test(username)) {
      return res.status(400).json({ 
        success: false,
        message: "Username cannot start with a number" 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format" 
      });
    }

    // Phone validation - 10 digits only
    const phoneValid = /^[0-9]{10}$/.test(phone);
    if (!phoneValid) {
      return res.status(400).json({ 
        success: false,
        message: "Phone must be exactly 10 digits (numbers only)" 
      });
    }
    if (!/^[6-9]/.test(phone)) {
      return res.status(400).json({ 
        success: false,
        message: "Phone number should start with 6, 7, 8, or 9" 
      });
    }

    // Password strength validation
    const passwordStrong =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password);

    if (!passwordStrong) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
      });
    }

    // Check for existing user with better error messages
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ 
        success: false,
        message: "Username already exists" 
      });
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(409).json({ 
        success: false,
        message: "Email already exists" 
      });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(409).json({ 
        success: false,
        message: "Phone number already exists" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role: role || "USER",
    });

    await newUser.save();
    res.status(201).json({ 
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(409).json({ 
        success: false,
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` 
      });
    }
    res.status(500).json({ 
      success: false,
      message: err.message || "Registration failed. Please try again." 
    });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Username/Email/Phone and password are required" 
      });
    }

    // Determine lookup field - check if it's email, phone (10 digits), or username
    let lookup = {};
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
      // It's an email
      lookup = { email: identifier.toLowerCase() };
    } else if (/^[0-9]{10}$/.test(identifier)) {
      // It's a phone number (10 digits)
      lookup = { phone: identifier };
    } else {
      // It's a username
      lookup = { username: identifier };
    }

    const user = await User.findOne(lookup);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid username/email/phone or password" 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid username/email/phone or password" 
      });
    }

    const jwtSecret = process.env.JWT_SECRET || "dev-secret-key";

    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false,
      message: err.message || "Login failed. Please try again." 
    });
  }
};

// PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }
    res.json({
      success: true,
      id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (err) {
    console.error('Get profile error:', err);
    if (err.name === 'CastError') {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }
    res.status(500).json({ 
      success: false,
      message: err.message || "Failed to fetch profile" 
    });
  }
};
