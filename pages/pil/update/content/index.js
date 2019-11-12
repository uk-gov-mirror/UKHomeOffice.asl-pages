const { merge } = require('lodash');
const trainingFields = require('../../training/content').fields;
const exemptionsFields = require('../../exemptions/content').fields;
const proceduresFields = require('../../procedures/content').fields;

module.exports = {
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
  fields: merge({},
    trainingFields,
    exemptionsFields,
    proceduresFields,
    {
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
        yes: {
          label: `The terms and conditions under which you may hold a licence under the Animals Scientific Procedure Act
            1986, and that you may be guilty of an offence if for the purpose of obtaining a licence under this Act you
            provide information which you know to be false or misleading.`
        }
      },
      species: {
        label: 'Animal types'
      }
    }
  ),
  errors: {
    declarations: {
      customValidate: 'Please confirm that you understand'
    },
    form: {
      incomplete: 'You need to add at least one procedure'
    }
  },
  declarations: {
    title: 'Please confirm that you understand'
  },
  buttons: {
    submit: 'Submit to NTCO',
    submitAsLicensing: 'Update licence',
    submitAsAsru: 'Submit to licensing'
  }
};
