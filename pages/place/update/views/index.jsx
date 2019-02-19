import React from 'react';
import {
  Snippet,
  Inset,
  FormLayout,
  Header
} from '@asl/components';
import formatters from '../../formatters';

const pageFormatters = {
  restrictions: { showIf: model => model.restrictions }
};

const Page = () => (
  <FormLayout formatters={Object.assign({}, formatters, pageFormatters)}>
    <Header title={<Snippet>pages.place.edit</Snippet>} />
    <Inset>
      <p>
        <Snippet>inset</Snippet>
      </p>
    </Inset>
  </FormLayout>
);

export default Page;
