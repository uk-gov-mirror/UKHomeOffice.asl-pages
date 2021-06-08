const { merge } = require('lodash');
const baseContent = require('../../content');

const severityErrors = [
  'sub',
  'mild',
  'moderate',
  'severe',
  'non'
].reduce((content, severity) => {
  return {
    ...content,
    [`${severity}-severityNum`]: { type: 'This must be an integer' }
  };
}, { severityNum: { type: 'This must be an integer' } });

module.exports = merge({}, baseContent, {
  title: 'Add procedures',
  fields: {
    species: {
      label: 'Animal species'
    },
    reuse: {
      label: 'Reuse',
      options: {
        true: 'Yes',
        false: 'No'
      }
    },
    placeOfBirth: {
      label: 'Animals\' place of birth',
      hint: 'Select animals\' place of birth'
    },
    nhpsOrigin: {
      label: 'NHP place of birth'
    },
    nhpsColonyStatus: {
      label: 'NHP source'
    },
    nhpsGeneration: {
      label: 'NHP generation'
    },
    ga: {
      label: 'Genetically altered (GA) animals',
      hint: 'Select if genetically altered animals used',
      options: {
        'no-ga': 'GA animals were not used',
        'ga-not-harmful': {
          label: 'GA animals without a harmful phenotype were used',
          hint: 'For strains showing no or sub-theshold phenotypes'
        },
        'ga-harmful': {
          label: 'GA animals with a harmful phenotype were used',
          hint: 'For strains showing overtly harmful phenotypes'
        }
      }
    },
    purpose: {
      label: 'Purpose'
    },
    basicSubpurposes: {
      label: 'Sub-purpose'
    },
    regulatorySubpurposes: {
      label: 'Sub-purpose'
    },
    regulatoryLegislation: {
      label: 'Legislation area'
    },
    regulatoryLegislationOrigin: {
      label: 'Legislation origin'
    },
    translationalSubpurposes: {
      label: 'Sub-purpose'
    },
    newGeneticLine: {
      label: 'New genetic line',
      hint: 'Select if new genetic line created',
      options: {
        false: 'No',
        true: 'Yes'
      }
    },
    techniques: {
      label: 'Techniques used',
      options: {
        none: 'None'
      }
    },
    severity: {
      label: 'Select actual severities and enter number of procedures',
      hint: 'Severities are those experienced by animals as a result of the procedure.',
      summary: 'Reporting re-use, tiny animals, NHPs and large numbers over 999',
      options: {
        sub: 'Sub-threshold',
        mild: 'Mild',
        moderate: 'Moderate',
        severe: 'Severe',
        non: 'Non-recovery'
      }
    },
    severityNum: {
      label: 'Number of procedures',
      hint: 'For example, a procedure carried out on 100 mice would be 100 procedures.',
      summary: 'Reporting exceeded severities'
    },
    severityHoNote: {
      label: 'Note to Home Office (optional)'
    },
    severityPersonalNote: {
      label: 'Note for personal use (optional)'
    }
  },
  errors: {
    ga: {
      required: 'This field is required'
    },
    ...severityErrors
  },
  notifications: {
    added: '{{numAdded}} row{{#plural}}s{{/plural}} added: {{severities}}'
  }
});
