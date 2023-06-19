import { getTasks } from './data/tasks.js';
import { getTaskElements } from '../controllers/compileTasks.js';

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
