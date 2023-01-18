//LLAMADOS A LOS ELEMENTOS DEL HTML

const INPUT = document.querySelector(".input-text");
const ADDBTN = document.querySelector(".btn-add");
const FORM = document.querySelector(".form");
const TASKSLIST = document.querySelector(".tasks-list");
const DELETEALLBTN = document.querySelector(".delete-all-btn");

// CREO ARRAY + LOCAL STORAGE

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveLocalStorage = (TASKSLIST) => {
  localStorage.setItem("tasks", JSON.stringify(TASKSLIST));
};

// CREO FUNCION DE RENDERIZADO DE TAREA

const createTask = (task) =>
  `<li class="listita">${task.name}<img class="delete-btn" src="./delete.svg.svg" alt="botón de borrar" data-name=${task.name}></li>`;

// FUNCION DE RENDERIZADO DE LISTA

const renderTasksList = (todoList) => {
  TASKSLIST.innerHTML = todoList.map((task) => createTask(task)).join("");
};

// BOTON BORRAR TODAS HIDDEN

const hideDeleteAllBtn = (TASKSLIST) => {
  if (!TASKSLIST.length) {
    DELETEALLBTN.classList.add("hidden");
    return;
  }
  DELETEALLBTN.classList.remove("hidden");
};

// FUNCION AGREGAR TAREA

const addTask = (e) => {
  e.preventDefault();
  const taskName = INPUT.value.trim().replace(/\s+/g, " ");
  if (!taskName.length) {
    alert("Por Favor Ingrese una tarea");
    return;
  } else if (
    tasks.some((task) => task.name.toLowerCase() === taskName.toLowerCase())
  ) {
    alert("Ya existe una tarea con ese nombre");
    return;
  }

  tasks = [...tasks, { name: taskName }];
  INPUT.value = "";
  renderTasksList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAllBtn(tasks);
};

//FUNCION BORRAR 1 TAREA

const deleteTask = (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const filterName = e.target.dataset.name;

  tasks = tasks.filter((task) => task.name !== filterName);
  renderTasksList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAllBtn(tasks);
};

// FUNCION BORRAR TODAS LAS TAREAS

const removeAll = () => {
  tasks = [];
  renderTasksList(tasks);
  saveLocalStorage(tasks);
  hideDeleteAllBtn(tasks);
};

const init = () => {
  renderTasksList(tasks);
  FORM.addEventListener("submit", addTask);
  TASKSLIST.addEventListener("click", deleteTask);
  DELETEALLBTN.addEventListener("click", removeAll);
  hideDeleteAllBtn(tasks);
};

init();
