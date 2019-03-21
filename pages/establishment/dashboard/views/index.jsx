import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Link,
  Sidebar,
  Header,
  PanelList
} from '@asl/components';

const links = [
  { path: 'establishment.read', permissions: 'establishment.read' },
  { path: 'place.list', permissions: 'place.read' },
  { path: 'profile.list', permissions: 'profile.read.basic' },
  { path: 'project.list', permissions: 'project.read.basic' }
];

const DashboardLink = ({ path }) => (
  <Fragment>
    <Link page={path} label={<Snippet>{`pages.${path}`}</Snippet>} />
    <p><Snippet>{`dashboard.${path}.subtitle`}</Snippet></p>
  </Fragment>
);

const Index = ({
  establishment: {
    name,
    licenceNumber
  },
  allowedActions,
  pelh,
  nprc
}) => (
  <Fragment>
    <Header title={name} />
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <PanelList
          panels={links.filter(link => allowedActions.includes(link.permissions)).map(link => <DashboardLink key={link.path} { ...link } />)}
        />
      </div>
      <Sidebar>
        <dl>
          <dt><Snippet>establishmentLicenceNumber</Snippet></dt>
          <dd>{ licenceNumber }</dd>

          {pelh && <Fragment><dt><Snippet>establishmentLicenceHolder</Snippet></dt>
            <dd><Link page="profile.view" profileId={pelh.profile.id} label={pelh.profile.name} /></dd></Fragment>}
          {nprc && <Fragment><dt><Snippet>namedPersonResponsibleForCompliance</Snippet></dt>
            <dd><Link page="profile.view" profileId={nprc.profile.id} label={nprc.profile.name} /></dd></Fragment>}
        </dl>
      </Sidebar>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, allowedActions, pelh, nprc } }) => ({ establishment, allowedActions, pelh, nprc });

export default connect(mapStateToProps)(Index);
