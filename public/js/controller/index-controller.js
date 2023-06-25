import { taskService } from '../services/task-service.js';
import { closeDialog, closeTask, getTaskElements, openTask, showDialog } from './controller-components.js';


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
        duedate: newTaskDate,
        priority: newTaskPriority,
    };

    await taskService.addTask(newTask);
    closeDialog(dialogOverlay, dialogBox);
    renderAllTasks();
})


// Render all Tasks
const taskContainer = document.querySelector(".task-list");  // desination to display all tasks
const tasksRenderer = Handlebars.compile(document.querySelector("#tasks-template").innerHTML); // Handlebar compiler

async function renderAllTasks() {
    taskContainer.innerHTML = tasksRenderer({ task: await taskService.getAllTask(defaultSortOption) });
}

document.addEventListener('DOMContentLoaded', () => {
    renderAllTasks();
});



// Select and display a task on dialog "Task details"
const taskFormElement = document.querySelector('.task-list'); // trigger to fire the function "select and display function" below

const openTaskDetail = document.querySelector('.task-detail');
const closeTaskBtn = document.querySelector('.close-task');

const editTaskForm = document.querySelector('.edit-task-container') // desination to display the selected task
const renderTask = Handlebars.compile(document.querySelector("#edit-tasks-template").innerHTML); // Handlebar compiler

taskFormElement.addEventListener('click', async (event) => {
    if (event.target.classList.contains('edit-task-btn')) { // read edit button

        const taskId = event.target.parentElement.dataset.id; // find the id assigned within handlebar template
        const task = await taskService.getTask(taskId)
        console.log(task.duedate) // duedate format to be formatted with handlebar helper

        async function retrieveTask() {
            editTaskForm.innerHTML = renderTask(await taskService.getTask(taskId)) // get server response to retrieve task elements
        }

        retrieveTask() // render and display the selected task on in the dialog 
        openTask(openTaskDetail) // open dialog for task details
    }
    renderAllTasks();
})

closeTaskBtn.addEventListener('click', () => {
    closeTask(openTaskDetail);
});


// Edit and update the selected task
const editTaskDetail = document.querySelector('.edit-task-container');

editTaskDetail.addEventListener('click', async (event) => {
    if (event.target.classList.contains('update-task-btn')) { // read update button

        const taskId = event.target.parentElement.dataset.id; // find the id assigned within handlebar template

        const editTitleElement = document.querySelector('#editTitle'); // read input class
        const editContentElement = document.querySelector('#editContent');
        const editDueDateElement = document.querySelector('#editDueDate');
        const editPriorityElement = document.querySelector('#editPriority');

        const updatedTask = { // read new value from input fields
            title: editTitleElement.value,
            content: editContentElement.value,
            duedate: editDueDateElement.value,
            priority: editPriorityElement.value,
        };

        await taskService.updateTask(taskId, updatedTask) // get server response to update task elements
        renderAllTasks();
    }

    if (event.target.classList.contains('delete-task-btn')) { // read delete button

        const taskId = event.target.parentElement.dataset.id;

        await taskService.deleteTask(taskId) // get server response to set DELETE state the selected task
        renderAllTasks();
    }
});


// Apply sort function by date, task or priority
let defaultSortOption = localStorage.getItem('sortOption') || "desc"; // Retrieve the sort option from localStorage or use default "desc"

const sortByDueDateBtn = document.querySelector('#sortTaskDatesBtn'); // trigger to fire the sort function by date

sortByDueDateBtn.addEventListener('click', async (event) => {

    if (defaultSortOption === "asc") {
        defaultSortOption = "desc";
    } else {
        defaultSortOption = "asc";
    }

    localStorage.setItem('sortOption', defaultSortOption); // Store the updated sort option in localStorage

    await renderAllTasks();

});

const sortByTaskBtn = document.querySelector('#sortByTaskBtn'); // trigger to fire the sort function by task
console.log(document.querySelector('#sortByTaskBtn'))

sortByTaskBtn.addEventListener('click', async (event) => {

    if (currentSortOption === "sortByTask") {
        currentSortOrder = currentSortOrder === "asc" ? "desc" : "asc";
    } else {
        currentSortOption = "sortByTask";
        currentSortOrder = "asc";
    }
    await renderAllTasks(currentSortOption, currentSortOrder);
});


// Toggle for "Dark theme"
const darkModeBtn = document.getElementById('darkMode');
darkModeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.classList.toggle('dark-mode');
});