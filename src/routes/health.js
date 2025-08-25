import express from 'express';
import { dbState } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    ok: true,
    service: 'node-power-demo',
    message: 'API is running',
    db: dbState(),
    timestamp: new Date().toISOString(),
    uptimeSec: Math.round(process.uptime()),
    memoryMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
  });
});

export default router;