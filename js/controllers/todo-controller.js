import { renderTaskTitles } from '../services/renderTasks.js';
import { showDialog, closeDialog } from './openDialog.js';
import { addNewTask } from '../services/addTasks.js';
import { selectTask, openTask, closeTask } from '../services/selectTasks.js';
import { sortTaskDates, sortTaskPriority, sortTaskTitles } from '../services/sortTasks.js';
import { applyFilter } from '../services/filterTasks.js';



// Render Tasks
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
const closeTaskBtn = document.querySelector('.close-task');

const sortTitleBtn = document.getElementById('sortTaskTitlesBtn')
const sortDateBtn = document.getElementById('sortTaskDatesBtn')
const sortPriorityBtn = document.getElementById('sortTaskPriorityBtn')

const filterTasksBtn = document.querySelector('.filter-task-btn')


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
sortTitleBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    sortTaskTitles();
})
sortDateBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    sortTaskDates();
})
sortPriorityBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    sortTaskPriority();
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
}
);


// Toggle for "Dark theme"
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});