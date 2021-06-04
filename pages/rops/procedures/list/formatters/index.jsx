import React, { Fragment } from 'react';
import flatten from 'lodash/flatten';
import get from 'lodash/get';
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

export function getOtherValue(field, rop) {
  const otherFields = {
    'routine-other': 'regulatorySubpurposesOther',
    'other-efficacy': 'regulatorySubpurposesOtherEfficacy',
    'other-toxicity': 'regulatorySubpurposesOtherToxicity',
    'other-toxicity-ecotoxicity': 'regulatorySubpurposesOtherToxicityEcotoxicity'
  };
  return get(rop, otherFields[field]);
}

const getRadioOption = field => (v, rop) => {
  if (!v) {
    return '-';
  }

  if (field === 'regulatorySubpurposes' && v.includes('other')) {
    const otherValue = getOtherValue(v, rop);

    if (otherValue) {
      return <Fragment>
        <Snippet fallback={`condensedFields.${field}.options.${v}`}>{`condensedFields.${field}.options.${v}.label`}</Snippet>
        <span>: {otherValue}</span>
      </Fragment>;
    }
  }

  return <Snippet fallback={`condensedFields.${field}.options.${v}`}>{`condensedFields.${field}.options.${v}.label`}</Snippet>;
};

const formatters = rop => {
  return {
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
            return getRadioOption('regulatorySubpurposes')(model.regulatorySubpurposes, rop);
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
};

export default formatters;
