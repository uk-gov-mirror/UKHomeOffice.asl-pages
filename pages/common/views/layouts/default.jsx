import React from 'react';
import { createStore } from 'redux';
import GovUK from 'govuk-react-components/components/layout';
import { Provider } from 'react-redux';
import PhaseBanner from 'govuk-react-components/components/phase-banner';
import Breadcrumbs from '../components/breadcrumbs';
import Snippet from '../containers/snippet';

import StatusBar from '../components/status-bar';

const Wrapped = ({ store, children }) => <Provider store={store}>{ children }</Provider>;

const Layout = ({
  wrap = true,
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
    ...staticContent
  },
  ...props
}) => {
  const store = wrap
    ? createStore(rootReducer, { ...props, static: { ...staticContent, content } })
    : {};
  const page = (
    <GovUK
      propositionHeader={siteTitle}
      stylesheets={['/public/css/app.css']}
      scripts={scripts}
      headerContent={<StatusBar user={user} />}
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
        wrap && <script dangerouslySetInnerHTML={{__html: `window.INITIAL_STATE=${JSON.stringify(store.getState())};`}} />
      }
    </GovUK>
  );
  if (wrap) {
    return <Wrapped store={store}>{ page }</Wrapped>;
  }
  return page;
};

module.exports = Layout;
