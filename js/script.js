// DOM element references
const taskInput = document.getElementById("input-box");
const taskList = document.getElementById("listContainer");
const resetButton = document.getElementById("resetBtn");

// Adds a new task to the list
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("You must write something");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const deleteButton = document.createElement("span");
    deleteButton.textContent = "x";

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    taskInput.value = "";

    saveTasksToLocal();
    toggleResetButton();
}

// Handles Enter key to add task
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Handles checking and deleting tasks
taskList.addEventListener("click", (event) => {
    const clickedElement = event.target;

    if (clickedElement.tagName === "LI") {
        clickedElement.classList.toggle("checked");
        saveTasksToLocal();
    } else if (clickedElement.tagName === "SPAN") {
        clickedElement.parentElement.remove();
        saveTasksToLocal();
    }

    toggleResetButton();
});

// Saves tasks to localStorage
function saveTasksToLocal() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

// Loads tasks from localStorage on page load
function loadTasksFromLocal() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";
    toggleResetButton();
}

// Clears all tasks
function clearTasks() {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
    toggleResetButton();
}

// Shows or hides the reset button based on task count
function toggleResetButton() {
    const hasTasks = taskList.querySelectorAll("li").length > 0;
    resetButton.style.display = hasTasks ? "block" : "none";
}

// Initialize the app
loadTasksFromLocal();
