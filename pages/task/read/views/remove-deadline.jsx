import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Snippet, Header, Link } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';

const CommentForm = ({ task, formFields }) => {
  return (
    <Fragment>
      <Header title={<Snippet>removeDeadline.title</Snippet>} />

      { formFields }

      <p className="control-panel">
        <Button><Snippet>removeDeadline.markIncompleteButton</Snippet></Button>
        <Link page="task.read" taskId={task.id} label={<Snippet>actions.cancel</Snippet>} />
      </p>
    </Fragment>
  );
};

const Confirm = ({ task, values }) => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Form detachFields submit={false}>
          <CommentForm values={values} task={task} />
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ static: { task, values } }) => ({ task, values });

export default connect(mapStateToProps)(Confirm);
