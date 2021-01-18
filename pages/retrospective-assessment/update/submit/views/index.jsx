import React from 'react';
import { Snippet, Header, FormLayout } from '@asl/components';

export default function Submit() {
  return (
    <FormLayout>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={<Snippet>subtitle</Snippet>}
      />
      <p><Snippet>content</Snippet></p>
    </FormLayout>
  );
}
