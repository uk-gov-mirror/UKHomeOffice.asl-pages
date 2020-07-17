import React from 'react';
import {
  FormLayout,
  Header,
  Snippet
} from '@asl/components';

const Page = () => {
  return (
    <FormLayout cancelLink="project.read">
      <Header title={<Snippet>title</Snippet>} />
    </FormLayout>
  );
};

export default Page;
