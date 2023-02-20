import React from 'react';
import capitalize from 'lodash/capitalize';
import {Snippet} from '@asl/components';

const listFormatter = list => {
  if (!list || list.length < 1) {
    return 'None selected';
  }

  return list.map(item => item === 'procedure' ? 'Procedures' : capitalize(item)).join(', ');
};

const profileName = (profile, profiles) => {
  if (profile && profile.id) {
    return `${profile.firstName} ${profile.lastName} `;
  } else if (profile) {
    const profileFromId = profiles.find(p => p.id === profile);
    return profileFromId && `${profileFromId.firstName} ${profileFromId.lastName} `;
  }
  return 'N/A';
};

export default (profiles) => {
  return {
    address: {
      format: (value) => <span className="preserve-whitespace">{value}</span>
    },
    country: {
      format: value => value ? <Snippet>{`fields.country.options.${value}`}</Snippet> : '-'
    },
    licences: {
      format: listFormatter
    },
    authorisations: {
      format: listFormatter
    },
    isTrainingEstablishment: {
      format: isTrainingEstablishment => isTrainingEstablishment ? 'Yes' : 'No'
    },
    corporateStatus: {
      format: value => value ? <Snippet>{`fields.corporateStatus.options.${value}`}</Snippet> : '-'
    },
    legalPerson: {
      format: (value) => {
        return value ? (
          <>{value.legalName}<br/>{value.legalEmail}<br/>{value.legalPhone}</>
        ) : 'N/A';
      }
    },
    nprc: {
      format: (value) => profileName(value, profiles)
    },
    pelh: {
      format: (value) => profileName(value, profiles)
    }
  };
};
