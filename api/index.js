// Import necessary modules/packages
import express from "express"; // Import Express framework
import mongoose from "mongoose"; // Import Mongoose for MongoDB connection
import dotenv from "dotenv"; // Import dotenv to load environment variables
import userRoutes from "./routes/user.route.js"; // Import user routes
import authRoutes from "./routes/auth.route.js"; // Import authentication routes
import cookieParser from "cookie-parser"; // Import cookie-parser for parsing cookies
import path from "path"; // Import path for working with file and directory paths

dotenv.config(); // Load environment variables from .env file

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO) // Connect to MongoDB using connection URI stored in MONGO environment variable
  .then(() => {
    console.log("Connected to MongoDB"); // Log a success message if connection is successful
  })
  .catch((err) => {
    console.log(err); // Log an error message if connection fails
  });

// Resolve the absolute path of the current directory
const __dirname = path.resolve();

// Create an Express application instance
const app = express();

// Serve static files from the client's dist directory
app.use(express.static(path.join(__dirname, "/client/dist")));

// Define a wildcard route (*) to serve the index.html file for any other routes requested
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Parse JSON bodies of incoming requests
app.use(express.json());

// Parse cookies in the HTTP request
app.use(cookieParser());

// Start the server to listen on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

// Mount user routes under /api/user
app.use("/api/user", userRoutes);

// Mount authentication routes under /api/auth
app.use("/api/auth", authRoutes);

// Define error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Get the status code from the error object or default to 500
  const message = err.message || "Internal Server Error"; // Get the error message or default to "Internal Server Error"
  return res.status(statusCode).json({
    // Send JSON response with status code and error message
    success: false,
    message,
    statusCode,
  });
});
