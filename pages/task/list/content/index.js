const fields = require('./fields');
const status = require('../../content/status');

module.exports = {
  status,
  fields,
  title: 'Task list',
  tabs: {
    outstanding: 'Outstanding',
    inProgress: 'In progress',
    completed: 'Completed',
    myTasks: 'My tasks'
  },
  task: {
    role: {
      create: 'Add named person',
      delete: 'Remove named person'
    },
    place: {
      create: 'Add approved area',
      update: 'Amend approved area',
      delete: 'Remove approved area'
    },
    pil: {
      grant: 'PIL application'
    },
    profile: {
      update: 'Update profile'
    },
    project: {
      grant: 'PPL application'
    }
  }
};
