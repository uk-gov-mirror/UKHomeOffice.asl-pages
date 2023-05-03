import React from 'react';
import { connect } from 'react-redux';
import mapKeys from 'lodash/mapKeys';
import {
  Snippet,
  FormLayout,
  Fieldset,
  Inset,
  Header
} from '@ukhomeoffice/asl-components';

const connectComponent = key => {
  const mapStateToProps = ({ model, static: { schema, errors } }) => {
    schema = schema.procedures.options.find(m => m.value === key).reveal;
    return {
      model,
      errors,
      schema: mapKeys(schema, (v, k) => `notesCat${key}`)
    };
  };

  return connect(mapStateToProps)(Fieldset);
};

const formatters = {
  procedures: {
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
    <Header title={<Snippet>pil.procedures.title</Snippet>} />
    <Inset><Snippet>cat-e</Snippet></Inset>
  </FormLayout>
);

export default Page;
