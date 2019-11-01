import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Link,
  Sidebar,
  Header,
  PanelList,
  LicenceStatusBanner
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
  establishment,
  allowedActions,
  asruAdmin
}) => {
  const inspectors = establishment.asru.filter(p => p.asruInspector);
  const spocs = establishment.asru.filter(p => p.asruLicensing);

  return (
    <Fragment>
      <LicenceStatusBanner licence={establishment} licenceType="pel" />

      <Header title={establishment.name} />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <PanelList
            panels={links.filter(link => allowedActions.includes(link.permissions)).map(link => <DashboardLink key={link.path} { ...link } />)}
          />
        </div>
        <Sidebar>
          <dl>
            <dt><Snippet>establishmentLicenceNumber</Snippet></dt>
            <dd>{ establishment.licenceNumber }</dd>

            {
              establishment.pelh && <ProfileLink type="pelh" profile={establishment.pelh} />
            }
            {
              establishment.nprc && <ProfileLink type="nprc" profile={establishment.nprc} />
            }
            {
              establishment.holc && <ProfileLink type="holc" profile={establishment.holc} />
            }

            <dt><Snippet>inspectors</Snippet></dt>
            <dd>
              { inspectors.length < 1 &&
                <p className="inspector">None</p>
              }

              {
                !asruAdmin && inspectors.map(inspector => (
                  <p key={`${inspector.id}`} className="inspector">{`${inspector.firstName} ${inspector.lastName}`}</p>
                ))
              }

              {
                asruAdmin && inspectors.map(inspector => (
                  <p key={`${inspector.id}`} className="inspector">
                    <Link page="global.profile" profileId={inspector.id} label={`${inspector.firstName} ${inspector.lastName}`} />
                  </p>
                ))
              }

              { asruAdmin &&
                <Link page="establishment.asru" asruUser="inspectors" label={ <Snippet>pages.edit</Snippet> } />
              }
            </dd>

            <dt><Snippet>spoc</Snippet></dt>
            <dd>
              { spocs.length < 1 &&
                <p className="spoc">None</p>
              }

              {
                !asruAdmin && spocs.map(spoc => (
                  <p key={`${spoc.id}`} className="spoc">{`${spoc.firstName} ${spoc.lastName}`}</p>
                ))
              }

              {
                asruAdmin && spocs.map(spoc => (
                  <p key={`${spoc.id}`} className="spoc">
                    <Link page="global.profile" profileId={spoc.id} label={`${spoc.firstName} ${spoc.lastName}`} />
                  </p>
                ))
              }

              { asruAdmin &&
                <Link page="establishment.asru" asruUser="spocs" label={ <Snippet>pages.edit</Snippet> } />
              }
            </dd>
          </dl>
        </Sidebar>
      </div>
    </Fragment>
  )
  ;
};

const mapStateToProps = ({ static: { establishment, allowedActions, profile } }) => ({ establishment, allowedActions, asruAdmin: profile.asruUser && profile.asruAdmin });

export default connect(mapStateToProps)(Index);
