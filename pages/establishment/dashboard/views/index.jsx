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
    nprc
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
            {/* list the inspectors here - in the beginning I do not have any */}
            <dt><Snippet>inspectors</Snippet></dt>
            {/* edit link is only shown if asruAdmin*/}
            { asruAdmin && <dd><Link page="establishment.inspectors" label={ <Snippet>pages.edit</Snippet> } /></dd> }

            {/* list the pocs here - in the beginning I do not have any */}
            {/* <Fragment> */}
            <dt><Snippet>poc</Snippet></dt>
            {/* <dd><Link page="pocs.edit" label={ <Snippet>pages.edit</Snippet> } /></dd></Fragment> */}
            { asruAdmin && <dd><Link page="establishment.inspectors" label={ <Snippet>pages.edit</Snippet> } /></dd> }
          </dl>
        </Sidebar>
      </div>
    </Fragment>
  )
  ;
};

const mapStateToProps = ({ static: { establishment, allowedActions, profile } }) => ({ establishment, allowedActions, profile });

export default connect(mapStateToProps)(Index);
