import colors from 'colors';
import {
  inquirerMenu,
  readInput,
  pause,
  listTasksDelete,
} from './helpers/inquirer.js';
import { saveInFile, readFromFile } from './helpers/handleFile.js';
import { Task } from './models/task.js';
import { Tasks } from './models/tasks.js';

console.clear();

const main = async () => {
  let opt = '';
  const tasks = new Tasks();

  const tasksDB = readFromFile();
  if (tasksDB) {
    // establecer tareas
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    // Print the menu
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const desc = await readInput('Descripción:');
        tasks.createTask(desc);
        break;
      case '2':
        tasks.showList();
        break;
      case '3':
        tasks.listPendingOrCompleteTasks(true);
        break;
      case '4':
        tasks.listPendingOrCompleteTasks(false);
        break;
      case '5':
        break;
      case '6':
        const id = await listTasksDelete(tasks.listArr);
        tasks.deleteTask(id);
        break;
      case '0':
        break;
      default:
        break;
    }

    saveInFile(tasks.listArr);
    await pause();
  } while (opt !== '0');
};

main();
