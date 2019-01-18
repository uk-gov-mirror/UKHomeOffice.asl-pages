import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ApplicationProgress, Link, Panel, Snippet } from '@asl/components';
import { licenceCanProgress } from '../../../../lib/utils';

const STATES = [
  { state: 'submitted' },
  { state: 'endorsed', active: true },
  { state: 'granted' }
];

const Success = ({ decision }) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Panel title={<Snippet>{`task.${decision}.title`}</Snippet>} className="green-bg">
          <Snippet optional>{`task.${decision}.summary`}</Snippet>

          { licenceCanProgress(decision) &&
            <ApplicationProgress states={STATES} />
          }
        </Panel>

        { licenceCanProgress(decision) &&
          <Fragment>
            <div className="what-next">
              <h2><Snippet optional>{`task.${decision}.whatNext.title`}</Snippet></h2>
              <p><Snippet optional>{`task.${decision}.whatNext.summary`}</Snippet></p>
            </div>

            <p><Snippet optional>{`task.${decision}.body`}</Snippet></p>
          </Fragment>
        }

        <Link page="dashboard" label={<Snippet>task.links.tasklist</Snippet>} />
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { task, decision } }) => ({ task, decision });

export default connect(mapStateToProps)(Success);
