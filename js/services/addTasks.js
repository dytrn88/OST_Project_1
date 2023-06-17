import { addTask } from "./data/tasks.js";
import { renderTaskTitles } from "./renderTasks.js";

export function addNewTask() {
    const getNewTitle = document.getElementById('newTaskTitle');
    const getNewContent = document.getElementById('newTaskContent');
    const getNewDate = document.getElementById('newTaskDate');
    const getNewPriority = document.getElementById('newTaskPriority');

    const newTaskTitle = getNewTitle.value;
    const newTaskContent = getNewContent.value;
    const newTaskDate = getNewDate.value;
    const newTaskPriority = getNewPriority.value;

    const newTask = {
        title: newTaskTitle,
        content: newTaskContent,
        date: newTaskDate,
        priority: newTaskPriority,
    };

    addTask(newTask);

    renderTaskTitles();

    getNewTitle.value = '';
}


