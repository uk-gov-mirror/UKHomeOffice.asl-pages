import React from 'react';
import { connect } from 'react-redux';
import { Snippet, Header, FormLayout, Fieldset, Inset } from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';

const connectComponent = (field, key) => {
  const mapStateToProps = ({ model, static: { schema, errors } }) => {
    schema = schema[field].options.find(body => body.value === key).reveal;

    return {
      model,
      schema,
      errors
    };
  };

  return connect(mapStateToProps)(Fieldset);
};

const mapOptions = (field, option) => {
  const ConnectedComponent = connectComponent(field, option.value);
  return {
    ...option,
    reveal: option.reveal ? <Inset><ConnectedComponent /></Inset> : null
  };
};

const formatters = {
  authority: {
    mapOptions: option => mapOptions('authority', option)
  },
  awerb: {
    mapOptions: option => mapOptions('awerb', option)
  }
};

const Submit = ({ model }) => {
  const isApplication = model.type === 'application';
  return (
    <FormLayout formatters={formatters}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={model.data.title || 'Untitled project'}
      />
      {isApplication && (
        <Warning>
          <Snippet>warning</Snippet>
        </Warning>
      )}
    </FormLayout>
  );
};

const mapStateToProps = ({ model }) => ({ model });

export default connect(mapStateToProps)(Submit);
