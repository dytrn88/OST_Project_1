import { getTasks } from './data/tasks.js';

export function getTaskElements(taskTitlesElement, task) {
    const taskEntry = `<p class="task-title" data-todo-id="${task.id}">${task.title}</p>`;
    const dateEntry = `<p data-todo-id="${task.id}">${task.date}</p>`;
    const priorityEntry = `<p data-todo-id="${task.id}">${task.priority}</p>`;
    const checkBox = `<input class="task-checkbox" type="checkbox" data-todo-id="${task.id}"${task.isDone ? ' checked' : ''}>`;

    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-list-container');

    taskContainer.innerHTML = `
        ${checkBox}
        ${taskEntry}
        ${priorityEntry}
        ${dateEntry}
    `;

    taskTitlesElement.appendChild(taskContainer);

}
export function renderTaskTitles() {
    const taskTitlesElement = document.querySelector('#taskList');
    taskTitlesElement.innerHTML = '';

    getTasks().forEach(task => {
        getTaskElements(taskTitlesElement, task);
    });
}

let isAscending = true;

export function sortTaskTitles() {
    const taskTitlesElement = document.querySelector('#taskList');
    taskTitlesElement.innerHTML = '';

    const tasks = getTasks();

    if (isAscending) {
        tasks.sort((a, b) => a.title.localeCompare(b.title));
    } else {
        tasks.sort((a, b) => b.title.localeCompare(a.title));
    }

    isAscending = !isAscending;

    tasks.forEach(task => {
        getTaskElements(taskTitlesElement, task);
    });
}

export function sortTaskDates() {
    const taskTitlesElement = document.querySelector('#taskList');
    taskTitlesElement.innerHTML = '';

    const tasks = getTasks();

    if (isAscending) {
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
        tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    isAscending = !isAscending;

    tasks.forEach(task => {
        getTaskElements(taskTitlesElement, task);
    });
}



