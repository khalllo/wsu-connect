// This function is exported as 'errorHandler' and takes two parameters: 'statusCode' and 'message'.
export const errorHandler = (statusCode, message) => {
  // It creates a new Error object.
  const error = new Error();
  // It assigns the 'statusCode' parameter to the 'statusCode' property of the error object.
  error.statusCode = statusCode;
  // It assigns the 'message' parameter to the 'message' property of the error object.
  error.message = message;
  // It returns the error object.
  return error;
};
