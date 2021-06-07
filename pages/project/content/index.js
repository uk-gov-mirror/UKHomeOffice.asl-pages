module.exports = {
  fields: {
    title: {
      label: 'Project title'
    },
    status: {
      label: 'Status'
    },
    licenceHolder: {
      label: 'Licence holder'
    },
    licenceNumber: {
      label: 'Licence number'
    },
    issueDate: {
      label: 'Date granted'
    },
    amendedDate: {
      label: 'Last amended'
    },
    expiryDate: {
      label: 'Expiry date'
    },
    revocationDate: {
      label: 'Date revoked'
    },
    raDate: {
      label: 'Retrospective assessment (RA)'
    },
    transferredInDate: {
      label: 'Transferred in'
    },
    transferredOutDate: {
      label: 'Transferred out'
    },
    submittedAt: {
      label: 'Submitted to ASRU'
    },
    updatedAt: {
      label: 'Last updated'
    },
    granted: {
      label: 'Licence details',
      expired: 'View expired licence',
      revoked: 'View revoked licence',
      view: 'View granted licence'
    },
    draft: {
      label: 'Current draft',
      view: 'Open draft'
    },
    submitted: {
      label: 'Submitted',
      view: 'View submitted application'
    },
    duration: {
      label: 'Project duration'
    },
    establishment: {
      label: 'Establishment'
    },
    additionalEstablishments: {
      label: 'Additional availability at'
    },
    createdAt: {
      label: 'Created on'
    }
  },
  'ra-required': 'Requires RA',
  status: {
    active: 'Active',
    'inactive-statuses': 'Inactive',
    inactive: 'Draft',
    transferred: 'Transferred',
    expired: 'Expired',
    revoked: 'Revoked',
    'additional-availability-ended': 'Availability removed'
  },
  tabs: {
    inactive: 'Drafts'
  },
  results: {
    filtered: {
      singular: 'Showing {{count}} project',
      plural: 'Showing {{count}} projects'
    }
  }
};
