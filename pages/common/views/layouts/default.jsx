import React from 'react';
import { omit } from 'lodash';
import { createStore } from 'redux';
import { Layout as GovUK, PhaseBanner } from 'govuk-react-components';
import { Provider } from 'react-redux';
import Breadcrumbs from '../components/breadcrumbs';
import Snippet from '../containers/snippet';

import StatusBar from '../components/status-bar';

const Wrapped = ({ store, children }) => <Provider store={store}>{ children }</Provider>;

const Layout = ({
  error,
  children,
  rootReducer,
  scripts,
  user,
  crumbs,
  static: {
    content: {
      siteTitle,
      ...content
    },
    urls,
    nonce,
    ...staticContent
  },
  ...props
}) => {
  const wrap = !error;
  const store = wrap
    ? createStore(rootReducer, {
      ...omit(props, ['settings', '_locals', 'cache']),
      static: { ...staticContent, content, urls }
    })
    : {};
  const page = (
    <GovUK
      propositionHeader={siteTitle}
      stylesheets={['/public/css/app.css']}
      scripts={['/public/js/common/bundle.js'].concat(scripts)}
      headerContent={<StatusBar user={wrap ? user : {}} />}
      nonce={nonce}
    >
      <main className="main" id="content">
        {
          wrap && <PhaseBanner phase="beta"><Snippet>beta</Snippet></PhaseBanner>
        }
        <Breadcrumbs crumbs={crumbs} />
        <div className="grid-row">
          <div className="column-full">
            <div id="page-component">
              { children }
            </div>
          </div>
        </div>
      </main>
      {
        wrap && <script nonce={nonce} dangerouslySetInnerHTML={{__html: `window.INITIAL_STATE=${JSON.stringify(store.getState())};`}} />
      }
    </GovUK>
  );
  if (wrap) {
    return <Wrapped store={store}>{ page }</Wrapped>;
  }
  return page;
};

module.exports = Layout;
