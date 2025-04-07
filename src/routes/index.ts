import { Router, Application } from 'express';
import IndexController from '../controllers/index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const databaseConfig = {
  client: prisma,
  url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/HRIS',
};

export default databaseConfig;

const router = Router();
const indexController = new IndexController();

export const setRoutes = (app: Application) => {
    router.get('/users', indexController.getUsers);
    router.post('/users', indexController.createUser);
    // Add more routes as needed

    app.use(router); // Attach the router to the app
};