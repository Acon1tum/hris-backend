import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  error: string;
  message: string;
  details?: Array<{ field: string; message: string }>;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message,
    } as ErrorResponse);
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired token',
    } as ErrorResponse);
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'You do not have permission to access this resource',
    } as ErrorResponse);
  }

  // Default error response
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on our end',
  } as ErrorResponse);
};

export default errorHandler; 