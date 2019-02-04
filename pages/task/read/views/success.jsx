import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { ApplicationProgress, Link, Panel, Snippet } from '@asl/components';
import { licenceCanProgress } from '../../../../lib/utils';

const STATES = [
  { state: 'submitted' },
  { state: 'endorsed', active: true },
  { state: 'granted' }
];

const Success = ({ status }) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Panel title={<Snippet>{`status.${status}.state`}</Snippet>} className="green-bg">
          <Snippet optional>{`status.${status}.summary`}</Snippet>

          { licenceCanProgress(status) &&
            <ApplicationProgress states={STATES} />
          }
        </Panel>

        { licenceCanProgress(status) &&
          <Fragment>
            <div className="what-next">
              <h2><Snippet optional>{`status.${status}.whatNext.title`}</Snippet></h2>
              <p><Snippet optional>{`status.${status}.whatNext.summary`}</Snippet></p>
            </div>

            <p><Snippet optional>{`status.${status}.body`}</Snippet></p>
          </Fragment>
        }

        <Link page="dashboard" label={<Snippet>task.links.tasklist</Snippet>} />
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { task, status } }) => ({ task, status });

export default connect(mapStateToProps)(Success);
