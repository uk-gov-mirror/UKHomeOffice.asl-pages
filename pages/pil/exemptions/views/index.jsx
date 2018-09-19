import React from 'react';
import Snippet from '../../../common/views/containers/snippet';
import FormLayout from '../../../common/views/layouts/form';
import Link from '../../../common/views/containers/link';

const Page = () => (
  <FormLayout>
    <header>
      <h1><Snippet>pil.exemptions.title</Snippet></h1>
      <br />
      <Link label={<Snippet>pil.exemptions.more</Snippet>}/>
    </header>
  </FormLayout>
);

export default Page;
