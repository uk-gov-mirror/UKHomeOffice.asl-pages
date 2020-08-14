import React from 'react';
import format from 'date-fns/format';
import { dateFormat } from '../../../../../constants';

export default {
  startDate: {
    format: date => format(date, dateFormat.long)
  },
  projectId: {
    format: (id, values) => values.project.licenceNumber
  },
  species: {
    format: species => {
      if (species.length === 0) {
        return '-';
      }
      if (species.length === 1) {
        return species;
      }
      return (
        <ul>
          {
            species.map((s, i) => <li key={i}>{s}</li>)
          }
        </ul>
      );
    }
  }
};
