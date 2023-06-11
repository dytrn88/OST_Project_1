import { getTasks } from './data/tasks.js'

export function renderTaskTitles() {
    const taskTitlesElement = document.querySelector('#taskList');
    taskTitlesElement.innerHTML = '';

    getTasks().forEach(task => {
        const taskEntry = `<p data-todo-id=${task.id}>${task.title}<p/>`
        taskTitlesElement.insertAdjacentHTML('beforeend', taskEntry);
    });

}