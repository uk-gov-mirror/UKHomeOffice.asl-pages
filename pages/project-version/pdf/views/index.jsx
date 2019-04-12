import React from 'react';
import { Provider } from 'react-redux';
import Wrapper from './wrapper';
import PDF from '@asl/projects/views/pdf';

const Index = ({ store, nonce }) => (
  <Wrapper name="index" nonce={nonce}>
    <Provider store={store}>
      <PDF />
    </Provider>
  </Wrapper>
);

export default Index;
