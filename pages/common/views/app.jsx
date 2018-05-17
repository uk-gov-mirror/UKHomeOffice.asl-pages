import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import Layout from './layouts/default';

const App = ({
  store,
  children,
  scripts,
  crumbs,
  url
}) => (
  <Provider store={ store }>
    <Fragment>
      <script dangerouslySetInnerHTML={{__html: `window.INITIAL_STATE=${JSON.stringify(store.getState())}`}} />
      <Layout
        scripts={[
          '/public/js/index.js',
          `${url}/assets/js/index.js`
        ]}
        crumbs={crumbs}>{ children }</Layout>
    </Fragment>
  </Provider>
);

export default App;
