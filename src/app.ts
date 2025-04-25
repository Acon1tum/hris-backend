import express from 'express';
import { PrismaClient } from '@prisma/client';
import { connectToDatabase } from './config/database';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import authMiddleware from './middleware/auth';

// Import all module routes
import personnelRoutes from './modules/personnel/routes/personnel.routes';
import authRoutes from './routes/auth.routes';
import employeeSelfServiceRoutes from './modules/employee-self-service/routes/employee-self-service.routes';
import learningRoutes from './modules/learning/routes/learning.routes';
import jobPortalRoutes from './modules/job-portal/routes/job-portal.routes';
import recruitmentRoutes from './modules/recruitment/routes/recruitment.routes';
import payrollRoutes from './modules/payroll/routes/payroll.routes';
import performanceRoutes from './modules/performance/routes/performance.routes';
import leaveRoutes from './modules/leave/routes/leave.routes';
import timekeepingRoutes from './modules/timekeeping/routes/timekeeping.routes';
import reportsRoutes from './modules/reports/routes/reports.routes';
import systemAdminRoutes from './modules/system-admin/routes/system-admin.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectToDatabase().then(() => {
  // Public Routes
  app.use('/api/auth', authRoutes);

  // Protected Routes (require authentication)
  app.use('/api/personnel', authMiddleware, personnelRoutes);
  app.use('/api/employee-self-service', authMiddleware, employeeSelfServiceRoutes);
  app.use('/api/learning', authMiddleware, learningRoutes);
  app.use('/api/job-portal', authMiddleware, jobPortalRoutes);
  app.use('/api/recruitment', authMiddleware, recruitmentRoutes);
  app.use('/api/payroll', authMiddleware, payrollRoutes);
  app.use('/api/performance', authMiddleware, performanceRoutes);
  app.use('/api/leave', authMiddleware, leaveRoutes);
  app.use('/api/timekeeping', authMiddleware, timekeepingRoutes);
  app.use('/api/reports', authMiddleware, reportsRoutes);
  app.use('/api/system-admin', authMiddleware, systemAdminRoutes);

  // Default route for welcome message
  app.get('/', (req, res) => {
    res.send('Welcome to the HRIS Backend API!');
  });

  // Error handling middleware
  app.use(errorHandler);

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});