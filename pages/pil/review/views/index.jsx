import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout } from '@ukhomeoffice/asl-components';

export default function Review() {
  const { profile } = useSelector(state => state.static);
  return (
    <FormLayout cancelLink="pil.read">
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={profile.name}
      />
      <p><Snippet>content</Snippet></p>
    </FormLayout>
  );
}
