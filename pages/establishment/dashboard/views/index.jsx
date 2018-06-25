import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';
import Sidebar from '../../../common/views/components/sidebar';

const links = [
  'details',
  'places',
  'people',
  'projects'
];

const Index = ({
  establishment: {
    name,
    licenceNumber,
    pelh
  }
}) => (
  <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1>{ name }</h1>
    </header>
    <div className="grid-row">
      <div className="column-two-thirds">
        <ul className="dashboard">
          {
            links.map(link =>
              <li key={link}>
                <Link path={link} label={<Snippet>{`pages.${link}`}</Snippet>} />
                <p><Snippet>{`dashboard.${link}.subtitle`}</Snippet></p>
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
          <dd><Link path={`profile/${pelh.id}`} label={pelh.name} /></dd>
        </dl>
      </Sidebar>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Index);
