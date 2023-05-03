import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, Datatable, Link } from '@ukhomeoffice/asl-components';
import { dateFormat } from '../../../../../constants';
import format from 'date-fns/format';

const formatters = {
  subject: {
    format: (subject, model) => {
      return <Link page="account.notifications.read" label={subject} notificationId={model.id} />;
    }
  },
  completed: {
    format: completed => {
      if (!completed) {
        return '-';
      }
      return format(completed, dateFormat.dateTime);
    }
  }
};

export default function Notifications() {
  const profile = useSelector(state => state.static.profile);
  return (
    <Fragment>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={`${profile.firstName} ${profile.lastName}`}
      />
      <Datatable formatters={formatters} />
    </Fragment>
  );
}
