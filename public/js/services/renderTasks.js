
import { getTasks } from './data/tasks.js';
import { getTaskElements } from '../controller/controller-components.js';


export function renderTaskTitles() {
    const taskTitlesElement = document.querySelector('#taskList');
    taskTitlesElement.innerHTML = '';

    getTasks().forEach(task => {
        getTaskElements(taskTitlesElement, task);
    });
}





