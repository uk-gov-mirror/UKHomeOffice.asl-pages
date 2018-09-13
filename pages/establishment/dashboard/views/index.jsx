import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';
import Sidebar from '../../../common/views/components/sidebar';

const links = [
  { path: 'establishment.read', permissions: 'establishment.read' },
  { path: 'place.list', permissions: 'place.read' },
  { path: 'profile.list', permissions: 'profile.read.basic' },
  { path: 'project.list', permissions: 'project.read.basic' }
];

const Index = ({
  establishment: {
    name,
    licenceNumber,
    pelh
  },
  allowedActions
}) => (
  <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1>{ name }</h1>
    </header>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ul className="dashboard">
          {
            links.filter(link => allowedActions.includes(link.permissions)).map(link =>
              <li key={link.path}>
                <Link page={link.path} label={<Snippet>{`pages.${link.path}`}</Snippet>} />
                <p><Snippet>{`dashboard.${link.path}.subtitle`}</Snippet></p>
              </li>
            )
          }
        </ul>
      </div>
      <Sidebar>
        <dl>
          <dt><Snippet>licenceNumber</Snippet></dt>
          <dd>{ licenceNumber }</dd>

          <dt><Snippet>licenceHolder</Snippet></dt>
          <dd><Link page="profile.view" profile={ pelh.id } label={pelh.name} /></dd>
        </dl>
      </Sidebar>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, allowedActions } }) => ({ establishment, allowedActions });

export default connect(mapStateToProps)(Index);
