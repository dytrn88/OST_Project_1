import { getTask, updateTask } from "./data/tasks.js";
import { renderTaskTitles } from "./renderTasks.js"

export function selectTask(event) {
    if (event.target.dataset.todoId) {
        const taskId = Number(event.target.dataset.todoId);
        const task = getTask(taskId);

        const selectedTitleElement = document.querySelector('#selectedTitle');
        const selectedContentElement = document.querySelector('#selectedContent');
        const selectedDateElement = document.querySelector('#selectedDate');
        const selectedPriorityElement = document.querySelector('#selectedPriority');

        selectedTitleElement.value = task.title;
        selectedContentElement.value = task.content;
        selectedDateElement.value = task.date;
        selectedPriorityElement.value = task.priority;

        // Set the taskId as a data attribute on the update button
        updateTaskBtn.dataset.taskId = taskId;
    }
}

export function openTask(openTaskDetail) {
    openTaskDetail.style.display = 'block';
}

const updateTaskBtn = document.getElementById('updateTaskBtn');

updateTaskBtn.addEventListener('click', () => {

    const selectedTitleElement = document.querySelector('#selectedTitle');
    const selectedContentElement = document.querySelector('#selectedContent');
    const selectedDateElement = document.querySelector('#selectedDate');
    const selectedPriorityElement = document.querySelector('#selectedPriority');

    const taskId = parseInt(updateTaskBtn.dataset.taskId);

    const updatedTask = {
        title: selectedTitleElement.value,
        content: selectedContentElement.value,
        date: selectedDateElement.value,
        priority: selectedPriorityElement.value,
    };

    const confirmation = confirm('Do you want to save the changes?');
    if (confirmation) {
        const updated = updateTask(taskId, updatedTask);
        if (updated) {
            console.log('Task updated successfully:', updated);
            renderTaskTitles();
        } else {
            console.log('Failed to update task:', taskId);
        }
    }
});

