import express from 'express';
import { PrismaClient } from '@prisma/client';
import personnelRoutes from './modules/personnel/routes/personnel.routes';
import connectToDatabase from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectToDatabase.client.$connect().then(() => {
    console.log('Connected to the database');
}).catch((error: unknown) => {
    console.error('Failed to connect to the database:', error);
});

// Default route for welcome message
app.get('/', (req, res) => {
    res.send('Welcome to the HRIS Backend API!');
});

// Module routes
app.use('/api/personnel', personnelRoutes);

// Add other module routes here
// app.use('/api/leave', leaveRoutes);
// app.use('/api/payroll', payrollRoutes);
// app.use('/api/timekeeping', timekeepingRoutes);
// app.use('/api/recruitment', recruitmentRoutes);
// app.use('/api/performance', performanceRoutes);
// app.use('/api/reports', reportsRoutes);
// app.use('/api/learning', learningRoutes);
// app.use('/api/system-admin', systemAdminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});