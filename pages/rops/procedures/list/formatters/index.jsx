import React from 'react';
import flatten from 'lodash/flatten';
import { projectSpecies } from '@asl/constants';
import { Snippet } from '@asl/components';

const allSpecies = flatten(Object.values(projectSpecies));

export function yn(v) {
  if (v) {
    return 'Yes';
  }
  if (v === false) {
    return 'No';
  }
  return '-';
}

export function formatSpecies(s) {
  const species = allSpecies.find(as => as.value === s);
  return species ? species.label : s;
}

const getRadioOption = field => v => {
  if (!v) {
    return '-';
  }
  return <Snippet fallback={`fields.${field}.options.${v}`}>{`fields.${field}.options.${v}.label`}</Snippet>;
};

const formatters = {
  species: {
    format: formatSpecies
  },
  reuse: {
    format: yn
  },
  placesOfBirth: {
    format: getRadioOption('placesOfBirth')
  },
  nhpsOrigin: {
    format: getRadioOption('nhpsOrigin')
  },
  nhpsColonyStatus: {
    format: getRadioOption('nhpsColonyStatus')
  },
  nhpsGeneration: {
    format: getRadioOption('nhpsGeneration')
  },
  ga: {
    format: getRadioOption('ga')
  },
  newGeneticLine: {
    format: yn
  },
  purposes: {
    format: getRadioOption('purposes')
  },
  subpurpose: {
    format: (v, model) => {
      switch (model.purposes) {
        case 'basic':
          return getRadioOption('basicSubpurposes')(model.basicSubpurposes);
        case 'regulatory':
          return getRadioOption('regulatorySubpurposes')(model.regulatorySubpurposes);
        case 'translational':
          return getRadioOption('translationalSubpurposes')(model.translationalSubpurposes);
        default:
          return '-';
      }
    }
  },
  regulatoryLegislation: {
    format: getRadioOption('regulatoryLegislation')
  },
  severity: {
    format: getRadioOption('severity')
  }
};

export default formatters;
