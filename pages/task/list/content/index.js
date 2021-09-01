const fields = require('./fields');
const status = require('../../content/status');
const tasks = require('../../content/tasks');

module.exports = {
  status,
  fields,
  tasks,
  title: 'Task list',
  pageTitle: 'Task list',
  countdown: {
    singular: '1 {{unit}} left',
    plural: '{{diff}} {{unit}}s left',
    expired: 'Deadline passed',
    expiresToday: 'Deadline today'
  },
  tabs: {
    outstanding: 'Outstanding',
    inProgress: 'In progress',
    completed: 'Completed',
    myTasks: 'My tasks'
  },
  filters: {
    progress: {
      label: 'By status:',
      options: {
        outstanding: 'Outstanding',
        inProgress: 'In progress',
        completed: 'Completed',
        myTasks: 'My tasks'
      }
    },
    licence: {
      label: 'By category:'
    },
    pplType: {
      label: 'By PPL type:',
      options: {
        applications: 'Applications',
        amendments: 'Amendments',
        transfers: 'Transfers',
        continuations: 'Project continuations',
        hasDeadline: 'Deadline started',
        ra: 'Retrospective assessments'
      }
    }
  },
  'no-tasks': {
    outstanding: 'You have no outstanding tasks',
    inProgress: 'You have no tasks in progress',
    completed: 'You have no completed tasks',
    myTasks: 'There are no tasks assigned to you'
  },
  'tasklist-unavailable': 'Task list unavailable',
  continuation: 'Includes project continuation'
};
