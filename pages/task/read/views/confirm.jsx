import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormLayout, Link, Snippet } from '@asl/components';

const Confirm = ({ task }) => {
  return (
    <Fragment>
      <FormLayout>
        <header>
          <h1><Snippet>task.confirm.title</Snippet></h1>
        </header>

        <div className="task-decision">
          <h2><Snippet>task.confirm.decision.title</Snippet></h2>
          <span className="action">
            <Link page="task.read" taskId={task.id} label={<Snippet>task.confirm.decision.change</Snippet>} />
          </span>
          <p>Endorsed</p>
        </div>

        <div className="task-declaration">
          <h2><Snippet>task.confirm.declaration.title</Snippet></h2>
          <Snippet>task.confirm.declaration.text</Snippet>
        </div>
      </FormLayout>

      <p><Link page="dashboard" label={<Snippet>task.confirm.link.exit</Snippet>} /></p>
    </Fragment>
  );
};

const mapStateToProps = ({
  static: { task }
}) => ({ task });

export default connect(mapStateToProps)(Confirm);