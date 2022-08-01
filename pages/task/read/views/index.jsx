import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  ErrorSummary,
  Snippet,
  Header,
  Form
} from '@asl/components';
import Model from './models';
import EnforcementFlags from '../../../enforcement/components/enforcement-flags';

let form;

const Task = ({ task, project }) => {
  const [allowSubmit, setAllowSubmit] = useState(false);

  // wait until submit flag is set before submitting form
  useEffect(() => {
    if (allowSubmit) {
      form.submit();
    }
  }, [allowSubmit]);

  let action = task.data.action;
  if (action === 'grant' && task.type === 'amendment') {
    action = 'update';
  }

  function onFormSubmit(e) {
    form = e.target;
    e.preventDefault();
    setAllowSubmit(true);
  }

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
        </div>
      </div>

      <EnforcementFlags model={task} modelType={task.enforcementFlagModelType} useFlagModelType={true} />

      <Header title={<Snippet>{`tasks.${task.data.model}.${action}`}</Snippet>} />

      {
        task.nextSteps.length > 0
          ? (
            <Form detachFields onSubmit={onFormSubmit}>
              <Model task={task} allowSubmit={allowSubmit} />
            </Form>
          )
          : <Model task={task} />
      }
    </Fragment>
  );
};

const mapStateToProps = ({ static: { task, project } }) => ({ task, project });

export default connect(mapStateToProps)(Task);
