import React from 'react';
import {
  FormLayout,
  Header,
  Snippet
} from '@asl/components';

const Page = () => {
  return (
    <FormLayout>
      <Header title={<Snippet>title</Snippet>} />
      <p><Snippet>summary</Snippet></p>
    </FormLayout>
  );
};

export default Page;
