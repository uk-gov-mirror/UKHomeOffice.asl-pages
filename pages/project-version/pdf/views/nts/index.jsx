import React from 'react';
import { Provider } from 'react-redux';
import Wrapper from '../../../../common/views/pdf/wrapper';
import Legacy from './v0';
import Current from './v1';

const NTS = ({ store, nonce, schemaVersion }) => {
  return (
    <Wrapper name="index" nonce={nonce}>
      <Provider store={store}>
        {
          schemaVersion === 0 ? <Legacy /> : <Current />
        }
      </Provider>
    </Wrapper>
  );
};

export default NTS;
