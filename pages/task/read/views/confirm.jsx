import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Snippet, Header, Link, Field, ErrorSummary } from '@asl/components';
import get from 'lodash/get';
import { Button } from '@ukhomeoffice/react-components';

const CommentForm = ({ task, values, errors, formFields }) => {
  const model = task.data.model;
  let action = task.data.action;
  if (action === 'grant' && task.type === 'amendment') {
    action = 'update';
  }
  const title = <Snippet fallback={`status.${values.status}.action`}>{`status.${values.status}.action.${task.type}`}</Snippet>;
  const requiresDeclaration = ['pil', 'trainingPil', 'project'].includes(model) && values.status === 'endorsed' && action !== 'review';
  const name = `${get(task, 'data.modelData.profile.firstName')} ${get(task, 'data.modelData.profile.lastName')}`;
  const licenceHolder = `${get(task, 'data.modelData.licenceHolder.firstName')} ${get(task, 'data.modelData.licenceHolder.lastName')}`;

  return (
    <Fragment>
      <Header
        title={title}
        subtitle={<Snippet>{`tasks.${task.data.model}.${action}`}</Snippet>}
      />
      <ErrorSummary errors={errors} />
      {
        values.restrictions && <Field
          title={<Snippet>fields.restrictions.label</Snippet>}
          content={values.restrictions}
        />
      }
      { formFields }
      { requiresDeclaration &&
        <div className="task-declaration">
          <h2><Snippet>declaration.title</Snippet></h2>
          <Snippet type={task.type} name={name} licenceHolder={licenceHolder}>{`declaration.${values.status}.${model}`}</Snippet>
        </div>
      }
      <p className="control-panel">
        <Button>{title}</Button>
        <Link page="task.read" taskId={task.id} label={<Snippet>actions.change</Snippet>} />
      </p>
    </Fragment>
  );
};

const Confirm = ({ task, values, errors }) => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Form detachFields submit={false}>
          <CommentForm values={values} task={task} errors={errors} />
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ static: { task, values, errors } }) => ({ task, values, errors });

export default connect(mapStateToProps)(Confirm);
