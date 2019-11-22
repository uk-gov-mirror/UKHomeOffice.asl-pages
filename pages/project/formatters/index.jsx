import React from 'react';
import classnames from 'classnames';
import { Link, ExpiryDate, Snippet } from '@asl/components';
import { formatDate } from '../../../lib/utils';
import { dateFormat } from '../../../constants';

const bad = ['expired'];
const good = ['active'];

const hasExpired = (model = {}) => model.expiryDate && model.expiryDate < new Date().toISOString();

const formatters = {
  title: {
    format: (title, { id }) => {
      return <Link page="project.read" projectId={id} label={title || 'Untitled project'} />;
    }
  },
  status: {
    format: (status, model) => {
      if (hasExpired(model)) {
        status = 'expired';
      }
      const className = classnames({ badge: true, complete: good.includes(status), rejected: bad.includes(status) });
      return <span className={ className }><Snippet>{ `status.${status}` }</Snippet></span>;
    }
  },
  licenceHolder: {
    format: ({ id, firstName, lastName }) =>
      <Link page="profile.read" profileId={id} label={`${firstName} ${lastName}`} />
  },
  expiryDate: {
    format: date => date ? <ExpiryDate date={date} showNotice={11} /> : '-'
  },
  updatedAt: {
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
  }
};

export default formatters;
