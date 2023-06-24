import { getTasks } from "./data/tasks.js";
import { getTaskElements } from "../controller/controller-components.js";

export function updateTaskList(tasks) {
    const taskTitlesElement = document.querySelector('#taskList');
    taskTitlesElement.innerHTML = '';

    tasks.forEach(task => {
        getTaskElements(taskTitlesElement, task);
    });
}

let isAscending = true;

export function sortTaskTitles() {
    const tasks = getTasks();

    if (isAscending) {
        tasks.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        tasks.sort((a, b) => b.title.localeCompare(a.title));
    }

    isAscending = !isAscending;

    updateTaskList(tasks);
}

export function sortTaskDates() {
    const tasks = getTasks();

    if (isAscending) {
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
        tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    isAscending = !isAscending;

    updateTaskList(tasks);
}

export function sortTaskPriority() {
    const tasks = getTasks();

    if (isAscending) {
        tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    } else {
        tasks.sort((a, b) => b.priority.localeCompare(a.priority));
    }

    isAscending = !isAscending;

    updateTaskList(tasks);
}
