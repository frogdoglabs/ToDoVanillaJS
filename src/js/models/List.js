import uniquid from 'uniquid';

export default class List {
  constructor() {
    this.tasks = [];
  }

  newTask(title, status = 0) {
    const task = {
      id: uniquid(),
      title: title,
      status: status // default 0 incomplete, 1 completed
    };
    this.tasks.push(task);

    // persist data in local storage
    this.persistData();

    return task;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(el => el.id === id) 
    this.tasks.splice(index, 1); // splice mutates original array

    // persist data in local storage
    this.persistData();
  }

  findCompleted() {
    // ie status = 1
    let completed = [];

    this.tasks.forEach(el => {
      if (el.status === 1) {
        completed.push(el);
      }
    })
    return completed;
  }

  deleteCompleted() {
    const completed = this.findCompleted();

    completed.forEach(el => {
      this.deleteTask(el.id)
    })
    return completed;
}

  getTask(id) {
    return this.tasks.find(el => el.id === id);
  }

  toggleTaskStatus(id) {
    const task = this.getTask(id); 
    
    const newStatus = task.status === 0 ? 1 : 0;
    task.status = newStatus;

    // persist data in local storage
    this.persistData();
    
    return task;
  }

  updateTask(id, newTitle) {
    this.tasks.find(el => el.id === id).title = newTitle;
    
    // persist data in local storage
    this.persistData();
  }

  persistData() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // transform to string
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('tasks')); // revert from string
    if (storage) this.tasks = storage;
  }

};
