const fields = require('./fields');
const status = require('../../content/status');
const tasks = require('../../content/tasks');

module.exports = {
  status,
  fields,
  tasks,
  title: 'Task list',
  tabs: {
    outstanding: 'Outstanding',
    inProgress: 'In progress',
    completed: 'Completed',
    myTasks: 'My tasks'
  },
  'tasklist-unavailable': 'Task list unavailable'
};
