import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// Login route
router.post('/login', (req, res) => authController.login(req, res));

export default router; 