import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import Diff from '../../../common/views/containers/diff';
import ModelSummary from '../../../common/views/containers/model-summary';
import Snippet from '../../../common/views/containers/snippet';
import ErrorSummary from '../../../common/views/containers/error-summary';
import RadioGroup from 'govuk-react-components/components/forms/radio-group';
import { joinAcronyms } from '../../../common/formatters';

const formatters = {
  suitability: { format: joinAcronyms },
  holding: { format: joinAcronyms },
  nacwo: { format: val => get(val, 'profile.name') }
};

const Confirm = ({
  declaration = true,
  errors = {},
  action = 'update',
  model: {
    name: modelName
  },
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
        <h2><Snippet optional name={modelName}>subtitle</Snippet></h2>
        {
          action === 'create' || action === 'delete'
            ? (
              <Fragment>
                <ModelSummary formatters={formatters} />
                <hr />
              </Fragment>
            )
            : <Diff formatters={formatters} />
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
                      value: true,
                      label: <Snippet>declaration</Snippet>
                    }
                  ]}
                />
              )
            }
            <button className="button"><Snippet>buttons.submit</Snippet></button>
          </form>
          <a href="?edit=true"><Snippet>buttons.edit</Snippet></a>
          <a href="?clear=true"><Snippet>buttons.cancel</Snippet></a>
        </div>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ model, static: { establishment, errors } }) => ({ establishment, model, errors });

export default connect(mapStateToProps)(Confirm);
