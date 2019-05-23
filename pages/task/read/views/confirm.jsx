import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Snippet, Header, Link, Field } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import { requiresDeclaration } from '../../../../lib/utils';

const CommentForm = ({ task, values, formFields }) => {
  return (
    <Fragment>
      <Header title={<Snippet>{`status.${values.status}.action`}</Snippet>} />
      {
        values.restrictions && <Field
          title={<Snippet>fields.restrictions.label</Snippet>}
          content={values.restrictions}
        />
      }
      { formFields }
      { requiresDeclaration(values.status) &&
        <div className="task-declaration">
          <h2><Snippet>declaration.title</Snippet></h2>
          <Snippet>{`declaration.${values.status}`}</Snippet>
        </div>
      }
      <p className="control-panel">
        <Button><Snippet>{`status.${values.status}.action`}</Snippet></Button>
        <Link page="task.read" taskId={task.id} label={<Snippet>actions.change</Snippet>} />
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
