// Your JavaScript code goes here
let tasks = [];

// Function to add a new task
function addTask() {
  const taskName = document.getElementById("taskName").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  if (taskName.trim() !== "") {
    const task = {
      name: taskName,
      dueDate: dueDate || "No due date",
      priority: priority,
      status: "To-do",
    };

    tasks.push(task);
    saveTasksToLocalStorage();
    displayTasks();
    clearInputFields();
  } else {
    alert("Please enter a task name.");
  }
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
}

// Function to display tasks
function displayTasks() {
  tasks = getTasksFromLocalStorage();
  const taskListContainer = document.getElementById("taskList");
  taskListContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task_info");
    taskInfo.innerHTML = `<strong>${task.name}</strong> <div>(Due: ${task.dueDate}, Priority: ${task.priority}, Status: ${task.status}) </div>`;

    // Create a div to hold the buttons
    const buttonsGroup = document.createElement("div");
    buttonsGroup.classList.add("buttons_groups");

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = () => enableEdit(index);
    buttonsGroup.appendChild(editButton);

    const updateProgressButton = document.createElement("button");
    updateProgressButton.innerText = "Update Progress";
    updateProgressButton.onclick = () => updateProgress(index);
    buttonsGroup.appendChild(updateProgressButton);

    const updatePriorityButton = document.createElement("button");
    updatePriorityButton.innerText = "Update Priority";
    updatePriorityButton.onclick = () => updatePriority(index);
    buttonsGroup.appendChild(updatePriorityButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => deleteTask(index);
    buttonsGroup.appendChild(deleteButton);

    // Append buttonsGroup to taskItem
    taskItem.appendChild(taskInfo);
    taskItem.appendChild(buttonsGroup);

    // Append taskItem to taskListContainer
    taskListContainer.appendChild(taskItem);
  });

  updateTaskCount();
}

// Function to enable editing of a task
function enableEdit(index) {
  const taskItem = document.querySelectorAll(".task-item")[index];
  const taskInfo = taskItem.querySelector("div");

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = tasks[index].name;

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.value = tasks[index].dueDate;

  const priorityInput = document.createElement("select");
  priorityInput.id = "priorityInput";
  const priorityOptions = ["high", "medium", "low"];
  priorityOptions.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    option.text = opt.charAt(0).toUpperCase() + opt.slice(1);
    priorityInput.appendChild(option);
  });
  priorityInput.value = tasks[index].priority;

  const saveButton = document.createElement("button");
  saveButton.classList.add("save_btn");
  saveButton.innerText = "Save";
  saveButton.onclick = () =>
    saveChanges(
      index,
      editInput.value,
      dueDateInput.value,
      priorityInput.value
    );

  taskInfo.innerHTML = ""; // Clear existing content
  taskInfo.appendChild(editInput);
  taskInfo.appendChild(dueDateInput);
  taskInfo.appendChild(priorityInput);
  taskInfo.appendChild(saveButton);
}

// Function to save changes after editing a task
function saveChanges(index, newName, newDueDate, newPriority) {
  tasks[index].name = newName;
  tasks[index].dueDate = newDueDate;
  tasks[index].priority = newPriority;
  saveTasksToLocalStorage();
  displayTasks();
}

// Function to update task progress
function updateProgress(index) {
  const statusOptions = ["To-do", "In Progress", "Done"];
  const currentIndex = statusOptions.indexOf(tasks[index].status);
  const newIndex = (currentIndex + 1) % statusOptions.length;
  tasks[index].status = statusOptions[newIndex];
  saveTasksToLocalStorage();
  displayTasks();
}

// Function to update task priority
function updatePriority(index) {
  const priorityOptions = ["high", "medium", "low"];
  const currentIndex = priorityOptions.indexOf(tasks[index].priority);
  const newIndex = (currentIndex + 1) % priorityOptions.length;
  tasks[index].priority = priorityOptions[newIndex];
  saveTasksToLocalStorage();
  displayTasks();
}

// Function to delete a task
function deleteTask(index) {
  const confirmation = confirm("Are you sure you want to delete this task?");
  if (confirmation) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    displayTasks();
  }
}

// Function to clear input fields after adding a task
function clearInputFields() {
  document.getElementById("taskName").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("priority").value = "medium";
}

// Function to filter tasks based on status, priority, and search
function filterTasks() {
  const filterStatus = document.getElementById("filterStatus").value;
  const filterPriority = document.getElementById("filterPriority").value;
  const searchQuery = document.getElementById("search").value.toLowerCase();

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filterStatus === "all" || task.status.toLowerCase() === filterStatus;
    const priorityMatch =
      filterPriority === "all" ||
      task.priority.toLowerCase() === filterPriority;
    const searchMatch = task.name.toLowerCase().includes(searchQuery);

    return statusMatch && priorityMatch && searchMatch;
  });

  displayFilteredTasks(filteredTasks);
}

// Function to display filtered tasks
function displayFilteredTasks(filteredTasks) {
  const taskListContainer = document.getElementById("taskList");
  taskListContainer.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    // const taskInfo = document.createElement("div");
    // taskInfo.innerHTML = `<strong>${task.name}</strong> (Due: ${task.dueDate}, Priority: ${task.priority}, Status: ${task.status})`;
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task_info");
    taskInfo.innerHTML = `<strong>${task.name}</strong> <div>(Due: ${task.dueDate}, Priority: ${task.priority}, Status: ${task.status}) </div>`;
    taskItem.appendChild(taskInfo);

    const buttonsGroup = document.createElement("div");
    buttonsGroup.classList.add("buttons_groups");

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.onclick = () => enableEdit(index);
    buttonsGroup.appendChild(editButton);

    const updatePriorityButton = document.createElement("button");
    updatePriorityButton.innerText = "Update Priority";
    updatePriorityButton.onclick = () => updatePriority(index);
    buttonsGroup.appendChild(updatePriorityButton);

    const updateProgressButton = document.createElement("button");
    updateProgressButton.innerText = "Update Progress";
    updateProgressButton.onclick = () => updateProgress(index);
    buttonsGroup.appendChild(updateProgressButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = () => deleteTask(index);
    buttonsGroup.appendChild(deleteButton);

    // Append buttonsGroup to taskItem
    taskItem.appendChild(buttonsGroup);

    // Append taskItem to taskListContainer
    taskListContainer.appendChild(taskItem);
  });

  updateTaskCount();
}

// Function to update task count
function updateTaskCount() {
  const taskCountContainer = document.getElementById("taskCount");
  const taskCount = {
    "to-do": tasks.filter((task) => task.status === "To-do").length,
    "in-progress": tasks.filter((task) => task.status === "In Progress").length,
    done: tasks.filter((task) => task.status === "Done").length,
  };

  taskCountContainer.innerHTML = `To-Do: ${taskCount["to-do"]} | In Progress: ${taskCount["in-progress"]} | Done: ${taskCount["done"]}`;
}

// Initial display of tasks
displayTasks();
