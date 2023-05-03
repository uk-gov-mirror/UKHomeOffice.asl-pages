import React from 'react';
import flatten from 'lodash/flatten';
import get from 'lodash/get';
import { projectSpecies } from '@asl/constants';
import { Snippet, Markdown } from '@ukhomeoffice/asl-components';

const allSpecies = flatten(Object.values(projectSpecies));

export function yesNoEmpty(v) {
  if (v) {
    return 'Yes';
  }
  if (v === false) {
    return 'No';
  }
  return '-';
}

export function yesNo(v) {
  return v ? 'Yes' : 'No';
}

export function formatSpecies(s) {
  const species = allSpecies.find(as => as.value === s);
  return species ? species.label : s;
}

export function getOtherValue(field, rop) {
  const otherFields = {
    'routine-other': 'regulatorySubpurposesOther',
    'qc-other': 'regulatorySubpurposesQcOther',
    'other-efficacy': 'regulatorySubpurposesOtherEfficacy',
    'other-toxicity': 'regulatorySubpurposesOtherToxicity',
    'other-toxicity-ecotoxicity': 'regulatorySubpurposesOtherToxicityEcotoxicity',
    'other-toxicity-lethal': 'regulatorySubpurposesOtherToxicityLethal'
  };
  return get(rop, otherFields[field]);
}

const getRadioOption = field => v => {
  if (!v) {
    return '-';
  }

  return <Snippet fallback={`condensedFields.${field}.options.${v}`}>{`condensedFields.${field}.options.${v}.label`}</Snippet>;
};

const formatNote = value => {
  if (!value) {
    return null;
  }
  return <div className="markdown"><Markdown>{ value }</Markdown></div>;
};

const formatters = rop => {
  return {
    species: {
      format: formatSpecies
    },
    reuse: {
      format: yesNo
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
      format: yesNoEmpty
    },
    purposes: {
      format: getRadioOption('purposes')
    },
    specialTechnique: {
      format: getRadioOption('specialTechnique')
    },
    subpurpose: {
      format: (v, model) => {
        let field;
        let other;
        const others = [
          ...(rop.basicSubpurposesOther || []),
          ...(rop.regulatorySubpurposesOther || []),
          ...(rop.regulatorySubpurposesQcOther || []),
          ...(rop.regulatorySubpurposesOtherEfficacy || []),
          ...(rop.regulatorySubpurposesOtherToxicityEcotoxicity || []),
          ...(rop.regulatorySubpurposesOtherToxicityLethal || []),
          ...(rop.regulatorySubpurposesOtherToxicity || []),
          ...(rop.translationalSubpurposesOther || [])
        ];

        switch (model.purposes) {
          case 'basic':
            field = 'basicSubpurposes';
            break;
          case 'regulatory':
            field = 'regulatorySubpurposes';
            break;
          case 'translational':
            field = 'translationalSubpurposes';
            break;
        }

        const value = model[field];
        const label = getRadioOption(field)(value);

        if (value && value.includes('other')) {
          const otherId = model.subpurposeOther;
          other = (others.find(v => v.id === otherId) || {}).value;
        }

        return other || label || '-';
      }
    },
    regulatoryLegislation: {
      format: (value, model) => {
        if (!value) {
          return '-';
        }
        const label = getRadioOption('regulatoryLegislation')(value);
        let other;
        if (value.includes('other')) {
          const otherId = model.legislationOther;
          other = ((rop.regulatoryLegislationOther || []).find(v => v.id === otherId) || {}).value;
        }
        return other || label || '-';
      }
    },
    regulatoryLegislationOrigin: {
      format: getRadioOption('regulatoryLegislationOrigin')
    },
    severity: {
      format: getRadioOption('severity')
    },
    severityHoNote: {
      format: formatNote
    },
    severityPersonalNote: {
      format: formatNote
    }
  };
};

export default formatters;
