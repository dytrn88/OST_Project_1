import { addTask, getTasks } from './data/tasks.js';
import { httpService } from './http-service.js'
import { renderTaskTitles } from './renderTasks.js';
import { getTaskElements } from '../controller/controller-components.js';

class TaskService {
    async getAllTask(sortBy) {
        return httpService.ajax("GET", `/task/?sortBy=${sortBy}`);
    }

    async addTask(task) {
        return httpService.ajax("POST", "/task/", {
            title: task.title,
            content: task.content,
            priority: task.priority,
            duedate: task.duedate,
            state: task.state
        });
    }

    async getTask(id) {
        return httpService.ajax("GET", `/task/${id}`, undefined);
    }

    async updateTask(_id, task) {
        return httpService.ajax("POST", `/task/${_id}`, {
            title: task.title,
            content: task.content,
            priority: task.priority,
            duedate: task.duedate
        });
    }

    async deleteTask(id) {
        return httpService.ajax("DELETE", `/task/${id}`, undefined);
    }
}

export const taskService = new TaskService();


// Filtering completed tasks function 

/* let isFilterActive = false;

export function applyFilter() {
    const taskTitlesElement = document.querySelector('#taskList');
    taskTitlesElement.innerHTML = '';

    const tasks = getTasks();

    if (isFilterActive) {
        const filteredTasks = tasks.filter(task => !task.isDone);
        filteredTasks.forEach(task => {
            getTaskElements(taskTitlesElement, task);
        });
    } else {
        tasks.forEach(task => {
            getTaskElements(taskTitlesElement, task);
        });
    }

    isFilterActive = !isFilterActive;
} */