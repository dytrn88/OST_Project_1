export function showDialog(dialogOverlay, dialogBox) {
    dialogOverlay.style.display = 'block';
    dialogBox.style.display = 'block';
}

export function closeDialog(dialogOverlay, dialogBox) {
    dialogOverlay.style.display = 'none';
    dialogBox.style.display = 'none';
}

export function openTask(openTaskDetail) {
    openTaskDetail.style.display = 'block';
}

export function closeTask(openTaskDetail) {
    openTaskDetail.style.display = 'none';
}

/* const checkBox = `<input class="task-checkbox" type="checkbox" data-todo-id="${task.id}"${task.isDone ? ' checked' : ''}>`;
${checkBox}
const checkBoxStatus = taskContainer.querySelector('.task-checkbox');
checkBoxStatus.addEventListener('change', () => {
    task.isDone = checkBoxStatus.checked;
}); */

/* export function getTaskElements(taskTitlesElement, task) {
    const taskEntry = `<p class="task-title" data-todo-id="${task.id}">${task.title}</p>`;
    const dateEntry = `<p class="task-date" data-todo-id="${task.id}">${task.duedate}</p>`;
    const priorityEntry = `<p class="task-priority" data-todo-id="${task.id}">${task.priority}</p>`;


    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-list-container');

    taskContainer.innerHTML = `
    ${taskEntry}
    ${priorityEntry}
    ${dateEntry}
    </br>
    
    `;

    taskTitlesElement.appendChild(taskContainer);
} */