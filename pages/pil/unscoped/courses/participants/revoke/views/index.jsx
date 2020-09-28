import React from 'react';
import { connect } from 'react-redux';
import { Header, Snippet, FormLayout } from '@asl/components';

const RevokePIL = ({ trainingPil, children }) => (
  <FormLayout>
    <Header
      title={<Snippet>title</Snippet>}
      subtitle={`${trainingPil.profile.firstName} ${trainingPil.profile.lastName}`}
    />
    { children }
  </FormLayout>
);

export default connect(({ static: { trainingPil } }) => ({ trainingPil }))(RevokePIL);
