import React from 'react';
import { omit } from 'lodash';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomeOffice from '@asl/service/ui/components/home-office';
import Breadcrumbs from '../components/breadcrumbs';
import StatusBar from '../components/status-bar';
import Notifications from '../containers/notifications';

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
      headerContent={<StatusBar user={user} />}
      nonce={nonce}
      phaseBanner={{
        phase: 'beta',
        feedbackUrl: '/'
      }}
    >
      <div className="govuk-width-container">
        <Breadcrumbs crumbs={crumbs} />
        <main className="main govuk-main-wrapper" id="content">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">
              { wrap && <Notifications /> }
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
