import React from 'react';
import { connect } from 'react-redux';
import { Header, Snippet, FormLayout } from '@ukhomeoffice/asl-components';

const RevokePIL = ({ profile, children }) => (
  <FormLayout>
    <Header
      title={<Snippet>title</Snippet>}
      subtitle={`${profile.firstName} ${profile.lastName}`}
    />
    { children }
  </FormLayout>
);

export default connect(({ static: { profile } }) => ({ profile }))(RevokePIL);
