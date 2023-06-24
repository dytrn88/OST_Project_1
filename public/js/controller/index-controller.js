import { applyFilter, taskService } from '../services/task-service.js';

import { closeDialog, getTaskElements, showDialog } from './controller-components.js';

import { selectTask, openTask, closeTask } from '../services/selectTasks.js';
import { sortTaskDates, sortTaskPriority, sortTaskTitles } from '../services/sortTasks.js';

import { renderTaskTitles } from '../services/renderTasks.js';

const taskTitlesElement = document.querySelector('#taskList');
const openTaskDetail = document.querySelector('.task-detail');
const closeTaskBtn = document.querySelector('.close-task');

const sortTitleBtn = document.getElementById('sortTaskTitlesBtn')
const sortDateBtn = document.getElementById('sortTaskDatesBtn')
const sortPriorityBtn = document.getElementById('sortTaskPriorityBtn')

const filterTasksBtn = document.querySelector('.filter-task-btn')


// Open dialog with + Create button and close dialog
const createBtn = document.getElementById('openDialog');
const closeBtn = document.querySelector('.close');
const dialogOverlay = document.querySelector('.dialog-overlay');
const dialogBox = document.querySelector('.dialog-box');

createBtn.addEventListener('click', () => {
    showDialog(dialogOverlay, dialogBox);
});

closeBtn.addEventListener('click', () => {
    closeDialog(dialogOverlay, dialogBox);
});

dialogOverlay.addEventListener('click', (event) => {
    if (event.target === dialogOverlay) {
        closeDialog(dialogOverlay, dialogBox);
    }
});


// Submit and save a new Task within dialog
const newTaskBtn = document.getElementById('newTaskBtn');

const getNewTitle = document.getElementById('newTaskTitle');
const getNewContent = document.getElementById('newTaskContent');
const getNewDate = document.getElementById('newTaskDate');
const getNewPriority = document.getElementById('newTaskPriority');

newTaskBtn.addEventListener('click', async (event) => {
    event.preventDefault();
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

    await taskService.addTask(newTask);
    closeDialog(dialogOverlay, dialogBox);
})


// Render Tasks
const taskContainer = document.querySelector(".task-list");
const tasksRenderer = Handlebars.compile(document.querySelector("#tasks-template").innerHTML);

async function renderAllTasks() {
    taskContainer.innerHTML = tasksRenderer({ task: await taskService.getAllTask() });
}

document.addEventListener('DOMContentLoaded', () => {
    renderAllTasks();
});


// Sort by tasks
sortTitleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    sortTaskTitles();
});
sortDateBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    sortTaskDates();
});
sortPriorityBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    sortTaskPriority();
});


// Delete task
const deleteTaskBtn = document.getElementById('deleteTaskBtn');
console.log(document.getElementById('deleteTaskBtn'))
deleteTaskBtn.addEventListener('click', async (event) => {
    event.stopPropagation();
    await taskService.deleteTask()
})


// Select task to display or close on the right side
taskTitlesElement.addEventListener('click', (event) => {
    selectTask(event);
    openTask(openTaskDetail);
});

closeTaskBtn.addEventListener('click', () => {
    closeTask(openTaskDetail);
});

// Edit the selected task > get from selectTasks.js


filterTasksBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    applyFilter();
});


// Toggle for "Dark theme"
const darkModeBtn = document.getElementById('darkMode');

darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});