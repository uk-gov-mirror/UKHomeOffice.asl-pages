import React, { Fragment } from 'react';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { Link, ExpiryDate, Snippet } from '@asl/components';
import { formatDate } from '../../../lib/utils';
import { dateFormat } from '../../../constants';
import { projectTitle } from '../../common/formatters';

const bad = ['expired', 'transferred', 'revoked'];
const good = ['active'];

const hasExpired = (model = {}) => model.expiryDate && model.expiryDate < new Date().toISOString();

const formatters = {
  title: {
    format: (title, model) => {
      return (
        <Fragment>
          <Link page="project.read" projectId={model.id} label={projectTitle(model)} />
          { model.isLegacyStub ? ' - Partial record' : '' }
        </Fragment>
      );
    }
  },
  status: {
    format: (status, model) => {
      if (hasExpired(model)) {
        status = 'expired';
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
};

export default formatters;
