import { getTasks } from "./data/tasks";
import { getTaskElements } from "./renderTasks";

let isAscending = true;

export function sortTaskPriority() {
    const taskTitlesElement = document.querySelector('#taskList');
    taskTitlesElement.innerHTML = '';

    const tasks = getTasks();

    if (isAscending) {
        tasks.sort((a, b) => a.priority.localeCompare(b.priority));
    } else {
        tasks.sort((a, b) => b.priority.localeCompare(a.priority));
    }

    isAscending = !isAscending;

    tasks.forEach(task => {
        getTaskElements(taskTitlesElement, task);
    });
}