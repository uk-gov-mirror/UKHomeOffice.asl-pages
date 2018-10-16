import React from 'react';
import { connect } from 'react-redux';
import { mapKeys } from 'lodash';
import Snippet from '../../../common/views/containers/snippet';
import FormLayout from '../../../common/views/layouts/form';
import Fieldset from '../../../common/views/components/fieldset';
import Inset from '../../../common/views/components/inset';

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
      <h1><Snippet>pil.procedures.title</Snippet></h1>
    </header>
  </FormLayout>
);

export default Page;
