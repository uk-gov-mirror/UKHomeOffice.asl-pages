const fields = require('./fields');

module.exports = {
  fields,
  title: 'Task List',
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
      grant: 'PIL Application'
    }
  },
  status: {
    new: 'Incomplete',
    'returned-to-applicant': 'Returned to applicant',
    'withdrawn-by-applicant': 'Withdrawn',
    'with-ntco': 'Awaiting endorsement',
    'ntco-endorsed': 'Awaiting review',
    'with-licensing': 'Awaiting review',
    'referred-to-inspector': 'Awaiting inspection',
    'inspector-recommended': 'Recommended',
    'inspector-rejected': 'Not recommended',
    resolved: 'Resolved',
    rejected: 'Rejected'
  }
};
