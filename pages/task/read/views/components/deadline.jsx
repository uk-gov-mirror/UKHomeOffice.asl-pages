import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Snippet } from '@asl/components';
import { dateFormat } from '../../../../../constants';
import { formatDate } from '../../../../../lib/utils';

class Deadline extends Component {
  render() {
    const task = this.props.task;

    return (
      <div className="deadline">
        <h2><Snippet>sticky-nav.deadline</Snippet></h2>

        <h3>{ formatDate(task.deadline, dateFormat.medium) }</h3>

        { this.props.isInspector && task.isExtendable &&
          <Fragment>
            <p><Snippet>deadline.hint</Snippet></p>
            <Link
              page="task.read.extend"
              taskId={task.id}
              label={<Snippet>deadline.extend.button</Snippet>}
              className="govuk-button button-secondary"
            />
          </Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ static: { isInspector } }) => ({ isInspector });

export default connect(mapStateToProps)(Deadline);
