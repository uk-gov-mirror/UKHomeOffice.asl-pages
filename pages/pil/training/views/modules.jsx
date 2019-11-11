import React from 'react';
import {
  Snippet,
  FormLayout,
  Header
} from '@asl/components';

export default function Modules() {
  return (
    <FormLayout>
      <Header title={<Snippet>title</Snippet>} />
    </FormLayout>
  );
}
