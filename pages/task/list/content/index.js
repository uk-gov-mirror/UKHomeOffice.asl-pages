const fields = require('./fields');
const status = require('../../content/status');
const tasks = require('../../content/tasks');
const { merge } = require('lodash');

const shortTaskLabels = {
  pil: {
    grant: 'PIL application',
    update: 'PIL amendment',
    revoke: 'PIL revocation',
    transfer: 'PIL transfer',
    review: 'PIL review'
  },
  trainingPil: {
    grant: 'PIL-E application',
    update: 'PIL-E amendment',
    revoke: 'PIL-E revocation',
    transfer: 'PIL-E transfer',
    review: 'PIL-E review'
  },
  project: {
    grant: 'PPL application',
    transfer: 'PPL transfer',
    update: 'PPL amendment',
    revoke: 'PPL revocation'
  }
};

module.exports = {
  status,
  fields,
  tasks: merge({}, tasks, shortTaskLabels),
  title: 'Task list',
  pageTitle: 'Task list',
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
        transfers: 'Establishment transfers',
        continuations: 'Project continuations',
        hasDeadline: 'Statutory deadlines',
        ra: 'Retrospective assessments',
        changeLicenceHolder: 'Change licence holder'
      }
    },
    pelType: {
      label: 'By PEL type:',
      options: {
        places: 'Areas',
        pelh: 'PEL holders',
        roles: 'All named people'
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
  enforcementCase: {
    badge: {
      open: 'Ongoing enforcement',
      closed: 'Closed enforcement'
    }
  },
  deadline: {
    none: 'No deadline',
    statutory: '(statutory)',
    due: 'Due today',
    overdue: 'Overdue'
  }
};
