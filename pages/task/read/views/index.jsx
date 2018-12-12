import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'; // todo: switch for date-fns
import {
  ErrorSummary,
  Fieldset,
  Form,
  Inset,
  Link,
  Snippet,
  Header
} from '@asl/components';
import Pil from '../../pil-component';
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

const Task = ({ task, profile }) => {
  const subject = task.data.subject;
  const changedBy = task.data.changedBy;

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
        </div>
      </div>

      <Header title={<Snippet>task.title</Snippet>} />

      <div className="govuk-inset-text submitted-by">
        <Snippet>task.submittedBy</Snippet><span>&nbsp;</span>
        <Link page="profile.view" profileId={changedBy.id} label={changedBy.name} /><span>&nbsp;</span>
        <Snippet date={moment(task.updated_at).format(dateFormat.medium)}>task.submittedOn</Snippet>
      </div>

      <div className="applicant">
        <h2 className="govuk-heading-m"><Snippet>task.applicantName</Snippet></h2>
        <p className="govuk-body">{subject.name}</p>
      </div>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <ol className="section-navigation">
            <li className="active"><a href="#">Training and exemptions</a></li>
            <li><a href="#">Procedure Categories</a></li>
            <li><a href="#">Endorse Application</a></li>
          </ol>
        </div>

        {/* include pil component here */}
        <Pil />
        <div className="govuk-grid-column-two-thirds">
          <Pil />
        </div>

        <div className="govuk-grid-column-two-thirds">
          <Form formatters={formatters} />
        </div>
      </div>

    </Fragment>
  );
};

const mapStateToProps = ({ static: { task, profile } }) => ({ task, profile });

export default connect(mapStateToProps)(Task);
