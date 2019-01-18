import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  ErrorSummary,
  Fieldset,
  Form,
  Inset,
  Link,
  Snippet,
  Header
} from '@asl/components';
import Playback from './playback';
import { dateFormat } from '../../../../constants';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

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
  const formatDate = date => format(date, dateFormat.medium);

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
        </div>
      </div>

      <Header title={<Snippet>title</Snippet>} />

      <div className="govuk-inset-text submitted-by">
        <Snippet>task.submittedBy</Snippet><span>&nbsp;</span>
        <Link page="profile.view" profileId={changedBy.id} label={changedBy.name} /><span>&nbsp;</span>
        <Snippet date={formatDate(parse(task.updatedAt))}>task.submittedOn</Snippet>
      </div>
      {
        subject && <div className="applicant">
          <h2 className="govuk-heading-m"><Snippet>task.applicantName</Snippet></h2>
          <p className="govuk-body">{subject.name}</p>
        </div>
      }

      <Playback task={task} />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          &nbsp;
        </div>

        <div className="govuk-grid-column-two-thirds">
          <Form formatters={formatters} />
        </div>
      </div>

    </Fragment>
  );
};

const mapStateToProps = ({ static: { task } }) => ({ task });

export default connect(mapStateToProps)(Task);
