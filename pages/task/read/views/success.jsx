import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Snippet, Link } from '@asl/components';

const Success = () => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">

        {
          // TODO: use a panel. Consider binning the __govuk__title stuff as we aren't tied to their classes
        }
        <div className="govuk-panel govuk-panel--confirmation">
          <h1 className="govuk-panel__title">
            <Snippet>task.success.title</Snippet>
          </h1>
          <div className="govuk-panel__body">
            <p>
              <Snippet>task.success.summary</Snippet>
            </p>
          </div>

          {
            // TODO: use an ApplicationProgress component, remove magic strings
          }
          <ul className="application-progress">
            <li className="complete">Submitted</li>
            <li className="active">Endorsed</li>
            <li>Licence granted</li>
          </ul>
        </div>

        <div className="what-next">
          <h2><Snippet>task.success.whatNext.title</Snippet></h2>
          <p><Snippet>task.success.whatNext.summary</Snippet></p>
        </div>

        <p><Snippet>task.success.body</Snippet></p>

        <Link page="dashboard" label={<Snippet>task.success.tasklist</Snippet>} />
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { task } }) => ({ task });

export default connect(mapStateToProps)(Success);
