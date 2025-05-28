import express from 'express';
import { PrismaClient } from '@prisma/client';
import personnelRoutes from './modules/personnel/routes/personnel.routes';
import authRoutes from './routes/auth.routes';
import departmentsRoutes from './routes/departments.routes';
import payrollRoutes from './modules/payroll/routes/payroll.routes';
import { connectToDatabase } from './config/database';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200', // Angular's default development server
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to database
connectToDatabase().then(() => {
  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/personnel', personnelRoutes);
  app.use('/api/departments', departmentsRoutes);
  app.use('/api/payroll', payrollRoutes);

  // Default route for welcome message
  app.get('/', (req, res) => {
    res.send('Welcome to the HRIS Backend API!');
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});