import React from 'react';
import {
  Snippet,
  Inset,
  FormLayout
} from '@asl/components';
import formatters from '../../formatters';

const pageFormatters = {
  restrictions: { showIf: model => model.restrictions }
};

const Page = () => (
  <FormLayout formatters={Object.assign({}, formatters, pageFormatters)}>
    <header>
      <h2>&nbsp;</h2>
      <h1><Snippet>pages.place.edit</Snippet></h1>
    </header>
    <Inset>
      <p>
        <Snippet>inset</Snippet>
      </p>
    </Inset>
  </FormLayout>
);

module.exports = Page;
