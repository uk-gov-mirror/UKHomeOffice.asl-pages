const { merge } = require('lodash');
const baseContent = require('../../content');
const { fields: { productTestingTypes } } = require('../../../update/content');

module.exports = merge({}, baseContent, {
  title: 'Add procedures',
  fields: {
    species: {
      label: 'Animal species',
      hint: 'Select animal type used'
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
    endangered: {
      label: 'Is this an endangered species?',
      options: {
        true: 'Yes',
        false: 'No'
      }
    },
    ga: {
      label: 'Genetically altered (GA) animals',
      hint: 'Select GA status of animals used',
      options: {
        'no-ga': 'GA animals were not used',
        'ga-not-harmful': {
          label: 'GA animals without a harmful phenotype were used',
          hint: 'For strains showing no or sub-threshold phenotypes'
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
    specialTechniqueUsed: {
      label: 'Select if special technique used',
      options: {
        true: 'Yes',
        false: 'No'
      }
    },
    specialTechnique: {
      label: 'Technique of special interest',
      options: productTestingTypes.options
    },
    severity: {
      label: 'Select severities and enter number of procedures',
      hint: `Severities are those actually experienced by animals. A procedure carried out on 100 mice would be 100 procedures.

Select all that apply`,
      summary: 'Reporting re-use, tiny animals, NHPs and large numbers over 999.',
      details: `### Re-use
If animals were used in the same procedure across multiple studies, you can give one figure for all the procedures
carried out. However you should record the first use of the animals separately to subsequent re-uses. Be sure to check
the detailed guidance on reporting re-use to ensure you record the figures correctly.

### Tiny animals
If tiny animals such as fish larvae were used, estimates are fine.

### Numbers over 999 and NHPs
If the number of procedures is over 99 for NHPs, or 999 for any other animal, add a note to the Home Office explaining why (for example if you’ve given a single figure for multiple studies). If the number relates to animals used on the same breeding protocol simply state ‘Breeding’.`,
      options: {
        sub: 'Sub-threshold',
        mild: 'Mild',
        moderate: 'Moderate',
        severe: 'Severe',
        non: 'Non-recovery'
      }
    },
    severityNum: {
      label: 'Enter number of procedures carried out',
      sub: {
        label: 'Enter number of sub-threshold procedures carried out',
        summary: 'Reporting sub-threshold on experimental studies',
        details: 'Add an explanatory note if the study was experimental and severities were sub-threshold. An experimental study is one that was carried out for any purpose other than breeding GA animals and that didn’t create a new genetic line.'
      },
      mild: {
        label: 'Enter number of mild procedures carried out'
      },
      moderate: {
        label: 'Enter number of moderate procedures carried out'
      },
      severe: {
        label: 'Enter number of severe procedures carried out',
        summary: 'If harms exceeded severe',
        details: 'If the animal suffered severe, prolonged pain that was not alleviated, add a note to the Home Office explaining why and if you had prior authorisation.'
      },
      non: {
        label: 'Enter number of non-recovery procedures carried out',
        summary: 'Reporting non-recovery with new genetic lines or breeding purposes',
        details: 'If you have non-recovery procedures in combination with new genetic lines being created, or a purpose of breeding or maintaining colonies of GA animals, add an explanatory note to the Home Office.'
      }
    },
    addNote: {
      label: 'Add a note',
      options: {
        true: 'Yes',
        false: 'No'
      }
    },
    severityHoNote: {
      label: 'Note to Home Office (optional)'
    },
    severityPersonalNote: {
      label: 'Note for personal use (optional)'
    }
  },
  errors: {
    specialTechniqueUsed: {
      required: 'Select if a special technique was used'
    },
    specialTechnique: {
      required: 'Select the special technique used'
    },
    severityNum: {
      required: 'Enter the number of procedures',
      type: 'Number of procedures must be an integer'
    },
    'sub-severityNum': {
      required: 'Enter the number of sub-threshold procedures',
      type: 'Number of sub-threshold procedures must be an integer'
    },
    'mild-severityNum': {
      required: 'Enter the number of mild procedures',
      type: 'Number of mild procedures must be an integer'
    },
    'moderate-severityNum': {
      required: 'Enter the number of moderate procedures',
      type: 'Number of moderate procedures must be an integer'
    },
    'severe-severityNum': {
      required: 'Enter the number of severe procedures',
      type: 'Number of severe procedures must be an integer'
    },
    'non-severityNum': {
      required: 'Enter the number of non-recovery procedures',
      type: 'Number of non-recovery procedures must be an integer'
    }
  },
  notifications: {
    added: '{{numAdded}} row{{#plural}}s{{/plural}} added: {{severities}}'
  },
  buttons: {
    submit: 'Add procedures'
  }
});
