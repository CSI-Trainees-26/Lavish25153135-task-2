/* 
   GET ELEMENTS FROM HTML
    */

// Input where the user types a task
const taskInput = document.getElementById("new-task-input");

// Add Task button
const addTaskButton = document.getElementById("add-task-button");

// List where pending tasks will appear
const pendingTaskList = document.getElementById("pending-task-list");

// List where completed tasks will appear
const completedTaskList = document.getElementById("completed-task-list");

// Text showing daily progress
const dailyProgress = document.getElementById("daily-progress");


/* 
   TASK DATA
    */

// Get saved tasks from LocalStorage.


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


/* 
   SAVE TASKS
    */

function saveTasks() {

    // Convert the JavaScript array into text
    // and save it inside LocalStorage.

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


/* 
   DISPLAY ALL TASKS
    */

function displayTasks() {

    // First remove everything currently displayed.

    pendingTaskList.innerHTML = "";
    completedTaskList.innerHTML = "";


    // Go through every task in the array.

    tasks.forEach(function(task) {

        // Create a <li>
        const listItem = document.createElement("li");

        listItem.classList.add("task-item");


        // ---------------------------------
        // CREATE CHECKBOX
        // ---------------------------------

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-checkbox");

        checkbox.checked = task.completed;


        // When checkbox is clicked
        checkbox.addEventListener("change", function() {

            // Change the task's completed status
            task.completed = checkbox.checked;

            // Save the updated task
            saveTasks();

            // Display the tasks again
            displayTasks();

        });


        // ---------------------------------
        // CREATE TASK TEXT
        // ---------------------------------

        const taskTitle = document.createElement("span");

        taskTitle.textContent = task.title;

        taskTitle.classList.add("task-title");


        // ---------------------------------
        // CREATE BUTTON CONTAINER
        // ---------------------------------

        const taskActions = document.createElement("div");

        taskActions.classList.add("task-actions");


        // ---------------------------------
        // EDIT BUTTON
        // ---------------------------------

        const editButton = document.createElement("button");

        editButton.innerHTML = "<i class='bx bx-edit'></i>";

        editButton.title = "Edit task";


        editButton.addEventListener("click", function() {

            // Ask the user for a new task name
            const newTitle = prompt(
                "Edit your task:",
                task.title
            );


            // If the user entered something
            if (newTitle !== null && newTitle.trim() !== "") {

                task.title = newTitle.trim();

                saveTasks();

                displayTasks();

            }

        });


        
        // DELETE BUTTON
        

        const deleteButton = document.createElement("button");

        deleteButton.innerHTML = "<i class='bx bx-trash'></i>";

        deleteButton.classList.add("delete-button");

        deleteButton.title = "Delete task";


        deleteButton.addEventListener("click", function() {

            // Remove the selected task
            //
            // filter() creates a new array
            // without the task we want to delete.

            tasks = tasks.filter(function(item) {

                return item.id !== task.id;

            });


            saveTasks();

            displayTasks();

        });


        
        // PUT BUTTONS TOGETHER
        
        taskActions.appendChild(editButton);

        taskActions.appendChild(deleteButton);


        
        // PUT EVERYTHING INSIDE <li>
        

        listItem.appendChild(checkbox);

        listItem.appendChild(taskTitle);

        listItem.appendChild(taskActions);


        
        // ADD TASK TO CORRECT SECTION
        

        if (task.completed === false) {

            pendingTaskList.appendChild(listItem);

        } else {

            listItem.classList.add("completed-task");

            completedTaskList.appendChild(listItem);

        }

    });


    // Update the numbers shown in the headings
    updateTaskCounts();

}


/* 
   ADD NEW TASK
    */

function addTask() {

    // Get the text entered by the user
    const taskText = taskInput.value.trim();


    // Don't allow an empty task
    if (taskText === "") {

        return;

    }


    // Create a new task object

    const newTask = {

        id: Date.now(),

        title: taskText,

        completed: false

    };


    // Add the new task to our array

    tasks.push(newTask);


    // Save the new array

    saveTasks();


    // Display the updated tasks

    displayTasks();


    // Empty the input box

    taskInput.value = "";

}


/* =========================================
   ADD TASK BUTTON
   ========================================= */

addTaskButton.addEventListener("click", function() {

    addTask();

});


/* 
   PRESS ENTER TO ADD TASK
    */

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


/* 
   UPDATE TASK COUNTS
   */

function updateTaskCounts() {

    // Count pending tasks

    const pendingTasks = tasks.filter(function(task) {

        return task.completed === false;

    });


    // Count completed tasks

    const completedTasks = tasks.filter(function(task) {

        return task.completed === true;

    });


    // Update the headings

    document.querySelector(".pending-tasks h2").textContent =
        "Pending Tasks (" + pendingTasks.length + ")";


    document.querySelector(".completed-tasks h2").textContent =
        "Completed Tasks (" + completedTasks.length + ")";


    // Update daily progress

    dailyProgress.textContent =
        completedTasks.length +
        "/" +
        tasks.length +
        " Completed";

}


/* 
   LOAD TASKS WHEN PAGE OPENS
    */

displayTasks();