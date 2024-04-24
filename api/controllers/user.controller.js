// Importing necessary modules and dependencies
import User from "../models/user.model.js"; // Importing the User model
import { errorHandler } from "../utils/error.js"; // Importing the errorHandler function
import bcryptjs from "bcryptjs"; // Importing bcryptjs for password hashing

// Function to test if the API is working
export const test = (req, res) => {
  // Sending a JSON response with a message indicating that the API is working
  res.json({
    message: "API is working!",
  });
};

// Function to update user information
export const updateUser = async (req, res, next) => {
  // Checking if the user ID in the request matches the user ID in the parameters
  if (req.user.id !== req.params.id) {
    // Returning an error message if the user is not authorized to update the account
    return next(errorHandler(401, "You can update only your account!"));
  }
  try {
    // Hashing the password if it's included in the request body
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    // Finding and updating the user information in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true } // Returning the updated document
    );
    // Extracting the password field from the updated user document
    const { password, ...rest } = updatedUser._doc;
    // Sending a JSON response with the updated user information
    res.status(200).json(rest);
  } catch (error) {
    // Forwarding any errors to the error handling middleware
    next(error);
  }
};

// Function to delete user account
export const deleteUser = async (req, res, next) => {
  // Checking if the user ID in the request matches the user ID in the parameters
  if (req.user.id !== req.params.id) {
    // Returning an error message if the user is not authorized to delete the account
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    // Finding and deleting the user from the database based on the user ID
    await User.findByIdAndDelete(req.params.id);
    // Sending a JSON response indicating successful deletion
    res.status(200).json("User has been deleted...");
  } catch (error) {
    // Forwarding any errors to the error handling middleware
    next(error);
  }
};
