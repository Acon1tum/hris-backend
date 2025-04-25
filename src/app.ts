import express from 'express';
import { PrismaClient } from '@prisma/client';
import personnelRoutes from './modules/personnel/routes/personnel.routes';
import authRoutes from './routes/auth.routes';
import { connectToDatabase } from './config/database';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectToDatabase().then(() => {
  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/personnel', personnelRoutes);

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