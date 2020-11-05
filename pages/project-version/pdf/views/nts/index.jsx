import React from 'react';
import { Provider } from 'react-redux';
import Wrapper from '../../../../common/views/pdf/wrapper';
import NtsPdf from './nts-pdf';

const NTS = ({ store, nonce }) => {
  return (
    <Wrapper name="index" nonce={nonce}>
      <Provider store={store}>
        <NtsPdf />
      </Provider>
    </Wrapper>
  );
};

export default NTS;
