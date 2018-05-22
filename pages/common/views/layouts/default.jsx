import React from 'react';
import GovUK from 'govuk-react-components/components/layout';
import PhaseBanner from 'govuk-react-components/components/phase-banner';
import Breadcrumbs from '../components/breadcrumbs';

import StatusBar from '../containers/status-bar';

const Layout = ({
  children,
  scripts,
  crumbs
}) => (
  <GovUK
    propositionHeader="Research and Testing with Animals"
    stylesheets={['/public/css/app.css']}
    scripts={scripts}
    headerContent={<StatusBar />}
  >
    <main className="main" id="content">
      <PhaseBanner phase="beta">This is a new service - your <a href="mailto:animalscience@digital.homeoffice.gov.uk">feedback</a> will help us to improve it.</PhaseBanner>
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
