import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout } from '@ukhomeoffice/asl-components';

export default function Type() {
  const { profile, basePage } = useSelector(state => state.static);
  return (
    <FormLayout cancelLink={`${basePage}.dashboard`}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={`${profile.firstName} ${profile.lastName}`}
      />
    </FormLayout>
  );
}
