import React from 'react';
import Layout from './layouts/default';

const Index = ({
  error: {
    message,
    stack
  },
  ...props
}) => (
  <Layout
    wrap={false}
    {...props}
    scripts={[]}
  >
    <h1 className="heading-large">{message}</h1>
    <pre>
      {stack}
    </pre>
  </Layout>
);

export default Index;
