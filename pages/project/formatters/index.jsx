import React, { Fragment } from 'react';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { Link, ExpiryDate, Snippet } from '@asl/components';
import { formatDate } from '../../../lib/utils';
import { dateFormat } from '../../../constants';
import { projectTitle } from '../../common/formatters';
import EstablishmentLinks from '../../task/read/views/components/establishment-links';

const bad = ['expired', 'transferred', 'revoked', 'additional-availability-ended'];
const good = ['active'];

const hasExpired = (model = {}) => model.expiryDate && model.expiryDate < new Date().toISOString();

const formatters = establishmentId => ({
  title: {
    format: (title, model) => {
      const isAdditionalAvailability = model.establishmentId !== establishmentId;
      const hasAdditionalAvailability = !isAdditionalAvailability && model.additionalEstablishments.length > 0;
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
                  isAdditionalAvailability && <li>{`Has primary availability at ${model.establishment.name}`}</li>
                }
                {
                  hasAdditionalAvailability && (
                    <li>
                      <span>Has additional availability at </span>
                      <EstablishmentLinks establishments={model.additionalEstablishments} showLink={false} />
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
      const additionalAvailabilityEnded = isAdditionalAvailability && model.additionalEstablishments.find(e => e.id === establishmentId).status === 'removed';

      if (hasExpired(model)) {
        status = 'expired';
      }

      if (additionalAvailabilityEnded) {
        status = 'additional-availability-ended';
      }
      const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });
      return (
        <Fragment>
          <span className={ className }><Snippet>{ `status.${status}` }</Snippet></span>
          {
            model.raDate && <p className="ra-label"><Snippet>ra-required</Snippet></p>
          }
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
      const key = hasExpired(model) ? 'expired' : 'view';
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
  }
});

export default formatters;
