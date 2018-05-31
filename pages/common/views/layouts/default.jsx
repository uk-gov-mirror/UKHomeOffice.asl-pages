import React from 'react';
import GovUK from 'govuk-react-components/components/layout';
import PhaseBanner from 'govuk-react-components/components/phase-banner';
import Breadcrumbs from '../components/breadcrumbs';

import StatusBar from '../containers/status-bar';
import Snippet from '../containers/snippet';

const Layout = ({
  children,
  scripts,
  crumbs
}) => (
  <GovUK
    propositionHeader={<Snippet>siteTitle</Snippet>}
    stylesheets={['/public/css/app.css']}
    scripts={scripts}
    headerContent={<StatusBar />}
  >
    <main className="main" id="content">
      <PhaseBanner phase="beta"><Snippet>beta</Snippet></PhaseBanner>
      <Breadcrumbs crumbs={crumbs} />
      <div className="grid-row">
        <div className="column-full">
          <div id="page-component">
            { children }
          </div>
        </div>
      </div>
    </main>
  </GovUK>
);

module.exports = Layout;
