import React from 'react';
import { Provider } from 'react-redux';
import Wrapper from '../../../common/views/pdf/wrapper';
import PIL from './pil';

const Index = ({ store, nonce, content }) => (
  <Wrapper name="index" nonce={nonce}>
    <Provider store={store}>
      <PIL content={content} />
    </Provider>
  </Wrapper>
);

export default Index;
