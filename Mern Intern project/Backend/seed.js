require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/userModel");

const seedDemo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/livpay");
    console.log("Connected to MongoDB");

    // Check if demo user already exists
    const existingUser = await User.findOne({ username: "demo" });
    
    if (existingUser) {
      console.log("Demo user already exists!");
      process.exit(0);
    }

    // Create demo user
    const hashedPassword = await bcrypt.hash("Demo@12345", 10);
    const demoUser = new User({
      username: "demo",
      email: "demo@test.com",
      phone: "9876543210",
      password: hashedPassword,
      role: "USER",
    });

    await demoUser.save();
    console.log("Demo user created successfully!");
    console.log("Username: demo");
    console.log("Email: demo@test.com");
    console.log("Password: Demo@12345");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding demo user:", err);
    process.exit(1);
  }
};

seedDemo();
