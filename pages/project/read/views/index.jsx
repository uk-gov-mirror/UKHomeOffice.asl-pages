import React, { Fragment } from 'react';
import omit from 'lodash/omit';
import { connect } from 'react-redux';
import { Header, ModelSummary } from '@asl/components';
import formatters from '../../formatters';
import { schema } from '../../schema';

const App = ({ model, establishment }) => (
  <Fragment>
    <Header
      subtitle={establishment.name}
      title={model.title || 'Untitled project'}
    />
    <ModelSummary model={model} schema={omit(schema, 'id')} formatters={omit(formatters, 'title')} />
  </Fragment>
);

const mapStateToProps = ({ model, static: { establishment } }) => ({ model, establishment });

export default connect(mapStateToProps)(App);
