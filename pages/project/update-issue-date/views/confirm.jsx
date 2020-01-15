import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import formatDate from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import {
  Link,
  Header,
  Snippet,
  FormLayout
} from '@asl/components';
import formatters from '../../formatters';

export default function ProjectLandingPage() {
  const model = useSelector(state => state.model);
  const dateFormat = 'DD MMMM YYYY';
  const expiryInThePast = isBefore(model.newExpiryDate, new Date());

  return (
    <Fragment>
      <FormLayout>
        <Header
          subtitle={model.title}
          title={<Snippet>title</Snippet>}
        />

        <dl>
          <dt><Snippet>fields.duration.label</Snippet></dt>
          <dd>{formatters.duration.format(model.granted)}</dd>
        </dl>

        {
          expiryInThePast &&
            <div className="govuk-warning-text">
              <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
              <strong className="govuk-warning-text__text"><Snippet>expiryInThePast</Snippet></strong>
            </div>
        }

        <table className="govuk-table">
          <thead>
            <tr>
              <th></th>
              <th>Current</th>
              <th>Proposed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Date granted</th>
              <td>{formatDate(model.issueDate, dateFormat)}</td>
              <td><span className="highlight">{formatDate(model.newIssueDate, dateFormat)}</span></td>
            </tr>
            <tr>
              <th>Expiry date</th>
              <td>{formatDate(model.expiryDate, dateFormat)}</td>
              <td><span className="highlight">{formatDate(model.newExpiryDate, dateFormat)}</span></td>
            </tr>
          </tbody>
        </table>

      </FormLayout>

      <p><Link page="project.updateIssueDate" label="Change" /></p>
    </Fragment>
  );
}
