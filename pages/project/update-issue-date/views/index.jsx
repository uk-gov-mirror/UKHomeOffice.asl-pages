import React from 'react';
import { useSelector } from 'react-redux';
import formatDate from 'date-fns/format';
import {
  Header,
  Snippet,
  FormLayout
} from '@asl/components';
import formatters from '../../formatters';

export default function ProjectLandingPage() {
  const model = useSelector(state => state.model);
  const dateFormat = 'DD MMMM YYYY';

  return (
    <FormLayout>
      <Header
        subtitle={model.title}
        title={<Snippet>title</Snippet>}
      />

      <div className="govuk-warning-text">
        <span className="govuk-warning-text__icon" aria-hidden="true">!</span>
        <strong className="govuk-warning-text__text"><Snippet>summary</Snippet></strong>
      </div>

      <dl>
        <dt><Snippet>fields.duration.label</Snippet></dt>
        <dd>{formatters.duration.format(model.granted)}</dd>

        <dt><Snippet>fields.expiryDate.label</Snippet></dt>
        <dd>{formatDate(model.expiryDate, dateFormat)}</dd>

        <dt><Snippet>fields.issueDate.label</Snippet></dt>
        <dd>{formatDate(model.issueDate, dateFormat)}</dd>
      </dl>
    </FormLayout>
  );
}
