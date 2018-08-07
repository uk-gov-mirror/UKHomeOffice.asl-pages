import React from 'react';
import Snippet from '../../../common/views/containers/snippet';
import FormLayout from '../../../common/views/layouts/form';

const formatters = {
  permissions: {
    mapOptions: opt => {
      return {
        value: opt,
        label: <Snippet>{`fields.permissions.options.${opt}.label`}</Snippet>,
        hint: <Snippet optional>{`fields.permissions.options.${opt}.hint`}</Snippet>
      };
    }
  }
};

const Page = () => (
  <FormLayout formatters={formatters}>
    <header>
      <h2>&nbsp;</h2>
      <h1><Snippet>pages.profile.invite</Snippet></h1>
    </header>
  </FormLayout>
);

module.exports = Page;
