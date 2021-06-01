const { get } = require('lodash');
const { yn, formatSpecies, getOtherValue } = require('../formatters');
const content = require('../../content');

const radioOption = field => (v, rop) => {
  if (!v) {
    return '-';
  }

  const label = get(content, `fields.${field}.options.${v}.label`) || get(content, `fields.${field}.options.${v}`) || v;

  if (field === 'regulatorySubpurposes' && v.includes('other')) {
    const otherValue = getOtherValue(v, rop);

    if (otherValue) {
      return `${label}: ${otherValue}`;
    }
  }

  return label;
};

const getSchema = rop => {
  const schema = {
    species: {
      show: true,
      label: 'Animal species',
      toCSVString: formatSpecies
    },
    reuse: {
      show: true,
      label: 'Reuse',
      toCSVString: yn
    },
    placesOfBirth: {
      show: true,
      label: 'Place of birth',
      toCSVString: radioOption('placesOfBirth')
    },
    nhpsOrigin: {
      show: true,
      label: 'NHP origin',
      toCSVString: radioOption('nhpsOrigin')
    },
    nhpsColonyStatus: {
      show: true,
      label: 'NHP colony status',
      toCSVString: radioOption('nhpsColonyStatus')
    },
    nhpsGeneration: {
      show: true,
      label: 'NHP generation',
      toCSVString: radioOption('nhpsGeneration')
    },
    ga: {
      show: true,
      label: 'Genetic status',
      toCSVString: radioOption('ga')
    },
    newGeneticLine: {
      show: true,
      label: 'New genetic line',
      toCSVString: yn
    },
    purposes: {
      show: true,
      label: 'Purpose',
      toCSVString: radioOption('purposes')
    },
    subpurpose: {
      show: true,
      sortable: false,
      label: 'Subpurpose',
      toCSVString: (value, row) => {
        switch (row.purposes) {
          case 'basic':
            return radioOption('basicSubpurposes')(row.basicSubpurposes);
          case 'regulatory':
            return radioOption('regulatorySubpurposes')(row.regulatorySubpurposes, rop);
          case 'translational':
            return radioOption('translationalSubpurposes')(row.translationalSubpurposes);
          default:
            return '-';
        }
      }
    },
    regulatoryLegislation: {
      show: true,
      label: 'Regulatory legislation',
      toCSVString: radioOption('regulatoryLegislation')
    },
    severity: {
      show: true,
      label: 'Severity',
      toCSVString: radioOption('severity')
    },
    severityNum: {
      show: true,
      label: 'Number of procedures'
    },
    severityHoNote: {
      show: true,
      label: 'Comment for Home Office'
    }
  };

  // use same label for csv column headings
  Object.keys(schema).forEach(key => {
    schema[key].title = schema[key].label;
  });

  return schema;
};

module.exports = getSchema;
