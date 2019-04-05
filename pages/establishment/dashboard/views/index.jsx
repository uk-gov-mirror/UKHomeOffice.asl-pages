import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Link,
  Sidebar,
  Header,
  PanelList
} from '@asl/components';
import { ProfileLink } from '../../components';

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
    licenceNumber,
    pelh,
    nprc,
    asru
  },
  allowedActions,
  profile: {
    asruAdmin
  }
}) => {

  return (
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

            {
              pelh && <ProfileLink type="pelh" profile={pelh} />
            }
            {
              nprc && <ProfileLink type="nprc" profile={nprc} />
            }
          </dl>
        </Sidebar>
        <Sidebar>
          <dl>
            <dt><Snippet>inspectors</Snippet></dt>
            {
              !asruAdmin && asru.filter(p => p.asruInspector).map(asru => (
                <p key={`${asru.id}`}>{`${asru.firstName} ${asru.lastName}`}</p>
              ))
            }
            {
              asruAdmin && asru.filter(p => p.asruInspector).map(asru => (
                <Link key={`${asru.id}`} page="global.profile" profileId={asru.id} label={`${asru.firstName} ${asru.lastName}`} />
              ))
            }
            { asruAdmin && <dd><Link page="establishment.inspectors" label={ <Snippet>pages.edit</Snippet> } /></dd> }

            <dt><Snippet>spoc</Snippet></dt>
            {
              !asruAdmin && asru.filter(p => p.asruLicensing).map(asru => (
                <p key={`${asru.id}`}>{`${asru.firstName} ${asru.lastName}`}</p>
              ))
            }
            {
              asruAdmin && asru.filter(p => p.asruLicensing).map(asru => (
                <Link key={`${asru.id}`} page="global.profile" profileId={asru.id} label={`${asru.firstName} ${asru.lastName}`} />
              ))
            }
            { asruAdmin && <dd><Link page="establishment.spocs" label={ <Snippet>pages.edit</Snippet> } /></dd> }
          </dl>
        </Sidebar>
      </div>
    </Fragment>
  )
  ;
};

const mapStateToProps = ({ static: { establishment, allowedActions, profile } }) => ({ establishment, allowedActions, profile });

export default connect(mapStateToProps)(Index);
