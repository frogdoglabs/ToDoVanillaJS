import ConfettiGenerator from "confetti-js";


export const elements = {
  taskInput: document.querySelector('#new-task'),
  btnAdd: document.querySelector('.addTask'),
  tasksAll: document.querySelector('.todos'),
  tasksTodo: document.querySelector('#incomplete-tasks'),
  tasksComplete: document.querySelector('#completed-tasks'),
  taskLabel: document.querySelector('.label'),
  clearAll: document.querySelector('.clearAll')
};

export const getInput = () => elements.taskInput.value; 

export const clearInput = () => {
  elements.taskInput.value = '';
};

export const renderTask = task => {
  const markup = `
    <li class="todo_task" data-taskid=${task.id}>
      <input type="checkbox" class="checkbox" ${task.status === 0 ? '' : 'checked="true"'}>
      <label class="label" id="${task.id}" contenteditable="true">${task.title}</label>
      <button class="delete">&ndash;</button>
    </li>
  `;
  
  // where to render the task
  if (task.status === 0) {
    elements.tasksTodo.insertAdjacentHTML('beforeend', markup);

  } else {
    elements.tasksComplete.insertAdjacentHTML('beforeend', markup);
  }
};

export const deleteTask = id => {
  const task = document.querySelector(`[data-taskid="${id}"]`);
  task.parentElement.removeChild(task);
};

export const getTitle = id => document.getElementById(`${id}`).textContent;

export const focusInput = () => elements.taskInput.focus();

export const dropConfetti = () => {
  var confettiSettings = { 
    target: 'my-canvas',
    respawn: true,
    rotate: true,
    clock: 40,
    max: 80
  };
  let confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();

  setTimeout(confetti.clear, 3000);
};
