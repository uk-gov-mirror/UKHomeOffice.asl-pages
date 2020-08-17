import React from 'react';
import { Provider } from 'react-redux';
import Wrapper from '../../../common/views/pdf/wrapper';
import PIL from './pil';

const Index = ({ pil, nonce, content, store }) => (
  <Wrapper name="index" nonce={nonce}>
    <Provider store={store}>
      <PIL pil={pil} content={content} />
    </Provider>
  </Wrapper>
);

export default Index;
