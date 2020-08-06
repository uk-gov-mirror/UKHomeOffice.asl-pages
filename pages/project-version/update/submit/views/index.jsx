import React, { Fragment } from 'react';
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

const Submit = ({ model, canEndorse }) => {
  const isApplication = model.type === 'application';

  const declaration = (
    <Fragment>
      <h2><Snippet>declaration.title</Snippet></h2>
      <Snippet>declaration.content</Snippet>
    </Fragment>
  );

  return (
    <FormLayout formatters={formatters} declaration={canEndorse && declaration}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={model.data.title || 'Untitled project'}
      />
      {isApplication && (
        <Warning>
          <Snippet>{`warning.${canEndorse ? 'canEndorse' : 'cantEndorse'}`}</Snippet>
        </Warning>
      )}
    </FormLayout>
  );
};

const mapStateToProps = ({ model, static: { canEndorse } }) => ({ model, canEndorse });

export default connect(mapStateToProps)(Submit);
