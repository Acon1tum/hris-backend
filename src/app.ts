import express from 'express';
import { setRoutes } from './routes/index';
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

// Set up routes
setRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});