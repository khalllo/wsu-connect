// Importing the User model from the specified path
import User from "../models/user.model.js";

// Importing necessary modules
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Function to handle user signup
export const signup = async (req, res, next) => {
  // Extracting username, email, and password from the request body
  const { username, email, password } = req.body;
  // Hashing the password using bcrypt with a cost factor of 10
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // Creating a new User instance with the provided username, email, and hashed password
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    // Saving the new user to the database
    await newUser.save();
    // Sending a success response if user creation is successful
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Forwarding any errors to the error handling middleware
    next(error);
  }
};

// Function to handle user signin
export const signin = async (req, res, next) => {
  // Extracting email and password from the request body
  const { email, password } = req.body;
  try {
    // Finding a user with the provided email in the database
    const validUser = await User.findOne({ email });
    // Handling case where user is not found
    if (!validUser) return next(errorHandler(404, "User not found"));
    // Comparing the provided password with the hashed password stored in the database
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // Handling case where provided password is incorrect
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    // Generating a JWT token with the user's ID and the JWT secret
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // Extracting password from user object (to exclude it from response)
    const { password: hashedPassword, ...rest } = validUser._doc;
    // Setting cookie options for the JWT token
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    // Sending JWT token as a cookie and user data as JSON response
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    // Forwarding any errors to the error handling middleware
    next(error);
  }
};

// Function to handle Google authentication
export const google = async (req, res, next) => {
  try {
    // Checking if a user with the provided email exists in the database
    const user = await User.findOne({ email: req.body.email });
    // Handling case where user already exists
    if (user) {
      // Generating a JWT token for the existing user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      // Extracting password from user object (to exclude it from response)
      const { password: hashedPassword, ...rest } = user._doc;
      // Setting cookie options for the JWT token
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      // Sending JWT token as a cookie and user data as JSON response
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      // Generating a random password for the new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // Hashing the generated password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      // Generating a unique username based on name and random characters
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      // Saving the new user to the database
      await newUser.save();
      // Generating a JWT token for the new user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      // Extracting password from user object (to exclude it from response)
      const { password: hashedPassword2, ...rest } = newUser._doc;
      // Setting cookie options for the JWT token
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      // Sending JWT token as a cookie and user data as JSON response
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    // Forwarding any errors to the error handling middleware
    next(error);
  }
};

// Function to handle user signout
export const signout = (req, res) => {
  // Clearing the access_token cookie
  res.clearCookie("access_token").status(200).json("Signout success!");
};
