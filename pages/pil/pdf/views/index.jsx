import React from 'react';
import Wrapper from '../../../common/views/pdf/wrapper';
import PIL from './pil';

const Index = ({ pil, nonce, content, canReadHoldingEstablishment }) => (
  <Wrapper name="index" nonce={nonce}>
    <PIL pil={pil} content={content} canReadHoldingEstablishment={canReadHoldingEstablishment} />
  </Wrapper>
);

export default Index;
