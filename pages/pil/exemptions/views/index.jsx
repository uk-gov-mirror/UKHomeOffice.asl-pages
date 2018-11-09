import React from 'react';
import {
  Snippet,
  FormLayout,
  Link
} from '@asl/components';

const Page = () => (
  <FormLayout>
    <header>
      <h1><Snippet>title</Snippet></h1>
      <br />
      <Link label={<Snippet>moreText</Snippet>}/>
    </header>
  </FormLayout>
);

export default Page;
