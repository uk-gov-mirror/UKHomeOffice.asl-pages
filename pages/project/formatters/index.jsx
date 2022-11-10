import React, { Fragment } from 'react';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { Link, ExpiryDate, Snippet, Countdown } from '@asl/components';
import { formatDate } from '../../../lib/utils';
import { dateFormat } from '../../../constants';
import { projectTitle } from '../../common/formatters';

const bad = ['expired', 'transferred', 'revoked', 'additional-availability-ended', 'refused', 'suspended'];
const good = ['active'];

function EstablishmentList({ establishments }) {
  return (
    <Fragment>
      <span>Additional availability at </span>
      {
        sortBy(establishments, 'name').map((establishment, index) => {
          const isLastItem = index === establishments.length - 1;
          const showComma = index > 0 && !isLastItem;
          const showAnd = isLastItem && establishments.length > 1;
          return (
            <Fragment key={index}>
              { showComma && <Fragment>, </Fragment> }
              { showAnd && <Fragment> and </Fragment> }
              { establishment.name || establishment['establishment-name'] }
            </Fragment>
          );
        })
      }
    </Fragment>
  );
}

const formatters = establishmentId => ({
  title: {
    format: (title, model) => {
      const isAdditionalAvailability = model.establishmentId !== establishmentId;
      const aaEstablishments = model.additionalEstablishments.filter(aa => model.status === 'inactive' || aa.status === 'active');
      const hasAdditionalAvailability = !isAdditionalAvailability && aaEstablishments.length > 0;
      const isLegacyStub = model.isLegacyStub;
      const showInfo = isLegacyStub || hasAdditionalAvailability || isAdditionalAvailability;
      return (
        <Fragment>
          <Link page="project.read" projectId={model.id} label={projectTitle(model)} />
          {
            showInfo && (
              <ul className="no-margin">
                {
                  isLegacyStub && <li>Partial record</li>
                }
                {
                  isAdditionalAvailability && <li>{`Primary availability at ${model.establishment.name}`}</li>
                }
                {
                  hasAdditionalAvailability && (
                    <li>
                      <EstablishmentList establishments={aaEstablishments} />
                    </li>
                  )
                }
              </ul>
            )
          }
        </Fragment>
      );
    }
  },
  status: {
    format: (status, model) => {
      const isAdditionalAvailability = model.establishmentId !== establishmentId;
      const aaEstablishment = model.additionalEstablishments && model.additionalEstablishments.find(e => e.id === establishmentId);
      const additionalAvailabilityEnded = isAdditionalAvailability && aaEstablishment && aaEstablishment.status === 'removed';

      if (additionalAvailabilityEnded) {
        status = 'additional-availability-ended';
      }

      if (model.refusedDate) {
        status = 'refused';
      }

      if (status === 'active' && model.suspendedDate) {
        status = 'suspended';
      }

      const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });
      return (
        <Fragment>
          <span className={ className }><Snippet>{ `status.${status}` }</Snippet></span>
        </Fragment>
      );
    }
  },
  licenceHolder: {
    format: ({ id, firstName, lastName }) =>
      <Link page="profile.read" profileId={id} label={`${firstName} ${lastName}`} />
  },
  expiryDate: {
    format: (date, model) => {
      if (!date) {
        return '-';
      }
      return <ExpiryDate date={date} showNotice={model.status === 'active' ? 11 : false} />;
    }
  },
  updatedAt: {
    format: date => formatDate(date, dateFormat.datetime)
  },
  transferredInDate: {
    format: date => formatDate(date, dateFormat.datetime)
  },
  transferredOutDate: {
    format: date => formatDate(date, dateFormat.datetime)
  },
  granted: {
    format: (granted, model) => {
      const key = model.status !== 'active' ? model.status : 'view';
      return <Link page="projectVersion" versionId={granted.id} label={<Snippet>{`fields.granted.${key}`}</Snippet>} />;
    }
  },
  draft: {
    format: draft => <Link page="projectVersion.update" versionId={draft.id} label={<Snippet>fields.draft.view</Snippet>} />
  },
  submitted: {
    format: submitted => <Link page="projectVersion" versionId={submitted.id} label={<Snippet>fields.submitted.view</Snippet>} />
  },
  duration: {
    format: granted => {
      if (!granted || isEmpty(granted.duration)) {
        return '-';
      }

      const { years, months } = granted.duration;

      return `${years} years ${months} months`;
    }
  },
  raDate: {
    format: (raDate, project) => {
      if (!raDate) {
        return <span className="not-applicable">Not required</span>;
      }
      if (project.raGrantedDate) {
        return 'Complete';
      }
      if (raDate < (new Date()).toISOString()) {
        return <Fragment>
          {`Due ${formatDate(raDate, dateFormat.medium)}`}
          <Countdown expiry={raDate} unit="day" showUrgent={1} showNotice={1} />
        </Fragment>;
      }
      return `Due ${formatDate(raDate, dateFormat.medium)}`;
    }
  }
});

export default formatters;
