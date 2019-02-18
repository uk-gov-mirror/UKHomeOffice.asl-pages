import React from 'react';
import { Link, ExpiryDate } from '@asl/components';
import format from 'date-fns/format';
import { dateFormat } from '../../../constants';

const formatters = {
  title: {
    format: (title, { id }) => {
      return <Link page="project.read" projectId={id} label={title || 'Untitled project'} />;
    }
  },
  licenceHolder: {
    format: ({ id, firstName, lastName }) =>
      <Link page="profile.view" profileId={id} label={`${firstName} ${lastName}`} />
  },
  expiryDate: {
    format: date => <ExpiryDate date={date}/>
  },
  updatedAt: {
    format: date => format(date, dateFormat.datetime)
  },
  version: {
    format: ({ id }) =>
      <Link page="project.version" versionId={id} label={'Current draft'} />
  }
};

export default formatters;
