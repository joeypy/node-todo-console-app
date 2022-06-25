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
      const state = completedAt ? 'Completada'.green : 'Pendiente'.red;

      console.log(`${newIndex}. ${desc} :: ${state}`);
    });
  }

  listPendingOrCompleteTasks(completed = true) {
    this.listArr.forEach((task, index) => {
      const { desc, completedAt } = task;
      const newIndex = `${index + 1}`.green;

      if (completed && completedAt) {
        console.log(`${newIndex}. ${desc} :: ${completedAt}`);
      } else if (!completed) {
        console.log(`${newIndex}. ${desc} :: ${'Pendiente'.red}`);
      }
    });
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }
}

export { Tasks };
