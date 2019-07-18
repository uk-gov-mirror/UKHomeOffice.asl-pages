import React from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Snippet,
  FormLayout
} from '@asl/components';

const ImportPage = ({ establishment: { name } }) => (
  <FormLayout>
    <Header
      title={<Snippet>title</Snippet>}
      subtitle={name}
    />
  </FormLayout>
);

export default connect(({ static: { establishment } }) => ({ establishment }))(ImportPage);
