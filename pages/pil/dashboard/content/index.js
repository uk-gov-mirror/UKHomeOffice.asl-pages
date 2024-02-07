const { merge } = require('lodash');
const baseContent = require('../../content');
const procedures = require('../../procedures/content');
const species = require('../../species/content');
const trainingFields = require('../../unscoped/courses/content/fields');

module.exports = merge({}, baseContent, {
  pil: {
    title: 'Apply for personal licence - Categories A, B, C, D and F',
    titleAmend: 'Amend personal licence - Categories A, B, C, D, and F',
    summary: 'Please complete all of the following sections.',
    details: {
      title: 'Applicant details'
    },
    establishment: {
      title: 'Establishment'
    },
    procedures: {
      title: 'Procedures'
    },
    species: {
      title: 'Animal types'
    },
    training: {
      title: 'Training'
    },
    exemptions: {
      title: 'Exemptions'
    }
  },
  exemption: {
    skipped: 'No exemptions provided.'
  },
  actions: {
    add: 'Add',
    edit: 'Edit',
    remove: 'Remove',
    'add-certificate': 'Add another certificate'
  },
  fields: {
    ...procedures.fields,
    ...species.fields,
    ...trainingFields,
    modules: {
      label: 'Modules completed'
    },
    module: {
      label: 'Exempt from module'
    },
    description: {
      label: 'Reason for exemption'
    },
    procedures: {
      label: 'Procedure category'
    },
    declaration: {
      label: `The terms and conditions under which you may hold a licence under the Animals Scientific Procedure Act
1986, and that you may be guilty of an offence if for the purpose of obtaining a licence under this Act you
provide information which you know to be false or misleading.`
    },
    name: {
      label: 'Establishment name'
    },
    species: {
      label: 'Animal types'
    }
  },
  errors: {
    form: {
      incomplete: 'Please complete all sections before submitting'
    }
  },
  buttons: {
    submit: 'Continue'
  }
});
