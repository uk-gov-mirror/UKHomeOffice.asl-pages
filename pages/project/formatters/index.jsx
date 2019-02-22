import React from 'react';
import classnames from 'classnames';
import { Link, ExpiryDate, Snippet } from '@asl/components';
import format from 'date-fns/format';
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
      <Link page="profile.view" profileId={id} label={`${firstName} ${lastName}`} />
  },
  expiryDate: {
    format: date => <ExpiryDate date={date}/>
  },
  updatedAt: {
    format: date => format(date, dateFormat.datetime)
  },
  granted: {
    format: (granted, model) => {
      console.log(granted, model);
      const key = hasExpired(model) ? 'expired' : 'view';
      return <Link page="project.version" versionId={granted.id} label={<Snippet>{`fields.granted.${key}`}</Snippet>} />;
    }
  },
  draft: {
    format: draft => <Link page="project.version" versionId={draft.id} label={<Snippet>fields.draft.view</Snippet>} />
  },
  submitted: {
    format: submitted => <Link page="project.version" versionId={submitted.id} label={<Snippet>fields.submitted.view</Snippet>} />
  }
};

export default formatters;
