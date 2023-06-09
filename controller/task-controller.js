import { taskStore } from '../services/task-store.js'


export class TaskController {

    getAllTasks = async (req, res) => {
        const sortBy = req.query.sortBy || 'duedate';
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
        const filterCompleted = req.query.filterCompleted === 'true';
        res.json(await taskStore.all(req.query.query, sortBy, sortOrder, filterCompleted));
    };

    addTask = async (req, res) => {
        res.json(await taskStore.add(
            req.body.title,
            req.body.content,
            req.body.priority,
            req.body.duedate,
            req.body.state,
        ));
    };

    getTask = async (req, res) => {
        res.json(await taskStore.get(req.params.id));
    };

    updateTask = async (req, res) => {
        res.json(await taskStore.update(
            req.params.id,
            req.body.title,
            req.body.content,
            req.body.priority,
            req.body.duedate,
            req.body.state,
        ));
    };

    deleteTask = async (req, res) => {
        res.json(await taskStore.delete(req.params.id)); // TODO should return 402 if not ok
    };
}

export const taskController = new TaskController();
