const fields = require('./fields');

module.exports = {
  fields,
  title: 'Task List',
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
      grant: 'PIL Application'
    }
  }
};
