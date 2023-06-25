import { taskStore } from '../services/task-store.js'


export class TaskController {

    getAllTasks = async (req, res) => {
        const sortBy = req.query.sortBy === "desc" ? -1 : 1; // Set the sorting order based on the query parameter
        console.log(sortBy)
        res.json(await taskStore.all(req.query.query, sortBy));
    };

    addTask = async (req, res) => {
        console.log(req.body.duedate)
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
        ));
    };

    deleteTask = async (req, res) => {
        res.json(await taskStore.delete(req.params.id)); // TODO should return 402 if not ok
    };
}

export const taskController = new TaskController();
