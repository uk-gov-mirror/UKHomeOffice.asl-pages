import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import Inset from '../../../common/views/components/inset';
import FormLayout from '../../../common/views/layouts/form';
import { labelFromCode } from '../../../common/formatters';

const formatters = {
  suitability: { mapOptions: labelFromCode },
  holding: { mapOptions: labelFromCode }
};

const Page = () => (
  <Fragment>
    <FormLayout formatters={formatters}>
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
  </Fragment>
);

module.exports = Page;
