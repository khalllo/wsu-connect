// Importing the Express framework module for creating web servers.
import express from 'express';

// Importing specific functions from the auth controller module.
import { signin, signup, google, signout } from '../controllers/auth.controller.js';

// Creating an instance of Express router.
const router = express.Router();

// Defining routes and associating them with corresponding controller functions.

// Route for user signup.
router.post('/signup', signup);

// Route for user signin.
router.post('/signin', signin);

// Route for Google signin.
router.post('/google', google);

// Route for user signout.
router.get('/signout', signout);

// Exporting the router module.
export default router;
