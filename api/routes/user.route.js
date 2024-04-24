// Importing the Express framework module for creating web servers.
import express from "express";

// Importing specific functions from the user controller module.
import {
  test,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

// Importing a function for verifying user tokens from a utility module.
import { verifyToken } from "../utils/verifyUser.js";

// Creating an instance of Express router.
const router = express.Router();

// Defining routes and associating them with corresponding controller functions.

// Route for testing user controller.
router.get("/", test);

// Route for updating user information.
// Requires a token verification middleware before executing the updateUser function.
router.post("/update/:id", verifyToken, updateUser);

// Route for deleting user information.
// Requires a token verification middleware before executing the deleteUser function.
router.delete("/delete/:id", verifyToken, deleteUser);

// Exporting the router module.
export default router;
