require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const { errorHandler, notFound } = require("./src/middleware/errorMiddleware");

connectDB();

// CORS Configuration
// Make backend work from BOTH Cursor preview and any local browser
app.use(
  cors({
    // Allow any origin during development; for production you can restrict this
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/products", productRoutes);
app.use("/auth", userRoutes);

// 404 Handler (must be after all routes)
app.use(notFound);

// Error Handler (must be last)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening at 
    http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
