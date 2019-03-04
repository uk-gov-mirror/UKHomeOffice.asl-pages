import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormLayout, Snippet, Header, ModelSummary, Link } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import { requiresDeclaration } from '../../../../lib/utils';

const formatters = {
  status: {
    format: val => <Snippet>{`status.${val}.action`}</Snippet>
  }
};

const Confirm = ({ task, values, schema }) => {
  return (
    <Fragment>
      <FormLayout submit={false}>
        <Header title={<Snippet>title</Snippet>} />
        <ModelSummary formatters={formatters} model={values} schema={schema} />

        { requiresDeclaration(values.status) &&
          <div className="task-declaration">
            <h2><Snippet>declaration.title</Snippet></h2>
            <Snippet>{`declaration.${values.status}`}</Snippet>
          </div>
        }
        <p className="control-panel">
          <Button type="submit"><Snippet>buttons.submit</Snippet></Button>
          <Link page="task.read" taskId={task.id} label={<Snippet>actions.change</Snippet>} />
        </p>
      </FormLayout>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { task, values, modelSchema } }) => ({ task, values, schema: modelSchema });

export default connect(mapStateToProps)(Confirm);
