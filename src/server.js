import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { PORT, NODE_ENV } from './config.js';
import { connectDB } from './db.js';
import healthRouter from './routes/health.js';
import taskRouter from './routes/tasks.js';
import { notFound, errorHandler } from './middleware/error.js';

const bootstrap = async () => {
  await connectDB();
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

  // Routes
  app.use('/health', healthRouter);
  app.use('/tasks', taskRouter);

  // 404 + errors
  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`[server] listening on http://localhost:${PORT} (${NODE_ENV})`);
  });

  app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});