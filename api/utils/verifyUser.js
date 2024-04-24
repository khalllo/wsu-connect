// This line imports the jwt library from the jsonwebtoken module.
import jwt from 'jsonwebtoken';

// This line imports the errorHandler function from a file named 'error.js'.
import { errorHandler } from './error.js';

// This function is exported as 'verifyToken' and takes three parameters: req, res, and next.
export const verifyToken = (req, res, next) => {
    // It extracts the 'access_token' cookie from the request.
    const token = req.cookies.access_token;

    // If there's no token, it calls the errorHandler function with a status code of 401 and a message indicating that the user is not authenticated.
    if (!token) return next(errorHandler(401, 'You are not authenticated!'));

    // It verifies the token using the JWT_SECRET environment variable.
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // If there's an error during verification, it calls the errorHandler function with a status code of 403 and a message indicating that the token is not valid.
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        // If the token is valid, it attaches the user object decoded from the token to the request object.
        req.user = user;
        // Then it calls the 'next' function to proceed to the next middleware or route handler.
        next();
    });
};
