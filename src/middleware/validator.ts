import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

interface ValidationErrorDetail {
  field: string;
  message: string;
}

interface ValidationError extends Error {
  details?: ValidationErrorDetail[];
}

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const validationError: ValidationError = new Error('Validation Error');
      validationError.details = error.details.map((detail: Joi.ValidationErrorItem) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(400).json({
        error: 'Validation Error',
        message: 'Invalid request data',
        details: validationError.details,
      });
    }

    next();
  };
};

export default validate; 