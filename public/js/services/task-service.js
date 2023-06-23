import { addTask, getTasks } from './data/tasks.js';
import { httpService } from './http-service.js'
import { renderTaskTitles } from './renderTasks.js';
import { getTaskElements } from '../controller/task-controller.js';

class TaskService {
    async getAllTask() {
        return httpService.ajax("GET", "/task/", undefined);
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
        return httpService.ajax("POST", `/task/${id}`, {
            title: task.title,
            content: task.content,
            priority: task.priority,
            duedate: task.duedate,
            state: task.state
        });
    }

    async deleteTask(id) {
        return httpService.ajax("DELETE", `/task/${id}`, undefined);
    }
}

export const taskService = new TaskService();


// Adding a task function

export function addNewTask() {
    const getNewTitle = document.getElementById('newTaskTitle');
    const getNewContent = document.getElementById('newTaskContent');
    const getNewDate = document.getElementById('newTaskDate');
    const getNewPriority = document.getElementById('newTaskPriority');

    const newTaskTitle = getNewTitle.value;
    const newTaskContent = getNewContent.value;
    const newTaskDate = getNewDate.value;
    const newTaskPriority = getNewPriority.value;

    const newTask = {
        title: newTaskTitle,
        content: newTaskContent,
        date: newTaskDate,
        priority: newTaskPriority,
    };

    addTask(newTask);

    renderTaskTitles();

    getNewTitle.value = '';
}


// Filtering completed tasks function

let isFilterActive = false;

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
}