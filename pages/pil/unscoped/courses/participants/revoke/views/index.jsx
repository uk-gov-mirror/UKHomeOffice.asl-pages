import React from 'react';
import { connect } from 'react-redux';
import { Header, Snippet, FormLayout } from '@ukhomeoffice/asl-components';

const RevokePIL = ({ trainingPil, children }) => (
  <FormLayout>
    <Header
      title={<Snippet>title</Snippet>}
      subtitle={`${trainingPil.profile.firstName} ${trainingPil.profile.lastName}`}
    />
    <p><Snippet name={`${trainingPil.profile.firstName} ${trainingPil.profile.lastName}`}>summary</Snippet></p>
    { children }
  </FormLayout>
);

export default connect(({ static: { trainingPil } }) => ({ trainingPil }))(RevokePIL);
