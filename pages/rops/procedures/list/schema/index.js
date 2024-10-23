const { get } = require('lodash');
const { yn, formatSpecies, getOtherValue } = require('../formatters');
const content = require('../content');

const radioOption = field => (v, rop) => {
  if (!v) {
    return '-';
  }

  const label = get(content, `condensedFields.${field}.options.${v}.label`) || get(content, `condensedFields.${field}.options.${v}`) || v;

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
    rowNum: {
      show: true,
      sortable: false,
      label: 'Row'
    },
    species: {
      show: true,
      sortable: false,
      label: 'Animal species',
      toCSVString: formatSpecies
    },
    reuse: {
      show: true,
      sortable: false,
      label: 'Reuse',
      toCSVString: yn
    },
    placesOfBirth: {
      show: true,
      sortable: false,
      label: 'Place of birth',
      toCSVString: radioOption('placesOfBirth')
    },
    endangered: {
      show: true,
      sortable: false,
      label: 'Endangered species',
      toCSVString: yn
    },
    endangeredDetails: {
      show: true,
      sortable: false,
      label: 'Details of endangered species'
    },
    nhpsOrigin: {
      show: true,
      sortable: false,
      label: 'NHP origin',
      toCSVString: radioOption('nhpsOrigin')
    },
    nhpsColonyStatus: {
      show: true,
      sortable: false,
      label: 'NHP colony status',
      toCSVString: radioOption('nhpsColonyStatus')
    },
    nhpsGeneration: {
      show: true,
      sortable: false,
      label: 'NHP generation',
      toCSVString: radioOption('nhpsGeneration')
    },
    ga: {
      show: true,
      sortable: false,
      label: 'Genetic status',
      toCSVString: radioOption('ga')
    },
    newGeneticLine: {
      show: true,
      sortable: false,
      label: 'New genetic line',
      toCSVString: yn
    },
    specialTechnique: {
      show: true,
      sortable: false,
      label: 'Special technique',
      toCSVString: radioOption('specialTechnique')
    },
    purposes: {
      show: true,
      sortable: false,
      label: 'Purpose',
      toCSVString: radioOption('purposes')
    },
    subpurpose: {
      show: true,
      sortable: false,
      label: 'Sub-purpose',
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
      sortable: false,
      label: 'Regulatory legislation',
      toCSVString: radioOption('regulatoryLegislation')
    },
    regulatoryLegislationOrigin: {
      show: true,
      sortable: false,
      label: 'Regulatory legislation origin',
      toCSVString: radioOption('regulatoryLegislationOrigin')
    },
    severity: {
      show: true,
      sortable: false,
      label: 'Severity',
      toCSVString: radioOption('severity')
    },
    severityNum: {
      show: true,
      sortable: false,
      label: 'Number of procedures'
    },
    severityHoNote: {
      show: true,
      sortable: false,
      label: 'HO note'
    },
    severityPersonalNote: {
      show: true,
      sortable: false,
      label: 'Personal note'
    }
  };

  // use same label for csv column headings
  Object.keys(schema).forEach(key => {
    schema[key].title = schema[key].label;
  });

  return schema;
};

module.exports = getSchema;
