import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Snippet, FormLayout, Fieldset, Inset, Header } from '@ukhomeoffice/asl-components';
import OpenTasks from '../../component/open-tasks';

const connectComponent = key => {
  const mapStateToProps = ({ model, static: { schema } }) => {
    schema = schema.type.options.find(role => role.value === key).reveal;

    return {
      model,
      schema
    };
  };

  return connect(mapStateToProps)(Fieldset);
};

const formatters = {
  type: {
    mapOptions: option => {
      const ConnectedComponent = connectComponent(option.value);
      return {
        ...option,
        reveal: option.reveal ? <Inset><ConnectedComponent /></Inset> : null
      };
    }
  }
};

const Page = ({ addRoleTasks, schema, profile }) => {
  if (schema.type.options.length === 0) {
    return (
      <Fragment>
        <Header
          title={<Snippet>title</Snippet>}
          subtitle={`${profile.firstName} ${profile.lastName}`}
        />
        <OpenTasks roleTasks={addRoleTasks} />
        <p>
          <Link page="profile.read" label={<Snippet>buttons.cancel</Snippet>} className="govuk-button" />
        </p>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <FormLayout formatters={formatters}>
        <Header
          title={<Snippet>title</Snippet>}
          subtitle={`${profile.firstName} ${profile.lastName}`}
        />
        <OpenTasks roleTasks={addRoleTasks} />
      </FormLayout>

      <p>
        <Link page="profile.read" label={<Snippet>buttons.cancel</Snippet>} />
      </p>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { addRoleTasks, schema, profile } }) => ({ addRoleTasks, schema, profile });
export default connect(mapStateToProps)(Page);
