module.exports = {
  title: 'Personal licences',
  details: {
    summary: 'Personal licence reviews',
    content: `Personal licences must be reviewed every 5 years to confirm they are still in use and up to date. The licence holder or an admin can complete a review.

      If a licence requires no changes, it can be reviewed by an NTCO on behalf of the licence holder up to 12 weeks before the deadline.`
  },
  search: 'Search by licence holder or PIL number',
  fields: {
    profile: {
      label: 'Licence holder'
    },
    licenceNumber: {
      label: 'PIL number'
    },
    issueDate: {
      label: 'Start date'
    },
    reviewDate: {
      label: 'Review due'
    },
    reviewStatus: {
      label: 'Review status'
    }
  }
};
