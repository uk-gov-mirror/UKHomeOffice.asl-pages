module.exports = {
  title: 'Review PIL Application',
  fields: {
    decision: {
      label: 'Do you endorse this application?'
    },
    reason: {
      label: 'Reason for rejection'
    },
    options: {
      'ntco-endorsed': {
        label: 'Yes',
        hint: 'I confirm that the applicant holds the neccessary training or experience to carry out the categories of procedures listed in this application'
      },
      'returned-to-applicant': {
        label: 'No'
      }
    }
  },
  pil: {
    training: {
      title: 'Training',
      certificate: {
        details: 'Certificate details',
        number: 'Certificate number',
        awarded: 'Date awarded',
        expiry: 'Expiry date',
        body: 'Accreditation body',
        file: 'Certificate image'
      },
      modules: 'Modules completed'
    },
    exemptions: {
      title: 'Exemptions',
      module: 'Module',
      reason: 'Reasons for exemption'
    },
    procedures: {
      title: 'Procedure categories',
      categories: 'Categories'
    }
  },
  errors: {
    permissions: `You do not currently have permission to view all people at this establishment. Please contact an
    establishment administrator to increase your permissions level.`
  }
};
