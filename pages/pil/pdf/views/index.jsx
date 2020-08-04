import React from 'react';
import Wrapper from '../../../common/views/pdf/wrapper';
import PIL from './pil';

const Index = ({ pil, nonce, content }) => (
  <Wrapper name="index" nonce={nonce}>
    <PIL pil={pil} content={content} />
  </Wrapper>
);

export default Index;
