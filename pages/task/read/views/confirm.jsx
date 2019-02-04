import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { FormLayout, Snippet, Header, ModelSummary, Link } from '@asl/components';
import { requiresDeclaration } from '../../../../lib/utils';

const formatters = {
  status: {
    format: val => <Snippet>{`status.${val}.action`}</Snippet>
  }
};

const Confirm = ({ task, values, schema }) => {
  return (
    <Fragment>
      <FormLayout>
        <Header title={<Snippet>title</Snippet>} />
        <ModelSummary formatters={formatters} model={values} schema={schema} />
        <span className="action">
          <Link page="task.read" taskId={task.id} label={<Snippet>actions.change</Snippet>} />
        </span>

        { requiresDeclaration(values.status) &&
          <div className="task-declaration">
            <h2><Snippet>declaration.title</Snippet></h2>
            <Snippet>{`declaration.${values.status}`}</Snippet>
          </div>
        }
      </FormLayout>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { task, values, modelSchema } }) => ({ task, values, schema: modelSchema });

export default connect(mapStateToProps)(Confirm);
