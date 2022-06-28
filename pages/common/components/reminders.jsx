import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import addMonths from 'date-fns/add_months';
import diffInDays from 'date-fns/difference_in_calendar_days';
import formatDate from 'date-fns/format';
import distanceInWords from 'date-fns/distance_in_words';
import { Warning } from '@ukhomeoffice/react-components';

const relativeTime = deadline => {
  const dayDiff = diffInDays(deadline, new Date());

  if (dayDiff < 0) {
    return <strong>that is overdue</strong>;
  }

  if (dayDiff === 0) {
    return 'today';
  }

  if (dayDiff === 1) {
    return 'tomorrow';
  }

  return `in ${distanceInWords(new Date(), deadline)}`;
};

function Reminder({ reminder, licenceType, licenceNumber }) {
  const { profile } = useSelector(state => state.static);
  const previouslyDismissed = !!(reminder.dismissed || []).find(dismissal => dismissal.profileId === profile.id);
  const oneMonthFromNow = formatDate(addMonths(new Date(), 1), 'YYYY-MM-DD');

  if (previouslyDismissed || reminder.deadline > oneMonthFromNow) {
    return null;
  }

  const dismissReminder = e => {
    e.preventDefault();

    if (window.confirm('Are you sure you want to remove the notification for this condition?')) {
      return window.fetch(`/reminders/${reminder.id}/dismiss`)
        .then(response => response.json())
        .then(() => {
          window.location.reload();
        });
    }
  };

  return (
    <Warning className="info">
      <p>{licenceType} licence {licenceNumber} includes a condition with a deadline {relativeTime(reminder.deadline)} - <a href="#">view condition</a></p>
      {
        !profile.asruUser &&
          <p className="govuk-hint">
            You can <a href="#" onClick={dismissReminder}>remove this notification if the condition has been fulfilled</a>
          </p>
      }
    </Warning>
  );
}

function Reminders({ model, licenceType }) {
  if (!model.reminders || isEmpty(model.reminders)) {
    return null;
  }

  if (licenceType === 'Project') {
    return (
      <Fragment>
        {
          map(model.reminders, (reminders, key) => (
            <Reminder key={key} licenceType={licenceType} licenceNumber={model.licenceNumber} reminder={reminders[0]} />
          ))
        }
      </Fragment>
    );
  }

  return (
    <Reminder licenceType={licenceType} licenceNumber={model.licenceNumber} reminder={model.reminders[0]} />
  );
}

export default Reminders;
