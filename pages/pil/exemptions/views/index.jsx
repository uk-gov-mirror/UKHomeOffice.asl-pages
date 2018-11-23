import React from 'react';
import {
  Snippet,
  FormLayout,
  Link,
  Header
} from '@asl/components';

const Page = () => (
  <FormLayout>
    <Header title={<Snippet>title</Snippet>} />
    <Link label={<Snippet>moreText</Snippet>} />
  </FormLayout>
);

export default Page;
