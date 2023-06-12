import { getTaskId } from "./data/tasks.js";

export function selectTask(event) {
    if (event.target.dataset.todoId) {
        const taskId = getTaskId(Number(event.target.dataset.todoId));

        const selectedTitleElement = document.querySelector('#selectedTitle');
        const selectedContentElement = document.querySelector('#selectedContent');
        const selectedDateEelement = document.querySelector('#selectedDate');
        const selectedPriorityElement = document.querySelector('#selectedPriority');

        selectedTitleElement.value = taskId.title;
        selectedContentElement.value = taskId.content;
        selectedDateEelement.value = taskId.date;
        selectedPriorityElement.value = taskId.priority;
    }
}