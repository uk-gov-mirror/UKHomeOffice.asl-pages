import React, { Fragment } from 'react';
import { Snippet } from '@asl/components';

const Index = () => (
  <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1><Snippet>feedback.title</Snippet></h1>
    </header>
    <Snippet>feedback.content</Snippet>
  </Fragment>
);

export default Index;
