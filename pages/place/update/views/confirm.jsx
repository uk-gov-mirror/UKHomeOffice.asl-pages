import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Diff,
  ModelSummary,
  Snippet,
  ErrorSummary,
  Field,
  Header,
  ControlBar,
  ApplicationConfirm
} from '@asl/components';
import formatters from '../../formatters';
import { hasChanged } from '../../../../lib/utils';
import LicenceHolder from '../../../common/components/licence-holder';

const Confirm = ({
  errors = {},
  action = 'update',
  values,
  model,
  csrfToken,
  establishment: {
    name,
    licenceNumber,
    pelh,
    nprc
  },
  ...props
}) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ErrorSummary />
        <Header title={<Snippet>pages.place.confirm</Snippet>} />
        <dl className="inline">
          <dt><Snippet>establishment</Snippet></dt>
          <dd>{ name }</dd>

          <dt><Snippet>licenceNumber</Snippet></dt>
          <dd>{ licenceNumber }</dd>
          {
            pelh && <LicenceHolder type="pelh" profile={pelh} />
          }
          {
            nprc && <LicenceHolder type="nprc" profile={nprc} />
          }
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
          model && model.restrictions && (
            <Field
              title={<Snippet>fields.restrictions.label</Snippet>}
              content={model.restrictions}
            />
          )
        }
        {
          values && values.changesToRestrictions && (
            <Field
              title={<Snippet>fields.changesToRestrictions.label</Snippet>}
              content={values.changesToRestrictions}
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

        <ControlBar>
          <a href="?edit=true"><Snippet>buttons.edit</Snippet></a>
          <a href="?clear=true"><Snippet>buttons.cancel</Snippet></a>
        </ControlBar>

        <form method="POST">
          <input type="hidden" name="_csrf" value={csrfToken} />
          <ApplicationConfirm />
        </form>

      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ model, static: { establishment, errors, values, csrfToken } }) => ({ establishment, model, errors, csrfToken, values });

export default connect(mapStateToProps)(Confirm);
