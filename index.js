"use strict";

// Variables
const STORAGE_KEY = "tasks";

// DOM variables
const form = document.querySelector(".create-task-form");
const taskInput = document.querySelector(".task-input");
const filterInput = document.querySelector(".filter-input");
const taskList = document.querySelector(".collection");
const clearButton = document.querySelector(".clear-tasks");
let tasks={};
// "storage" functions
const getTasksFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return tasks;
};

const storeTaskInLocalStorage = (task) => {
  const tasks = getTasksFromLocalStorage();
  tasks.push({
    id: Date.now(),
    text: task,
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const removeTaskFromLocalStorage = (id) => {
  const tasks = getTasksFromLocalStorage();
  const deletedIndex = tasks.findIndex((task) => task.id==id);
  // other variant .filter
  //const deletedIndex = tasks.findIndex((task) => task === deletedTask);
  tasks.splice(deletedIndex, 1);
  

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
const editTaskInLocalStorage = (editedText, editId) => {
  const tasks = getTasksFromLocalStorage();
  const editedIndex = tasks.findIndex((task) =>
  task.id == editId);
  tasks[editedIndex].text = editedText;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}


const clearTasksFromLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// "tasks" functions
const getTasks = () => {
  const tasks = getTasksFromLocalStorage();

  tasks.forEach((tasks) => {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.textContent = tasks.text;
    li.setAttribute('id', tasks.id);

    const taskText = document.createElement("span");
    taskText.className = "delete-item edit-item";
    taskText.innerHTML = '<i class="fa fa-remove"></i> <i class="fa fa-edit"></i>';
    li.append(taskText);

    // Append li to ul
    taskList.append(li);
  });
};

const addTask = (event) => {
  event.preventDefault();

  // Пусте значення або пробіли
  if (taskInput.value.trim() === "") {
    return;
  }

  // Create and add LI element
  const li = document.createElement("li");
  li.className = "collection-item";
  li.textContent = taskInput.value; // значення яке ввів користувач

  const taskText = document.createElement("span");
  taskText.className = "delete-item edit-item";
  taskText.innerHTML = '<i class="fa fa-remove"></i> <i class="fa fa-edit"></i>';
    
  li.append(taskText);

  taskList.append(li);

  // Save to storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input value
  taskInput.value = "";
};

const removeTask = (event) => {
  const isDeleteIcon = event.target.classList.contains("fa-remove");

  if (isDeleteIcon) {
    const isApproved = confirm("Ви впевнені що хочете видалити це завдання?");

    if (isApproved) {
      // remove from DOM
      // console.log(event.target.parentElement.parentElement);
      const deletedLi = event.target.closest("li");
      deletedLi.id;
      console.log( deletedLi.id);
      deletedLi.remove();
      
      removeTaskFromLocalStorage(deletedLi.id);
    }
  }
};
const editTask = (event) => {
    const isEditIcon = event.target.classList.contains("fa-edit");
    let editLi = event.target.closest("li");
    console.log(editLi);
    if (isEditIcon) {
        const newText = prompt("Хочеш щось змінити?", editLi.textContent) 
        if (newText) {
            console.log(newText);
            console.log(editLi.id);
            editLi.textContent = newText;
            editTaskInLocalStorage(newText, editLi.id);
        }
    }

}

const clearTasks = () => {
  taskList.innerHTML = "";
  clearTasksFromLocalStorage();
};

const filterTasks = (event) => {
  const text = event.target.value.toLowerCase();
  const list = document.querySelectorAll(".collection-item");

  list.forEach((task) => {
    const item = task.firstChild.textContent.toLowerCase();

    if (item.includes(text)) {
      // task.style.display = "block"; // task.hidden = true
      task.style.display = "list-item";
    } else {
      task.style.display = "none";
    }
  });
};

// init
getTasks();

// Event listeners

// document.addEventListener("DOMContentLoaded", () => {
//   getTasks();
// });

form.addEventListener("submit", addTask);

taskList.addEventListener("click", removeTask);
taskList.addEventListener("click", editTask);

clearButton.addEventListener("click", clearTasks);

filterInput.addEventListener("input", filterTasks);
