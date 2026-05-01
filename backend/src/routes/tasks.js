import express from 'express';
import { protect } from '../middleware/auth.js';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.use(protect);

router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

export default router;