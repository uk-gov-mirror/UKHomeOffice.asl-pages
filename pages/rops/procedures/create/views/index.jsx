import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import pick from 'lodash/pick';
import { getUrl } from '@ukhomeoffice/asl-components/src/link';
import {
  Fieldset,
  Header,
  Snippet,
  Link,
  ErrorSummary,
  Sidebar
} from '@ukhomeoffice/asl-components';
import RopsHeader from '../../../components/header';
import formatters from '../formatters';
import Guidance from '../../../components/guidance';

function FormSection({ title, fields, step }) {
  const model = useSelector(state => state.model);
  const { schema, errors } = useSelector(state => state.static);
  const filteredSchema = pick(schema, fields);

  // hide sections if schema is empty
  if (!Object.keys(filteredSchema).length) {
    return null;
  }

  return (
    <div className="form-section">
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
      <Fieldset schema={filteredSchema} model={model} errors={errors} formatters={formatters} />
    </div>
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
      <button className="govuk-button button-warning push-up" onClick={onDelete}><Snippet>buttons.delete</Snippet></button>
    </form>
  );
}

export default function Create() {
  const model = useSelector(state => state.model);
  const { csrfToken, rowNum } = useSelector(state => state.static);
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
      <RopsHeader />
      <ErrorSummary />
      <Header
        title={<Snippet rowNum={rowNum}>title</Snippet>}
      />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <form method="POST" noValidate onSubmit={onFormSubmit} className="procedures">
            <input type="hidden" name="_csrf" value={csrfToken} />
            <FormSection title="Animals" step="species" fields={['species', 'ga']} />
            <FormSection title="Purposes" step="purposes" fields={['purposes', 'newGeneticLine']} />
            <FormSection title="Special techniques" step="product-testing" fields={['specialTechniqueUsed']} />
            <FormSection title="Outcomes" fields="severity" />

            <div className="control-panel">
              <button type="submit" className="govuk-button" disabled={disabled}><Snippet>buttons.submit</Snippet></button>
              <Link page="rops.procedures.list" label={<Snippet>buttons.cancel</Snippet>} />
            </div>
          </form>

          {
            deletable && <DeleteButton />
          }
        </div>
        <Sidebar>
          <Guidance />
        </Sidebar>
      </div>
    </Fragment>
  );
}
