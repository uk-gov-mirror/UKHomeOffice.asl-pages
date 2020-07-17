import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout } from '@asl/components';

export default function Type() {
  const profile = useSelector(state => state.static.profile);
  return (
    <FormLayout cancelLink="training.dashboard">
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={`${profile.firstName} ${profile.lastName}`}
      />
      <p><Snippet>hint</Snippet></p>
    </FormLayout>
  );
}
