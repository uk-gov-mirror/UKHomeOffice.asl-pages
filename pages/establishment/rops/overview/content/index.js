module.exports = {
  pageTitle: 'Returns of procedures',
  title: 'Returns of procedures',
  overview: {
    due: 'returns due in {{year}}',
    submitted: 'returns submitted',
    outstanding: 'returns outstanding'
  },
  tabs: {
    outstanding: 'Outstanding',
    submitted: 'Submitted'
  },
  fields: {
    year: {
      label: 'Reporting period: ',
      static: 'Reporting period: 1 January {{year}} to 31 December {{year}}'
    },
    title: {
      label: 'Project title'
    },
    licenceHolder: {
      label: 'PPL holder'
    },
    ropsDeadline: {
      label: 'Deadline for submission'
    },
    ropsSubmittedDate: {
      label: 'Date submitted'
    },
    ropsStatus: {
      label: 'Status'
    }
  },
  countdown: {
    singular: '1 {{unit}} left',
    plural: '{{diff}} {{unit}}s left',
    expired: '{{diff}} {{unit}}s overdue',
    expiresToday: 'Deadline today'
  },
  actions: {
    download: 'Download all returns as a CSV'
  }
};
