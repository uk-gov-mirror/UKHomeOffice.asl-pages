import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'; // todo: switch for date-fns
import {
  ErrorSummary,
  Fieldset,
  Form,
  Inset,
  Link,
  Snippet
} from '@asl/components';
import { dateFormat } from '../../../../constants';

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
  decision: {
    mapOptions: option => {
      if (!option.reveal) {
        return option;
      }
      const ConnectedComponent = connectComponent(option.reveal);

      return {
        ...option,
        prefix: option.value,
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

        <div className="govuk-inset-text submitted-by">
          <Snippet>task.submittedBy</Snippet><span>&nbsp;</span>
          <Link page="profile.view" profileId={changedBy.id} label={changedBy.name} /><span>&nbsp;</span>
          <Snippet date={moment(task.updated_at).format(dateFormat.medium)}>task.submittedOn</Snippet>
        </div>

        <div className="applicant">
          <h2 className="govuk-heading-m"><Snippet>task.applicantName</Snippet></h2>
          <p className="govuk-body">{subject.name}</p>
        </div>
      </header>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <ol className="section-navigation">
            <li className="active"><a href="#">Some</a></li>
            <li><a href="#">Navigation</a></li>
            <li><a href="#">Here</a></li>
          </ol>
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
