import React, { Fragment } from 'react';

import {
  Link,
  Snippet,
  FormLayout
} from '@asl/components';

const formatters = {
  permission: {
    mapOptions: opt => {
      return {
        value: opt,
        label: <Snippet>{`fields.permission.options.${opt}.label`}</Snippet>,
        hint: <Snippet optional>{`fields.permission.options.${opt}.hint`}</Snippet>
      };
    }
  }
};

const Page = () => (
  <Fragment>
    <FormLayout formatters={formatters}>
      <header>
        <h1><Snippet>title</Snippet></h1>
      </header>
    </FormLayout>
    <Fragment>
      <p><h2><Snippet>remove</Snippet></h2></p>
      <p><Snippet>copy</Snippet></p>
      <Link
        page=''
        className="govuk-button"
        label={<Snippet>buttons.remove</Snippet>}
      />
      <p><Link page="profile.view" label={<Snippet>pages.profile.links.back</Snippet>} /></p>
    </Fragment>
  </Fragment>
);

export default Page;
