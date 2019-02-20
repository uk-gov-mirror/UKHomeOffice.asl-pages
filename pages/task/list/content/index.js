const fields = require('./fields');
const status = require('../../content/status');

module.exports = {
  status,
  fields,
  title: 'Task list',
  tabs: {
    outstanding: 'Outstanding',
    inProgress: 'In progress',
    completed: 'Completed'
  },
  task: {
    role: {
      create: 'Add named person',
      delete: 'Remove named person'
    },
    place: {
      create: 'Add licensed premises',
      update: 'Amend licensed premises',
      delete: 'Remove licensed premises'
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
