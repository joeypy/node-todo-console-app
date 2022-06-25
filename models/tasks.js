import { Task } from './task.js';

class Tasks {
  _list = '';

  get listArr() {
    return Object.values(this._list);
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  showList() {
    this.listArr.forEach((task, index) => {
      const newIndex = `${index + 1}`.green;
      const { desc, completedAt } = task;
      const state = completedAt
        ? 'Completada'.brightGreen
        : 'Pendiente'.brightRed;

      console.log(`${newIndex}. ${desc} :: ${state}`);
    });
  }

  listPendingOrCompleteTasks(completed = true) {
    this.listArr.forEach((task, index) => {
      const { desc, completedAt } = task;
      const newIndex = `${index + 1}`.green;

      if (completed && completedAt) {
        console.log(`${newIndex}. ${desc} :: ${completedAt.brightBlue}`);
      } else if (!completed && !completedAt) {
        console.log(`${newIndex}. ${desc} :: ${'Pendiente'.brightRed}`);
      }
    });
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  toggleCompleted(ids = []) {
    // Set all the task in 'completed' if the id exists in "ids"
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) {
        task.completedAt = new Date().toLocaleDateString('en-GB');
      }
    });
    // Set all the task in 'pending' if the id doesn't exists in "ids"
    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }
}

export { Tasks };
