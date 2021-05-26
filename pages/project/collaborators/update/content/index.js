module.exports = {
  title: 'Change access for {{name}}',
  fields: {
    role: {
      label: 'Select access required',
      options: {
        basic: {
          label: 'Read-only',
          hint: 'View this project\'s licence and documents'
        },
        edit: {
          label: 'Edit',
          hint: 'Work on licence amendments and returns of procedures (no submission)'
        },
        remove: {
          label: 'None',
          hint: 'Remove access to this project\'s licence and documents'
        }
      }
    }
  },
  actions: {
    submit: 'Save'
  },
  notifications: {
    success: 'Access updated. {{name}} has been notified.'
  }
};
