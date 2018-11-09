import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Diff,
  ModelSummary,
  Snippet,
  ErrorSummary,
  Field
} from '@asl/components';
import { CheckboxGroup } from '@ukhomeoffice/react-components';
import formatters from '../../formatters';
import { hasChanged } from '../../../../lib/utils';

const Confirm = ({
  declaration = true,
  errors = {},
  action = 'update',
  values,
  model,
  csrfToken,
  establishment: {
    name,
    licenceNumber,
    pelh: {
      name: pelhName
    }
  },
  ...props
}) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ErrorSummary />
        <header>
          <h2>&nbsp;</h2>
          <h1><Snippet>pages.place.confirm</Snippet></h1>
        </header>
        <dl className="inline">
          <dt><Snippet>establishment</Snippet></dt>
          <dd>{ name }</dd>

          <dt><Snippet>licenceNumber</Snippet></dt>
          <dd>{ licenceNumber }</dd>

          <dt><Snippet>licenceHolder</Snippet></dt>
          <dd>{ pelhName }</dd>
        </dl>
        <h2><Snippet optional site={model.site}>subtitle</Snippet></h2>
        {
          action === 'create' || action === 'delete'
            ? (
              <Fragment>
                <ModelSummary formatters={formatters} />
                <hr />
              </Fragment>
            )
            : <Diff formatters={formatters} comparator={hasChanged} />
        }
        {
          model && model.notes && (
            <Field
              title={<Snippet>fields.notes.label</Snippet>}
              content={model.notes}
            />
          )
        }
        {
          values && values.restrictions && (
            <Field
              title={<Snippet>fields.changesToRestrictions.label</Snippet>}
              content={values.restrictions}
            />
          )
        }
        {
          values && values.comments && (
            <Field
              title={<Snippet>fields.comments.label</Snippet>}
              content={values.comments}
            />
          )
        }

        <div className="control-bar block">
          <form method="POST">
            {
              declaration && (
                <CheckboxGroup
                  id="declaration"
                  name="declaration"
                  error={
                    errors.declaration && <Snippet>{`errors.declaration.${errors.declaration}`}</Snippet>
                  }
                  label=""
                  options={[
                    {
                      value: 'true',
                      label: <Snippet>declaration</Snippet>
                    }
                  ]}
                />
              )
            }
            <input type="hidden" name="_csrf" value={csrfToken} />
            <button type="submit" className="govuk-button"><Snippet>buttons.submit</Snippet></button>
          </form>
          <a href="?edit=true"><Snippet>buttons.edit</Snippet></a>
          <a href="?clear=true"><Snippet>buttons.cancel</Snippet></a>
        </div>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ model, static: { establishment, errors, values, csrfToken } }) => ({ establishment, model, errors, csrfToken, values });

export default connect(mapStateToProps)(Confirm);
