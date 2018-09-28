import React from 'react';
import Snippet from '../../../common/views/containers/snippet';
import FormLayout from '../../../common/views/layouts/form';

const Page = () => (
  <FormLayout>
    <header>
      <h1><Snippet>pil.modules.title</Snippet></h1>
      <span className="govuk-hint"><Snippet>pil.modules.hint</Snippet></span>
    </header>
  </FormLayout>
);

export default Page;