import React from 'react';
import Layout from './base';
import { Wrapper } from '@asl/components';

const Index = ({
  Component,
  ...props
}) => (
  <Layout { ...props }>
    <Wrapper>
      <Component { ...props } />
    </Wrapper>
  </Layout>
);

export default Index;
