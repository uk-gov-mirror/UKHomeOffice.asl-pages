module.exports = {
  pil: {
    title: 'Apply for personal licence - Categories A, B, C, D and F',
    summary: 'Please complete all of the following sections.',
    details: {
      title: 'Your details'
    },
    training: {
      title: 'Training'
    },
    exemptions: {
      title: 'Exemptions'
    },
    procedures: {
      title: 'Procedure categories'
    }
  },
  certificate: {
    number: 'Certificate number:',
    accreditation: 'Accreditation body:',
    awarded: 'Date awarded:',
    expiry: 'Expiry date:',
    modules: 'Modules completed:',
    exemption: 'Exempt from module:',
    reason: 'Reason for exemption:'
  },
  exemption: {
    skipped: 'No exemptions provided.'
  },
  procedure: {
    category: 'Procedure category:',
    catDLabel: 'Evidence of competency:',
    catFLabel: 'Type of regulated procedure:'
  },
  actions: {
    add: 'Add',
    edit: 'Edit',
    remove: 'Remove',
    submit: 'Submit to NTCO'
  },
  fields: {
    declaration: {
      yes: {
        label: `The terms and conditions under which you may hold a licence under the Animals Scientific Procedure Act
          1986, and that you may be guilty of an offence if for the purpose of obtaining a licence under this Act you
          provide information which you know to be false or misleading.`
      },
      label: 'Please confirm that you understand'
    }
  },
  errors: {
    declaration: {
      required: 'Please confirm that you understand'
    },
    form: {
      incomplete: 'You need to add at least one procedure'
    }
  }
};
