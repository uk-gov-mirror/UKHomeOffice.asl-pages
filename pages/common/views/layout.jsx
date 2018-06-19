import React from 'react';
import Layout from './layouts/default';

const Index = ({
  Component,
  ...props
}) => (
  <Layout { ...props }>
    <Component { ...props } />
  </Layout>
);

export default Index;
