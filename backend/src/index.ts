import express from 'express';
import cors from 'cors';
import quotesRouter from './routes/quotes';
import { errorHandler } from './middleware/errorHandler';
import config from './config/environment';

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/quotes', quotesRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok',
    app: config.app.name,
    version: config.app.version,
    environment: config.nodeEnv
  });
});



// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 ${config.app.name} v${config.app.version}`);
  console.log(`📍 Server running on http://localhost:${config.port}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`📊 Database: ${config.database.path}`);
});