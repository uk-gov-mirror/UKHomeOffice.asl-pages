import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  ErrorSummary,
  Snippet,
  Header,
  Form
} from '@asl/components';
import Model from './models';

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

      <Header
        title={<Snippet type={task.type}>title</Snippet>}
        subtitle={<Snippet>{`tasks.${task.data.model}.${action}`}</Snippet>}
      />
      {
        project && <h3>{project.title || 'Untitled project'}</h3>
      }
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
