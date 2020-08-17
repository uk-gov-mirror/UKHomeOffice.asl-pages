import React from 'react';
import format from 'date-fns/format';
import { dateFormat } from '../../../../../constants';

const formatDate = date => format(date, dateFormat.long);

export default {
  startDate: {
    format: formatDate
  },
  expiryDate: {
    format: formatDate
  },
  issueDate: {
    format: formatDate
  },
  projectId: {
    format: (id, values) => {
      return values.project && values.project.licenceNumber;
    }
  },
  species: {
    format: species => {
      if (!species || species.length === 0) {
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
