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

    const checkBoxStatus = taskContainer.querySelector('.task-checkbox');
    checkBoxStatus.addEventListener('change', () => {
        task.isDone = checkBoxStatus.checked;
    });


}


