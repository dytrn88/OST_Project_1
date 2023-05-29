// Toggle for "Dark theme"
const darkModeButton = document.getElementById('darkMode');
darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


// Listener for "Create button"
const buttonCreate = document.getElementById("createTask");
buttonCreate.onclick = function () {
    modal.style.display = "block";
}

const modal = document.getElementById("taskModal");

const span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// Listener for "Creating an task"



// OOP

