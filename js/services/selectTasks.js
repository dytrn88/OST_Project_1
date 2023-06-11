import { getTask } from "./data/tasks.js";

export function selectTask(event) {
    if (event.target.dataset.todoId) {
        const task = getTask(Number(event.target.dataset.todoId));

        const selectedTitleElement = document.querySelector('#selectedTitle');
        const selectedContentElement = document.querySelector('#selectedContent');
        const selectedDateEelement = document.querySelector('#selectedDate');
        const selectedPriorityElement = document.querySelector('#selectedPriority');

        selectedTitleElement.value = task.title;
        selectedContentElement.value = task.content;
        selectedDateEelement.value = task.date;
        selectedPriorityElement.value = task.priority;
    }
}