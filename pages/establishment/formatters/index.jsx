import React from 'react';
import capitalize from 'lodash/capitalize';
import { Snippet } from '@asl/components';

const listFormatter = list => {
  if (!list || list.length < 1) {
    return 'None selected';
  }

  return list.map(item => item === 'procedure' ? 'Procedures' : capitalize(item)).join(', ');
};

export default {
  address: {
    format: (value) => <span className="preserve-whitespace">{value}</span>
  },
  country: {
    format: value => value ? <Snippet>{ `fields.country.options.${value}` }</Snippet> : '-'
  },
  licences: {
    format: listFormatter
  },
  authorisations: {
    format: listFormatter
  },
  isTrainingEstablishment: {
    format: isTrainingEstablishment => isTrainingEstablishment ? 'Yes' : 'No'
  }
};
