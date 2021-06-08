import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import pick from 'lodash/pick';
import { getUrl } from '@asl/components/src/link';
import {
  Fieldset,
  Header,
  Snippet,
  Link,
  WidthContainer,
  ErrorSummary
} from '@asl/components';

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
      <Fieldset schema={pick(schema, fields)} model={model} errors={errors} />
    </Fragment>
  );
}

function DeleteButton() {
  const model = useSelector(state => state.model);
  const deleteUrl = getUrl({ page: 'rops.procedures.update', procedureId: model.id }) + '/delete';

  function onDelete(e) {
    if (window.confirm('Are you sure you want to delete this procedure?')) {
      return true;
    }
    e.preventDefault();
  }

  return (
    <form method="POST" action={deleteUrl} className="float-right">
      <button className="govuk-button button-warning push-up" onClick={onDelete}>Delete procedure</button>
    </form>
  );
}

export default function Create() {
  const model = useSelector(state => state.model);
  const { project, csrfToken } = useSelector(state => state.static);
  const [disabled, setDisabled] = useState(false);
  const deletable = model.id !== 'new-procedure';

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
        </div>

        <div className="control-panel">
          <button type="submit" className="govuk-button" disabled={disabled}><Snippet>buttons.submit</Snippet></button>
          <Link page="rops.procedures.list" label={<Snippet>buttons.cancel</Snippet>} />
        </div>
      </form>

      {
        deletable &&
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <DeleteButton />
            </div>
          </div>
      }
    </Fragment>
  );
}
