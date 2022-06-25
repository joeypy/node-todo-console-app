// const inquirer = require('inquirer');
import inquirer from 'inquirer';
import colors from 'colors';

const inquirerMenu = async () => {
  const questions = [
    {
      type: 'list',
      name: 'option',
      message: '¿Qué desea hacer?',
      choices: [
        {
          value: '1',
          name: `${'1.'.green} Crear tarea`,
        },
        {
          value: '2',
          name: `${'2.'.green} Listar tarea`,
        },
        {
          value: '3',
          name: `${'3.'.green} Listar tareas completadas`,
        },
        {
          value: '4',
          name: `${'4.'.green} Listar tareas pendientes`,
        },
        {
          value: '5',
          name: `${'5.'.green} Completar tarea(s)`,
        },
        {
          value: '6',
          name: `${'6.'.green} Borrar tarea`,
        },
        {
          value: '0',
          name: `${'0.'.green} Salir`,
        },
      ],
    },
  ];

  console.clear();
  console.log('=================================='.green);
  console.log('  Seleccione una opción'.white);
  console.log('==================================\n'.green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar`,
    },
  ];

  console.log('\n');
  await inquirer.prompt(question);
};

const listTasksDelete = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}`.green;

    return {
      value: task.id,
      name: `${idx}. ${task.desc}`,
    };
  });

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar',
  });

  const question = [
    {
      type: 'list',
      name: 'id',
      message: `Selecciona la tarea a eliminar:`,
      choices,
    },
  ];

  const { id } = await inquirer.prompt(question);
  return id;
};

const confirmation = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'decision',
      message,
    },
  ];
  const { decision } = await inquirer.prompt(question);
  return decision;
};

const showCheckListTasks = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}`.green;

    return {
      value: task.id,
      name: `${idx}. ${task.desc}`,
      checked: task.completedAt ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: `Selecciona las tareas a completar:`,
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
};

export {
  inquirerMenu,
  listTasksDelete,
  readInput,
  pause,
  confirmation,
  showCheckListTasks,
};
