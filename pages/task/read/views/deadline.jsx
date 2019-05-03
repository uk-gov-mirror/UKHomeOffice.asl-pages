import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Snippet } from '@asl/components';
import { dateFormat } from '../../../../constants';
import format from 'date-fns/format';
import moment from 'moment-business-time';

class Deadline extends Component {
  isExtended() {
    return !!this.props.task.data.extended;
  }

  render() {
    const task = this.props.task;
    const isInspector = this.props.isInspector;

    let deadline = moment(task.createdAt).addWorkingTime(40, 'days');

    if (this.isExtended()) {
      deadline.addWorkingTime(15, 'days');
    }

    return (
      <div className="deadline">
        <h2><Snippet>sticky-nav.deadline</Snippet></h2>

        <h3>{ format(deadline.toDate(), dateFormat.medium) }</h3>

        { isInspector && !this.isExtended() &&
          <Fragment>
            <p><Snippet>deadline.hint</Snippet></p>
            <Link
              page="task.extend"
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
