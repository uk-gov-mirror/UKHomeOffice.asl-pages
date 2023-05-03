import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Snippet, FormLayout, Header } from '@ukhomeoffice/asl-components';
import OpenTasks from '../../component/open-tasks';

const Page = ({ removeRoleTasks, schema }) => {
  if (schema.type.options.length === 0) {
    return (
      <Fragment>
        <Header title={<Snippet>title</Snippet>}/>
        <OpenTasks roleTasks={removeRoleTasks} />
        <p>
          <Link page="profile.read" label={<Snippet>buttons.cancel</Snippet>} className="govuk-button" />
        </p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <FormLayout>
        <Header title={<Snippet>title</Snippet>}/>
        <OpenTasks roleTasks={removeRoleTasks} />
      </FormLayout>

      <p>
        <Link page="profile.read" label={<Snippet>buttons.cancel</Snippet>} />
      </p>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { removeRoleTasks, schema } }) => ({ removeRoleTasks, schema });
export default connect(mapStateToProps)(Page);
