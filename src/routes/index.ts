import { Router, Application } from 'express';
import IndexController from '../controllers/index';
import { PrismaClient } from '@prisma/client';
import departmentsRoutes from './departments.routes';

const prisma = new PrismaClient();

const databaseConfig = {
  client: prisma,
  url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/HRIS',
};

export default databaseConfig;

const router = Router();
const indexController = new IndexController();

export const setRoutes = (app: Application) => {
    // User routes
    router.get('/users', indexController.getUsers);
    router.post('/users', indexController.createUser);

    // Department routes
    app.use('/api/departments', departmentsRoutes);

    // Add more routes as needed
    app.use(router); // Attach the router to the app
};