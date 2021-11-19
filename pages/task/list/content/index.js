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
    deadline: {
      singular: 'Statutory deadline: 1 {{unit}}',
      plural: 'Statutory deadline: {{diff}} {{unit}}s',
      expired: 'Statutory deadline: passed',
      expiresToday: 'Statutory deadline: today'
    },
    continuation: {
      singular: 'Project continuation: 1 {{unit}}',
      plural: 'Project continuation: {{diff}} {{unit}}s',
      expired: 'Project continuation: passed',
      expiresToday: 'Project continuation: today',
      unknown: 'Includes project continuation',
      closed: 'Project continuation: done'
    }
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
        revocations: 'Revocations',
        transfers: 'Transfers',
        continuations: 'Project continuations',
        hasDeadline: 'Deadline started',
        ra: 'Retrospective assessments',
        changeLicenceHolder: 'Change licence holder'
      }
    }
  },
  'no-tasks': {
    outstanding: 'You have no outstanding tasks',
    inProgress: 'You have no tasks in progress',
    completed: 'You have no completed tasks',
    myTasks: 'There are no tasks assigned to you'
  },
  'tasklist-unavailable': 'Task list unavailable'
};
