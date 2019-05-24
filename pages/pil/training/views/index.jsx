import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  FormLayout,
  Inset,
  Fieldset,
  Header
} from '@asl/components';

const connectComponent = key => {
  const mapStateToProps = ({ model, static: { schema } }) => {
    schema = schema.accreditingBody.options.find(body => body.value === key).reveal;

    return {
      model,
      schema
    };
  };

  return connect(mapStateToProps)(Fieldset);
};

const formatters = {
  accreditingBody: {
    mapOptions: option => {
      const ConnectedComponent = connectComponent(option.value);
      return {
        ...option,
        reveal: option.reveal ? <Inset><ConnectedComponent /></Inset> : null
      };
    }
  }
};

const Page = () => (
  <FormLayout formatters={formatters}>
    <Header title={<Snippet>title</Snippet>} />
  </FormLayout>
);

export default Page;
