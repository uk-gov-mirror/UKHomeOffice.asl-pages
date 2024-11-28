import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout } from '@ukhomeoffice/asl-components';

export default function Type() {
  const { profile, basePage } = useSelector(state => state.static);
  const model = useSelector(state => state.model);
  return (
    <FormLayout cancelLink={`${basePage}.dashboard`}>
      <Header
        title={<Snippet isExemption={model.isExemption}>title</Snippet>}
        subtitle={`${profile.firstName} ${profile.lastName}`}
      />
      <p><Snippet>hint</Snippet></p>
    </FormLayout>
  );
}
