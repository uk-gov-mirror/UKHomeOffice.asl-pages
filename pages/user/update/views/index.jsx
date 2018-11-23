import React from 'react';
import {
  FormLayout,
  Header,
  Snippet
} from '@asl/components';

const Page = () => (
  <FormLayout>
    <Header title={<Snippet>title</Snippet>} />
  </FormLayout>
);

export default Page;
