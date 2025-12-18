const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myproductsDB";

    const options = {
      dbName: process.env.MONGO_DB_NAME || undefined,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    const conn = await mongoose.connect(mongoUri, options);

    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.error("Please ensure MongoDB is running and accessible");
    console.error("Connection string:", process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myproductsDB");
    process.exit(1);
  }
};

module.exports = connectDB;
