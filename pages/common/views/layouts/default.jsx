import React from 'react';
import { omit } from 'lodash';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomeOffice from '@asl/service/components';
import PhaseBanner from '../components/phase-banner';
import Breadcrumbs from '../components/breadcrumbs';
import StatusBar from '../components/status-bar';
import Snippet from '../containers/snippet';

const Wrapped = ({ store, children }) => <Provider store={store}>{ children }</Provider>;

const Layout = ({
  error,
  children,
  rootReducer,
  scripts = [],
  user,
  crumbs,
  static: staticContent = {},
  ...props
}) => {
  const {
    content: {
      siteTitle = 'Research and testing with animals',
      ...content
    } = {},
    urls,
    nonce,
    ...rest
  } = staticContent;

  const wrap = !error;
  const store = wrap
    ? createStore(rootReducer, {
      ...omit(props, ['settings', '_locals', 'cache']),
      static: { ...rest, content, urls }
    })
    : {};
  if (scripts.length) {
    scripts = ['/public/js/common/bundle.js'].concat(scripts);
  }
  const page = (
    <HomeOffice
      propositionHeader={siteTitle}
      stylesheets={['/public/css/app.css']}
      scripts={scripts}
      headerContent={<StatusBar user={wrap ? user : {}} />}
      nonce={nonce}
    >
      <div className="govuk-width-container">
        {
          wrap && <PhaseBanner phase="beta"><Snippet>beta</Snippet></PhaseBanner>
        }
        <Breadcrumbs crumbs={crumbs} />
        <main className="main govuk-main-wrapper" id="content">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              <div id="page-component">
                { children }
              </div>
            </div>
          </div>
        </main>
      </div>
      {
        wrap && <script nonce={nonce} dangerouslySetInnerHTML={{__html: `window.INITIAL_STATE=${JSON.stringify(store.getState())};`}} />
      }
    </HomeOffice>
  );
  if (wrap) {
    return <Wrapped store={store}>{ page }</Wrapped>;
  }
  return page;
};

module.exports = Layout;
