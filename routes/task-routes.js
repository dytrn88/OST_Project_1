import express from 'express';
import { taskController } from '../controller/task-controller.js';

const router = express.Router();

router.get('/', taskController.getAllTasks);
router.post('/', taskController.addTask);
router.get('/:id', taskController.getTask);
router.post('/', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export const taskRoutes = router;
