import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('No token provided');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string };

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { personnel: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Add user to request object
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Please authenticate',
    });
  }
};

export default authMiddleware; 