import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import pick from 'lodash/pick';
import {
  Fieldset,
  Header,
  Snippet,
  Link,
  WidthContainer,
  ErrorSummary
} from '@asl/components';
import formatters from '../../formatters';

function FormSection({ title, fields, step }) {
  const model = useSelector(state => state.model);
  const { schema, errors } = useSelector(state => state.static);
  return (
    <Fragment>
      <hr />
      {
        step && (
          <Link
            page="rops.update"
            step={step}
            label={`Edit ${title.toLowerCase()} section`}
            className="float-right"
          />
        )
      }
      <h2>{title}</h2>
      <Fieldset schema={pick(schema, fields)} model={model} formatters={pick(formatters, fields)} errors={errors} />
    </Fragment>
  );
}

export default function Create() {
  const { project, csrfToken } = useSelector(state => state.static);
  const [disabled, setDisabled] = useState(false);

  const onFormSubmit = e => {
    if (disabled) {
      e.preventDefault();
    }
    e.persist();
    setTimeout(() => setDisabled(true), 0);
  };

  return (
    <Fragment>
      <ErrorSummary />
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />
      <form method="POST" noValidate onSubmit={onFormSubmit}>
        <input type="hidden" name="_csrf" value={csrfToken} />
        <WidthContainer>
          <FormSection title="Animals" step="species" fields={['species', 'ga']} />
          <FormSection title="Purposes" step="purposes" fields={['purposes', 'newGeneticLine']} />
        </WidthContainer>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <FormSection title="Outcomes" fields="severity" />
          </div>
          <div className="govuk-grid-column-one-third">

          </div>
        </div>
        <div className="control-panel">
          <button type="submit" className="govuk-button" disabled={disabled}><Snippet>buttons.submit</Snippet></button>
        </div>
      </form>

    </Fragment>
  );
}
