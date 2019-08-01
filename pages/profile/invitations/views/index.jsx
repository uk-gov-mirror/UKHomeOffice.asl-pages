import React from 'react';
import Index from '../../list/views/index';
import { ExpiryDate, Snippet } from '@asl/components';

const formatters = {
  email: {
    format: email => <a href={`mailto:${email}`}>{email}</a>
  },
  role: {
    format: role => <Snippet>{`fields.role.options.${role}.label`}</Snippet>
  },
  createdAt: {
    format: date => date ? <ExpiryDate
      date={date}
      adjustment={7}
      showNotice={7}
      showUrgent={3}
      unit="day"
    /> : '-'
  }
};

const Invitations = props => <Index
  showFilters={false}
  activeTab={1}
  formatters={formatters}
  {...props}
/>;

export default Invitations;
