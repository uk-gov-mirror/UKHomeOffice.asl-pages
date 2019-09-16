import React from 'react';
import Wrapper from '../../../common/views/pdf/wrapper';
import Establishment from './establishment';

const Index = ({ establishment, nonce, content }) => (
  <Wrapper name="index" nonce={nonce}>
    <Establishment establishment={establishment} content={content} />
  </Wrapper>
);

export default Index;
