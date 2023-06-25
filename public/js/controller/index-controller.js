import { applyFilter, taskService } from '../services/task-service.js';

import { closeDialog, closeTask, getTaskElements, openTask, showDialog } from './controller-components.js';

import { selectTask } from '../services/selectTasks.js';
import { sortTaskDates, sortTaskPriority, sortTaskTitles } from '../services/sortTasks.js';

/* import { renderTaskTitles } from '../services/renderTasks.js'; */

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

    console.log(getNewDate.value);

    const newTask = {
        title: newTaskTitle,
        content: newTaskContent,
        date: newTaskDate,
        priority: newTaskPriority,
        state: "OK"
    };

    await taskService.addTask(newTask);
    closeDialog(dialogOverlay, dialogBox);
    renderAllTasks();
})


// Render all Tasks
const taskContainer = document.querySelector(".task-list");  // desination to display all tasks
const tasksRenderer = Handlebars.compile(document.querySelector("#tasks-template").innerHTML); // Handlebar compiler

async function renderAllTasks() {
    taskContainer.innerHTML = tasksRenderer({ task: await taskService.getAllTask() });
}

document.addEventListener('DOMContentLoaded', () => {
    renderAllTasks();
});


// Select and display a task on dialog "Task details"
const taskFormElement = document.querySelector('.task-list'); // trigger to fire the function "select and display function" below

const openTaskDetail = document.querySelector('.task-detail');
const closeTaskBtn = document.querySelector('.close-task');

const editTaskForm = document.querySelector('.edit-test-container') // desination to display the selected task
const renderTask = Handlebars.compile(document.querySelector("#edit-tasks-template").innerHTML); // Handlebar compiler

taskFormElement.addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit-task-btn')) { // read edit button

        const taskId = event.target.parentElement.dataset.id; // find the id assigned within handlebar template
        console.log(taskId)
        const task = await taskService.getTask(taskId)
        console.log(task.duedate) // duedate format seems wrong

        async function retrieveTask() {
            editTaskForm.innerHTML = renderTask(await taskService.getTask(taskId)) // get server response to retrieve task elements
        }

        const selectedIdElement = document.querySelector('#selectedId');
        const selectedTitleElement = document.querySelector('#selectedTitle'); // direct the selected task to the input form
        const selectedContentElement = document.querySelector('#selectedContent');
        const selectedDueDateElement = document.querySelector('#selectedDate');
        const selectedPriorityElement = document.querySelector('#selectedPriority');

        selectedIdElement.value = task._id;
        console.log(selectedIdElement.value)
        selectedTitleElement.value = task.title;
        selectedContentElement.value = task.content;
        selectedDueDateElement.value = task.duedate; // duedate format needs to be fixed, I guess need a handlebar helper
        selectedPriorityElement.value = task.priority;

        retrieveTask() // render and display the selected task on in the dialog 
        openTask(openTaskDetail) // open dialog for task details
    }

    if (event.target.classList.contains('delete-task-btn')) { // read delete button

        const taskId = event.target.parentElement.dataset.id;
        console.log(taskId)

        await taskService.deleteTask(taskId)
    }
})

closeTaskBtn.addEventListener('click', () => {
    closeTask(openTaskDetail);
});

// Edit and update the selected task
const editTaskDetail = document.querySelector('.task-detail-container');
// const updateTaskBtn = document.querySelector('.update-task-btn');

editTaskDetail.addEventListener('click', async (event) => {
    if (event.target.classList.contains('update-task-btn')) {
        console.log("test")

        const id = event.target.querySelector('#selectedId')

        console.log(id); // Example: log the ID value
    }


    const selectedTitleElement = document.querySelector('#selectedTitle');
    const selectedContentElement = document.querySelector('#selectedContent');
    const selectedDateElement = document.querySelector('#selectedDate');
    const selectedPriorityElement = document.querySelector('#selectedPriority');
    console.log(selectedTitleElement.value) // Test of new value succeeded

    const updatedTask = {
        title: selectedTitleElement.value,
        content: selectedContentElement.value,
        duedate: selectedDateElement.value,
        priority: selectedPriorityElement.value,
    };

    console.log(updatedTask)

    await taskService.updateTask(updatedTask)
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


// Edit the selected task > get from selectTasks.js


/* filterTasksBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    applyFilter();
});
 */

// Toggle for "Dark theme"
const darkModeBtn = document.getElementById('darkMode');
darkModeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.classList.toggle('dark-mode');
});