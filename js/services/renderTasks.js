import { getTasks } from './data/tasks.js'

export function renderTaskTitles() {
    const taskTitlesElement = document.querySelector('#taskList');
    taskTitlesElement.innerHTML = '';

    getTasks().forEach(task => {
        const taskEntry = `<p data-todo-id=${task.id}>${task.title}`
        const dateEntry = `<p data-todo-id=${task.id}>${task.date}<p/>`

        taskTitlesElement.insertAdjacentHTML('beforeend', taskEntry);
        taskTitlesElement.insertAdjacentHTML('beforeend', dateEntry);

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
        const taskEntry = `<p data-todo-id=${task.id}>${task.title}<p/>`;
        const dateEntry = `<p data-todo-id=${task.id}>${task.date}<p/>`;

        taskTitlesElement.insertAdjacentHTML('beforeend', taskEntry);
        taskTitlesElement.insertAdjacentHTML('beforeend', dateEntry);
    });
}

export function sortTaskDates() {
    const taskTitlesElement = document.querySelector('#taskList');
    taskTitlesElement.innerHTML = '';

    const tasks = getTasks();

    if (isAscending) {
        tasks.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
    } else {
        tasks.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
    }

    isAscending = !isAscending;

    tasks.forEach(task => {
        const taskEntry = `<p data-todo-id=${task.id}>${task.title}<p/>`;
        const dateEntry = `<p data-todo-id=${task.id}>${task.date}<p/>`;

        taskTitlesElement.insertAdjacentHTML('beforeend', taskEntry);
        taskTitlesElement.insertAdjacentHTML('beforeend', dateEntry);
    });
}

