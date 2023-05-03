import React, { Fragment } from 'react';
import { Header, Snippet } from '@ukhomeoffice/asl-components';

const Index = () => (
  <Fragment>
    <Header title={<Snippet>feedback.title</Snippet>} />
    <Snippet>feedback.content</Snippet>
  </Fragment>
);

export default Index;
