import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout } from '@ukhomeoffice/asl-components';

export default function Type() {
  const profile = useSelector(state => state.static.profile);
  const model = useSelector(state => state.model);
  return (
    <FormLayout cancelLink="training.dashboard">
      <Header
        title={<Snippet isExemption={model.isExemption}>title</Snippet>}
        subtitle={`${profile.firstName} ${profile.lastName}`}
      />
    </FormLayout>
  );
}
