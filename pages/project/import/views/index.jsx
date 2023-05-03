import React from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Snippet,
  FormLayout
} from '@ukhomeoffice/asl-components';

const ImportPage = ({ establishment: { name } }) => (
  <FormLayout>
    <Header
      title={<Snippet>title</Snippet>}
      subtitle={name}
    />
    <p><Snippet>hint</Snippet></p>
  </FormLayout>
);

export default connect(({ static: { establishment } }) => ({ establishment }))(ImportPage);
