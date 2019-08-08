import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Snippet } from '@asl/components';
import { dateFormat } from '../../../../constants';
import { formatDate } from '../../../../lib/utils';
import moment from 'moment-business-time';

const withAsru = task => [
  'with-inspectorate',
  'referred-to-inspector',
  'with-licensing',
  'inspector-recommended',
  'inspector-rejected'
].includes(task.status);

class Deadline extends Component {
  isExtended() {
    return !!this.props.task.data.extended;
  }

  render() {
    const task = this.props.task;
    const isInspector = this.props.isInspector;
    const isExtendable = withAsru(task) && !this.isExtended();

    const submitted = task.activityLog.reduceRight((lastSubmission, activity) => {
      const status = activity.eventName.split(':').pop();
      return status === 'resubmitted' ? activity.createdAt : lastSubmission;
    }, task.createdAt);

    const period = this.isExtended() ? 55 : 40;

    const deadline = moment(submitted).addWorkingTime(period, 'days');

    return (
      <div className="deadline">
        <h2><Snippet>sticky-nav.deadline</Snippet></h2>

        <h3>{ formatDate(deadline.toDate(), dateFormat.medium) }</h3>

        { isInspector && isExtendable &&
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
