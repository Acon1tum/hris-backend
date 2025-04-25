import { Request, Response } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    role: Role;
    username: string;
  };
  token?: string;
  message?: string;
}

export class AuthController {
    async login(req: Request<{}, {}, LoginRequest>, res: Response<LoginResponse>): Promise<void> {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
                return;
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            if (!isValidPassword) {
                res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
                return;
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, role: user.role },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            // Return success response
            res.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    username: user.username
                },
                token
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'An error occurred during login'
            });
        }
    }
} 