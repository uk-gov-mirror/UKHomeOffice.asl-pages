import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import PeopleList from '../../list/views/index';
import { ExpiryDate, Snippet } from '@ukhomeoffice/asl-components';
import { addDays, isBefore, format } from 'date-fns';
import { dateFormat } from '../../../../constants';

const formatters = {
  email: {
    format: email => <a href={`mailto:${email}`}>{email}</a>
  },
  role: {
    format: role => <Snippet>{`fields.role.options.${role}.label`}</Snippet>
  },
  updatedAt: {
    format: (date, model) => {
      if (!model.token) {
        return (
          <Fragment>
            {
              format(date, dateFormat.medium)
            }
            <span className="notice urgent">Cancelled</span>
          </Fragment>
        );
      }

      if (date) {
        return (
          <ExpiryDate
            date={date}
            dateFormat={dateFormat.medium}
            expiry={addDays(date, 7)}
            showNotice={7}
            showUrgent={3}
            unit="day"
            cancelled={!model.token}
          />
        );
      }

      return '-';
    }
  }
};

function Actions({ model }) {
  const url = useSelector(state => state.static.url);
  const expired = isBefore(addDays(model.updatedAt, 7), new Date());
  const deletable = expired || !model.token;
  return (
    <Fragment>
      <form action={`${url}/${model.id}/resend`} method="POST">
        <button className="link">
          <span>Resend</span>
        </button>
      </form>
      <form action={`${url}/${model.id}/${deletable ? 'delete' : 'cancel'}`} method="POST">
        <button className="link">
          <span>{ deletable ? 'Delete' : 'Cancel' }</span>
        </button>
      </form>
    </Fragment>
  );
}

function Invitations(props) {
  return (
    <PeopleList
      showFilters={false}
      activeTab={1}
      formatters={formatters}
      Actions={Actions}
      {...props}
    />
  );
}

export default Invitations;
