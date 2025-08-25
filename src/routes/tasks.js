import express from 'express';
import { Task } from '../models/Task.js';

const router = express.Router();

// CREATE
router.post('/', async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ ok: true, data: task });
  } catch (err) {
    next(err);
  }
});

// READ all with pagination
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const tasks = await Task.find().lean().skip(skip).limit(Number(limit));
    const count = await Task.countDocuments();

    res.json({
      ok: true,
      data: tasks,
      meta: { total: count, page: Number(page), pages: Math.ceil(count / limit) },
    });
  } catch (err) {
    next(err);
  }
});

// READ one
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).lean();
    if (!task) return res.status(404).json({ ok: false, error: 'Task not found' });
    res.json({ ok: true, data: task });
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return updated doc
      runValidators: true,
    }).lean();

    if (!task) return res.status(404).json({ ok: false, error: 'Task not found' });
    res.json({ ok: true, data: task });
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id).lean();
    if (!task) return res.status(404).json({ ok: false, error: 'Task not found' });
    res.json({ ok: true, data: task });
  } catch (err) {
    next(err);
  }
});

export default router;