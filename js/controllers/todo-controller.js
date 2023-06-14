import { renderTaskTitles, sortTaskTitles, sortTaskDates } from '../services/renderTasks.js';
import { addNewTask } from '../services/addTasks.js';
import { selectTask, openTask } from '../services/selectTasks.js';
import { showDialog, closeDialog } from '../services/openDialog.js';

document.addEventListener('DOMContentLoaded', () => {
    renderTaskTitles();
});

const createBtn = document.getElementById('openDialog');
const darkModeBtn = document.getElementById('darkMode');

const dialogOverlay = document.querySelector('.dialog-overlay');
const dialogBox = document.querySelector('.dialog-box');
const closeBtn = document.querySelector('.close');

const newTaskBtn = document.getElementById('newTaskBtn');

const taskTitlesElement = document.querySelector('#taskList');
const openTaskDetail = document.querySelector('.task-detail');

// Open dialog with + Create button
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


// Submit and save a new Task
newTaskBtn.addEventListener('click', () => {
    addNewTask();
    closeDialog(dialogOverlay, dialogBox);
});

// Sort by tasks
document.getElementById('sortTaskTitlesBtn').addEventListener('click', () => {
    sortTaskTitles();
});
document.getElementById('sortTaskDatesBtn').addEventListener('click', () => {
    sortTaskDates();
});

// Select task to display on the right side
taskTitlesElement.addEventListener('click', (event) => {
    selectTask(event);
    openTask(openTaskDetail);
});

// Edit the selected task



// Toggle for "Dark theme"
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});