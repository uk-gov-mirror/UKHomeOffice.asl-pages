import React, { Fragment } from 'react';
import { Link, Snippet, FormLayout, Header } from '@asl/components';

const Page = () => {
  return (
    <Fragment>
      <FormLayout>
        <Header title={<Snippet>title</Snippet>}/>
      </FormLayout>

      <p>
        <Link page="profile.read" label={<Snippet>buttons.cancel</Snippet>} />
      </p>
    </Fragment>
  );
};

export default Page;
