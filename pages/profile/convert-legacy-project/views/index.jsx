import React from 'react';
import { useSelector } from 'react-redux';
import {
  FormLayout,
  Header,
  Snippet
} from '@asl/components';

export default function ConvertProject() {
  const establishment = useSelector(state => state.static.establishment);

  return (
    <FormLayout>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={establishment.name}
      />
      <p><Snippet>description</Snippet></p>
    </FormLayout>
  );
}
