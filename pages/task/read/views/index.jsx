import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  ErrorSummary,
  Form,
  Link,
  Snippet,
  Header
} from '@asl/components';
import Pil from './pil';
import Place from './place';
import { dateFormat } from '../../../../constants';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

const getTaskPlayback = task => {
  if (task.data.model === 'pil') {
    return <Pil task={task} />;
  }
  if (task.data.model === 'place') {
    return <Place task={task} />;
  }
};

const getTitle = action => {
  let key = 'title';
  if (action === 'create') {
    key = 'createTitle';
  }
  if (action === 'delete') {
    key = 'deleteTitle';
  }
  if (action === 'update') {
    key = 'updateTitle';
  }
  try {
    return <Snippet>{key}</Snippet>;
  } catch (e) {
    return <Snippet>title</Snippet>;
  }
};

const Task = ({ task, profile }) => {
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

      <Header title={getTitle(task.data.action)} />

      <div className="govuk-inset-text submitted-by">
        <Snippet>task.submittedBy</Snippet><span>&nbsp;</span>
        <Link page="profile.view" profileId={changedBy.id} label={changedBy.name} /><span>&nbsp;</span>
        <Snippet date={formatDate(parse(task.updatedAt))}>task.submittedOn</Snippet>
      </div>
      <dl>
        <dt><Snippet>currentStatus</Snippet></dt>
        <dd><Snippet>{`status.${task.status}.state`}</Snippet></dd>
      </dl>
      {
        subject && task.data.model !== 'place' && <div className="applicant">
          <h2 className="govuk-heading-m"><Snippet>task.applicantName</Snippet></h2>
          <p className="govuk-body">{subject.name}</p>
        </div>
      }

      {
        task.nextSteps.length > 0
          ? <Form detachFields>{getTaskPlayback(task)}</Form>
          : getTaskPlayback(task)
      }
    </Fragment>
  );
};

const mapStateToProps = ({ static: { task } }) => ({ task });

export default connect(mapStateToProps)(Task);
