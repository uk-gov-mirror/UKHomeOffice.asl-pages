import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Form,
  Snippet,
  Header,
  Link,
  Field,
  ErrorSummary
} from '@ukhomeoffice/asl-components';
import get from 'lodash/get';
import { Button } from '@ukhomeoffice/react-components';
import RefusalNotice from './components/refusal-notice';

function CommentForm({ formFields, task, errors, values, comment }) {
  const hba = useSelector((state) => state.static.hba);
  const { requiresDeclaration, inspector } = useSelector(
    (state) => state.static
  );
  const model = task.data.model;
  let action = task.data.action;
  if (action === 'grant' && task.type === 'amendment') {
    action = 'update';
  }
  const title = (
    <Snippet
      fallback={`status.${values.status}.action`}
    >{`status.${values.status}.action.${task.type}`}</Snippet>
  );
  const licenceHolder =
    get(task, 'data.modelData.profile') ||
    get(task, 'data.modelData.licenceHolder') ||
    get(task, 'data.licenceHolder');
  const name = `${get(licenceHolder, 'firstName')} ${get(
    licenceHolder,
    'lastName'
  )}`;

  return (
    <Fragment>
      <Header
        title={title}
        subtitle={<Snippet>{`tasks.${task.data.model}.${action}`}</Snippet>}
      />
      <ErrorSummary errors={errors} />
      {hba && (
        <>
          <label className="govuk-label">
            <Snippet>hba</Snippet>
          </label>
          <p>
            <a
              href={`/attachment/${hba.hbaToken}`}
              download={`${hba.hbaFilename}`}
            >
              {hba.hbaFilename}
            </a>
          </p>
        </>
      )}
      {values.restrictions && (
        <Field
          title={<Snippet>fields.restrictions.label</Snippet>}
          content={values.restrictions}
        />
      )}

      {values.status === 'intention-to-refuse' && (
        <details className="gutter">
          <summary>
            <Snippet>refusalNotice.summaryLabel</Snippet>
          </summary>
          <RefusalNotice
            project={get(task, 'data.modelData')}
            licenceHolder={licenceHolder}
            inspector={inspector}
            refusalReason={comment}
          />
        </details>
      )}

      {formFields}
      {requiresDeclaration && (
        <div className="task-declaration">
          <h2>
            <Snippet>declaration.title</Snippet>
          </h2>
          <Snippet
            type={task.type}
            name={name}
          >{`declaration.${values.status}.${model}`}</Snippet>
        </div>
      )}
      <p className="control-panel">
        <Button>{title}</Button>
        <Link
          page="task.read"
          taskId={task.id}
          label={<Snippet>actions.change</Snippet>}
        />
      </p>
    </Fragment>
  );
}

export default function Confirm() {
  const { task, values, errors } = useSelector((state) => state.static);

  const [comment, setComment] = useState('');

  const onChange = (values) => {
    setComment(values.comment);
  };

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Form detachFields submit={false} onChange={onChange}>
          <CommentForm
            values={values}
            task={task}
            errors={errors}
            comment={comment}
          />
        </Form>
      </div>
    </div>
  );
}
