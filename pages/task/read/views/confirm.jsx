import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormLayout, Link, Snippet, Header } from '@asl/components';
import { licenceCanProgress } from '../../../../lib/utils';

const Confirm = ({ task, decision, reason }) => {
  return (
    <Fragment>
      <FormLayout>
        <Header title={<Snippet>task.confirm.title</Snippet>} />

        <div className="task-decision">
          <h2><Snippet>task.confirm.decision.title</Snippet></h2>
          <span className="action">
            <Link page="task.read" taskId={task.id} label={<Snippet>task.confirm.decision.change</Snippet>} />
          </span>
          <p><Snippet>{`task.${decision}.decision`}</Snippet></p>
          { reason && <p>{reason}</p> }
        </div>

        { licenceCanProgress(decision) &&
          <div className="task-declaration">
            <h2><Snippet>task.confirm.declaration.title</Snippet></h2>
            <Snippet>{`task.${decision}.declaration`}</Snippet>
          </div>
        }
      </FormLayout>

      <p><Link page="dashboard" label={<Snippet>task.confirm.link.exit</Snippet>} /></p>
    </Fragment>
  );
};

const mapStateToProps = ({
  static: { task, decision, reason }
}) => ({ task, decision, reason });

export default connect(mapStateToProps)(Confirm);
