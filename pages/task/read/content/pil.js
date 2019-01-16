module.exports = {
  title: 'Review PIL Application',
  fields: {
    decision: {
      label: 'Do you endorse this application?'
    },
    reason: {
      label: 'Reason for rejection'
    },
    options: [
      {
        label: 'Yes',
        hint: 'I confirm that the applicant holds the neccessary training or experience to carry out the categories of procedures listed in this application',
        value: 'ntco-endorsed'
      },
      {
        label: 'No',
        value: 'returned-to-applicant'
      }
    ]
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
    permissions: `You do not currently have permission to view all profiles at this establishment. Please contact your
      establishment admin to increase your permissions level.`
  }
};
