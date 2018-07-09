import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Diff from '../../../common/views/containers/diff';
import ModelSummary from '../../../common/views/containers/model-summary';
import Snippet from '../../../common/views/containers/snippet';
import ErrorSummary from '../../../common/views/containers/error-summary';
import Field from '../../../common/views/components/field';
import { RadioGroup } from 'govuk-react-components';
import formatters from '../../formatters';
import { hasChanged } from '../../../../lib/utils';

const comparator = (oldValue, newValue) => {
  return hasChanged({}, oldValue, newValue);
};

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
    <div className="grid-row">
      <div className="column-two-thirds">
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
        <hr />
        <h2><Snippet optional site={model.site}>subtitle</Snippet></h2>
        {
          action === 'create' || action === 'delete'
            ? (
              <Fragment>
                <ModelSummary formatters={formatters} />
                <hr />
              </Fragment>
            )
            : <Diff formatters={formatters} comparator={comparator} />
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
              title={<Snippet>fields.restrictions.label</Snippet>}
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
                <RadioGroup
                  id="declaration"
                  type="checkbox"
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
            <button type="submit" className="button"><Snippet>buttons.submit</Snippet></button>
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
