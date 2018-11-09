import React from 'react';
import mapKeys from 'lodash/mapKeys';
import { connect } from 'react-redux';
import {
  Snippet,
  FormLayout,
  Inset,
  Fieldset
} from '@asl/components';

const connectComponent = key => {
  const mapStateToProps = ({ model, static: { schema, errors } }) => {
    schema = schema.modules.options.find(m => m.value === key).reveal;
    return {
      model,
      errors,
      schema: mapKeys(schema, (v, k) => `module-${key}-${k}`)
    };
  };

  return connect(mapStateToProps)(Fieldset);
};

const formatters = {
  modules: {
    mapOptions: (op, b) => {
      const ConnectedComponent = connectComponent(op.value);
      return {
        ...op,
        prefix: op.value,
        reveal: (
          <Inset><ConnectedComponent /></Inset>
        )
      };
    }
  }
};

const Page = () => (
  <FormLayout formatters={formatters}>
    <header>
      <h1>
        <Snippet>title</Snippet>
      </h1>
    </header>
  </FormLayout>
);

export default Page;
