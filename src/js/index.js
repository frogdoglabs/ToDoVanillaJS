import List from './models/List';
import * as listView from './views/listView';
import swal from 'sweetalert';


const state = {};
// testing
window.s = state;


const addTask = () => {
  // get input values
  const title = listView.getInput();

  if (title) {
    // add task to state and then UI
    const task = state.list.newTask(title);
    
    listView.clearInput();
    listView.renderTask(task);

    // add label event listener
    addLabelListeners(task.id);
  }
};


// Add Label event listener and when user edits a task, update the state
const addLabelListeners = id => {

  const taskLabel = document.getElementById(id);

  taskLabel.addEventListener('blur', () => {
    // get new title from view and update state
    const newTitle = listView.getTitle(id);
    state.list.updateTask(id, newTitle);

    // put focus back on adding new task
    listView.focusInput();
  });

  taskLabel.addEventListener('keypress', e => {
    if (e.keycode === 13 || e.which === 13) {  
      e.preventDefault(); // prevent enter causing line breaks in title field
      taskLabel.blur(); // invokes blur listener to avoid doubling up
    }
  });
};


// Listen for click on 'add task' button or keyboard enter pressed
listView.elements.btnAdd.addEventListener('click', e => {
  addTask();
  // put focus back on adding new task
  listView.focusInput();
});

document.addEventListener('keypress', e => {
  if (e.keycode === 13 || e.which === 13) {
    addTask();
  }
});


// Listen and action clicks for delete & checkbox/complete
listView.elements.tasksAll.addEventListener('click', e => {
  // retrieve id
  const id = e.target.closest('.todo_task').dataset.taskid; 
  
  // handle delete
  if (e.target.matches('.delete')) {
    // delete from state, then from UI
    state.list.deleteTask(id);
    listView.deleteTask(id);

    // put blinking cursor back on adding new task
    listView.focusInput();

  // handle checkboxes
  } else if (e.target.matches('.checkbox')) {
    // toggle task status and resave in data structure
    const revisedTask = state.list.toggleTaskStatus(id);

    // remove task from UI and re-add revised task
    listView.deleteTask(id);
    listView.renderTask(revisedTask);  

    // add label event listener back
    addLabelListeners(id);

    // put blinking cursor back on adding new task
    listView.focusInput();
  }
});


// add listener to Clear All button
listView.elements.clearAll.addEventListener('click', e => {
  const completed = state.list.findCompleted();

  if (completed.length > 0) {
    swal({
      text: "Are you sure you want to delete all completed tasks?",
      buttons: ["No", "Yes"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        //make it rain confetti
        listView.dropConfetti();

        // delete from state
        let completed = state.list.deleteCompleted();
    
        // delete from view
        completed.forEach(el => {
          listView.deleteTask(el.id);
        })
      }
    });
  } else {
    swal({
      text: "There are no completed tasks to delete!",
    });
  }
});


// on page load and refresh
window.addEventListener('load', () => {
  
  // restore tasks into data module
  if (!state.list) state.list = new List();
  state.list.readStorage();

  // render tasks to view and add label event listeners back
  state.list.tasks.forEach(el => {
    const id = el.id;

    listView.renderTask(el);
    addLabelListeners(id);
  })

  // put blinking cursor back on adding new task
  listView.focusInput();
});

