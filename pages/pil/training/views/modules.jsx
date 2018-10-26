import React from 'react';
import Snippet from '../../../common/views/containers/snippet';
import FormLayout from '../../../common/views/layouts/form';

const Page = () => (
  <FormLayout>
    <header>
      <h1>
        <Snippet>title</Snippet>
      </h1>
    </header>
  </FormLayout>
);

export default Page;
