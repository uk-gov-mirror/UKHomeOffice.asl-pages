import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Link from '../../../common/views/containers/link';
import Snippet from '../../../common/views/containers/snippet';
import ErrorSummary from '../../../common/views/containers/error-summary';
import Form from '../../../common/views/containers/form';
import moment from 'moment'; // todo: switch for date-fns
import { dateFormat } from '../../../../constants';
import Fieldset from '../../../common/views/components/fieldset';
import Inset from '../../../common/views/components/inset';

const connectComponent = schema => {
  const mapStateToProps = ({ model, static: { errors } }) => {
    return {
      model,
      errors,
      schema
    };
  };

  return connect(mapStateToProps)(Fieldset);
};

const formatters = {
  approve: {
    mapOptions: option => {
      if (!option.reveal) {
        return option;
      }
      const ConnectedComponent = connectComponent(option.reveal);
      return {
        ...option,
        reveal: <Inset><ConnectedComponent /></Inset>
      };

    }
  }
};

const Task = ({ task }) => {
  const subject = task.data.subject;
  const changedBy = task.data.changedBy;

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
        </div>
      </div>

      <header>
        <h1><Snippet>task.title</Snippet></h1>

        <div className="govuk-inset-text">
          <Snippet>task.submittedBy</Snippet><span>&nbsp;</span>
          <Link page="profile.view" profileId={changedBy.id} label={changedBy.name} /><span>&nbsp;</span>
          <Snippet date={moment(task.updated_at).format(dateFormat.medium)}>task.submittedOn</Snippet>
        </div>

        <h2><Snippet>task.applicantName</Snippet></h2>
        <p>{subject.name}</p>
      </header>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <ul className="section-navigation">
            <li>Some</li>
            <li>Navigation</li>
            <li>Here</li>
          </ul>
        </div>

        <div className="govuk-grid-column-two-thirds">
          <Form formatters={formatters} />
        </div>
      </div>

    </Fragment>
  );
};

const mapStateToProps = ({
  static: { task }
}) => ({ task });

export default connect(mapStateToProps)(Task);
